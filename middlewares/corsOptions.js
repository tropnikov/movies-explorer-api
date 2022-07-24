const corsOptions = {
  origin: [
    'https://tma-beatfilms.nomoreparties.sbs',
    'http://tma-beatfilms.nomoreparties.sbs',
    'localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
    'localhost:3001',
    'http://localhost',
    'localhost',
  ],
  credentials: true,
};

module.exports = corsOptions;
