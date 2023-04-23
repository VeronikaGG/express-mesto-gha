const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '6442cfb0d529d9fcddb434e4',
  };
  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT);
