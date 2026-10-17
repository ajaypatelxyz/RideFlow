# RideFlow

RideFlow is a ride-hailing project with a React frontend and a Node.js/Express backend. The backend provides user and captain authentication, profile, and logout endpoints. The frontend provides the welcome screen and user/captain entry screens. The frontend forms are not connected to the backend yet.

## Backend Features

- User registration and login with passwords hashed using `bcrypt`.
- Captain registration and login with vehicle details.
- JWT authentication tokens with a 24-hour lifetime, returned in a `token` cookie.
- User and captain profile endpoints that require a valid JWT.
- Logout endpoints that clear the token cookie and store the token in MongoDB. Stored blacklist entries expire after 24 hours.
- MongoDB persistence using Mongoose.

## Technology

- Node.js and Express
- MongoDB and Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- `bcrypt` for password hashing
- `cookie-parser` and `dotenv`

## Backend Setup

Requirements: Node.js and a MongoDB instance.

1. Open a terminal in the `Backend` directory and install dependencies:

   ```bash
   npm install
   ```

2. Create `Backend/.env` with the database connection string and JWT signing secret:

   ```env
   MONGO_URL=mongodb://127.0.0.1:27017/rideflow
   JWT_SECRET=replace-with-a-secret-value
   ```

3. Start the server from the `Backend` directory:

   ```bash
   node server.js
   ```

The server listens on port `3000`.

## API

All routes are mounted under `/api/auth`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/user/register` | Register a user |
| `POST` | `/user/login` | Log in a user |
| `POST` | `/user/profile` | Get the authenticated user's profile |
| `GET` | `/user/logout` | Log out a user |
| `POST` | `/captain/register` | Register a captain and vehicle |
| `POST` | `/captain/login` | Log in a captain |
| `POST` | `/captain/profile` | Get the authenticated captain's profile |
| `GET` | `/captain/logout` | Log out a captain |

Profile and logout requests use the `token` cookie. Authentication middleware also accepts a bearer token in the `Authorization` header.

### Request bodies

User registration (`POST /api/auth/user/register`):

```json
{
  "fullName": {
    "firstName": "Alex",
    "lastName": "Morgan"
  },
  "email": "alex@example.com",
  "password": "your-password"
}
```

User login (`POST /api/auth/user/login`):

```json
{
  "email": "alex@example.com",
  "password": "your-password"
}
```

Captain registration (`POST /api/auth/captain/register`):

```json
{
  "fullName": {
    "firstName": "Sam",
    "lastName": "Taylor"
  },
  "email": "sam@example.com",
  "password": "your-password",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

Allowed `vehicleType` values are `bike`, `car`, and `auto`.

Captain login (`POST /api/auth/captain/login`):

```json
{
  "email": "sam@example.com",
  "password": "your-password"
}
```

## Backend Project Structure

```text
Backend/
  server.js
  src/
    app.js
    controllers/
    db/
    middleware/
    model/
    router/
```

The backend currently covers authentication and profile flows. Ride booking, trip matching, maps, and payments are not present in the current implementation.

## Backend Data Models

### User

- `fullName.firstName`: required, minimum length of 3 characters.
- `fullName.lastName`: optional.
- `email`: required and unique.
- `password`: required and excluded from query results by default.
- Mongoose timestamps provide `createdAt` and `updatedAt`.

### Captain

- `fullName.firstName`: required, minimum length of 3 characters.
- `fullName.lastName`: optional.
- `email`: required, unique, and lowercased.
- `password`: required and excluded from query results by default.
- `vehicle.color` and `vehicle.plate`: required, minimum length of 3 characters.
- `vehicle.capacity`: required number of at least 1.
- `vehicle.vehicleType`: required; accepted values are `bike`, `car`, and `auto`.
- `status`: `active` or `inactive`, defaulting to `inactive`.
- Optional `socketId` and latitude/longitude location fields.
- Mongoose timestamps provide `createdAt` and `updatedAt`.

### Blacklisted Token

- Stores a required, unique token string.
- MongoDB TTL expiration removes entries after 24 hours.

Registration hashes passwords with `bcrypt` using a cost factor of 10. User and captain registration/login handlers issue JWTs that expire after 24 hours and place them in a `token` cookie. Logout clears the cookie and stores an available token in the blacklist collection. Profile routes use middleware that reads a JWT from the cookie or a bearer token in the `Authorization` header and verifies it before attaching the user or captain to the request.

## Frontend Features

### Home

- Responsive welcome screen with RideFlow branding, introductory copy, and a Continue link to user login.
- The smiling biker PNG is used in the header and as the main motorcycle illustration.
- The cityscape and road scroll from right to left behind the rider.
- SVG overlays animate both wheel spokes and connect the front fork to the wheel. A subtle rider movement is also applied.
- Motion is disabled when the visitor's system requests reduced motion.

### User Login

- Email and password fields with labels, appropriate input types, autocomplete hints, and browser-required validation.
- The page is identified as User Login and links to user registration, captain login, and Home.
- Submitting is currently handled in local React state; credentials are not sent to the backend and no authentication occurs.

### User Registration

The frontend fields match the current user model:

| Field | Requirement | Browser validation |
| --- | --- | --- |
| First name (`fullName.firstName`) | Required | Minimum 3 characters |
| Last name (`fullName.lastName`) | Optional | None |
| Email (`email`) | Required | Email input format |
| Password (`password`) | Required | Non-empty |

The page is identified as User Registration and links to user login, captain registration, and Home. Submitting currently prevents the browser's default navigation; no account is created and no request is sent.

### Captain Login

- Separate captain login screen with its own animated cartoon mascot.
- Email and password inputs with labels, autocomplete hints, and required-field validation.
- Links to captain registration, user login, and Home.
- Submitting is currently handled in local React state; credentials are not sent to the backend.

### Captain Registration

The `/captain-register` route is registered, but the page is currently a placeholder. The captain registration form described in the backend request example is not implemented in the frontend.

## Application Routes

| Path | Screen | Current status |
| --- | --- | --- |
| `/` | Home | Responsive animated welcome screen |
| `/login` | User Login | Frontend only; not connected to API |
| `/register` | User Registration | Schema-matched UI; not connected to API |
| `/captain-login` | Captain Login | Frontend only; not connected to API |
| `/captain-register` | Captain Registration | Placeholder |

The frontend uses React Router with `BrowserRouter`. The API routes are mounted under `/api/auth`.

## Artwork and Motion

- `Frontend/public/Smiling Biker on a Chopper.png`: transparent biker artwork used in the Home and user auth headers and as the Home illustration.
- `Frontend/public/rideflow-landscape.svg`: cityscape, ground, and road used as the scrolling Home background.
- `Frontend/public/captain-mascot.svg`: separate animated cartoon mascot displayed on Captain Login.
- `Frontend/public/rideflow-rider.svg`: additional rider illustration asset currently present in `public/`.
- The Home page draws rotating wheel spokes and the front fork as an SVG overlay above the biker image.
- Page motion respects the `prefers-reduced-motion` system preference.

## Technology

### Frontend

- React 19 and React DOM
- Vite 7
- React Router 7
- Tailwind CSS 4 with the Tailwind Vite plugin
- ESLint
- DM Sans and Sora fonts loaded from Google Fonts

The visual theme uses cream (`#f6f0e7`), peach (`#efb4a5`), deep teal (`#19323a`), and coral (`#d96950`).

### Backend

- Node.js and Express 5
- MongoDB with Mongoose
- JSON Web Tokens with `jsonwebtoken`
- Password hashing with `bcrypt`
- `cookie-parser` and `dotenv`

## Project Structure

```text
RideFlow/
  README.md
  Backend/
    server.js
    package.json
    src/
      app.js
      controllers/
        auth.controller.js
        captain.controller.js
      db/
        db.js
      middleware/
        auth.middleware.js
        captain.middleware.js
      model/
        blacklistToken.model.js
        captain.model.js
        user.model.js
      router/
        auth.routes.js
        captain.routes.js
  Frontend/
    package.json
    public/
      captain-mascot.svg
      rideflow-landscape.svg
      rideflow-rider.svg
      Smiling Biker on a Chopper.png
    src/
      App.jsx
      index.css
      main.jsx
      pages/
        CaptainLogin.jsx
        CaptainRegister.jsx
        Home.jsx
        UserLogin.jsx
        UserRegister.jsx
```

## Run Locally

Requirements: Node.js, npm, and a running MongoDB instance.

### Backend

In one terminal, switch to `Backend/` and install dependencies:

```bash
cd Backend
npm install
```

Create `Backend/.env` with the MongoDB connection string and JWT signing secret:

```env
MONGO_URL=mongodb://127.0.0.1:27017/rideflow
JWT_SECRET=replace-with-a-secret-value
```

Start the API server from `Backend/`:

```bash
node server.js
```

The backend listens on port `3000`.

### Frontend

In a second terminal, switch to `Frontend/` and install dependencies:

```bash
cd Frontend
npm install
npm run dev
```

Vite prints the development URL when it starts; the default is `http://localhost:5173`.

## Available Frontend Commands

Run these commands from `Frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite with hot module replacement |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the frontend |

The backend starts with `node server.js`. Automated test suites are not configured yet; the backend package's current `test` script is a placeholder.

## Current Integration Status

The backend API and frontend screens are present in this workspace, but the frontend source currently contains no API requests. User login, user registration, and captain login are UI-only and do not persist submitted form data. Captain registration is a frontend placeholder. Ride booking, trip matching, maps, and payments are not implemented in the current code.