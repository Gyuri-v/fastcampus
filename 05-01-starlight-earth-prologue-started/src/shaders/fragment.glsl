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

    float x = vUv.x;
    float y = vUv.y;

    vec3 col1 = vec3(fract(x * 100.0));
    vec3 col2 = vec3(fract(y * 100.0));

    vec3 finalCol = step(0.9, col1) * step(0.9, col2);
    finalCol *= greenColor;

    gl_FragColor = vec4(finalCol, alpha);
}