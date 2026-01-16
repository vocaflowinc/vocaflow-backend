import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import FormData from 'form-data';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3847;
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

const rateLimits = new Map();
const RATE_LIMIT = 50;
const RATE_WINDOW = 24 * 60 * 60 * 1000;

app.use(cors());
app.use(express.json());

const rateLimit = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const record = rateLimits.get(ip) || { count: 0, reset: now + RATE_WINDOW };
  
  if (now > record.reset) {
    rateLimits.set(ip, { count: 1, reset: now + RATE_WINDOW });
    return next();
  }
  
  if (record.count >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  record.count++;
  rateLimits.set(ip, record);
  next();
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/transcribe', rateLimit, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No audio file' });
  
  try {
    const form = new FormData();
    form.append('file', req.file.buffer, { filename: 'audio.wav', contentType: req.file.mimetype });
    form.append('model', 'nvidia/parakeet-ctc-1.1b-asr');
    form.append('language', 'en');

    const response = await fetch('https://integrate.api.nvidia.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.KEY}`, ...form.getHeaders() },
      body: form
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Transcription failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
