import { Router } from 'express';
import { requireAdmin } from '../middlewares/admin.js';
import {
  getAllScenes,
  getSceneById,
  createScene,
  updateScene,
  deleteScene,
} from '../controllers/sceneController.js';

const router = Router();

router.get('/', getAllScenes);
router.get('/:id', getSceneById);
router.post('/', requireAdmin, createScene);
router.put('/:id', requireAdmin, updateScene);
router.delete('/:id', requireAdmin, deleteScene);

export default router;
