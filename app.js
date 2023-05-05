const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const indexRouter = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handelErrors = require('./middlewares/handelErrors');
const { userValidation, loginValidation } = require('./middlewares/requestValidation');

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', indexRouter);
app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);
app.use(cookieParser());
app.use(auth);
app.use(handelErrors);
app.use(errors());
app.listen(PORT);
