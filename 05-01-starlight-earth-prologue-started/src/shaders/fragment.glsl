uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec4 map = texture2D(uTexture, vUv);
    vec3 col = 1.0 - map.rgb;
    float alpha = col.r;

    // if ( col.r <= 0.8 ) {
    //     discard; 
    // } 
    // 정밀하지 않음. r이 회색인 부분도 있어서
    // 조건문도 계속 계산해야하므로 col.r 을 사용

    vec3 greenColor = vec3(0.0, 1.0, 0.0);
    col = greenColor;

    gl_FragColor = vec4(col, alpha);
}