import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export default Wishlist;