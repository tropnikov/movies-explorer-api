const corsOptions = {
  origin: [
    'https://tma.beatfilms.nomoredomains.rocks',
    'http://tma.beatfilms.nomoredomains.rocks',
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
