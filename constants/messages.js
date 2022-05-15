const UNAUTHORIZED_MSG = 'Необходима авторизация';
const UNAUTHORIZED_INCORRECT_CREDENTIALS_MSG = 'Неправильные почта или пароль';
const FORBIDDEN_MSG = 'Чужие фильмы удалять нельзя';
const NOT_FOUND_USER_MSG = 'Запрашиваемый пользователь не найден';
const NOT_FOUND_MOVIE_MSG = 'Запрашиваемый фильм не найден';
const NOT_FOUND_PAGE_MSG = 'Страница не найдена =(';
const CONFLICT_ALREADY_EXIST = 'Пользователь с таким email уже зарегистрирован';
const VALIDATION_INVALID_EMAIL = 'Невалидный email';
const VALIDATION_INVALID_LINK = 'Невалидная ссылка';
const VALIDATION_INVALID_MOVIE_DATA = 'Невалидные данные фильма';
const VALIDATION_INVALID_USER_DATA = 'Переданные данные не прошли валидацию';
const VALIDATION_INVALID_MOVIE_ID = 'Невалидный id фильма';
const SUCCESS_MOVIE_DELETED = 'Фильм удален';
const SUCCESS_USER_AUTHORIZED = 'Успешная авторизация';
const SUCCESS_USER_LOGOUT = 'Вы вышли';
const INTERNAL_SERVER_ERROR_MSG = 'Произошла внутренняя ошибка сервера';

module.exports = {
  UNAUTHORIZED_MSG,
  NOT_FOUND_USER_MSG,
  NOT_FOUND_MOVIE_MSG,
  NOT_FOUND_PAGE_MSG,
  FORBIDDEN_MSG,
  CONFLICT_ALREADY_EXIST,
  UNAUTHORIZED_INCORRECT_CREDENTIALS_MSG,
  VALIDATION_INVALID_EMAIL,
  VALIDATION_INVALID_LINK,
  VALIDATION_INVALID_MOVIE_DATA,
  VALIDATION_INVALID_MOVIE_ID,
  SUCCESS_MOVIE_DELETED,
  VALIDATION_INVALID_USER_DATA,
  SUCCESS_USER_AUTHORIZED,
  SUCCESS_USER_LOGOUT,
  INTERNAL_SERVER_ERROR_MSG,
};
