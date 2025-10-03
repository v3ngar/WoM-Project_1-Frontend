// server.js (ESM, funkar med "type":"module")
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servera alla dina .html/.css/.js-buntar statiskt från repo-roten
app.use(express.static(__dirname, { extensions: ['html'] }));

// Om login.html ska vara startsida:
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'login.html')));

// Hälsoendpoint
app.get('/healthz', (_req, res) => res.json({ ok: true, service: 'frontend' }));

app.listen(PORT, () => console.log(`Frontend listening on ${PORT}`));
