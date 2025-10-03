// server.js
const express = require('express');
const path = require('path');
const app = express();

// Rahti/OpenShift gillar 8080
const PORT = process.env.PORT || 8080;

// *Om* dina filer ligger i repo-roten:
//   set "staticRoot = __dirname"
// Om du lägger dem i en mapp "public/", byt till path.join(__dirname, 'public')
const staticRoot = __dirname;

// Servera statiska filer (.html, .css, .js, bilder)
app.use(express.static(staticRoot, { extensions: ['html'] }));

// Gör login.html till hemsida om du inte har en index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(staticRoot, 'login.html'));
});

// Hälsa
app.get('/healthz', (req, res) => res.json({ ok: true, service: 'frontend' }));

app.listen(PORT, () => {
  console.log(`Frontend listening on ${PORT}`);
});
