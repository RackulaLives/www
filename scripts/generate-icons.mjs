// Rasterise the Rackula mark to PNG icons (apple-touch 180, favicon 32, favicon 16).
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 128 128">
  <rect width="128" height="128" fill="#282A36"/>
  <g transform="translate(32 22) scale(1.78)">
    <path d="M0 0 L14 0 L18 6 L22 0 L36 0 L36 54 L0 54 Z" fill="#BD93F9"/>
    <rect x="5" y="10" width="26" height="10" fill="#282A36"/>
    <rect x="5" y="22" width="26" height="10" fill="#282A36"/>
    <rect x="5" y="34" width="26" height="10" fill="#282A36"/>
  </g>
</svg>`;

function render(size, out) {
  const resvg = new Resvg(SVG, { fitTo: { mode: 'width', value: size } });
  const png = resvg.render().asPng();
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, png);
  console.log(`wrote ${out} (${size}×${size})`);
}

render(180, join('public', 'apple-touch-icon.png'));
render(32,  join('public', 'favicon-32.png'));
render(16,  join('public', 'favicon-16.png'));