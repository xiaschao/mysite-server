// 需要排除验证token的路由
module.exports = function () {
  return [
    {
      url: "/api/admin/login",
      methods: ["POST"],
    },
    {
      url: "/api/banner",
      methods: ["GET"],
    },
  ];
};
