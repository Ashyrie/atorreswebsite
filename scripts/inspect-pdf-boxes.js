import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORIGINALS_DIR = path.join(__dirname, '../src/assets/originals');

async function inspect(fileName) {
  const filePath = path.join(ORIGINALS_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`${fileName} not found`);
    return;
  }
  const bytes = fs.readFileSync(filePath);
  const doc = await PDFDocument.load(bytes);
  const pages = doc.getPages();
  console.log(`=== Inspecting ${fileName} ===`);
  pages.forEach((page, i) => {
    const size = page.getSize();
    const mediaBox = page.getMediaBox();
    let cropBox = null;
    try {
      cropBox = page.getCropBox();
    } catch (e) {}
    console.log(`Page ${i + 1}:`);
    console.log(`  Size: width = ${size.width}, height = ${size.height}`);
    console.log(`  MediaBox: x = ${mediaBox.x}, y = ${mediaBox.y}, width = ${mediaBox.width}, height = ${mediaBox.height}`);
    if (cropBox) {
      console.log(`  CropBox: x = ${cropBox.x}, y = ${cropBox.y}, width = ${cropBox.width}, height = ${cropBox.height}`);
    }
  });
}

async function run() {
  await inspect('A.TORRES_CV.pdf');
  await inspect('PLUG-AND-DEFEND-MANUAL.pdf');
}

run();
