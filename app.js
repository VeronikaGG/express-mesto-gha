require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, userValidation } = require('./middlewares/requestValidation');
const handelErrors = require('./middlewares/handelErrors');
const indexRouter = require('./routes/index');
// const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'http://localhost:3000',
  'https://veronikagg.student.nomoredomains.monster',
  'https://api.veronikagg.student.nomoredomains.monster',
];

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);
app.use(cookieParser());
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
app.use(errorLogger);
app.use(auth);
app.use('/', indexRouter);
app.use(errors());
app.use(handelErrors);

app.listen(PORT);
