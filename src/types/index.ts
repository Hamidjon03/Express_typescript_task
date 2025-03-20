import { Status } from '../middlewares/validation';

export interface ItemDTO {
  title: string;
  description?: string;
  status?: Status;
}

export interface Item {
  id: string;
  title: string;
  description: string | null;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItemResponse extends Item {}

// Extend Express Request interface for error handling
declare global {
  namespace Express {
    interface Request {
      item?: ItemResponse;
    }
  }
}
