import express from 'express';
import fs from 'fs';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.tempDir();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  tempDir() {
    if (!fs.existsSync('./temp')) {
      fs.mkdirSync('./temp');
    }
  }
}

export default new App().server;
