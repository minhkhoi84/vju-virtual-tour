import mongoose from 'mongoose';

const sceneSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    image360Url: { type: String, required: true, trim: true },
    thumbnail: { type: String, default: '', trim: true },
    views: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Scene', sceneSchema);
