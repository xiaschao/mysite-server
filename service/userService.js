const md5 = require("md5");
const { loginDao } = require("../dao/userDao");
const jwt = require("jsonwebtoken");

// user 模块业务层
exports.loginService = async function (loginInfo) {
  // console.log(loginInfo);
  loginInfo.loginPwd = md5(loginInfo.loginPwd);
  let data = await loginDao(loginInfo);

  // data = JSON.parse(data);
  // let loginPeriod; //token 过期时间
  // if (data) {
  //   // 登录成功
  //   const remember = loginInfo.remember;
  //   loginPeriod = remember ? parseInt(remember) : 1;
  //   // console.log(loginPeriod);

  //   const token = jwt.sign({
  //     loginId: data.loginId,
  //     name: data.name,
  //   });
  // }
  return data;
};
