import fs from 'fs'
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()
  // 以中间件模式创建 Vite 应用
  const vite = await createViteServer({
    // 禁用 Vite 自身的 HTML 服务逻辑，由外部服务器（Express）接管请求处理
    server: { middlewareMode: true },
    // 指定 Vite 是为自定义服务器环境服务
    appType: 'custom'
  })

  // 使用 Vite 中间件
  app.use(vite.middlewares)
  // 捕获所有请求并处理
  app.use('*', async (req, res) => {
    const url = req.originalUrl
    try {
      // 读取 index.html 模板
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      // 对读取的 HTML 模板执行 Vite 的 transformIndexHtml 方法进行转换（注入开发工具所需的脚本，并解析 HTML 中的资源路径）
      template = await vite.transformIndexHtml(url, template)
      // 加载 SSR 模块并渲染内容
      const render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      // 调用 render 函数生成页面内容
      const appContent = await render(url)
      // 将渲染后的结果注入到HTML 到模板中。
      const html = template.replace(`<!--ssr-outlet-->`, appContent)
      // 返回渲染后的 HTML。
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，使错误信息映射到源代码
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(3005, () => {
    console.log('server is running at http://localhost:3001')
  })
}

createServer()
