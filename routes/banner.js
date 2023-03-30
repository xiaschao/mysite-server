const express = require("express");
const { getBannerService, updateBannerService } = require("../service/bannerService");
const formatResponse = require("../utils/formatResponse");
const router = express.Router();

router.get("/", async function (req, res, next) {
  res.send(formatResponse(await getBannerService()));
});

router.post("/", async function (req, res) {
  const resp = await updateBannerService(req.body);
  res.send(formatResponse(resp));
});

module.exports = router;
