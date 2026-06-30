import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const audioDir = path.join(publicDir, 'audio');
const dest = path.join(audioDir, 'jane-tamanna-jane-ada.mp3');

const assetsAudioDir = path.join(publicDir, 'assets', 'audio');
const fallbackDest = path.join(assetsAudioDir, 'wedding-theme.mp3');

function run() {
  console.log('Ensuring directories...');
  if (!fs.existsSync(assetsAudioDir)) {
    fs.mkdirSync(assetsAudioDir, { recursive: true });
  }

  if (fs.existsSync(dest)) {
    console.log(`Source audio found at ${dest}`);
    try {
      fs.copyFileSync(dest, fallbackDest);
      console.log(`Successfully mirrored audio to ${fallbackDest}`);
    } catch (err) {
      console.error('Error copying file:', err);
    }
  } else {
    console.log(`Source audio NOT found at ${dest}. Checking if we can copy jaane-tamanna.mp3 from public root...`);
    const rootSrc = path.join(publicDir, 'jaane-tamanna.mp3');
    if (fs.existsSync(rootSrc)) {
      try {
        fs.copyFileSync(rootSrc, fallbackDest);
        console.log(`Successfully copied ${rootSrc} to ${fallbackDest}`);
        
        // Also copy to audioDir
        if (!fs.existsSync(audioDir)) {
          fs.mkdirSync(audioDir, { recursive: true });
        }
        fs.copyFileSync(rootSrc, dest);
        console.log(`Successfully copied ${rootSrc} to ${dest}`);
      } catch (err) {
        console.error('Error copying root source file:', err);
      }
    } else {
      console.error('No source audio found anywhere!');
    }
  }
}

run();
