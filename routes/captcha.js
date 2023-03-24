const express = require("express");
const router = express.Router();
const { getCaptchaService } = require("../service/captchaService");
router.get("/captcha", async function (req, res, next) {
  const captcha = getCaptchaService();
  req.session.captcha = captcha.text.toLowerCase();
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(captcha.data);
});
module.exports = router;
