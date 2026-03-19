const mongoose = require('mongoose');

const sceneSchema = new mongoose.Schema({
  sceneId: {
    type: String,
    required: true,
    unique: true,
    // Ví dụ: 'cong_chinh', 'thu_vien' (dùng để map với tool 360 sau này)
  },
  title: {
    type: String,
    required: true,
    // Ví dụ: 'Cổng chính Cơ sở Mỹ Đình'
  },
  description: {
    type: String,
    // Mô tả ngắn gọn về khu vực này
  },
  panoramaUrl: {
    type: String,
    // Link dẫn đến file ảnh 360 gốc nếu cần thiết
  },
  hotspots: [
    {
      pitch: Number, // Tọa độ dọc
      yaw: Number,   // Tọa độ ngang
      type: String,  // Loại hotspot (ví dụ: 'info' để hiện thông tin, 'link' để chuyển cảnh)
      targetSceneId: String, // Nếu là link thì sẽ chuyển đến scene nào
      text: String   // Nội dung hiển thị khi hover/click
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Scene', sceneSchema);