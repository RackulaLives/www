// Rasterise the Rackula mark to PNG icons (apple-touch 180, favicon 32, favicon 16).
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

// Coffin-taper mark (56×80) centred on a 128 canvas. Slots are punched out
// (fill-rule evenodd) so they show the Dracula background through.
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 128 128">
  <rect width="128" height="128" fill="#282A36"/>
  <g transform="translate(30.4 16) scale(1.2)">
    <path d="M1.5 0Q0 0 0 1.5L0 16.5L2.6 77.5Q2.6 80 5.1 80L50.9 80Q53.4 80 53.4 77.5L56 16.5L56 1.5Q56 0 54.5 0L39.5 0Q38.2 0 37 2.6L28 17.8L19 2.6Q17.8 0 16.5 0ZM7.6 21.5h40.8q2 0 2 2v9q0 2 -2 2h-40.8q-2 0 -2 -2v-9q0 -2 2 -2ZM9.4 40.5h37.2q2 0 2 2v9q0 2 -2 2h-37.2q-2 0 -2 -2v-9q0 -2 2 -2ZM11.2 59.5h33.6q2 0 2 2v9q0 2 -2 2h-33.6q-2 0 -2 -2v-9q0 -2 2 -2Z" fill="#BD93F9" fill-rule="evenodd"/>
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