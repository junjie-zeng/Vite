


const render = () => {
  console.log('page3 。。。。!!!!!11')
}



export default render

// import.meta.hot 实现热模块替换的 API
if(import.meta.hot){
   // accept 接收模块的自身，从回调中拿到 newModule（ 已更新的模块）
  import.meta.hot.accept((newModule)=>{
    // console.log(newModule);
    newModule.default()
  })
}