const md5 = require("md5");
const sequelize = require("./dbConnection");
const userModel = require("./models/userModel");

(async function () {
  // 同步表和数据模型
  await sequelize.sync({
    alter: true,
  });

  // 检查表中是否有数据
  const userCount = await userModel.count();
  // console.log(adminCount);
  if (!userCount) {
    await userModel.create({
      loginId: "admin",
      name: "超级管理员",
      loginPwd: md5("123456"),
    });
    console.log("管理员数据初始化完毕......");
  }
})();
