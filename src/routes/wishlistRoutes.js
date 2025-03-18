import express from 'express';
import { 
  getWishlist, 
  addToWishlist, 
  removeFromWishlist 
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/:bookId', protect, addToWishlist);
router.delete('/:bookId', protect, removeFromWishlist);

export default router;