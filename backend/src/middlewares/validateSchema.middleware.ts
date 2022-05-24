import { AnySchema } from 'yup';
import { NextFunction, Request, Response } from 'express';

const validateSchema =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validated = validated;

      return next();
    } catch (error) {
      return res.status(400).json({ errors: error.errors });
    }
  };

export default validateSchema;
