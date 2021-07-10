import express from 'express';
import http from 'http';

import expressConfig from './config/express';
import registerRoutes from './routes';
import { env } from './config/env';

const app = express();
const server = http.createServer(app);
const port = env.PORT || 3001;

expressConfig(app);
registerRoutes(app);

function startServer(): void {
  server.listen(port, (): void => {
    // eslint-disable-next-line
    console.log(`Express server listening on ${port}, in ${app.get('env')} mode`);
  });
}

startServer();

export default app;
