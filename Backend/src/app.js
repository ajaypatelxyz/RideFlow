const express = require('express');
const authRouter = require('./router/auth.routes')
const cookieParser = require('cookie-parser')
const captainRouter = require('./router/captain.routes')

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)

app.use('/api/auth', captainRouter);

module.exports = app;