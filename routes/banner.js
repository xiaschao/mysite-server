const express = require("express");
const { getBannerService } = require("../service/bannerService");
const formatResponse = require("../utils/formatResponse");
const router = express.Router();

router.get("/", async function (req, res, next) {
  res.send(formatResponse(await getBannerService()));
});

module.exports = router;
