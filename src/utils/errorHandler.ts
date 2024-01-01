import { NextFunction, Request, Response } from 'express';
import { NoResultError } from 'kysely';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { ApiError } from '@/utils/ApiError';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
}
