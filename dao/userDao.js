const userModel = require("./models/userModel");

exports.loginDao = async function (loginInfo) {
  // console.log(loginInfo, "-----");
  const res = await userModel.findOne({
    attributes: ["loginId", "name"],
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
  let data = JSON.stringify(res, null, 2);
  console.log(data, typeof data, "------------------");
  if (res) {
    return res.toJSON();
  } else {
    return null;
  }
};
