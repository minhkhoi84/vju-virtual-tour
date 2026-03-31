import mongoose from 'mongoose';
import Scene from '../models/Scene.js';

export async function recordView(req, res) {
  try {
    const { sceneId } = req.body ?? {};
    if (!sceneId || !mongoose.Types.ObjectId.isValid(sceneId)) {
      return res.status(400).json({ message: 'body.sceneId must be a valid MongoDB ObjectId' });
    }
    const scene = await Scene.findByIdAndUpdate(
      sceneId,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!scene) {
      return res.status(404).json({ message: 'Scene not found' });
    }
    res.json({ sceneId: scene._id, views: scene.views });
  } catch (err) {
    res.status(500).json({ message: 'Failed to record view', error: err.message });
  }
}

export async function getTopScenes(req, res) {
  try {
    const top = await Scene.find().sort({ views: -1 }).limit(5).select('title views thumbnail image360Url');
    res.json(top);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get top scenes', error: err.message });
  }
}
