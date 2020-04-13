require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

const authRouter = require('./router/login.route');
const registerRouter = require('./router/register.route');
const chatRouter = require('./router/chat.route');

const authMiddleWare = require('./middleware/auth.middleware');
const apiRouter = require('./API/router/user.route');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet.xssFilter());

app.get('/', authMiddleWare.authLogin, chatRouter);
app.use('/auth', authRouter);
app.use('/register', authMiddleWare.auth, registerRouter);
app.use('/chat', authMiddleWare.authLogin, chatRouter);
app.use('/api', apiRouter);

module.exports = app;