import { Router } from 'express';
import { ItemController } from '../controllers/itemController';
import { createItemValidation, updateItemValidation, validateItemId } from '../middlewares/validation';

const router = Router();
const itemController = new ItemController();

// POST: Create a new item
router.post('/', createItemValidation, itemController.createItem);

// GET: Get all items
router.get('/', itemController.getAllItems);

// GET: Get item by ID
router.get('/:id', validateItemId, itemController.getItemById);

// PUT: Update item by ID
router.put('/:id', updateItemValidation, itemController.updateItem);

// DELETE: Delete item by ID
router.delete('/:id', validateItemId, itemController.deleteItem);

export default router;
