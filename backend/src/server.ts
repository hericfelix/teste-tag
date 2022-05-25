import { createConnection } from 'typeorm';
import app from './app';

createConnection()
  .then(() => {
    app.listen(3333, () => {
      console.log('App running on http://localhost:3333');
    });
  })
  .catch((err) => console.log(err));
