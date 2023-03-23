const express = require("express");
const router = express.Router();
const formatResponse = require("../utils/formatResponse");
const { getCaptchaService } = require("../service/captchaService");
router.get("/", async function (req, res, next) {
  const captcha = getCaptchaService();
  req.session.captcha = captcha.text.toLowerCase();
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(captcha.data);
});
module.exports = router;
