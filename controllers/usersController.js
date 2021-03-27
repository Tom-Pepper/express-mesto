/**
 * Контроллер пользователя. Описание методов работы с пользователями сервиса.
 * Запись пользователя в БД, изменение данных, получение инф-ии о себе (залогиненный пользователь),
 * и о др. пользователях по id
 * @type {*|{}}
 */
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const checkDataError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res
      .status(400)
      .send({ message: `Переданы некоректные данные: ${err}` });
  }
  return res.status(500).send({ message: `Произошла ошибка на сервере: ${err}` });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => checkDataError(res, err));
};

const getProfile = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь с таким id не найден' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => checkDataError(res, err));
};

const createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((_hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: _hash,
    }))
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => checkDataError(res, err));
};

const getMyProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => checkDataError(res, err));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => checkDataError(res, err));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => checkDataError(res, err));
};

module.exports = {
  getUsers,
  getProfile,
  createUser,
  getMyProfile,
  updateProfile,
  updateAvatar,
};
