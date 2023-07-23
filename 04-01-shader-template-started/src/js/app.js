import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from '../shaders/vertex.glsl?raw';
import fragmentShader from '../shaders/fragment.glsl?raw'; // ?raw 을 사용하면 플러그인이 필요없고, 셰이더 코드를 수정할 때마다 서버 재시동이 필요없음

export default function () {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.setClearColor(0x333333, 1);

  const container = document.querySelector('#container');

  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );
  camera.position.set(0, 0, 2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  const createObject = () => {
    // RawShaderMaterial : uniforms 나 shader 값이 따로 정의되어 있지 않음
    const material = new THREE.RawShaderMaterial({ 
      wireframe: false,
      side: THREE.DoubleSide,
      color: 0x00ff00,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(1, 1, 16, 16);
    console.log(geometry);
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
  };

  const resize = () => {
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;

    camera.aspect = canvasSize.width / canvasSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const addEvent = () => {
    window.addEventListener('resize', resize);
  };

  const draw = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw();
    });
  };

  const initialize = () => {
    createObject();
    addEvent();
    resize();
    draw();
  };

  initialize();
}
