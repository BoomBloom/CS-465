# CS 465: Full Stack Development I - Travlr Getaways

Welcome to the **Travlr Getaways** web application repository for **CS 465 (Full Stack Development I)** at Southern New Hampshire University (SNHU). Over the course of the semester, this project evolves into a full **MEAN stack** (MongoDB, Express, Angular, Node.js) application featuring a customer-facing portal and an administrative single-page application (SPA).

---

## Module Two: Model View Controller (MVC) Routing & Handlebars Templating

In this module, the web application was refactored from serving static HTML pages to a clean **Model-View-Controller (MVC)** architectural pattern using Express routing and the **Handlebars (HBS)** templating engine.

### Objectives Achieved
1. **MVC Architecture Setup:** Created the `app_server` directory structure to encapsulate server-side logic:
   - `app_server/controllers/`: Separates business logic and view orchestration (`main.js`, `travel.js`).
   - `app_server/routes/`: Defines endpoint URL routing decoupled from application setup (`index.js`, `users.js`, `travel.js`).
   - `app_server/views/`: Contains dynamic Handlebars templates (`travel.hbs`, `index.hbs`, `error.hbs`).
2. **Handlebars Templating & Partials:**
   - Isolated common UI fragments into reusable partials: `app_server/views/partials/header.hbs` and `app_server/views/partials/footer.hbs`.
   - Replaced redundant header and footer markup in `travel.hbs` with Handlebars inclusion directives: `{{> header }}` and `{{> footer }}`.
   - Organized layouts by migrating `layout.hbs` into `app_server/views/layouts/`.
   - Registered partials with Express via `hbs.registerPartials(__dirname + '/app_server/views/partials')`.
3. **Route & Controller Registration:**
   - Wired `main.js` controller `index` action to `GET /` in `app_server/routes/index.js`.
   - Created `travel.js` controller `travel` action rendering `travel.hbs` with custom page titles.
   - Mounted `travelRouter` in `app.js` at the `/travel` path.
4. **Testing & Verification:**
   - Verified dynamic view rendering at `http://localhost:3000/travel` returning HTTP 200 OK.
   - Confirmed partials injection for navigation headers and footers with active route styling.

---

## Module One: Express Framework & Static Shell

In the initial module, the customer-facing web application shell was established using Node.js and the Express framework, serving static HTML content based on the client wireframe.

### Objectives Achieved
1. **Express Framework Setup:** Scaffolded the Node.js web server using `express-generator` with Handlebars (`hbs`) templating support.
2. **Static Asset Migration:** Imported static HTML mockups (`index.html`, `travel.html`, `rooms.html`, `meals.html`, `news.html`, `about.html`, `contact.html`), stylesheets (`public/css/`), and image assets into the Express `public/` directory.
3. **Static File Middleware:** Configured `express.static` in `app.js` to serve assets and pages directly to the browser upon navigation.
4. **Testing & Verification:** Verified server startup, HTTP 200 response codes, Morgan logging, and full browser rendering at `http://localhost:3000/`.
5. **Version Control:** Configured `.gitignore` and established a branch-based progression starting with `module1`.

---

## Project Structure (Module Two)

```text
travlr/
├── .gitignore                   # Ignores node_modules, build artifacts, logs, and OS files
├── README.md                    # Project documentation and setup guide
├── app.js                       # Main Express application configuration & middleware setup
├── bin/
│   └── www                      # Server entry point and HTTP port listener
├── package.json                 # Project metadata, scripts, and dependencies
├── package-lock.json
├── app_server/                  # MVC Server Architecture
│   ├── controllers/             # Controller logic handling requests and rendering views
│   │   ├── main.js              # Controller for home page
│   │   └── travel.js            # Controller for travel page
│   ├── routes/                  # Express route definitions
│   │   ├── index.js             # Routes for home
│   │   ├── travel.js            # Routes for /travel
│   │   └── users.js             # Routes for /users
│   └── views/                   # Dynamic Handlebars template views
│       ├── error.hbs            # Error template
│       ├── index.hbs            # Default home template
│       ├── travel.hbs           # Dynamic Travel page using HBS directives
│       ├── layouts/             # Template layout wrappers
│       │   └── layout.hbs       # Base layout
│       └── partials/            # Reusable UI fragments
│           ├── footer.hbs       # Common footer partial
│           └── header.hbs       # Common header & navigation partial
├── public/                      # Static assets served directly by Express
│   ├── about.html               # About Us page
│   ├── contact.html             # Contact page
│   ├── index.html               # Homepage
│   ├── meals.html               # Meals page
│   ├── news.html                # News page
│   ├── rooms.html               # Rooms & Suites page
│   ├── travel.html              # Legacy static travel page
│   ├── css/
│   │   └── style.css            # Travlr Getaways stylesheet
│   ├── images/                  # Logo, ad banners, and destination images
│   ├── javascripts/
│   └── stylesheets/
└── screenshots/                 # Verification screenshots for assignment submission
    └── Module1_Express_Working.png
```

---

## Getting Started

### Prerequisites
* **Node.js** (v18.x or newer recommended)
* **npm** (Node Package Manager)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/BoomBloom/CS-465.git
   cd CS-465
   ```
2. Switch to the `module2` branch:
   ```bash
   git checkout module2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
Start the Express server:
```bash
npm start
```
Or with verbose debug logging:
```bash
DEBUG=travlr:* npm start
```

Open your browser and navigate to:
```
http://localhost:3000/
```

### Navigating Pages
* **Dynamic Travel Page (MVC / HBS):** `http://localhost:3000/travel`
* **Home:** `http://localhost:3000/` or `http://localhost:3000/index.html`
* **Rooms:** `http://localhost:3000/rooms.html`
* **Meals:** `http://localhost:3000/meals.html`
* **News:** `http://localhost:3000/news.html`
* **About:** `http://localhost:3000/about.html`
* **Contact:** `http://localhost:3000/contact.html`

---

## Git Branching Strategy
Each course module builds progressively upon the previous one using dedicated branches:
* `main`: Repository baseline.
* `module1`: Static HTML shell in Express.js.
* `module2`: Refactoring to MVC architecture (`app_server` with controllers, routes, and Handlebars templates).
* `module3` *(upcoming)*: Static HTML to templates with JSON.
* `module4` *(upcoming)*: Database integration with MongoDB and Mongoose schemas.
* `module5` *(upcoming)*: RESTful API development (`app_api`).
* `module6` - `module7` *(upcoming)*: Angular Single-Page Application (SPA) admin interface and authentication.
