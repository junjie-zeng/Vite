export default function MyVitePlugin(options) {
  return {
    name: 'MyVitePlugin',
    config(config) {
    //   console.log('获取到配置 ...', config)
      console.log('vite 获取到配置 ...')
      // 修改 Vite 配置
      return {
        ...config,
        ...options,
        aaaa: 'aaaa'
      }
    },
    configResolved(resolvedConfig) {
      // Vite 配置解析完成后的操作
      //   resolvedConfig.aaaa = 'bbbb'
      //   console.log('配置最终的解析结果 ...', resolvedConfig)
      console.log('vite 配置最终的解析结果 ...')
    },
    configureServer(server) {
      console.log('vite 配置开发服务器 ...')
      // 给开发服务器添加中间件
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api') {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end('拦截你！！！')
        } else {
          next()
        }
      })
    },
    transformIndexHtml(html) {
      console.log('vite 转换 index.html 内容 ...', Date.now())
      // 修改 HTML 内容，比如注入脚本或样式
      return html.replace('<body>', `<body><script>console.log("我是注入的日志！！!")</script>`)
    },
    handleHotUpdate({ file, server }) {
      console.log('vite 热更新 , 文件被更改', file)
      // 监听特定文件更新，并做出响应
    }
  }
}
