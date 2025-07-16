const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const path = require('path');

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