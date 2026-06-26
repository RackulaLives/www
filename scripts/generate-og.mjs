// Rasterise public/og-image.svg → public/og-image.png at 1200×630.
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('public/og-image.svg', 'utf-8');
const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
const png = resvg.render().asPng();
writeFileSync('public/og-image.png', png);
console.log('wrote public/og-image.png (1200×630)');