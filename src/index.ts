import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from '@/config';
import { productRouter } from '@/product/product.route';
import { ApiError } from '@/utils/ApiError';

const app = express();
const port = env.PORT;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/product', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handler
app.use((err: Error, _req: Request, res: Response) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
