const bannerModel = require("./models/bannerModel");

async function findBannerDao() {
  const data = await bannerModel.findAll({
    attributes: ["id", "midImg", "bigImg", "title", "description"],
  });
  if (data) {
    return JSON.parse(JSON.stringify(data));
  } else {
    return null;
  }
}

async function updateBannerDao(bannerArr) {
  await bannerModel.destroy({
    truncate: true,
  });
  await bannerModel.bulkCreate(bannerArr);
  return findBannerDao();
}

module.exports = {
  findBannerDao,
  updateBannerDao,
};
