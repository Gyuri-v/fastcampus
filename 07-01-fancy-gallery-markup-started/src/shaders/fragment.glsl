uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec2 toCenter = vUv - 0.5; // vUv = 0~1 니까 0~0.5사이의 값이 들어감 -> 아래 [dist * 20.0]는 *20=0~10 을 해서 그래프 파동이 많아지게끔
    float dist = length(toCenter);
    float dir = dot(toCenter, vec2(1.0, 1.0)); // 이미지의 질감을 추가 - dot : toCenter와 (1.0, 1.0)사이의 내적을 구해보는 것(자연스러운 웨이브를 위해) = 빛으로부터 특정 정점의 방향이 얼마나 일치하는지 = 방향에 따른 질감
    float strength = 0.5;

    vec2 wave = vec2(sin(dist * 20.0), cos(dist * 20.0));
    vec2 newUV = vUv + wave * strength * dir * dist; 
    // 1. vUv + wave : newUV 는 vUv 를 기본으로 가지고, + wave 를 해서 파동이 있게 만들어줌
    // 2. vUv + wave * strength : wave의 sin, cos 은 0~1이 아닌 -1~1 사이의 값을 가지게 되므로 *strength 해서 값을 작게처리 - 잘 보기 위해서
    // 3. vUv + wave * strength * dir : 이미지의 질감을 추가 - 방향에 따른 질감 추가
    // 4. vUv + wave * strength * dir * dist: 중심으로부터 거리값이 커지면 효과가 크게 적용되게끔, 웨이브가 퍼져나가게끔

    vec4 tex = texture2D(uTexture, newUV);
    gl_FragColor = tex;
}