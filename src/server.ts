import App from './app';

const app = new App();
const port = process.env.DB_PORT || 3306;
app.start(port);
