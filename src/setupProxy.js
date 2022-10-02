const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  if (process.env.PROXY_ENV === 'proxy') {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:3080',
        changeOrigin: true,
      })
    )
  }
}
