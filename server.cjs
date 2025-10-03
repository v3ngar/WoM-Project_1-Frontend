// server.cjs
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Servera statik från repo-roten (ändra om dina filer ligger i en undermapp)
const staticRoot = __dirname;
app.use(express.static(staticRoot, { extensions: ['html'] }));

// Om login.html ska vara landningssida:
app.get('/', (_req, res) => res.sendFile(path.join(staticRoot, 'login.html')));

// Hälsa
app.get('/healthz', (_req, res) => res.json({ ok: true, service: 'frontend' }));

app.listen(PORT, () => console.log(`Frontend listening on ${PORT}`));
