import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from '@/config';
import { productRouter } from '@/modules/product/product.route';
import { errorHandler } from '@/utils/errorHandler';

const app = express();
const port = env.PORT;

// Middlewares
app.use(cors());
app.use(helmet()); // Security
app.use(morgan('dev')); // Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/product', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
