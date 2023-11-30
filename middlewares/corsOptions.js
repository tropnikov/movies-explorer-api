const corsOptions = {
  origin: [
    'https://movies-explorer.tropnikov.dev',
    'http://movies-explorer.tropnikov.dev',
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
