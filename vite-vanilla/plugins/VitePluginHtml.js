export default options => {
  const { title } = options
  return {
    // 转换html
    transformIndexHtml: (html, ctx) => {
      // ctx : 当前整个请求的执行上下文
      //   console.log(html, ctx)
      return html.replace(/<%= title %>/g, title)
    }
  }
}
