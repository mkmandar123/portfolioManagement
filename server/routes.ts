import auth from './components/auth';
import trade from './api/trade';
import portfolio from './api/portfolio';

export default function (app: any): void {
  app.use('/api/trade', auth, trade);
  app.use('/api/portfolio', auth, portfolio);
}
