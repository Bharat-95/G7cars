import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const proxy = createProxyMiddleware({
  target: 'https://accounts.g7cars.com/sign-in',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '',
  },
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('Access-Control-Allow-Origin', '*');
  },
});

export default function handler(req, res) {
  return proxy(req, res);
}
