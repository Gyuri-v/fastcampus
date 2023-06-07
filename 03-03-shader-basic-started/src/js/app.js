export default function () {
  // WebGL 시작하기
  const container = document.querySelector('#container');
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;

  container.appendChild(canvas);

  const gl = canvas.getContext('webgl'); // webgl context 가져오기
  
  // vertex shader 만들기
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
    // glsl 언어 : oepn gl shader language
    attribute vec2 position;
    varying vec2 vPosition; // 값 넘겨주기

    void main() {
      vec2 newPosition = (position + 1.0) / 2.0;
      gl_Position = vec4(position, 0.0, 1.0); // 정점 셰이더의 특수한 절약변수, 화면의 픽셀 결정 & position 은 아래에 넘겨준 position 값 // (x, y, z, 거리&배율)-x, y 통합 가능

      vPosition = newPosition;
    }
  `);
  gl.compileShader(vertexShader); // 컴파일 하고

  // fragment shader 만들기
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, `
    precision mediump float; // 부동소수점 데이터를 이용해 정밀도를 지정하는 지시어
    varying vec2 vPosition;

    void main() {
      gl_FragColor = vec4(vPosition, 0.0, 1.0); // rgba
    }
  `);
  gl.compileShader(fragmentShader); // 컴파일 하고

  // vertex shader, fragment shader 하나의 프로그램으로 연결 - 어떤 픽셀에 색을 입힐지
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader); // program에 vertexShader를 붙여서 사용할거야
  gl.attachShader(program, fragmentShader); // program에 fragmentShader 붙여서 사용할거야

  gl.linkProgram(program); // 그 둘을 연결
  gl.useProgram(program); // 이 프로그램을 사용

  // 정점 데이터 선언
  const vertices = new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]);
  const vertexBuffer = gl.createBuffer(); // vertex shader 에 데이터를 넘겨주려면 buffer형태로 넘겨줘야함
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // ARRAY_BUFFER 에 vertexBuffer를 연결해주겠다는 binding 처리
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 버퍼데이터로 vertices 를 static형태로 넘겨주겠다.
  
  // x, y 좌표로 2개씩 묶어서 넘겨주고, 6개의 좌표를 넘겨서 꼭지점 3개 삼각형 2개가 합쳐진 사각형 만들기
  // 정점의 위치를 어떻게 계산할지 정보를 넘겨주기
  const position = gl.getAttribLocation(program, 'position'); // program 의 'position' 이라는 위치 레퍼런스를 가져와서 
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0); // (index: number, size: number[2개씩 넘겨줌], type: number[float=부동소수점형태], normalized: boolean[정규화할건지], stride: number[어떤식의 간격을 줄건지], offset: number[값에서 시작 위치 1이면 두번째 값부터 읽음]);
  gl.enableVertexAttribArray(position) // vertex array 를 사용가능하게 만들어 주겠다.

  gl.drawArrays(gl.TRIANGLES, 0, 6); // 지금까지 입력한 정보들을 기반으로 그림을 그리겠다. - 삼각형을 그리겠다, 0번째부터, 6개의 정점이 있다
}
