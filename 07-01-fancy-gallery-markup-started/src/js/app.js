import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl?raw';
import fragmentShader from '../shaders/fragment.glsl?raw';

export default function () {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });

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

  const loadImages = async () => {
    const images = [...document.querySelectorAll('main .content img')];
    
    // 앞단의 async await 처럼 비동기처리로 이미지 로드체크
    const fetchImages = images.map(image => new Promise((resolve, reject) => {
      image.onload = resolve(image);
      image.onerror = reject;
    }));

    // 이미지가 전체 로드된 후 진행되어야 하니까 Promiss.all 사용
    const loadedImages = await Promise.all(fetchImages);
    
    return loadedImages;
  }

  const createImages = (images) => {
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide
    });
    const geometry = new THREE.PlaneGeometry(1, 1, 16, 16);

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
  };

  const create = async () => {
    const loadedImages = await loadImages();
    const images = createImages([...loadedImages]);
    scene.add(images);
  }

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
    renderer.render(scene, camera);
    requestAnimationFrame(() => {
      draw();
    });
  };

  const initialize = async () => {
    await create();
    addEvent();
    resize();
    draw();
  };

  initialize().then();
}
