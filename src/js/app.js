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

  const create = () => {
    const earth1 = createEarth1();
    const earth2 = createEarth2();
    scene.add(earth1, earth2);
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

  const draw = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw();
    })
  }

  const initialize = () => {
    addLight();
    create();
    addEvent();
    resize();
    draw();
  }

  initialize();
}
