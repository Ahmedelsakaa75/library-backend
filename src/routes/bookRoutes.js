import express from 'express';
import { 
  getBooks, 
  getBook, 
  createBook, 
  updateBook, 
  deleteBook 
} from '../controllers/bookController.js';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(protect, isAdmin, createBook);

router.route('/:id')
  .get(getBook)
  .put(protect, isAdmin, updateBook)
  .delete(protect, isAdmin, deleteBook);

export default router;