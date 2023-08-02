uniform sampler2D uTexture;

varying vec2 vUv;
varying float vDistance;

// 포인트에서 멀어질수록 프림처리 되도록 하는 함수
float circle (vec2 coord, float r) {
    float fromCenter = length(coord - 0.5); // gl_PointCoord : 포인트 조각 내에 좌표
    // float strength = 1.0 - step(0.3, fromCenter); // 0.3보다 작으면 값이 0이 되도록
    float strength = r / fromCenter - r * 2.0; // 도트의 중앙색은 또렷하고, 도트 외부는 흐려지게 처리__ fromCenter의 최대값이 0.5니까, 0.01/0.5 = 0.02 == strength의 최소 값 - 최소 값이 0이 될 수 있도록 - 0.02

    return strength;
}

void main()
{
    vec4 map = texture2D(uTexture, vUv);
    vec3 col = 1.0 - map.rgb;

    float strength = circle(gl_PointCoord, 0.01);
    float alpha = col.r * strength * vDistance;

    vec3 greenColor = vec3(0.0, 1.0, 0.0);

    vec3 finalCol = greenColor;
    finalCol.g += map.r * 2.0; 

    gl_FragColor = vec4(greenColor, alpha);
}