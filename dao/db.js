const sequelize = require("./dbConnection");
const initData = require("./initData");

(async function () {
  // 同步表和数据模型
  await sequelize.sync({
    alter: true,
  });
  await initData();
  console.log("数据库数据已经准备完毕....");
})();
