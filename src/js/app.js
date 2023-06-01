import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { convertLatlngToPos, getGradientCanvas } from './utils';

export default function () {
  let ww, wh;
  ww = window.innerWidth;
  wh = window.innerHeight;
  
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();

  const textureLoader = new THREE.TextureLoader();
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  const enviromentMap = cubeTextureLoader.load([
    'assets/enviroments/px.png',
    'assets/enviroments/nx.png',
    'assets/enviroments/py.png',
    'assets/enviroments/ny.png',
    'assets/enviroments/pz.png',
    'assets/enviroments/nz.png',
  ]);
  enviromentMap.encoding = THREE.sRGBEncoding;
  scene.background = enviromentMap;
  scene.environment = enviromentMap;

  const container = document.querySelector('#container');
  container.appendChild(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(75, ww/wh, 0.1, 100);
  camera.position.set(0, 0, 3);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  const addLight = () => {
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(2.65, 2.13, 1.02);
    scene.add(light);
  }

  const createEarth1 = () => {
    const material = new THREE.MeshStandardMaterial({ 
      map: textureLoader.load('assets/earth-night-map.jpg'),
      opacity: 0.6,
      transparent: true,
    });
    const geometry = new THREE.SphereGeometry(1.3, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y =  -Math.PI/2; // 텍스쳐 세계지도의 시작점이 달라서 90도 만큼 회전

    return mesh;
  }

  const createEarth2 = () => {
    const material = new THREE.MeshStandardMaterial({ 
      map: textureLoader.load('assets/earth-night-map.jpg'),
      opacity: 0.9,
      transparent: true,
      side: THREE.BackSide,
    });
    const geometry = new THREE.SphereGeometry(1.5, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y =  -Math.PI/2;
    
    return mesh;
  }

  const createStart = (count = 500) => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i] = (Math.random() - 0.5) * 5;
      positions[i + 1] = (Math.random() - 0.5) * 5;
      positions[i + 2] = (Math.random() - 0.5) * 5;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05, 
      transparent: true,
      map: textureLoader.load('assets/particle.png'),
      alphaMap: textureLoader.load('assets/particle.png'),
      depthWrite: false,
      color: 0xbcc6c6,
    });

    const start = new THREE.Points(particleGeometry, particleMaterial);

    return start;
  }

  const createPoint1 = () => {
    const point = {
      // 서울 위도, 경도 / Math.PI / 180 = 1도
      lat: 37.56668 * (Math.PI / 180),
      lng: 126.97841 * (Math.PI / 180)
    }

    const position = convertLatlngToPos(point, 1.3); 
    // convertLatlngToPos : 위도경도를 position 값으로 변환 
    // 1.3 : radius - earth1에 위치시킬건데, 스케일이 1.3이니까.

    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.02, 0.002, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x263d64 })
    );
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.set(0.9, 2.46, 1);

    return mesh;
  }

  const createPoint2 = () => {
    const point = {
      // 가나 아크라 위도, 경도
      lat: 5.55363 * (Math.PI / 180),
      lng: -0.196481 * (Math.PI / 180)
    }

    const position = convertLatlngToPos(point, 1.3); 
    // convertLatlngToPos : 위도경도를 position 값으로 변환 
    // 1.3 : radius - earth1에 위치시킬건데, 스케일이 1.3이니까.

    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.02, 0.002, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0x263d64 })
    );
    mesh.position.set(position.x, position.y, position.z);

    return mesh;
  }

  const createCurve = (pos1, pos2) => {
    const points = [];

    for (let i = 0; i < 100; i++) {
      // lerpVectors 를 써서 position을 자연스럽게 연결  -- 인자들 : pos1, pos2 사이에 i번째에 해당하는 정점의 좌표를 구하는 것
      // lerpVectors : 두 숫자사이에 어떤 숫자가 있는지 추정해서 반환
      const pos = new THREE.Vector3().lerpVectors(pos1, pos2, i/100);
      // 정규화시키지 1을 초과하지 않도록 -- 이렇게 해야 구의 반지름 크기만큼 쉽게 구해서 사용할 수 있음
      pos.normalize();

      // sin 함수를 사용해서 i 번째에 위치했을때의 높이값 구하기 -- 서울에서는 0 중간에 올라갔다가 가나에서 다시 0
      const wave = Math.sin((Math.PI * i) / 100); 

      // earth1 의 scale 인 1.3 만큼 크게
      pos.multiplyScalar(1.3 + 0.4 * wave);

      points.push(pos);
    }

    const gradientCanvas = getGradientCanvas('#757f94', '#263D74');
    const texture = new THREE.CanvasTexture(gradientCanvas);

    const curve = new THREE.CatmullRomCurve3(points); // 커브를 생성
    const geometry = new THREE.TubeGeometry(curve, 20, 0.003);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  }

  const create = () => {
    const earthGroup = new THREE.Group();

    const earth1 = createEarth1();
    const earth2 = createEarth2();
    const star = createStart();
    const point1 = createPoint1();
    const point2 = createPoint2();
    const curve = createCurve(point1.position, point2.position);

    earthGroup.add( earth1, earth2, point1, point2, curve );

    scene.add( star, earthGroup );

    return{
      earthGroup,
      star
    }
  }

  const resize = () => {
    ww = window.innerWidth;
    wh = window.innerHeight;

    camera.aspect = ww/ wh;
    camera.updateProjectionMatrix();

    renderer.setSize(ww, wh);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  const addEvent = () => {
    window.addEventListener('resize', resize);
  }

  const draw = (obj) => {
    const { earthGroup, star } = obj;
    earthGroup.rotation.x += 0.0005;
    earthGroup.rotation.y += 0.0005;

    star.rotation.x += 0.001;
    star.rotation.y += 0.001;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw(obj);
    })
  }

  const initialize = () => {
    addLight();
    const obj = create();
    addEvent();
    resize();
    draw(obj);
  }

  initialize();
}