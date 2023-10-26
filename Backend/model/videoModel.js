const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  name: String,
  path: String,
  description: String,
  tags: [String],
  facultyEmail: String, // Add the faculty's email
  ratings: [{ studentId: String, facultyEmail: String, rating: Number, timestamp: Date }],
  averageRating: {
    type: Number,
    default: 1, // Default value is 0
  },
});

videoSchema.index({ name: 'text', description: 'text' });

// Function to calculate the average rating
videoSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
  } else {
    const totalRating = this.ratings.reduce((sum, ratingObj) => sum + ratingObj.rating, 0);
    this.averageRating = totalRating / this.ratings.length;
  }
};

module.exports = mongoose.model('Video', videoSchema);
