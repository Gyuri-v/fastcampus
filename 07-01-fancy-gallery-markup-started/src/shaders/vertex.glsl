uniform float uTime;
uniform float uHover;

varying vec2 vUv;

void main()
{
    vec2 toCenter = uv - 0.5; // vUv = 0~1 니까 0~0.5사이의 값이 들어감 -> 아래 [dist * 20.0]는 *20=0~10 을 해서 그래프 파동이 많아지게끔
    float dist = length(toCenter);
    float dir = dot(toCenter, vec2(1.0, 1.0)); // 이미지의 질감을 추가 - dot : toCenter와 (1.0, 1.0)사이의 내적을 구해보는 것(자연스러운 웨이브를 위해) = 빛으로부터 특정 정점의 방향이 얼마나 일치하는지 = 방향에 따른 질감
    float strength = 2.5;

    float wave = sin(dist * 20.0 - uTime * 5.0); // z값만 변경을 주기 위해, vec2 -> float 로 변경
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += wave * dist * dir * strength * uHover;
    
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    vUv = uv;
}