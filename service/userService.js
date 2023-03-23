const md5 = require("md5");
const { loginDao, updateUserDao } = require("../dao/userDao");
const jwt = require("jsonwebtoken");
const { ValidatioError } = require("../utils/errors");
// user 模块业务层
exports.loginService = async function (loginInfo) {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  let data = await loginDao(loginInfo.loginId, loginInfo.loginPwd);
  let loginPeriod; //token 过期时间
  if (data) {
    // 登录成功
    const remember = loginInfo.remember;
    loginPeriod = remember ? parseInt(remember) : 1;
    // console.log(loginPeriod);

    const token = jwt.sign(
      {
        id: data.id,
        loginId: data.loginId,
        name: data.name,
      },
      md5(process.env.JWT_SECRET),
      { expiresIn: 60 * 60 * 24 * loginPeriod }
    );
    return {
      data,
      token,
    };
  }
  return {
    data,
  };
};

exports.updateService = async function (userInfo) {
  if (userInfo.oldLoginPwd) userInfo.oldLoginPwd = md5(userInfo.oldLoginPwd);
  if (userInfo.loginPwd) userInfo.loginPwd = md5(userInfo.loginPwd);
  const loginRes = await loginDao(userInfo.loginId, userInfo.oldLoginPwd);
  if (loginRes) {
    // 旧密码正确
    await updateUserDao(userInfo);
    return await loginDao(userInfo.loginId, userInfo.loginPwd);
  } else {
    throw new ValidatioError("旧密码错误");
  }
};
