import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, maxlength: 200, default: '', trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);
