import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const inputDir = path.join(__dirname, 'src/assets/*.png');
  const outputDir = path.join(__dirname, 'src/assets/webp');
  const files = await imagemin([inputDir], {
    destination: outputDir,
    plugins: [
      imageminWebp({ quality: 80 })
    ]
  });
  console.log(`Converted ${files.length} PNGs to WebP in ${outputDir}`);
})(); 