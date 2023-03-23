const svgCaptcha = require("svg-captcha");

exports.getCaptchaService = function () {
  return svgCaptcha.create({
    size: 6,
    ignoreChars: "0Oo1ilI",
    noise: 6,
    color: true,
  });
};
