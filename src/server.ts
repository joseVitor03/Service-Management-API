import App from './app';

const app = new App();
const port = process.env.API_PORT || 3001;
app.start(port);
