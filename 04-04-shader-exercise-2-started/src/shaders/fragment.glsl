precision mediump float;

varying vec2 vUv;

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
    float x = vUv.x * 2.0;
    float y = vUv.y;

    vec3 col = vec3(x * x );
    vec3 green = vec3(0.0, 1.0, 0.0);

    if ( x * x <= y && x * x >= y - 0.005 ) {
        col = green;
    }

    gl_FragColor = vec4(col, 1.0);
}