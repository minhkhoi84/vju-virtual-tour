import { Router } from 'express';
import { requireAdmin } from '../middlewares/admin.js';
import {
  createFeedback,
  getLatestFeedback,
  deleteFeedback,
} from '../controllers/feedbackController.js';

const router = Router();

router.post('/', createFeedback);
router.get('/latest', getLatestFeedback);
router.delete('/:id', requireAdmin, deleteFeedback);

export default router;
