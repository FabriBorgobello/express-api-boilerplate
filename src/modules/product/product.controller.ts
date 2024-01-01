import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { ProductCreateSchema, ProductUpdateSchema } from './product.schema';

import { db } from '@/database';

export class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = ProductCreateSchema.parse(req.body);
      const result = await db
        .insertInto('product')
        .values(body)
        .returningAll()
        .executeTakeFirstOrThrow();
      res.json(result).status(201);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await db.selectFrom('product').selectAll().execute();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z.coerce.number().parse(req.params.id);
      const result = await db
        .selectFrom('product')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirstOrThrow();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z.coerce.number().parse(req.params.id);
      const updateWith = ProductUpdateSchema.parse(req.body);
      const result = await db
        .updateTable('product')
        .set(updateWith)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z.coerce.number().parse(req.params.id);
      await db
        .deleteFrom('product')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirstOrThrow();
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
