// 大圆角卡的静态星空：1200 × 360 的画布上伪随机撒点（每次构建都一样、不成网格）。
// 深色用小星点，浅色用四角形的细小闪光，由样式按主题切换。全部静止。
export const GLINT = "M0-1C.1-.1.1-.1 1 0C.1.1.1.1 0 1C-.1.1-.1.1-1 0C-.1-.1-.1-.1 0-1Z";

export function bannerSky(seed = 3112026) {
  let h = seed;
  const rnd = () => (h = (Math.imul(h, 1103515245) + 12345) >>> 0) / 2 ** 32;
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  while (dots.length < 90) {
    const x = +(rnd() * 1200).toFixed(1), y = +(rnd() * 360).toFixed(1);
    if (rnd() < 0.05) dots.push({ x, y, r: 3.8, o: 0.08 }, { x, y, r: 1.2, o: 0.9 });
    else dots.push({ x, y, r: +(0.5 + rnd() * 0.6).toFixed(2), o: +(0.25 + rnd() * 0.45).toFixed(2) });
  }
  const glints = Array.from({ length: 12 }, () => ({
    x: +(rnd() * 1200).toFixed(1),
    y: +(24 + rnd() * 260).toFixed(1),
    s: +(3 + rnd() * 4).toFixed(1),
    o: +(0.45 + rnd() * 0.4).toFixed(2),
  }));
  return { dots, glints };
}
