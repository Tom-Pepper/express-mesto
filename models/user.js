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
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введите корректный URL изображения',
    },
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
