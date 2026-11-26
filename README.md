# CS 465: Full Stack Development I - Travlr Getaways

Welcome to the **Travlr Getaways** web application repository for **CS 465 (Full Stack Development I)** at Southern New Hampshire University (SNHU). Over the course of the semester, this project evolves into a full **MEAN stack** (MongoDB, Express, Angular, Node.js) application featuring a customer-facing portal and an administrative single-page application (SPA).

---

## Module Five: Separation of Concerns & RESTful API Refactoring

In this module, database access is fully decoupled from the Express MVC server (`app_server`) and isolated behind the standalone RESTful API layer (`app_api`) mounted at `/api` (case-insensitive, supporting `/API` as well). This separation allows the API to serve multiple clients—the Express Handlebars server, future Angular SPAs, and external HTTP callers such as Postman.

### Objectives & Rubric Criteria Addressed

1. **Separation of Concerns (`app_server` vs. `app_api`):**
   - Removed embedded Mongoose/database models (`app_server/models/`) from the Express server layer so `app_server` has zero direct dependency on Mongoose or MongoDB.
   - Refactored `app_server/controllers/travel.js` to act as an HTTP client that calls `GET /api/trips` via `fetch()` and passes the resulting JSON array (or fallback error message) into `app_server/views/travel.hbs`.
2. **Standardized REST API Routes (`app_api/routes/index.js` & `app.js`):**
   - `GET /api/trips`: Retrieves the full collection of trips as JSON (`200 OK`, or `404` when empty).
   - `GET /api/trips/:tripCode`: Retrieves a matching trip by unique `code` parameter using Mongoose `Trip.find({ code: req.params.tripCode })`.
   - Added JSON error handling in `app.js` so invalid `/api/*` requests return structured JSON payloads with proper HTTP status codes (`404`, `500`) instead of HTML error pages.
3. **API Verification:**
   - Verified `GET /api/trips`, `GET /API/trips`, `GET /api/trips/:tripCode` (`GALR210214`, `DAWR210315`, `CLAR210420`), `404` handling for unknown trip codes and unknown `/api/*` paths, CORS headers, and `/travel` rendering from the live API.

---

## Module Four: Database Integration with MongoDB & Mongoose Schemas

In this module, the Travlr Getaways application transitions from reading local JSON data files to a fully integrated **NoSQL persistence tier** powered by **MongoDB** and the **Mongoose** Object Data Modeling (ODM) library. The application now establishes a persistent database connection lifecycle, enforces schema validation contracts, seeds mock catalog data, exposes RESTful API endpoints delivering JSON payloads, and renders dynamic travel packages to the browser directly from the live database.

### Objectives & Rubric Criteria Addressed

1. **Database Access Module (`app_api/models/db.js` & `app_server/models/db.js`):**
   - Implemented a dedicated JavaScript module utilizing the `mongoose` library to connect to the `travlr` MongoDB database (`mongodb://127.0.0.1:27017/travlr`).
   - Configured robust connection lifecycle event listeners (`connected`, `error`, `disconnected`) providing real-time logging of database health to the console.
   - Built a comprehensive graceful shutdown handler (`gracefulShutdown`) intercepting `SIGUSR2` (nodemon live reloads), `SIGINT` (application termination / Ctrl+C), and `SIGTERM` (container / platform process termination), ensuring socket connections close cleanly without data corruption.
   - Incorporated Windows platform support via Node.js `readline` interface to intercept and emit `SIGINT` signals on Windows command lines.
   - Required database initialization early in the Express application lifecycle within `app.js`.

2. **API Integration & Trip Schema with Validation (`app_api/models/travlr.js`, `app_api/controllers/trips.js`, `app_api/routes/index.js`):**
   - Defined the formal Mongoose schema (`tripSchema`) enforcing strict data validation rules suitable for Travlr Getaways' software specifications:
     - `code`: `String`, `required: true`, `unique: true`, `index: true`, `trim: true` (unique trip code identifier)
     - `name`: `String`, `required: true`, `index: true`, `trim: true` (destination title)
     - `length`: `String`, `required: true`, `trim: true` (trip duration)
     - `start`: `Date`, `required: true` (scheduled departure date)
     - `resort`: `String`, `required: true`, `trim: true` (resort name & rating)
     - `perPerson`: `String`, `required: true`, `trim: true` (package rate per traveler)
     - `image`: `String`, `required: true`, `trim: true` (card image asset filename)
     - `description`: `String`, `required: true` (rich HTML narrative description)
   - Created the RESTful API controller (`app_api/controllers/trips.js`) providing asynchronous query logic:
     - `tripsList`: Queries `Trip.find({}).exec()` and returns all trips as a structured JSON array with HTTP `200 OK` (or `404 Not Found` / `500 Internal Server Error`).
     - `tripsFindByCode`: Queries `Trip.findOne({ 'code': req.params.tripCode }).exec()` to return a single vacation package matching the unique route parameter.
   - Configured the API router (`app_api/routes/index.js`) mapping `GET /api/trips` and `GET /api/trips/:tripCode`.
   - Mounted `/api` in `app.js` with full Cross-Origin Resource Sharing (CORS) headers to support external clients, API testing tools, and Single-Page Applications.

3. **Populate Database (`app_api/models/seed.js`, `data/trips.json`, `trips.json`):**
   - Created a standalone, production-ready seeding utility (`app_api/models/seed.js` and npm script `npm run seed`).
   - Populated the `trips` collection with sample destination packages matching the software specifications:
     - **Gale Reef** (`GALR210214`): Emerald Bay, 3 stars ($799.00)
     - **Dawson’s Reef** (`DAWR210315`): Blue Lagoon, 4 stars ($1,199.00)
     - **Claire’s REEF** (`CLAR210420`): Coral Sands, 5 stars ($1,999.00)
   - Updated root `trips.json` and `data/trips.json` to ensure full compatibility with submission requirements and seedgoose integration.

4. **Live Data Rendering & Customer-Facing Delivery (`app_server/controllers/travel.js`):**
   - Refactored `app_server/controllers/travel.js` from static file system reading (`fs.readFileSync`) to asynchronous Mongoose queries (`await Trip.find({}).exec()`).
   - Verified that customer requests to `http://localhost:3000/travel` pull live destination records directly from MongoDB and compile seamlessly into the Handlebars template (`travel.hbs`).

5. **Testing & Database Inspection:**
   - Validated database loading using the MongoDB Shell (`mongosh`) inspection tool, verifying 3 records in collection `travlr.trips`.
   - Verified JSON API endpoint responses via `curl -i http://localhost:3000/api/trips` and `curl -i http://localhost:3000/api/trips/GALR210214`.
   - Captured visual proof of inspection:
     - `screenshots/Module4_MongoDB_Inspection.png`: Database inspection dashboard displaying `mongosh` queries, collection count, schema validation definitions, and JSON response checks.
     - `screenshots/Module4_Travel_Page_Database_Rendered.png`: Full-page browser screenshot of the live customer-facing travel catalog rendered dynamically from MongoDB.

---

## Module Three: Static HTML to Templates with JSON

In this module, the customer-facing web application was transitioned from static HTML content to dynamic data-driven rendering using **JSON (JavaScript Object Notation)** and the **Handlebars (HBS)** templating engine within an Express Model-View-Controller (MVC) architecture.

### Objectives Achieved
1. **Dynamic JSON Data Layer:**
   - Extracted hardcoded destination trip items from static HTML into a structured JSON dataset (`data/trips.json` and root `trips.json`).
   - Defined structured properties for each dive site/trip package: `name`, `image`, and `description`.
   - Embedded verification indicators within destination descriptions to verify live JSON data ingestion versus legacy static markup.
2. **Controller File System Integration (MVC):**
   - Updated `app_server/controllers/travel.js` to utilize Node.js's built-in file system module (`fs`).
   - Implemented synchronous file reading (`fs.readFileSync`) and parsing (`JSON.parse`) to load `trips.json` into memory.
   - Passed the parsed `trips` array as template context into `res.render('travel', { title: 'Travlr Getaways', trips })`.
3. **Handlebars (HBS) Dynamic Iteration:**
   - Refactored `app_server/views/travel.hbs` to replace redundant static `<li>` cards with the Handlebars `{{#each trips}}` block helper.
   - Bound destination images and titles dynamically using `{{this.image}}` and `{{this.name}}`.
   - Utilized triple-brace expressions (`{{{this.description}}}`) to correctly render formatted multi-paragraph HTML descriptions without entity escaping.
   - Maintained modular page composition via partial includes `{{> header }}` and `{{> footer }}`.
4. **Testing & Verification:**
   - Validated that navigating to `http://localhost:3000/travel` returns HTTP 200 OK.
   - Confirmed full rendering of all trip cards dynamically populated from the JSON data file.
   - Captured full-page verification screenshot saved to `screenshots/Module3_Express_Dynamic_JSON_Travel_Page.png`.

---

## Module Two: Model View Controller (MVC) Routing & Handlebars Templating

In this module, the web application was refactored from serving static HTML pages to a clean **Model-View-Controller (MVC)** architectural pattern using Express routing and the **Handlebars (HBS)** templating engine.

### Objectives Achieved
1. **MVC Architecture Setup:** Created the `app_server` directory structure to encapsulate server-side logic (`controllers/`, `routes/`, `views/`).
2. **Handlebars Templating & Partials:** Isolated reusable fragments (`header.hbs`, `footer.hbs`) and registered them via `hbs.registerPartials`.
3. **Route & Controller Registration:** Wired home (`/`) and travel (`/travel`) routes to their respective controllers.

---

## Module One: Express Framework & Static Shell

In the initial module, the customer-facing web application shell was established using Node.js and the Express framework, serving static HTML content based on the client wireframe.

---

## Project Structure (Module Five)

```text
travlr/
├── .gitignore                   # Ignores node_modules, build artifacts, logs, and OS files
├── README.md                    # Project documentation and setup guide
├── app.js                       # Express app configuration, Mongoose connection, JSON API error handling, and routing
├── bin/
│   └── www                      # Server entry point and HTTP port listener (port 3000)
├── data/
│   └── trips.json               # Seed dataset containing validated trip package records
├── trips.json                   # Root dataset copy for submission package compatibility
├── seed.js                      # Root convenience runner for database seeding
├── package.json                 # Project dependencies, scripts (start, seed), and seedgoose config
├── package-lock.json
├── app_api/                     # RESTful API Architecture
│   ├── controllers/             # API Controllers returning JSON payloads
│   │   └── trips.js             # tripsList (GET /api/trips) & tripsFindByCode (GET /api/trips/:tripCode)
│   ├── models/                  # Mongoose Models and Database Access Modules
│   │   ├── db.js                # Database connection lifecycle, events, & graceful shutdown
│   │   ├── seed.js              # Database seeder utility populating MongoDB from trips.json
│   │   └── travlr.js            # Mongoose Schema with strict validation rules for trips
│   └── routes/                  # Express REST API routes
│       └── index.js             # API route endpoints mounted at /api
├── app_server/                  # MVC Server Architecture (Server-Side Rendering)
│   ├── controllers/             # Controllers handling requests and rendering Handlebars views
│   │   ├── main.js              # Home page controller
│   │   └── travel.js            # Travel controller fetching live JSON from GET /api/trips
│   ├── routes/                  # Express customer-facing route definitions
│   │   ├── index.js             # Routes for home (/)
│   │   ├── travel.js            # Routes for /travel
│   │   └── users.js             # Routes for /users
│   └── views/                   # Dynamic Handlebars template views
│       ├── error.hbs            # Error template
│       ├── index.hbs            # Default home template
│       ├── travel.hbs           # Dynamic Travel page with {{#each trips}} iteration
│       ├── layouts/             # Template layout wrappers
│       │   └── layout.hbs       # Base layout
│       └── partials/            # Reusable UI fragments
│           ├── footer.hbs       # Common footer partial
│           └── header.hbs       # Common header & navigation partial
├── public/                      # Static assets served directly by Express
│   ├── css/
│   │   └── style.css            # Travlr Getaways stylesheet
│   ├── images/                  # Logo, ad banners, and destination images (reef1.jpg, etc.)
│   ├── js/
│   └── *.html                   # Static HTML reference mockups
└── screenshots/                 # Verification screenshots for assignment submission
    ├── Module1_Express_Working.png
    ├── Module2_Express_Travel_Page.png
    ├── Module3_Express_Dynamic_JSON_Travel_Page.png
    ├── Module4_MongoDB_Inspection.png
    └── Module4_Travel_Page_Database_Rendered.png
```

---

## Getting Started

### Prerequisites
* **Node.js** (v18.x or newer recommended)
* **npm** (Node Package Manager)
* **MongoDB** (v6.x or newer; community server running locally on port 27017 or remote cluster)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/BoomBloom/CS-465.git
   cd CS-465
   ```
2. Switch to the `module5` branch:
   ```bash
   git checkout module5
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Populating the Database (Seeding)
Ensure your MongoDB service is running, then run the automated seeder script:
```bash
npm run seed
```
This populates the `trips` collection in the `travlr` database with all required vacation records.

### Running the Application
Start the Express server:
```bash
npm start
```

Open your browser and navigate to:
```
http://localhost:3000/
```

### Navigating & Testing Endpoints
* **Customer Travel Catalog (Rendered from MongoDB via Handlebars):**
  `http://localhost:3000/travel`
* **REST API - Retrieve All Trips (JSON):**
  `http://localhost:3000/api/trips`
* **REST API - Retrieve Single Trip by Code (JSON):**
  `http://localhost:3000/api/trips/GALR210214`
* **Static Content Pages:**
  - Home: `http://localhost:3000/`
  - Rooms: `http://localhost:3000/rooms.html`
  - Meals: `http://localhost:3000/meals.html`
  - News: `http://localhost:3000/news.html`
  - About: `http://localhost:3000/about.html`
  - Contact: `http://localhost:3000/contact.html`

### Database Inspection with `mongosh`
To inspect the live MongoDB database directly from your command line:
```bash
mongosh travlr
```
Run diagnostic inspection commands:
```javascript
// Display all collections
show collections

// Count documents in the trips collection
db.trips.countDocuments()

// Inspect all trip records with full schema formatting
db.trips.find().pretty()

// Query a single trip by code
db.trips.find({ code: "GALR210214" }).pretty()
```

---

## Git Branching Strategy
Each course module builds progressively upon the previous one using dedicated branches:
* `main`: Repository baseline.
* `module1`: Static HTML shell in Express.js.
* `module2`: Refactoring to MVC architecture (`app_server` with controllers, routes, and Handlebars templates).
* `module3`: Static HTML to templates with dynamic JSON (`data/trips.json` & Handlebars `{{#each}}`).
* `module4`: Database integration with MongoDB, Mongoose schemas, database seeding, and REST API (`app_api`).
* `module5`: Separation of Concerns refactoring decoupling `app_server` from Mongoose and wiring `GET /api/trips` and `GET /api/trips/:tripCode`.
* `module6` - `module7` *(upcoming)*: Angular Single-Page Application (SPA) admin interface and JWT authentication.
