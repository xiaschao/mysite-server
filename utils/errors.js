const formatResponse = require("./formatResponse");
// 自定义错误

// 业务错误处理基本类
class ErrorService extends Error {
  /**
   *
   * @param {*} message 错误消息
   * @param {*} errCode 错误消息码
   */
  constructor(message, errCode) {
    super(message);
    // this.message = message;
    this.errCode = errCode;
  }

  toResponseJson() {
    return formatResponse(null, this.errCode, this.message);
  }
}

// 文件上传错误
exports.UploadError = class extends ErrorService {
  constructor(message) {
    super(message, 413);
  }
};
// 禁止访问错误
exports.ForbiddenError = class extends ErrorService {
  constructor(message) {
    super(message, 401);
  }
};
// 数据验证错误
exports.ValidatioError = class extends ErrorService {
  constructor(message) {
    super(message, 406);
  }
};
// 无资源错误
exports.NotFoundError = class extends ErrorService {
  constructor() {
    super("not found", 404);
  }
};
// 其他错误
exports.UnknownError = class extends ErrorService {
  constructor() {
    super("service internal error", 500);
  }
};
