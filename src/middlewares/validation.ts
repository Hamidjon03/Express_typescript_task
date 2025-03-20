import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

// Define Status enum to match the one in Prisma schema
export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

// Middleware to check for validation errors
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array()
    });
  }
  next();
};

// Validation rules for creating an item
export const createItemValidation = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  
  body('status')
    .optional()
    .isIn(Object.values(Status)).withMessage(`Status must be one of: ${Object.values(Status).join(', ')}`),
  
  validateRequest
];

// Validation rules for updating an item
export const updateItemValidation = [
  param('id')
    .notEmpty().withMessage('Item ID is required')
    .isUUID().withMessage('Item ID must be a valid UUID'),
  
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  
  body('status')
    .optional()
    .isIn(Object.values(Status)).withMessage(`Status must be one of: ${Object.values(Status).join(', ')}`),
  
  validateRequest
];

// Validation for getting and deleting an item
export const validateItemId = [
  param('id')
    .notEmpty().withMessage('Item ID is required')
    .isUUID().withMessage('Item ID must be a valid UUID'),
  
  validateRequest
];
