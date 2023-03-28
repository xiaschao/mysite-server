const userModel = require("./models/userModel");
const md5 = require("md5");
const bannerModel = require("./models/bannerModel");

module.exports = async function () {
  // 检查表中是否有数据
  const userCount = await userModel.count();
  if (!userCount) {
    await userModel.create({
      loginId: "admin",
      name: "超级管理员",
      loginPwd: md5("123456"),
    });
    console.log("管理员数据初始化完毕......");
  }

  const bannerCount = await bannerModel.count();
  if (!bannerCount) {
    await bannerModel.bulkCreate([
      {
        midImg: "/static/images/bg1_mid.jpg",
        bigImg: "/static/images/bg1_big.jpg",
        title: "塞尔达旷野之息",
        description: "2017年年度游戏，期待续作",
      },
      {
        midImg: "/static/images/bg2_mid.jpg",
        bigImg: "/static/images/bg2_big.jpg",
        title: "塞尔达四英杰",
        description: "四英杰里面你最喜欢的又是谁呢",
      },
      {
        midImg: "/static/images/bg3_mid.jpg",
        bigImg: "/static/images/bg3_big.jpeg",
        title: "日本街道",
        description: "动漫中经常出现的日本农村街道，一份独特的恬静",
      },
    ]);
    console.log("初始化首页标语数据...");
  }
};
