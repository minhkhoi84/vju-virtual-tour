import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    sceneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, maxlength: 200, default: '', trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);