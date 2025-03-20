import { Request, Response, NextFunction } from 'express';
import { ItemService } from '../services/itemService';
import { HttpException } from '../middlewares/errorHandler';
import { ItemDTO } from '../types';

export class ItemController {
  private itemService: ItemService;

  constructor() {
    this.itemService = new ItemService();
  }

  /**
   * Create a new item
   */
  createItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const itemData: ItemDTO = req.body;
      const item = await this.itemService.createItem(itemData);
      
      res.status(201).json({
        status: 'success',
        data: item
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all items
   */
  getAllItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = await this.itemService.getAllItems();
      
      res.status(200).json({
        status: 'success',
        results: items.length,
        data: items
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get item by ID
   */
  getItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const item = await this.itemService.getItemById(id);
      
      res.status(200).json({
        status: 'success',
        data: item
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update item by ID
   */
  updateItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const itemData: Partial<ItemDTO> = req.body;
      const updatedItem = await this.itemService.updateItem(id, itemData);
      
      res.status(200).json({
        status: 'success',
        data: updatedItem
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete item by ID
   */
  deleteItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.itemService.deleteItem(id);
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
