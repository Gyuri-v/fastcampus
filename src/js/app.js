import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

  const create = () => {
    const earth1 = createEarth1();
    const earth2 = createEarth2();
    const star = createStart();
    scene.add(earth1, earth2, star);

    return{
      earth1,
      earth2,
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
    const { earth1, earth2, star } = obj;
    earth1.rotation.x += 0.0005;
    earth1.rotation.y += 0.0005;

    earth2.rotation.x += 0.0005;
    earth2.rotation.y += 0.0005;

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
