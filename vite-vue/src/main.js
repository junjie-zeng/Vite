// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')


import { createSSRApp } from 'vue'
import App from './App.vue'


export function createApp() {
  // 使用 createSSRApp 创建一个服务端渲染的 Vue 应用实例
  const app = createSSRApp(App)
  return { app }
}