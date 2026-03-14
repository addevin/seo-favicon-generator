const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputPath = './input/logo.png';
const outputDir = './output';
const assetBasePath = '.';
const themeColor = '#1ab3b9';
const backgroundColor = '#ffffff';
const manifestName = 'Example';
const manifestShortName = 'eg';

const outputFiles = [
  'android-icon-36x36.png',
  'android-icon-48x48.png',
  'android-icon-72x72.png',
  'android-icon-96x96.png',
  'android-icon-144x144.png',
  'android-icon-192x192.png',
  'apple-icon-57x57.png',
  'apple-icon-60x60.png',
  'apple-icon-72x72.png',
  'apple-icon-76x76.png',
  'apple-icon-114x114.png',
  'apple-icon-120x120.png',
  'apple-icon-144x144.png',
  'apple-icon-152x152.png',
  'apple-icon-180x180.png',
  'apple-icon-precomposed.png',
  'apple-icon.png',
  'favicon-16x16.png',
  'favicon-36x36.png',
  'favicon-48x48.png',
  'favicon-57x57.png',
  'favicon-60x60.png',
  'favicon-70x70.png',
  'favicon-72x72.png',
  'favicon-76x76.png',
  'favicon-96x96.png',
  'favicon-114x114.png',
  'favicon-120x120.png',
  'favicon-144x144.png',
  'favicon-150x150.png',
  'favicon-152x152.png',
  'favicon-180x180.png',
  'favicon-192x192.png',
  'favicon-310x310.png',
  'favicon-32x32.png',
  'ms-icon-70x70.png',
  'ms-icon-144x144.png',
  'ms-icon-150x150.png',
  'ms-icon-310x310.png',
  'favicon.ico',
];

const manifestIcons = [
  { name: 'favicon-16x16.png', sizes: '16x16' },
  { name: 'favicon-32x32.png', sizes: '32x32' },
  { name: 'favicon-36x36.png', sizes: '36x36', density: '0.75' },
  { name: 'favicon-48x48.png', sizes: '48x48', density: '1.0' },
  { name: 'favicon-57x57.png', sizes: '57x57' },
  { name: 'favicon-60x60.png', sizes: '60x60' },
  { name: 'favicon-70x70.png', sizes: '70x70' },
  { name: 'favicon-72x72.png', sizes: '72x72', density: '1.5' },
  { name: 'favicon-76x76.png', sizes: '76x76' },
  { name: 'favicon-96x96.png', sizes: '96x96', density: '2.0' },
  { name: 'favicon-114x114.png', sizes: '114x114' },
  { name: 'favicon-120x120.png', sizes: '120x120' },
  { name: 'favicon-144x144.png', sizes: '144x144', density: '3.0' },
  { name: 'favicon-150x150.png', sizes: '150x150' },
  { name: 'favicon-152x152.png', sizes: '152x152' },
  { name: 'favicon-180x180.png', sizes: '180x180' },
  { name: 'favicon-192x192.png', sizes: '192x192', density: '4.0' },
  { name: 'favicon-310x310.png', sizes: '310x310' },
];

const headLinks = [
  '<link rel="icon" type="image/x-icon" href="favicon.ico" />',
  '<link rel="manifest" href="/manifest.webmanifest" />',
  '<link rel="apple-touch-icon" sizes="57x57" href="apple-icon-57x57.png" />',
  '<link rel="apple-touch-icon" sizes="60x60" href="apple-icon-60x60.png" />',
  '<link rel="apple-touch-icon" sizes="72x72" href="apple-icon-72x72.png" />',
  '<link rel="apple-touch-icon" sizes="76x76" href="apple-icon-76x76.png" />',
  '<link rel="apple-touch-icon" sizes="114x114" href="apple-icon-114x114.png" />',
  '<link rel="apple-touch-icon" sizes="120x120" href="apple-icon-120x120.png" />',
  '<link rel="apple-touch-icon" sizes="144x144" href="apple-icon-144x144.png" />',
  '<link rel="apple-touch-icon" sizes="152x152" href="apple-icon-152x152.png" />',
  '<link rel="apple-touch-icon" sizes="180x180" href="apple-icon-180x180.png" />',
  '<link rel="icon" type="image/png" sizes="192x192" href="android-icon-192x192.png" />',
  '<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />',
  '<link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png" />',
  '<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />',
  `<meta name="msapplication-TileColor" content="${themeColor}" />`,
  '<meta name="msapplication-TileImage" content="ms-icon-144x144.png" />',
  `<meta name="theme-color" content="${themeColor}" />`,
];

function ensureOutputDir() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
}

function parseSize(filename) {
  const match = filename.match(/(\d+)x(\d+)/);
  if (match) {
    return { width: Number(match[1]), height: Number(match[2]) };
  }
  return null;
}

function createIcoFromPng(pngBuffer) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

async function writeImage(name) {
  const outputPath = path.join(outputDir, name);

  if (name === 'favicon.ico') {
    const pngBuffer = await sharp(inputPath).resize(32, 32).png().toBuffer();
    fs.writeFileSync(outputPath, createIcoFromPng(pngBuffer));
    console.log(`Created ${name}`);
    return;
  }

  const size = parseSize(name);
  const image = sharp(inputPath);

  if (size) {
    await image.resize(size.width, size.height).png().toFile(outputPath);
  } else {
    await image.png().toFile(outputPath);
  }

  console.log(`Created ${name}`);
}

function writeMetadataHtml() {
  const metadataPath = path.join(outputDir, 'head-metadata.html');
  const html = `${headLinks.join('\n')}\n`;
  fs.writeFileSync(metadataPath, html);
  console.log('Created head-metadata.html');
}

function writeManifest() {
  const manifestPath = path.join(outputDir, 'manifest.webmanifest');
  const manifest = {
    name: manifestName,
    short_name: manifestShortName,
    theme_color: themeColor,
    background_color: backgroundColor,
    display: 'standalone',
    scope: './',
    start_url: './',
    icons: manifestIcons.map((icon) => ({
      src: `${assetBasePath}/${icon.name}`.replace('./', ''),
      sizes: icon.sizes,
      type: 'image/png',
      density: icon.density,
    })),
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Created manifest.webmanifest');
}

async function main() {
  ensureOutputDir();

  for (const name of outputFiles) {
    try {
      await writeImage(name);
    } catch (err) {
      console.error(`Error creating ${name}: ${err.message}`);
    }
  }

  writeMetadataHtml();
  writeManifest();
}

main().catch((err) => {
  console.error(`Build failed: ${err.message}`);
  process.exitCode = 1;
});
