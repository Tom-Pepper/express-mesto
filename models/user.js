/**
 * Схема добавления карточки в БД
 * @type {module:mongoose}
 * Описываем поля пользователя и их валидацию
 */

const mongoose = require('mongoose');

const { default: validator } = require('validator');

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Tim Berners-Lee',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Scientist, Inventor',
  },
  avatar: {
    required: false,
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введите корректный URL изображения',
    },
    default: 'https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg',
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
