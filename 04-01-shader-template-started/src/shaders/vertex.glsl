uniform mat4 projectionMatrix; // projectionMatrix: 3D 장면이 2D 뷰포트에 투영되는 방식을 제어하는데 사용, 2D의 클립공간 좌표를 지정 // 카메라 개체에서 넘겨주는 데이터로 uniforms 에서 가져올 수 있음
uniform mat4 viewMatrix;       // viewMatrix : 카메라의 위치, 회전, 종횡비, 어디까지 포착할것인지에 대한 정보
uniform mat4 modelMatrix;      // modelMatrix : mesh의 위치, 회전, transform 정보들
// uniform mat4 modelViewMatrix;  // = viewMatrix * modelMatrix;

attribute vec3 position; // geometry의 position 정보

void main() {
  // gl_Position : 클립공간에서 정점의 위치를 지정하는 정점셰이더의 특수 전역변수
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0); // matrix 곱할땐 순서가 중요
}