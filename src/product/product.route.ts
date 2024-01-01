import { Router } from 'express';

import { ProductController } from './product.controller';

export const productRouter = Router();
const controller = new ProductController();

productRouter.post('/', controller.create);
productRouter.get('/', controller.getAll);
productRouter.get('/:id', controller.getOne);
productRouter.put('/:id', controller.update);
productRouter.delete('/:id', controller.delete);
