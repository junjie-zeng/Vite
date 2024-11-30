import { add } from 'lodash-es'
import { getName } from './src/utils.js'
import './src/page1/index'
import './src/page2/index'
import './src/page4/index'
import './style.css'

// 动态导入
const render = () => {
  console.log('hhhhhhhhhhh' + getName())
  console.log(add(1, 2))
  console.log('Hello Vite!!!!!!!!!!!!')
  import('./src/page3/index').then(module => {
    module.default()
  })
}

render()
