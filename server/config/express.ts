import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

export default function (app: any): void {
  app.use(cors());

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
  app.use(bodyParser.json({ limit: '10mb' }));
}
