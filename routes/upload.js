const express = require("express");
const { UploadError } = require("../utils/errors");
const upload = require("../utils/upload");
const router = express.Router();
const multer = require("multer");
const formatResponse = require("../utils/formatResponse");
router.post("/", async function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      // console.log(err.message);
      next(new UploadError(err.message));
      return;
    }
    // Everything went fine.
    // console.log(req);
    res.send(formatResponse(`static/upload/${req.file.filename}`));
  });
});
module.exports = router;
