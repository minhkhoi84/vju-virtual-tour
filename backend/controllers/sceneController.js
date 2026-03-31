import mongoose from 'mongoose';
import Scene from '../models/Scene.js';

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function getAllScenes(req, res) {
  try {
    const scenes = await Scene.find().sort({ createdAt: -1 });
    res.json(scenes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list scenes', error: err.message });
  }
}

export async function getSceneById(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Invalid scene id' });
    }
    const scene = await Scene.findById(id);
    if (!scene) {
      return res.status(404).json({ message: 'Scene not found' });
    }
    res.json(scene);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get scene', error: err.message });
  }
}

export async function createScene(req, res) {
  try {
    const scene = new Scene(req.body);
    await scene.save();
    res.status(201).json(scene);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create scene', error: err.message });
  }
}

export async function updateScene(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Invalid scene id' });
    }
    const scene = await Scene.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!scene) {
      return res.status(404).json({ message: 'Scene not found' });
    }
    res.json(scene);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update scene', error: err.message });
  }
}

export async function deleteScene(req, res) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ message: 'Invalid scene id' });
    }
    const scene = await Scene.findByIdAndDelete(id);
    if (!scene) {
      return res.status(404).json({ message: 'Scene not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete scene', error: err.message });
  }
}
