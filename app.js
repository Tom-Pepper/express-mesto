const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users.js');
const cardsRoutes = require('./routes/cards.js');

const { loginUser, createUser, getMyProfile } = require('./controllers/usersController');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', loginUser);
app.post('/signup', createUser);

app.use(auth);

app.get('/users/me', getMyProfile);

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
