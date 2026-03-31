import { Router } from 'express';
import { recordView, getTopScenes } from '../controllers/analyticsController.js';

const router = Router();

router.post('/view', recordView);
router.get('/top-scenes', getTopScenes);

export default router;
