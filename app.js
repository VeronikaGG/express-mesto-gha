const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidation, userValidation } = require('./middlewares/requestValidation');
const handelErrors = require('./middlewares/handelErrors');
const indexRouter = require('./routes/index');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);
app.use(cookieParser());
app.use(auth);
app.use(indexRouter);
app.use(errors());
app.use(handelErrors);

app.listen(PORT);
