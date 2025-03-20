import { Status } from '../middlewares/validation';
import { ItemDTO, Item } from '../types';
import prisma from '../utils/prisma';
import { HttpException } from '../middlewares/errorHandler';

export class ItemService {
  /**
   * Create a new item
   */
  async createItem(data: ItemDTO): Promise<Item> {
    try {
      return await prisma.item.create({
        data: {
          title: data.title,
          description: data.description,
          status: data.status || Status.ACTIVE
        }
      });
    } catch (error) {
      console.error('Failed to create item:', error);
      throw new HttpException(500, 'Failed to create item');
    }
  }

  /**
   * Get all items
   */
  async getAllItems(): Promise<Item[]> {
    try {
      return await prisma.item.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });
    } catch (error) {
      console.error('Failed to retrieve items:', error);
      throw new HttpException(500, 'Failed to retrieve items');
    }
  }

  /**
   * Get item by ID
   */
  async getItemById(id: string): Promise<Item> {
    try {
      const item = await prisma.item.findUnique({
        where: { id }
      });

      if (!item) {
        throw new HttpException(404, `Item with ID ${id} not found`);
      }

      return item;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Failed to retrieve item with ID ${id}:`, error);
      throw new HttpException(500, `Failed to retrieve item with ID ${id}`);
    }
  }

  /**
   * Update item by ID
   */
  async updateItem(id: string, data: Partial<ItemDTO>): Promise<Item> {
    try {
      // Check if item exists
      const existingItem = await this.getItemById(id);

      return await prisma.item.update({
        where: { id },
        data
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Failed to update item with ID ${id}:`, error);
      throw new HttpException(500, `Failed to update item with ID ${id}`);
    }
  }

  /**
   * Delete item by ID
   */
  async deleteItem(id: string): Promise<void> {
    try {
      // Check if item exists
      const existingItem = await this.getItemById(id);

      await prisma.item.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error(`Failed to delete item with ID ${id}:`, error);
      throw new HttpException(500, `Failed to delete item with ID ${id}`);
    }
  }
}
