# Webbtjänster och molnteknologi (2025-2026) Projekt 1
Jakob Hahnsson & Felix Lemström

## Arbetsfördelning

### Backend:
- Teknik: 	Express, Prisma, Bcrypt, Server, MongoDB, Autentisering
- Ansvarig:	Jakob

### Frontend:
- Teknik: 	Node.js, JWT, Design, Frontend
- Ansvarig: 	Jakob, Felix

### Deployment:
- Teknik: 	Docker deployment, Hosting, Git
- Ansvarig: 	Felix

## Reflektion

### Backend

Servern baserar sig direkt på lektionsexempel. Servern fungerar bra som den är, men upplevs ganska knepig att utveckla vidare ifall man så vill. Prisma är tacksamt då det fungerar, men otacksamt då det inte gör det. 

Vi använder oss av MongoDB som databas. Databasintegrationen har fungerat bra och inte orsakat några större problem.

Kursens innehåll och utbildningssätt är mycket bra och problem vi haft grundar sig på våra egna förmågor.

### Frontend

Node.js är flexibelt och har mycket dokumentation. Vi har tagit inspiration av AI-verktyg som ChatGPT och Copilot inom projektbeskrivningens anvisningar. Vi använder Node.js, för att kommunicera med servern, jQuery.UI för Drag & Drop funktionalitet och vanilla JS för restliga operationer. 

Vi är medvetna om att all krav i projektbeskrivningens inte uppfylls i projektet, men de funktioner som finns fungerar bra.

### Deployment

Delade upp allt i tre separata repon och containers: login-api, notes-api och frontend. Byggen skedde med Docker och deployment via Rahti (OpenShift). Varje tjänst fick egen Dockerfile, Service (ClusterIP) och Route. Vi exponerade 8080 i containrarna och lade till /healthz för snabb koll.

#### Miljö/Secrets

Databas-URL och JWT_SECRET sattes som Secrets och mountades som env vars i deploymenten.

Prisma + Mongo fungerade när rätt *.env* fanns. Saknade värden gav 500/timeout direkt.

#### Det som strulade

CORS mellan Arcadas server och Rahti gav preflight-fel. Vi provade både cors() och egen middleware. Slutlig lösning: anropa API:erna med absoluta URL:er och hosta frontenden i samma kluster. Detta visade sig också inte riktigt gå för sig. Det utreds som bäst och bör fungera till Projekt 2**.


Vid skrivande stund har vi båda API:na live och fungerande. Frontenden hostas men är inte användbar.

#### Det som var lätt

- Att få upp containrar lokalt med Docker.
- Att separera repon och bygga små, tydliga images.
- Deploy till Rahti

#### Det som var svårt

- CORS i kombination med extern frontend.
- OpenShift-kopplingarna (Route ↔ Service ↔ Pod), speciellt portnamn och selectors.
- Felsökning när fel bild eller gammal deployment låg bakom en Route.

#### Lärdomar

- Frontend shouldn't backend
- Läs pod-loggar och byggloggar först; 90% av problemen syns där.

---
**Garanterar ingenting