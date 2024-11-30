export default function MyRollupPlugin(config) {
  return {
    name: 'MyRollupPlugin',
    options(opts) {
      // console.log('rollup 获取到配置 ... ', opts)
      console.log('rollup 获取到配置 ... ')
      return opts // 返回修改后的配置
    },
    buildStart() {
      // 执行一些初始化逻辑，例如准备构建资源
      console.log('构建开始咯 ...')
    },
    resolveId(source, importer) {
      console.log('解析 ... ', source, '导入的 ...', importer)
      // 自定义模块解析逻辑
      //   if (source === 'my-custom-module') {
      //     return source // 返回自定义模块 ID
      //   }
      return null
    },
    load(id) {
      console.log('加载对应文件 ... ', id)
      // 返回自定义模块内容
      //   if (id === 'my-custom-module') {
      //     return "export default 'console.log('这是自定义模块')!';"
      //   }
      return null
    },
    transform(code, id) {
      console.log(code);
      console.log('根据文件转换为目标代码 ...', id)
      // 对模块代码进行处理
      //   if (id.endsWith('.js')) {
      //     return {
      //       code: code.replace('console.log', 'console.debug')
      //     }
      //   }
      return null
    },
    buildEnd() {
      console.log('构建结束咯 ...')
      // 资源清理或汇总统计
    },
    closeBundle() {
      console.log('关闭啦 ...')
      // 构建完成后的一些操作，例如清理缓存
    }
  }
}
