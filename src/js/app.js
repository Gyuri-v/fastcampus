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

  const textureLoader = new THREE.TextureLoader();

  const container = document.querySelector('#container');
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
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
      // roughness: 0.7,
      // metalness: 1,
    });
    const geometry = new THREE.SphereGeometry(1.3, 30, 30);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
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
    createEarth1();
    addLight();
    addEvent();
    resize();
    draw();
  }

  initialize();
}
