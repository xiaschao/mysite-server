const bannerModel = require("./models/bannerModel");

exports.findBannerDao = async function () {
  const data = await bannerModel.findAll({
    attributes: ["id", "midImg", "bigImg", "title", "description"],
  });
  if (data) {
    return JSON.parse(JSON.stringify(data));
  } else {
    return null;
  }
};
