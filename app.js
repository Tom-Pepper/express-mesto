const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Временно захардкоженный юзер
app.use((req, res, next) => {
  req.user = {
    _id: '603cd4a43f98e078e9fbef81',
  };
  next();
});

// Подключаем БД
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Mesto is connected to DB'));

// Подключение роутов и обработка несуществующих роутов
app.use('/', cardsRoutes, usersRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Mesto is listening on port ${PORT}`);
});
