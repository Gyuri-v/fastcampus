uniform sampler2D uTexture;

in float vRandomPosition;
in vec2 vUv; // vertexshader 의 uv 값을 가져옴 - uv에 텍스쳐를 맵핑하기 위해서

out vec4 myFragColor;

void main () {
  vec4 tex = texture2D(uTexture, vUv);

  myFragColor = tex * vRandomPosition;
}