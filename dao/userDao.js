const userModel = require("./models/userModel");
// const md5 = require("md5")
exports.loginDao = async function (loginId, loginPwd) {
  // console.log(loginInfo, "-----");
  const res = await userModel.findOne({
    attributes: ["id", "loginId", "name"],
    where: {
      loginId,
      loginPwd,
    },
  });
  if (res) {
    return res.toJSON();
  } else {
    return null;
  }
};

exports.updateUserDao = async function (userInfo) {
  const res = await userModel.update(
    {
      name: userInfo.name,
      loginPwd: userInfo.loginPwd,
    },
    {
      where: {
        loginId: userInfo.loginId,
      },
    }
  );
  return res;
};
