const express = require("express");
const router = express.Router();

const { loginService } = require("../service/userService.js");

router.post("/login", async function (req, res, next) {
  // console.log(req.body, "登录");
  const data = await loginService(req.body);
  // console.log(data, ">>>");
});

module.exports = router;
