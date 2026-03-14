# seo-favicon-generator

Small Node.js utility for generating favicon and app-icon assets from a single source image.

## What it does

The script reads:

```text
input/logo.png
```

And generates into:

```text
output/
```

It creates:

- favicon PNG files in multiple sizes
- Android icon PNG files
- Apple touch icon PNG files
- Microsoft tile PNG files
- `favicon.ico`
- `head-metadata.html`
- `manifest.webmanifest`

## Tech stack

- Node.js
- [sharp](https://www.npmjs.com/package/sharp)

## Project structure

```text
seo-favicon-generator/
├─ input/
│  └─ logo.png
├─ output/
│  ├─ favicon.ico
│  ├─ head-metadata.html
│  ├─ manifest.webmanifest
│  └─ generated png files...
├─ generate-icons.js
├─ package.json
└─ README.md
```

## Requirements

- Node.js installed
- A source image at `input/logo.png`

## Install

```bash
npm install
```

## Run

```bash
node generate-icons.js
```

## Output files

### Favicon PNG files

- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-36x36.png`
- `favicon-48x48.png`
- `favicon-57x57.png`
- `favicon-60x60.png`
- `favicon-70x70.png`
- `favicon-72x72.png`
- `favicon-76x76.png`
- `favicon-96x96.png`
- `favicon-114x114.png`
- `favicon-120x120.png`
- `favicon-144x144.png`
- `favicon-150x150.png`
- `favicon-152x152.png`
- `favicon-180x180.png`
- `favicon-192x192.png`
- `favicon-310x310.png`
- `favicon.ico`

### Android icons

- `android-icon-36x36.png`
- `android-icon-48x48.png`
- `android-icon-72x72.png`
- `android-icon-96x96.png`
- `android-icon-144x144.png`
- `android-icon-192x192.png`

### Apple icons

- `apple-icon-57x57.png`
- `apple-icon-60x60.png`
- `apple-icon-72x72.png`
- `apple-icon-76x76.png`
- `apple-icon-114x114.png`
- `apple-icon-120x120.png`
- `apple-icon-144x144.png`
- `apple-icon-152x152.png`
- `apple-icon-180x180.png`
- `apple-icon-precomposed.png`
- `apple-icon.png`

### Microsoft icons

- `ms-icon-70x70.png`
- `ms-icon-144x144.png`
- `ms-icon-150x150.png`
- `ms-icon-310x310.png`

### Extra generated files

- `head-metadata.html`
- `manifest.webmanifest`

## Generated HTML metadata

The script creates:

```text
output/head-metadata.html
```

This file contains ready-to-copy tags such as:

- favicon links
- apple touch icon links
- manifest link
- Microsoft tile meta tags
- theme color meta tag

The generated paths are local filenames, for example:

```html
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
```

## Generated web manifest

The script creates:

```text
output/manifest.webmanifest
```

It contains:

- app name
- short name
- theme color
- background color
- display mode
- scope
- start URL
- icon list using generated `favicon-<size>.png` files

Current default manifest values:

- `name`: `Example`
- `short_name`: `eg`
- `theme_color`: `#1ab3b9`
- `background_color`: `#ffffff`

## How the script works

1. Reads `input/logo.png`
2. Creates `output/` if missing
3. Resizes the image into all configured PNG sizes
4. Builds `favicon.ico`
5. Writes `head-metadata.html`
6. Writes `manifest.webmanifest`

## Customization

Edit constants at the top of [generate-icons.js](c:\Users\DELL\Desktop\test\seo-favicon-generator\generate-icons.js) to change:

- manifest app name
- manifest short name
- theme color
- background color
- output filenames

## Notes

- `apple-icon.png` and `apple-icon-precomposed.png` are generated without an explicit size in the filename, so they are written from the original source image dimensions.
- `favicon.ico` is generated from a resized 32x32 PNG buffer.
- If `input/logo.png` is missing, the script will fail for the image outputs.

## Quick start

```bash
cd seo-favicon-generator
npm install
node generate-icons.js
```
