uniform float uZoom;

varying vec3 vNormal;

void main () {
  vec3 lightSource = vec3(0.0, 0.0, 1.0); // 3.0, 0, 0 ; 원점 기준으로 3은 오른쪽이니까 오른쪽이로 색이 선명해짐

  float strength = max(1.0, pow(1.0 / (uZoom / 2.0), 5.0));

  float intensity = pow(0.8 - dot(vNormal, lightSource), 5.0) * strength; 
      // pow 함수로 밝은 곳은 더 밝게 흐린곳을 더 흐리게 / 
      // 1.0 - 으로 하면 끝도 너무 선명해서 좀 더 안쪽에서 흐림이 끝나도록 0.8
      // * strengt : 멀리가면 글로우가 선명해지고 가까이가면 사라져서 zoom 값을 받아 적용
  vec3 greenColor = vec3(0.246, 0.623, 0.557);
  
  gl_FragColor = vec4(greenColor, 1.0) * intensity;
}