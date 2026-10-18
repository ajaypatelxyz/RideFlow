const express = require('express');
const authRouter = require('./router/auth.routes')
const cookieParser = require('cookie-parser')
const captainRouter = require('./router/captain.routes')
const cors = require('cors')

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)

app.use('/api/auth', captainRouter);

module.exports = app;