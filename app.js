require('dotenv').config();
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const routes = require('./routes/index');

const { PORT = 3000, NODE_ENV, MONGODB_ADDRESS } = process.env;

const app = express();

app.use(express.json());

// app.use(
//   cors(corsOptions),
// );

app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(cookieParser());

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  try {
    await mongoose.connect(
      NODE_ENV === 'production'
        ? MONGODB_ADDRESS
        : 'mongodb://localhost:27017/beatfilmsdev',
    );
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.log('ERROR:', err.message);
  }
}

main();
