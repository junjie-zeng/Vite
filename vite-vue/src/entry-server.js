import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(_url) {
  // 得到服务端渲染的实例
  const { app } = createApp()
  const ctx = {}
  // 用于将 Vue 应用实例渲染成 HTML 字符串
  const html = await renderToString(app, ctx)

  return html
}
