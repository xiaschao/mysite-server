const md5 = require("md5");
const { loginDao } = require("../dao/userDao");
const jwt = require("jsonwebtoken");
// user 模块业务层
exports.loginService = async function (loginInfo) {
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  let data = await loginDao(loginInfo);
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
