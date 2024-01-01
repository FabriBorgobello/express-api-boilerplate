import 'dotenv/config';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { NoResultError } from 'kysely';
import morgan from 'morgan';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

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
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    // ApiError (custom error)
    res.status(err.status).json({ message: err.message });
    // ZodError (validation error)
  } else if (err instanceof ZodError) {
    const error = fromZodError(err); // Parse ZodError to get a more readable error message
    res.status(400).json({ message: error.message });
    // Kysely NoResultError (no result found in database)
  } else if (err instanceof NoResultError) {
    res.status(404).json({ message: 'Not found' });
    // Other errors
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
