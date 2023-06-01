export function convertLatlngToPos(pos, radius) {
  const x = Math.cos(pos.lat) * Math.sin(pos.lng) * radius;
  const y = Math.sin(pos.lat) * radius;
  const z = Math.cos(pos.lat) * Math.cos(pos.lng) * radius;

  return {x, y, z};
}

export function getGradientCanvas(startColor, endColor) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.width = 256; // rgb값
  canvas.height = 1;

  const gradient = context.createConicGradient(0, 0, 256, 0);
  gradient.addColorStop(0, startColor); // 시작 색
  gradient.addColorStop(1, endColor); // 끝 색

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 1);

  return canvas;
}