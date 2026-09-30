'use strict';
// Conversão pontual: PNGs das fotos da clínica -> WebP em src/assets/images/servicos/
// Uso: node tools/convert-service-images.cjs <pasta-de-origem>

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = process.argv[2];
const OUT = path.join(__dirname, '..', 'src', 'assets', 'images', 'servicos');

// slug do serviço -> [arquivos de origem aceitos, em ordem de preferência]
const MAP = {
  'implante-dentario': ['Implante dentário em Presidente Epitácio.png'],
  'tratamento-de-canal': ['Tratamento de canal em Presidente Epitácio.png'],
  ortodontia: ['ORTODONTIA EM PRESIDENTE EPITÁCIO.png'],
  'clareamento-dental': ['Clareamento dental em Presidente Epitácio.png'],
  'protese-dentaria': ['Prótese dentária em Presidente Epitácio.png']
};

// hero (largura total, 16:9) e card/og (1200x630)
const VARIANTS = [
  { suffix: '-hero', width: 1672, height: 941, quality: 80 },
  { suffix: '', width: 1200, height: 630, quality: 80 }
];

function findFile(candidates) {
  for (const name of candidates) {
    const p = path.join(SRC, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [slug, candidates] of Object.entries(MAP)) {
    const src = findFile(candidates);
    if (!src) {
      console.log(`  ! ${slug}: origem nao encontrada (${candidates.join(' | ')})`);
      continue;
    }
    for (const v of VARIANTS) {
      const dest = path.join(OUT, `${slug}${v.suffix}.webp`);
      const info = await sharp(src)
        .resize(v.width, v.height, { fit: 'cover', position: 'attention' })
        .webp({ quality: v.quality, effort: 6 })
        .toFile(dest);
      const orig = fs.statSync(src).size;
      console.log(
        `  ok ${path.basename(dest).padEnd(32)} ${info.width}x${info.height}  ` +
          `${(orig / 1024).toFixed(0)} KB -> ${(info.size / 1024).toFixed(0)} KB`
      );
    }
  }
})();