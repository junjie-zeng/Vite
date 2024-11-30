import './index.css'
import './index.less'
import VITE_PNG from '../assets/vite.png'
const render = () => {
  const div = document.createElement('div')
  div.className = 'container'
  const span = document.createElement('span')
  span.innerHTML = 'Hello Vite 1'
  div.appendChild(span)
  const img = document.createElement('img')
  img.src = VITE_PNG
  img.className = 'w-200px h-200px'

  const app = document.querySelector('#app')
  app.appendChild(div)
  app.append(img)
}

render()
