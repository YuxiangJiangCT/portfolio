import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_DIR = path.join(__dirname, '../public/img');
const OUTPUT_DIR = path.join(__dirname, '../public/images/optimized');
const PLACEHOLDER_DIR = path.join(__dirname, '../public/images/placeholders');

const SIZES = {
  thumbnail: 150,
  mobile: 768,
  desktop: 1920,
  original: null
};

const IMAGE_QUALITY = {
  webp: 85,
  png: 90,
  jpeg: 85
};

// Ensure output directories exist
async function ensureDirectories() {
  const dirs = [OUTPUT_DIR, PLACEHOLDER_DIR];

  for (const dir of dirs) {
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (error) {
      console.error(`Error creating directory ${dir}:`, error);
    }
  }
}

// Generate blur placeholder
async function generatePlaceholder(inputPath, outputName) {
  try {
    const placeholderPath = path.join(PLACEHOLDER_DIR, `${outputName}-blur.jpg`);

    await sharp(inputPath)
      .resize(10, 10, { fit: 'inside' })
      .blur(5)
      .jpeg({ quality: 50 })
      .toFile(placeholderPath);

    console.log(`  ✓ Generated placeholder: ${outputName}-blur.jpg`);
    return placeholderPath;
  } catch (error) {
    console.error(`  ✗ Error generating placeholder for ${outputName}:`, error.message);
    return null;
  }
}

// Process single image
async function processImage(inputPath, outputName) {
  console.log(`\nProcessing: ${outputName}`);

  const imageDir = path.join(OUTPUT_DIR, outputName);
  await fs.mkdir(imageDir, { recursive: true });

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

    // Generate placeholder
    await generatePlaceholder(inputPath, outputName);

    // Process each size
    for (const [sizeName, width] of Object.entries(SIZES)) {
      // Skip if original is smaller than target size
      if (width && metadata.width < width) {
        console.log(`  - Skipping ${sizeName} (original is smaller)`);
        continue;
      }

      const resizeOptions = width
        ? { width, withoutEnlargement: true }
        : {};

      // Generate WebP version
      const webpPath = path.join(
        imageDir,
        width ? `${outputName}-${width}w.webp` : `${outputName}-original.webp`
      );

      await sharp(inputPath)
        .resize(resizeOptions)
        .webp({ quality: IMAGE_QUALITY.webp })
        .toFile(webpPath);

      const webpStats = await fs.stat(webpPath);
      const webpSize = (webpStats.size / 1024).toFixed(1);
      console.log(`  ✓ ${sizeName} WebP: ${webpSize}KB`);

      // Generate PNG/JPEG fallback
      const format = metadata.format === 'png' ? 'png' : 'jpeg';
      const fallbackPath = path.join(
        imageDir,
        width ? `${outputName}-${width}w.${format}` : `${outputName}-original.${format}`
      );

      if (format === 'png') {
        await sharp(inputPath)
          .resize(resizeOptions)
          .png({ quality: IMAGE_QUALITY.png, compressionLevel: 9 })
          .toFile(fallbackPath);
      } else {
        await sharp(inputPath)
          .resize(resizeOptions)
          .jpeg({ quality: IMAGE_QUALITY.jpeg, progressive: true })
          .toFile(fallbackPath);
      }

      const fallbackStats = await fs.stat(fallbackPath);
      const fallbackSize = (fallbackStats.size / 1024).toFixed(1);
      console.log(`  ✓ ${sizeName} ${format.toUpperCase()}: ${fallbackSize}KB`);
    }

    return true;
  } catch (error) {
    console.error(`  ✗ Error processing ${outputName}:`, error.message);
    return false;
  }
}

// Process special case: huawei.png (very large file)
async function optimizeHuaweiImage() {
  const inputPath = path.join(INPUT_DIR, 'huawei.png');

  try {
    const metadata = await sharp(inputPath).metadata();
    console.log('\n⚠️  Special processing for huawei.png (4.6MB)');
    console.log(`  Original: ${metadata.width}x${metadata.height}`);

    // Ensure directory exists
    const huaweiDir = path.join(OUTPUT_DIR, 'huawei');
    await fs.mkdir(huaweiDir, { recursive: true });

    // Create heavily optimized versions
    const sizes = [
      { name: 'thumbnail', width: 150 },
      { name: 'mobile', width: 768 },
      { name: 'desktop', width: 1200 }, // Reduced from 1920
      { name: 'large', width: 1600 }
    ];

    for (const size of sizes) {
      const webpPath = path.join(OUTPUT_DIR, 'huawei', `huawei-${size.width}w.webp`);

      await sharp(inputPath)
        .resize({ width: size.width, withoutEnlargement: true })
        .webp({ quality: 80 }) // Lower quality for large file
        .toFile(webpPath);

      const stats = await fs.stat(webpPath);
      const fileSize = (stats.size / 1024).toFixed(1);
      console.log(`  ✓ ${size.name}: ${fileSize}KB`);
    }

    console.log('  ✅ Huawei image optimized successfully');
  } catch (error) {
    console.error('  ✗ Error optimizing huawei.png:', error.message);
  }
}

// Main function
async function main() {
  console.log('🖼️  Starting image optimization...\n');

  await ensureDirectories();

  try {
    // Get all images in input directory
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to process`);

    // Process each image
    let successCount = 0;
    for (const file of imageFiles) {
      const inputPath = path.join(INPUT_DIR, file);
      const outputName = path.parse(file).name;

      // Special handling for huawei.png
      if (file === 'huawei.png') {
        await optimizeHuaweiImage();
        successCount++;
      } else {
        const success = await processImage(inputPath, outputName);
        if (success) successCount++;
      }
    }

    console.log(`\n✅ Optimization complete! ${successCount}/${imageFiles.length} images processed`);

    // Generate manifest file for easy importing
    const manifest = {};
    for (const file of imageFiles) {
      const name = path.parse(file).name;
      manifest[name] = {
        placeholder: `/images/placeholders/${name}-blur.jpg`,
        sizes: {
          thumbnail: `/images/optimized/${name}/${name}-150w`,
          mobile: `/images/optimized/${name}/${name}-768w`,
          desktop: `/images/optimized/${name}/${name}-1920w`
        }
      };
    }

    const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\n📄 Generated image manifest at ${manifestPath}`);

  } catch (error) {
    console.error('Error during optimization:', error);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);