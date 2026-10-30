# CS 465: Full Stack Development I - Travlr Getaways

Welcome to the **Travlr Getaways** web application repository for **CS 465 (Full Stack Development I)** at Southern New Hampshire University (SNHU). Over the course of the semester, this project evolves into a full **MEAN stack** (MongoDB, Express, Angular, Node.js) application featuring a customer-facing portal and an administrative single-page application (SPA).

---

## Module One: Express Framework & Static Shell

In this initial module, the customer-facing web application shell was established using Node.js and the Express framework, serving static HTML content based on the client wireframe.

### Objectives Achieved
1. **Express Framework Setup:** Scaffolded the Node.js web server using `express-generator` with Handlebars (`hbs`) templating support.
2. **Static Asset Migration:** Imported static HTML mockups (`index.html`, `travel.html`, `rooms.html`, `meals.html`, `news.html`, `about.html`, `contact.html`), stylesheets (`public/css/`), and image assets into the Express `public/` directory.
3. **Static File Middleware:** Configured `express.static` in `app.js` to serve assets and pages directly to the browser upon navigation.
4. **Testing & Verification:** Verified server startup, HTTP 200 response codes, Morgan logging, and full browser rendering at `http://localhost:3000/`.
5. **Version Control:** Configured `.gitignore` and established a branch-based progression starting with `module1`.

---

## Project Structure

```text
travlr/
├── .gitignore               # Ignores node_modules, build artifacts, logs, and OS files
├── README.md                # Project documentation and setup guide
├── app.js                   # Main application configuration & middleware setup
├── bin/
│   └── www                  # Server entry point and HTTP port listener
├── package.json             # Project metadata, scripts, and dependencies
├── package-lock.json
├── public/                  # Static assets served directly by Express
│   ├── about.html           # About Us page
│   ├── contact.html         # Contact page
│   ├── index.html           # Homepage (served at http://localhost:3000/)
│   ├── meals.html           # Meals page
│   ├── news.html            # News page
│   ├── rooms.html           # Rooms & Suites page
│   ├── travel.html          # Travel Packages page
│   ├── css/
│   │   └── style.css        # Travlr Getaways stylesheet
│   ├── images/              # Logo, ad banners, and destination images
│   ├── javascripts/
│   └── stylesheets/
├── routes/                  # Express route handlers
│   ├── index.js             # Home router
│   └── users.js             # User router
├── screenshots/             # Verification screenshots for assignment submission
│   └── Module1_Express_Working.png
└── views/                   # Handlebars template views
    ├── error.hbs            # Error view
    ├── index.hbs            # Default Express template view
    └── layout.hbs           # Global HTML layout wrapper
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
2. Switch to the `module1` branch:
   ```bash
   git checkout module1
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
* **Home:** `http://localhost:3000/` or `http://localhost:3000/index.html`
* **Travel:** `http://localhost:3000/travel.html`
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
* `module2` *(upcoming)*: Refactoring to MVC architecture (`app_server` with controllers, routes, and Handlebars templates).
* `module3` *(upcoming)*: Database integration with MongoDB and Mongoose schemas.
* `module4` *(upcoming)*: RESTful API development (`app_api`).
* `module5` - `module7` *(upcoming)*: Angular Single-Page Application (SPA) admin interface and authentication.
