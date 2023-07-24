precision mediump float;

varying vec2 vUv;

float smoothy(float edge0, float edge1, float x) {
    float t = clamp((x - 0.3) / (0.7 - 0.3), 0.0, 1.0);

    float strength = t * t * (3.0 - 2.0 * t); 

    return strength;
}

void main()
{
    // 1. 그라데이션
    // float x = vUv.x;
    // float y = vUv.y;

    // float col = x;

    // 2. 대각선 만들기
    // float x = vUv.x;
    // float y = vUv.y;

    // vec3 col = vec3(x);
    // vec3 green = vec3(0.0, 1.0, 0.0);

    // if ( y == x ) {
    // if ( y <= x + 0.1 ) {
    // if ( y + 0.1 >= x ) {
    // if ( y <= x + 0.01 && y + 0.01 >= x ) {
    //     col = green;
    // }

    // 3. 곡선 만들기
    // float x = vUv.x;
    // float y = vUv.y;

    // vec3 col = vec3(x);
    // vec3 green = vec3(0.0, 1.0, 0.0);

    // if ( x * x <= y && x * x >= y - 0.005 ) {
    //     col = green;
    // }

    // 4. 곡선 그라데이션 적용
    // float x = vUv.x * 2.0;
    // float y = vUv.y;

    // vec3 col = vec3(x * x );
    // vec3 green = vec3(0.0, 1.0, 0.0);

    // if ( x * x <= y && x * x >= y - 0.005 ) {
    //     col = green;
    // }

    // 5. step
    // float x = vUv.x;
    // float y = vUv.y;

    // // -- step의 기본 원리
    // // if ( x <= 0.5 ) {
    // //     col = vec3(0.0);
    // // } else {
    // //     col = vec3(1.0);
    // // } -- 

    // float strength = step(0.5, x); // 0.5를 기준으로 x가 작을때는 0을, 아니면 1을 리턴

    // if ( strength == 0.0 ) {
    //     discard; // 색을 버리겠다.
    // }

    // vec3 col = vec3(strength);

    // 6. min, max
    // float x = vUv.x;
    // float y = vUv.y;

    // // float strength = min(0.5, x); // 최소값 0.5
    // float strength = max(0.5, x); // 최대값 0.5

    // vec3 col = vec3(strength);

    // 7. clamp
    // float x = vUv.x;
    // float y = vUv.y;

    // float strength = clamp(x, 0.3, 0.7); // x, x의 하한선, x의 상한선 == min + max

    // vec3 col = vec3(strength);


    // 8. smoothstep
    // float x = vUv.x;
    // float y = vUv.y;

    // // - 검정 0.3 ~ 그라데이션 ~ 0.7 흰색 을 만드는법
    // // float t = clamp((x - 0.3) / (0.7 - 0.3), 0.0, 1.0);

    // // 1) 해당 곡선 : float strength = t;
    // // 2) 부드러운 곡선 : float strength = t * t * (3.0 - 2.0 * t); // 자연스러운 그라데이션
    // // 3) 공식 활용 - 위에 만든 smoothy 와 비슷 
    // float strength = smoothstep(0.3, 0.7, x);

    // vec3 col = vec3(strength);

    // 9. mix
    // float x = vUv.x;
    // float y = vUv.y;
    
    // vec3 green = vec3(0.0, 1.0, 0.0);
    // vec3 blue = vec3(0.0, 0.0, 1.0);
    
    // vec3 col = mix(green, blue, x); // 색 조합
    // mix(1.0, 2.0, 0.0); // 0.0;
    // mix(1.0, 2.0, 0.25); // 1.25;
    // mix(1.0, 2.0, 0.5); // 1.5;

    // 10. pow : 거듭제곱
    // float x = vUv.x;
    // float y = vUv.y;

    // vec3 col = vec3(x);
    // vec3 green = vec3(0.0, 1.0, 0.0);

    // // x * x = pow(x, 2.0);
    // if ( pow(x, 2.0) <= y && pow(x, 2.0) >= y - 0.005 ) {
    //     col = green;
    // }

    // 11. sqrt : 제곱근으로 변환
    // float x = vUv.x;
    // float y = vUv.y;

    // vec3 col = vec3(x);
    // vec3 green = vec3(0.0, 1.0, 0.0);

    // if ( sqrt(pow(x, 1.0)) <= y && sqrt(pow(x, 1.0)) >= y - 0.005 ) {
    //     col = green;
    // }

    // 12. mod : moduler 나머지를 구하는 것
    // // 4 / 3 = 1;
    // // 5 / 3 = 2;

    // float x = vUv.x;
    // float y = vUv.y;

    // vec3 col = vec3(mod(x * 7.0, 1.0)); // x에 곱하는 값 만큼 
    // col = step(0.5, col); // 그라데이션을 없애고 싶다면

    // vec3 green = vec3(0.0, 1.0, 0.0);

    // 13. fract : 숫자의 소수점만 반환
    // float x = vUv.x;
    // float y = vUv.y;

    // // vec3 col = vec3(fract(x * 7.0)); // fract(x * 7.0) == mod(x * 7.0, 1.0)
    // vec3 col = vec3(fract((y - 0.11) * 7.0));
    // vec3 col2 = vec3(fract((x - 0.11) * 7.0));

    // col = 1.0 - step(0.5, col) * step(0.5, col2); 

    // fract(0.4); // 0.4;
    // fract(2.3); // 0.3;
    // fract(5.75); // 0.75;

    // vec3 green = vec3(0.0, 1.0, 0.0);

    // 14. sin, cos
    // float x = vUv.x;
    // float y = vUv.y;

    // vec3 col = vec3(cos(x * 20.0));

    // 15. abs : 숫자의 절대값 반환(양수)
    // abs(-1) = 1;
    // float x = vUv.x;
    // float y = vUv.y;

    // vec3 col = vec3(abs(cos(x * 20.0)));

    // 16. distance : 두 점의 거리를 반환
    // float x = vUv.x;
    // float y = vUv.y;

    // // float dist = distance(y, 0.5);
    // float dist = distance(vec2(x, y), vec2(0.5)); // 원그라데이션
    // dist = step(0.3, dist); // -> 원 도형 만들기

    // vec3 col = vec3(dist);

    // 17. length : vector의 길이를 반환
    float x = vUv.x;
    float y = vUv.y;

    // float dist = length(x - 0.5); 
    float dist = length(vec2(x, y) - 0.5); 
    // dist = step(0.3, dist); 

    vec3 col = vec3(dist);

    // -------
    gl_FragColor = vec4(col, 1.0);
}