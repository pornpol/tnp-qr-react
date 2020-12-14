const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    createProxyMiddleware(["/api", "/pdfs"], { target: "http://localhost:5000" })
  );
}