precision mediump float;

varying float vRandomPosition;

void main () {
  gl_FragColor = vec4(vRandomPosition, vRandomPosition, 1.0, 1.0);
}