const Scene = require('../models/Scene');

// Lấy danh sách toàn bộ các cảnh (Dùng cho frontend gọi ra hiển thị)
const getAllScenes = async (req, res) => {
  try {
    const scenes = await Scene.find();
    res.status(200).json(scenes);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error });
  }
};

// Thêm một cảnh 360 mới vào Database
const createScene = async (req, res) => {
  try {
    const newScene = new Scene(req.body);
    const savedScene = await newScene.save();
    res.status(201).json(savedScene);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi tạo cảnh mới', error });
  }
};

module.exports = { getAllScenes, createScene };