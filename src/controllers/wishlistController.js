import Wishlist from '../models/Wishlist.js';
import Book from '../models/Book.js';

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('books');
    
    // If no wishlist found, create one
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        books: []
      });
      
      wishlist = await Wishlist.findOne({ user: req.user.id }).populate('books');
    }
    
    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Add book to wishlist
// @route   POST /api/wishlist/:bookId
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;
    
    // Check if book exists
    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    
    // Find user's wishlist
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    // If no wishlist found, create one
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        books: [bookId]
      });
    } else {
      // Check if book already in wishlist
      if (wishlist.books.includes(bookId)) {
        return res.status(400).json({
          success: false,
          error: 'Book already in wishlist'
        });
      }
      
      // Add book to wishlist
      wishlist.books.push(bookId);
      await wishlist.save();
    }
    
    // Get populated wishlist
    wishlist = await Wishlist.findOne({ user: req.user.id }).populate('books');
    
    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Remove book from wishlist
// @route   DELETE /api/wishlist/:bookId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const { bookId } = req.params;
    
    // Find user's wishlist
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    
    // If no wishlist found, create one
    if (!wishlist) {
      return res.status(404).json({
        success: false,
        error: 'Wishlist not found'
      });
    }
    
    // Check if book in wishlist
    if (!wishlist.books.includes(bookId)) {
      return res.status(400).json({
        success: false,
        error: 'Book not in wishlist'
      });
    }
    
    // Remove book from wishlist
    wishlist.books = wishlist.books.filter(
      book => book.toString() !== bookId
    );
    
    await wishlist.save();
    
    // Get populated wishlist
    wishlist = await Wishlist.findOne({ user: req.user.id }).populate('books');
    
    res.status(200).json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};