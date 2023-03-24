const express = require("express");
const router = express.Router();
const formatResponse = require("../utils/formatResponse");
const analysisToken = require("../utils/analysisToken");
const { loginService, updateService } = require("../service/userService.js");
const { ValidatioError } = require("../utils/errors");

router.post("/login", async function (req, res, next) {
  const captcha = req.body.captcha;
  if (captcha.toLowerCase() !== req.session.captcha) {
    req.session.captcha = "";
    throw new ValidatioError("验证码错误");
  }
  req.session.captcha = "";
  const { data, token } = await loginService(req.body);
  if (token) res.setHeader("authentication", token);
  res.send(formatResponse(data));
});

router.get("/whoami", async function (req, res, next) {
  const tokenInfo = analysisToken(req.get("Authorization"));
  res.send(
    formatResponse({
      loginId: tokenInfo.loginId,
      name: tokenInfo.name,
      id: tokenInfo.id,
    })
  );
});

router.put("/", async function (req, res, next) {
  const data = await updateService(req.body);
  res.send(formatResponse(data));
});

module.exports = router;
