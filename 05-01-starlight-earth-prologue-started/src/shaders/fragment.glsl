uniform sampler2D uTexture;

varying vec2 vUv;

void main()
{
    vec4 map = texture2D(uTexture, vUv);
    vec3 col = 1.0 - map.rgb;
    float alpha = col.r;

    vec3 greenColor = vec3(0.0, 1.0, 0.0);
    col = greenColor;

    gl_FragColor = vec4(col, alpha);

    float x = fract(vUv.x * 100.0);
    float y = fract(vUv.y * 100.0);

    float dist = length(vec2(x, y) - 0.5); // 0.5에서부터 x,y가 얼마나 먼지

    // vec3 finalCol = step(0.9, col1) * step(0.9, col2);
    vec3 finalCol = mix(greenColor, vec3(0.0), step(0.1, dist));

    gl_FragColor = vec4(finalCol, alpha);
}