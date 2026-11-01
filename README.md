# RideFlow

RideFlow is a ride-hailing application in development. It has a React-based web client and an Express API backed by MongoDB. The current work covers the branded entry experience, rider and captain account screens, authentication endpoints, and initial protected dashboard routes. Booking and trip operations are not implemented yet.

## What is implemented

### Web application

- Responsive RideFlow welcome page with animated rider and cityscape artwork. The animation respects the visitor's reduced-motion preference.
- Rider and captain login and registration pages with labeled fields, autocomplete hints, and browser validation.
- Captain registration collects vehicle color, license plate, passenger capacity, and vehicle type (`bike`, `car`, or `auto`).
- React Router routes for public account screens and initial protected rider and captain pages.
- React contexts for rider and captain account state. The captain provider also has loading and error state; its `useCaptain` hook is currently commented out.
- A RideFlow visual theme using cream, peach, deep teal, and coral colors.

### API and data

- Separate rider and captain registration, login, profile, and logout endpoints.
- Password hashing with `bcrypt` and signed JSON Web Tokens (JWTs) with a 24-hour lifetime.
- MongoDB persistence through Mongoose, including user, captain, vehicle, and blacklisted-token schemas.
- Middleware for authenticating rider and captain profile requests using a token cookie or bearer token.
- Logout handlers that clear the token cookie and record tokens for expiration-based cleanup.

### Current development status

The frontend account forms call the corresponding API endpoints, and the backend authentication routes and models are present. Authentication is not yet reliable end to end because the client and server currently disagree about how to store and send the JWT:

- The API sets the JWT as a `token` cookie but does not include a `token` property in registration or login JSON responses.
- Frontend registration and login screens read `data.token` and write it to local storage, so this value is currently undefined.
- The protected frontend wrappers read the token from local storage and send it as a bearer token. They do not currently use the cookie-only authentication flow.
- The protected frontend profile wrappers call `GET`; the backend profile endpoints are registered as `POST`.
- Authentication middleware checks the user or captain collection for a `token` field instead of checking the blacklisted-token collection. The logout controllers do use the blacklist collection.
- Frontend API URLs are hard-coded to `http://localhost:3000`; a deployment-specific API base URL has not been configured.

The API defines a captain logout endpoint, but the frontend router does not currently register a captain logout page. The rider and captain home pages are placeholders; the rider home page currently only displays placeholder text. Captain context exports `CaptainDataContext`; its custom `useCaptain` hook is commented out.

Ride requests, driver discovery, trip matching, maps, live location, fare calculation, payments, and ride history have not been implemented.

## Technology

| Area | Technologies |
| --- | --- |
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4, Axios |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Authentication | JSON Web Tokens, `bcrypt`, `cookie-parser` |
| Development | npm, ESLint, dotenv |

## Project layout

```text
RideFlow/
  README.md
  Backend/
    .gitignore
    package.json
    package-lock.json
    server.js
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
    .gitignore
    README.md
    index.html
    package.json
    package-lock.json
    vite.config.js
    eslint.config.js
    public/
      captain-mascot.svg
      rideflow-landscape.svg
      rideflow-rider.svg
      Smiling Biker on a Chopper.png
    src/
      App.jsx
      App.css
      index.css
      main.jsx
      assets/react.svg
      context/
        CaptainContext.jsx
        UserContext.jsx
      pages/
        CaptainHome.jsx
        CaptainLogin.jsx
        CaptainProtectWrapper.jsx
        CaptainRegister.jsx
        CaptainLogout.jsx
        Home.jsx
        Start.jsx
        UserLogin.jsx
        UserLogout.jsx
        UserProtectWrapper.jsx
        UserRegister.jsx
```

The backend separates HTTP routes, controllers, database models, connection setup, and authentication middleware. The frontend keeps application routes in `App.jsx`, wraps the app with user and captain contexts in `main.jsx`, and organizes screens under `src/pages/`.

## Run locally

### Requirements

- Node.js and npm
- A MongoDB instance, local or hosted

### 1. Configure and start the backend

In a terminal at the repository root:

```bash
cd Backend
npm install
```

Create `Backend/.env` with:

```env
MONGO_URL=mongodb://127.0.0.1:27017/rideflow
JWT_SECRET=replace-with-a-long-random-secret
```

Start the API:

```bash
node server.js
```

The server listens on `http://localhost:3000`. CORS is currently configured to accept the Vite development origin `http://localhost:5173`.

### 2. Install and start the frontend

Open a second terminal at the repository root:

```bash
cd Frontend
npm install
npm run dev
```

Vite serves the development app at `http://localhost:5173` by default.

## Frontend routes

| Path | Page | Status |
| --- | --- | --- |
| `/` | Welcome / landing page | Implemented with responsive animated artwork |
| `/login` | Rider login | Form submits to the rider login API |
| `/register` | Rider registration | Form submits to the rider registration API |
| `/captain-login` | Captain login | Form submits to the captain login API |
| `/captain-register` | Captain registration | Form submits account and vehicle details to the captain registration API |
| `/home` | Rider home | Protected route; page content is a placeholder |
| `/user-logout` | Rider logout | Protected route |
| `/captain-home` | Captain home | Protected route; page content is a placeholder |

The captain logout API and a `CaptainLogout.jsx` component are present, but there is currently no `/captain-logout` frontend route. The rider logout frontend page is registered at `/user-logout`.

## API reference

All endpoints are mounted under `/api/auth`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/user/register` | Create a rider account |
| `POST` | `/user/login` | Authenticate a rider |
| `POST` | `/user/profile` | Return the authenticated rider profile |
| `GET` | `/user/logout` | Log out a rider |
| `POST` | `/captain/register` | Create a captain account and vehicle |
| `POST` | `/captain/login` | Authenticate a captain |
| `POST` | `/captain/profile` | Return the authenticated captain profile |
| `GET` | `/captain/logout` | Log out a captain |

Registration and login accept JSON request bodies. Profile requests authenticate using the `token` cookie or an `Authorization: Bearer YOUR_JWT` header.

Rider registration (`POST /api/auth/user/register`):

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

Rider login and captain login both accept `email` and `password`:

```json
{
  "email": "alex@example.com",
  "password": "your-password"
}
```

Captain registration (`POST /api/auth/captain/register`) accepts the same name and account fields plus a `vehicle` object:

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

`vehicleType` must be `bike`, `car`, or `auto`. The captain schema also tracks an `active`/`inactive` status, optional socket ID and location, and Mongoose creation/update timestamps. User and captain passwords are excluded from normal query results. Both account types require a first name of at least three characters and a unique email address.

Successful registration returns HTTP `201`; successful login and logout return HTTP `200`. Login failures and duplicate accounts are reported with HTTP `401` by the current controllers. The API sets a `token` cookie after successful registration and login, but does not currently return that token in the JSON response. Blacklist records are configured to expire from MongoDB after 24 hours.

### Data model details

- **User:** required first name (minimum 3 characters), optional last name, required unique email, required password excluded from query results by default, and Mongoose timestamps.
- **Captain:** same name and account fields; email is lowercased; includes required vehicle color and plate (minimum 3 characters), passenger capacity of at least 1, and required vehicle type (`bike`, `car`, or `auto`). Captain status defaults to `inactive`; socket ID and latitude/longitude are optional. Mongoose timestamps are enabled.
- **Blacklisted token:** required unique token and a `createdAt` TTL index configured for 86,400 seconds.

Registration hashes passwords using `bcrypt` with a cost factor of 10. JWTs are signed with `JWT_SECRET` and expire after 24 hours.

## Development commands

Run these commands from `Frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `Frontend/dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

The backend can be started with `node server.js` from `Backend/`. Automated test suites are not configured yet.

The backend's `npm test` script is a placeholder that exits with an error; no backend test suite is currently set up.

## Artwork

The landing page uses assets from `Frontend/public/`: `Smiling Biker on a Chopper.png` for the rider illustration, `rideflow-landscape.svg` for the scrolling city background, and `captain-mascot.svg` for captain branding. `rideflow-rider.svg` is also included as a project asset.

The application stylesheet loads DM Sans and Sora from Google Fonts and defines the rider, wheel-spoke, and scrolling scenery animations. Those animations are disabled when `prefers-reduced-motion: reduce` is active. The public `vite.svg` and source `assets/react.svg` are starter assets and are not part of the RideFlow landing-page artwork.
