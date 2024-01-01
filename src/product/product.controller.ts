import { Request, Response } from 'express';

export class ProductController {
  async create(req: Request, res: Response) {
    res.send('Create product');
  }
  async getAll(req: Request, res: Response) {
    res.send('Get all products');
  }
  async getOne(req: Request, res: Response) {
    res.send('Get one product');
  }
  async update(req: Request, res: Response) {
    res.send('Update product');
  }
  async delete(req: Request, res: Response) {
    res.send('Delete product');
  }
}
