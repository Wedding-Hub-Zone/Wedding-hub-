import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';
import {defineConfig} from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatically download the audio file at build time to prevent CORS/hotlink protection blocks
function downloadAudio() {
  const publicDir = path.resolve(__dirname, 'public');
  const audioDir = path.join(publicDir, 'audio');
  
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const dest = path.join(audioDir, 'jane-tamanna-jane-ada.mp3');
  const assetsAudioDir = path.join(publicDir, 'assets', 'audio');
  const fallbackDest = path.join(assetsAudioDir, 'wedding-theme.mp3');

  const ensureBackup = () => {
    if (!fs.existsSync(assetsAudioDir)) {
      fs.mkdirSync(assetsAudioDir, { recursive: true });
    }
    if (fs.existsSync(dest)) {
      try {
        fs.copyFileSync(dest, fallbackDest);
        console.log('Symmetrically mirrored audio to public/assets/audio/wedding-theme.mp3');
      } catch (err) {
        console.error('Error mirroring audio:', err);
      }
    }
  };
  
  // If file exists and is reasonably large (e.g. > 100KB), skip download to save time
  if (fs.existsSync(dest) && fs.statSync(dest).size > 100000) {
    console.log('Audio file already exists and is valid. Skipping download.');
    ensureBackup();
    return;
  }

  // Symmetrically rename the old public/jaane-tamanna.mp3 if it exists and new dest doesn't
  const oldDest = path.join(publicDir, 'jaane-tamanna.mp3');
  if (fs.existsSync(oldDest) && !fs.existsSync(dest)) {
    console.log('Renaming old public audio file to the new path...');
    fs.renameSync(oldDest, dest);
    ensureBackup();
    return;
  }

  console.log('Downloading background audio...');
  const file = fs.createWriteStream(dest);
  
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'audio/mpeg, */*'
    }
  };

  const url = 'https://www.mfiles.co.uk/mp3-downloads/pachelbel-canon-in-d.mp3';

  const download = (targetUrl: string) => {
    https.get(targetUrl, options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          download(redirectUrl);
          return;
        }
      }
      
      if (response.statusCode !== 200) {
        console.error(`Failed to download audio. Status: ${response.statusCode}`);
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Audio download completed successfully!');
        ensureBackup();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the incomplete file on error
      console.error('Error downloading audio:', err.message);
    });
  };

  download(url);
}

// Trigger download
try {
  downloadAudio();
} catch (e) {
  console.error('Error initiating audio download:', e);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
