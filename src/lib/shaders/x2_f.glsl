varying vec3 vUv;

vec3 paintCircle(vec2 uv, vec2 center, float rad, float width) {

  vec2 diff = center - uv;
  float len = length(diff);

  float circle = smoothstep(rad - width, rad, len) - smoothstep(rad, rad + width, len);
  return vec3(circle);
}

void main() {

  // vec3 color;
  // float radius = 4.;
  // vec2 center = vec2(0.5);

  // vec2 uv = vUv.xy;

  // color = paintCircle(uv, center, radius, 0.2);
  // color *= vec3(1., 0., 0.);

  // color += paintCircle(uv, center, radius, 0.1) * 0.7;
  // // gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
  // float alpha = color.x;
  // gl_FragColor = vec4(color, alpha);

  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}