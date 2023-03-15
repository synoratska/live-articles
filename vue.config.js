// module.exports = {
//   chainWebpack: (config) => {
//     const svgRule = config.module.rule('svg')

//     svgRule.uses.clear()

//     svgRule
//       .use('babel-loader')
//       .loader('babel-loader')
//       .end()
//       .use('vue-svg-loader')
//       .loader('vue-svg-loader')
//   },
// }


module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete('svg')
    config.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
}