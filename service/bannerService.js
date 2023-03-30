const { findBannerDao, updateBannerDao } = require("../dao/bannerDao");

exports.getBannerService = async function () {
  return await findBannerDao();
};

exports.updateBannerService = async function (bannerArr) {
  return await updateBannerDao(bannerArr);
};
