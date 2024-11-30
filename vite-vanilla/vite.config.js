import { defineConfig } from 'vite'
import VitePluginChecker from 'vite-plugin-checker'
import VitePluginHtml from './plugins/VitePluginHtml.js'
import MyRollupPlugin from './plugins/MyRollupPlugin.js'
import MyVitePlugin from './plugins/MyVitePlugin.js'
export default defineConfig({
  // optimizeDeps:{
  //   exclude: ['lodash-es']
  // },
  plugins: [
    VitePluginChecker({ typescript: true }),
    // vite独有钩子
    MyVitePlugin(),
    // rollup与vite通用钩子
    // MyRollupPlugin(),
    // 自定义插件
    // VitePluginHtml({
    //   title: 'hello vite !!!'
    // })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lodash-es')) {
              return 'lodash-es'
            }
            return 'vendor'
          }
          // 单独打包page1
          if (id.includes('src/page1')) {
            return 'page1'
          }
          // 单独打包page4和它的组件
          if (
            [
              'src/page4',
              'src/page4/components/content',
              'src/page4/components/head',
              'src/page4/components/footer',
            ].some(page => id.includes(page))
          ) {
            console.log('page4')
            return 'page4'
          }
        }
      }
    }
  }
})
