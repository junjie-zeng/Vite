import Head from './components/head.js'
import Footer from './components/footer.js'
import Content from './components/content.js'
import { getName } from '../utils.js'

const render = () => {
  Head()
  Content()
  Footer()
  console.log(getName());
}

render()
