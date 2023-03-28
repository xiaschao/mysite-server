const { findBannerDao } = require("../dao/bannerDao");

exports.getBannerService = async function () {
  return await findBannerDao();
};
