const userModel = require("./models/userModel");

exports.loginDao = async function (loginInfo) {
  // console.log(loginInfo, "-----");
  const res = await userModel.findOne({
    attributes: ["id", "loginId", "name"],
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd,
    },
  });
  if (res) {
    return res.toJSON();
  } else {
    return null;
  }
};
