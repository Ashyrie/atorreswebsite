import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORIGINALS_DIR = path.join(__dirname, '../src/assets/originals');
const OUTPUT_DIR = path.join(__dirname, '../src/assets');
const WATERMARK_TEXT = 'AILENE R. TORRES';

async function watermarkPdf(fileName) {
  const inputPath = path.join(ORIGINALS_DIR, fileName);
  const outputPath = path.join(OUTPUT_DIR, fileName);

  if (!fs.existsSync(inputPath)) {
    console.warn(`File not found: ${inputPath}`);
    return;
  }

  console.log(`Processing: ${fileName}...`);
  const existingPdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    
    // Calculate sizing based on page size to keep watermark proportional
    const baseFontSize = Math.min(width, height) * 0.08; // Proportional sizing
    const textWidth = helveticaBold.widthOfTextAtSize(WATERMARK_TEXT, baseFontSize);
    
    // Calculate starting position to center the diagonal text
    const angleRad = Math.PI / 4; // 45 degrees
    const x = (width - textWidth * Math.cos(angleRad)) / 2;
    const y = (height - textWidth * Math.sin(angleRad)) / 2;

    page.drawText(WATERMARK_TEXT, {
      x: x,
      y: y,
      size: baseFontSize,
      font: helveticaBold,
      color: rgb(0.3, 0.35, 0.45), // Slate gray
      opacity: 0.12, // Transparent enough to be readable, opaque enough to see clearly
      rotate: degrees(45),
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Saved watermarked PDF to: ${outputPath}`);
}

async function run() {
  try {
    if (!fs.existsSync(ORIGINALS_DIR)) {
      console.error(`Originals directory not found: ${ORIGINALS_DIR}`);
      process.exit(1);
    }
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    const files = fs.readdirSync(ORIGINALS_DIR).filter(file => file.endsWith('.pdf'));
    for (const file of files) {
      await watermarkPdf(file);
    }
    console.log('Watermarking complete!');
  } catch (error) {
    console.error('Error watermarking PDFs:', error);
    process.exit(1);
  }
}

run();
