const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  // 文件存储的位置
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/static/upload"));
  },
  // 上传过后的文件名
  filename: function (req, file, cb) {
    // 时间戳+6位随机字符
    const timeStamp = Date.now();
    const randomStr = Math.random().toString(36).slice(-6);
    const ext = path.extname(file.originalname);
    const filename = `${timeStamp}-${randomStr}${ext}`;
    cb(null, filename);
  },
});

module.exports = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 1,
  },
}).single("file");
