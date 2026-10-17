# RideFlow

RideFlow is a ride-hailing project. The code currently present in this workspace is its Node.js backend, which provides registration, login, profile, and logout endpoints for users and captains.

## Implemented

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

## Setup

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

## Project structure

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

This README describes the backend files currently in the workspace. No frontend or ride-booking endpoints are present here.