import mongoose from 'mongoose';
import Feedback from '../models/Feedback.js';

const LATEST_LIMIT = 20;

export async function createFeedback(req, res) {
  try {
    const { rating, comment = '' } = req.body ?? {};
    if (rating === undefined || rating === null) {
      return res.status(400).json({ message: 'rating is required (1-5)' });
    }
    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) {
      return res.status(400).json({ message: 'rating must be an integer between 1 and 5' });
    }
    if (typeof comment !== 'string' || comment.length > 200) {
      return res.status(400).json({ message: 'comment must be a string with at most 200 characters' });
    }
    const doc = await Feedback.create({ rating: r, comment: comment.trim() });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create feedback', error: err.message });
  }
}

export async function getLatestFeedback(req, res) {
  try {
    const items = await Feedback.find().sort({ createdAt: -1 }).limit(LATEST_LIMIT);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list feedback', error: err.message });
  }
}

export async function deleteFeedback(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid feedback id' });
    }
    const removed = await Feedback.findByIdAndDelete(id);
    if (!removed) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete feedback', error: err.message });
  }
}
