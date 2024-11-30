const chokidar = require('chokidar')
const WebSocket = require('ws')
const express = require('express')
const path = require('path')

// 创建 WebSocket 服务端
const wss = new WebSocket.Server({ port: 3001 }, () => {
  console.log('WebSocket 服务启动，监听端口 3001')
})

// 监听 WebSocket 连接
wss.on('connection', ws => {
  console.log('浏览器已连接 WebSocket')
  ws.on('close', () => console.log('浏览器断开 WebSocket 连接'))
})

// 向客户端广播消息
function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

// 设置文件监控
const watcher = chokidar.watch('./src', {
  ignored: /node_modules/, // 设置忽略规则
  persistent: true // 是否一直监视
})

// 文件变化事件
watcher
  .on('change', filePath => {
    console.log(`文件修改: ${filePath}`)
    const fileType = path.extname(filePath)
    let messageType = 'reload' // 默认刷新页面

    // 根据文件类型选择热更新处理
    if (fileType === '.css') {
      messageType = 'css-update' // 仅更新 CSS
    } else if (['.js', '.ts', '.vue'].includes(fileType)) {
      messageType = 'js-update' // 重新加载模块
    }

    // 向 WebSocket 客户端广播消息
    broadcast({ type: messageType, path: filePath })
  })
  .on('add', filePath => console.log(`文件新增: ${filePath}`))
  .on('unlink', filePath => console.log(`文件删除: ${filePath}`))

// 使用 Express 模拟文件服务
const app = express()
app.use(express.static('src'))

// 启动 HTTP 服务
app.listen(3000, () => {
  console.log('静态文件服务启动，监听端口 3000')
})
