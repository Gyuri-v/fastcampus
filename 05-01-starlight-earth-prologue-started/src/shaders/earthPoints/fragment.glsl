uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    float fromCenter = length(gl_PointCoord.xy - 0.5); // gl_PointCoord : 포인트 조각 내에 좌표
    // float strength = 1.0 - step(0.3, fromCenter); // 0.3보다 작으면 값이 0이 되도록
    float strength = 0.01 / fromCenter - 0.02; // 도트의 중앙색은 또렷하고, 도트 외부는 흐려지게 처리__ fromCenter의 최대값이 0.5니까, 0.01/0.5 = 0.02 == strength의 최소 값 - 최소 값이 0이 될 수 있도록 - 0.02

    vec4 map = texture2D(uTexture, vUv);
    vec3 col = 1.0 - map.rgb;
    float alpha = col.r * strength; // strength가 0일때는 alpha가 0이 되어 투명해짐 - 가운데만 투명인 -> strength를 1.0 - step(~)으로 바꿔줘서 가운데만 초록색인

    float x = fract(vUv.x * 100.0);
    float y = fract(vUv.y * 100.0);

    float dist = length(vec2(x, y) - 0.5); 

    vec3 greenColor = vec3(0.0, 1.0, 0.0);

    vec3 finalCol = mix(greenColor, vec3(0.0), step(0.1, dist));
    finalCol.g += map.r * 2.0; 

    gl_FragColor = vec4(greenColor, alpha);
}