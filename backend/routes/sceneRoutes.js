const express = require('express');
const router = express.Router();
const { getAllScenes, createScene } = require('../controllers/sceneController');

// GET: Lấy danh sách scene
router.get('/', getAllScenes);

// POST: Thêm scene mới
router.post('/', createScene);

module.exports = router;