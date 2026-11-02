# RideFlow

RideFlow is a ride-hailing app in development, with a React web frontend and an Express API backed by MongoDB. It includes rider and captain account flows and interactive ride-booking/dashboard UI. Ride matching, navigation, and ride transactions are currently represented by frontend demo data and are not connected to a live ride service.

## Features

### Rider experience

- Branded, responsive landing, login, and registration pages.
- Protected rider home screen with an illustrated map and a mobile-friendly booking panel.
- Pickup and destination entry with suggested locations. The same place cannot be selected as both pickup and destination.
- Vehicle selection for Car, Bike, and Auto, followed by a trip confirmation panel with a sample fare.
- A “Waiting for a driver” panel after ride confirmation, showing the selected vehicle, trip locations, and sample fare. The search can be canceled to return to ride confirmation.

### Captain experience

- Captain registration includes vehicle color, plate, passenger capacity, and vehicle type (`bike`, `car`, or `auto`).
- Protected captain dashboard with an illustrated route map, captain and vehicle details, and sample earnings/activity stats.
- A sample incoming ride request panel with passenger, pickup, destination, estimated fare, and pickup distance.
- OTP confirmation preview (demo OTP: `1234`). Declining returns to the dashboard; entering the demo OTP accepts the ride.
- Accepted rides show a compact ride-progress panel with sample remaining distance and time. Completing the ride opens a finish screen; its button returns to the captain dashboard.

### Authentication and API

- Separate rider and captain registration, login, profile, and logout endpoints.
- Password hashing with `bcrypt`; JWTs expire after 24 hours.
- MongoDB persistence through Mongoose and protected profile endpoints.
- Token blacklist records are used by logout handlers and configured to expire after 24 hours.

## Demo limitations

The ride screens are UI previews, not a live booking system. The passenger, route, fare, pickup distance, statistics, ride distance/time, and OTP are sample values. There is no ride-request API, driver matching, WebSocket service, geocoding, live map/location tracking, navigation, real fare calculation, payment processing, or ride-history service. A successful demo OTP entry changes the captain UI state only.

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
    server.js
    package.json
    src/
      app.js
      controllers/
      db/
      middleware/
      model/
      router/
  Frontend/
    package.json
    index.html
    public/
    src/
      App.jsx
      components/
        CaptainDetail.jsx
        ConfirmRidePopUp.jsx
        RidePopup.jsx
      context/
        CaptainContext.jsx
        UserContext.jsx
      pages/
        CaptainHome.jsx
        CaptainRiding.jsx
        CaptainLogin.jsx
        CaptainRegister.jsx
        CaptainProtectWrapper.jsx
        CaptainLogout.jsx
        FinishRide.jsx
        UserHome.jsx
        UserLogin.jsx
        UserRegister.jsx
        UserProtectWrapper.jsx
        UserLogout.jsx
        ConfirmRide.jsx
        WaitingForDriver.jsx
```

The backend separates routes, controllers, database models, connection setup, and authentication middleware. Frontend routes live in `Frontend/src/App.jsx`; shared user and captain state is provided by React contexts in `Frontend/src/main.jsx`.

## Run locally

### Requirements

- Node.js and npm
- A MongoDB instance, local or hosted

### Start the backend

From the repository root:

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
MONGO_URL=mongodb://127.0.0.1:27017/rideflow
JWT_SECRET=replace-with-a-long-random-secret
```

Start the API:

```bash
node server.js
```

The API listens on `http://localhost:3000`. CORS is configured for the Vite origin `http://localhost:5173`.

### Start the frontend

In another terminal from the repository root:

```bash
cd Frontend
npm install
npm run dev
```

Vite serves the frontend at `http://localhost:5173` by default. Frontend API calls currently use `http://localhost:3000`.

## Frontend routes

| Path | Page | Access |
| --- | --- | --- |
| `/` | Welcome page | Public |
| `/login` | Rider login | Public |
| `/register` | Rider registration | Public |
| `/captain-login` | Captain login | Public |
| `/captain-register` | Captain registration | Public |
| `/home` | Rider booking experience | Protected |
| `/user-logout` | Rider logout | Protected |
| `/captain-home` | Captain dashboard and ride demo | Protected |
| `/finish-ride` | Ride completion screen | Protected |
| `/captain-logout` | Captain logout | Protected |

The captain riding panel is currently shown within the captain dashboard after the demo OTP is accepted; it does not have a separate route.

## API reference

All endpoints are mounted under `/api/auth`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/user/register` | Register a rider |
| `POST` | `/user/login` | Authenticate a rider |
| `GET` | `/user/profile` | Return the authenticated rider profile |
| `GET` | `/user/logout` | Log out a rider |
| `POST` | `/captain/register` | Register a captain and vehicle |
| `POST` | `/captain/login` | Authenticate a captain |
| `GET` | `/captain/profile` | Return the authenticated captain profile |
| `GET` | `/captain/logout` | Log out a captain |

Registration and login accept JSON. Captain registration requires account fields plus a `vehicle` object. Vehicle type must be `bike`, `car`, or `auto`. Profile requests authenticate using the `token` cookie or an `Authorization: Bearer <token>` header.

Rider registration example:

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

Captain registration example:

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

Passwords are hashed with `bcrypt` using a cost factor of 10. JWTs are signed with `JWT_SECRET` and expire after 24 hours. User and captain models include timestamps; captain profiles also contain vehicle details and optional status, socket ID, and location.

## Development commands

Run these commands from `Frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `Frontend/dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

There is no automated test suite configured yet. The backend `npm test` command is a placeholder.

## Branding and accessibility

The landing page uses assets from `Frontend/public/`, including the RideFlow rider and captain artwork and cityscape. The stylesheet uses DM Sans and Sora. Animated artwork and UI transitions use reduced-motion variants where configured.
