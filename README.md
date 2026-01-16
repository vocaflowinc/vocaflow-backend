# VocaFlow Backend

Secure proxy server for NVIDIA NIM API requests.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your NVIDIA API credentials to `.env`

## Run

Development:
```bash
npm start
```

Production with PM2:
```bash
pm2 start ecosystem.config.json
```

## Deploy to Cloudflare Tunnel

Configure tunnel to point to `localhost:3847` with domain `vocaflow.qzz.io`

## API

`POST /api/nvidia` - Proxies requests to NVIDIA NIM API

Example:
```javascript
fetch('https://vocaflow.qzz.io/api/nvidia', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    messages: [{ role: "user", content: "Hello" }]
  })
})
```
