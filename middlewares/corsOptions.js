const corsOptions = {
  origin: [
    'https://tropnikov.dev',
    'https://tropnikov-movies-explorer.vercel.app',
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
