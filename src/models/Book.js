import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    trim: true,
    maxlength: [50, 'Author name cannot be more than 50 characters']
  },
  genre: {
    type: String,
    required: [true, 'Please add a genre'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  coverImage: {
    type: String,
    default: 'default-book-cover.jpg'
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a text index for searching
BookSchema.index({ 
  title: 'text', 
  author: 'text', 
  genre: 'text', 
  description: 'text' 
});

const Book = mongoose.model('Book', BookSchema);

export default Book;