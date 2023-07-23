uniform float uTime;
in float aRandomPosition;

out float vRandomPosition;
out vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += aRandomPosition / 20.0 * sin(uTime);
  // modelPosition.z += sin(uTime + modelPosition.x) / 2.0; // 양탄자처럼 떠다니는 느낌

  vRandomPosition = (aRandomPosition + 1.0) / 2.0;
  vRandomPosition /= uTime * 0.3; // 첨에 흰색처럼 밝았다가 반짝하는 느낌으로 점점 어두워짐

  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * modelPosition; // matrix 곱할땐 순서가 중요
}