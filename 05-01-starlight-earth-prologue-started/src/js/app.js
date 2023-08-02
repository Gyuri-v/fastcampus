import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from '../shaders/earth/vertex.glsl?raw';
import fragmentShader from '../shaders/earth/fragment.glsl?raw';
import pointsVertexShader from '../shaders/earthPoints/vertex.glsl?raw';
import pointsFragmentShader from '../shaders/earthPoints/fragment.glsl?raw';
import glowVertexShader from '../shaders/earthGlow/vertex.glsl?raw';
import glowFragmentShader from '../shaders/earthGlow/fragment.glsl?raw';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js'

export default function () {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.setClearColor(0x000000, 1);

  const container = document.querySelector('#container');

  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const textureLoader = new THREE.TextureLoader();
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

  const createEarth = () => {
    const material = new THREE.ShaderMaterial({
      // wireframe: true,
      // map: textureLoader.load('assets/earth_specular_map.png'),
      uniforms: {
        uTexture: { value: textureLoader.load('assets/earth_specular_map.png') },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const geometry = new THREE.SphereGeometry(0.8, 30, 30);
    // const geometry = new THREE.PlaneGeometry(1, 1);

    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
  };

  const createEarthPoints = () => {
    const material = new THREE.ShaderMaterial({
      wireframe: true,
      uniforms: {
        uTexture: { value: textureLoader.load('assets/earth_specular_map.png') },
      },
      vertexShader: pointsVertexShader,
      fragmentShader: pointsFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.IcosahedronGeometry(0.8, 30, 30); 
    // IcosahedronGeometry - spheregeomatry와 위치가 조금 다를 수 있음 / spheregeomatry 보다 삼각형이 균일해서 포인트가 균등하게 찍힘
    geometry.rotateY(-Math.PI);
    const mesh = new THREE.Points(geometry, material);

    return mesh;
  }

  const createEarthGlow = () => {
    const material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: {
        uZoom: { value: 1, }
      },
      vertexShader: glowVertexShader,
      fragmentShader: glowFragmentShader,
      side: THREE.BackSide,
      transparent: true,
    });
    const geometry = new THREE.SphereGeometry(1, 40, 40);
    const mesh = new THREE.Mesh(geometry, material);
    
    return mesh;
  }

  const create = () => {
    const earth = createEarth();
    const earthPoints = createEarthPoints();
    const earthGlow = createEarthGlow();
    // const glowNormalHelper = new VertexNormalsHelper(earthGlow, 0.1); 
    // 수직점의 방향으로 정점이 어느 방향을 향해 있는지 알 수 있음 
    // -> 특정 좌표에서 해당 메쉬로 빛을 쏴서 빛의 벡터 정보와 mesh의 노멀값을 비교해 해당 정점에 속한 애의 밝기 조절을 함 
    // -> 이런 과정을 "내적" : 두 벡터의 방향이 얼마나 일치하는지 알기 / 빛이 물체에 비치는 정도를 구할때도 사용

    scene.add(earth, earthPoints, earthGlow);

    return {
      earthGlow
    }
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

  const draw = (obj) => {
    const {earthGlow} = obj;

    controls.update();
    renderer.render(scene, camera);

    earthGlow.material.uniforms.uZoom.value = controls.target.distanceTo(controls.object.position);

    requestAnimationFrame(() => {
      draw(obj);
    });
  };

  const initialize = () => {
    const obj = create();
    addEvent();
    resize();
    draw(obj);
  };

  initialize();
}
