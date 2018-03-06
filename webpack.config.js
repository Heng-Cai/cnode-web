// CommonJS

const path = require('path');
const wepbpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // 定义入口与出口
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // "source-map" 使源码与编译压缩后的代码建立映射关系
  // 方便定位 debug 的位置 
  devtool: "source-map",

  resolve: {
    // 配置自动解析模块的扩展名
    // 设置后在引入相应模块时可不带扩展
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // 当扩展名为 ts 或 tsx 时，先用 awesome-typescript-loader 编译
      { test: /\.tsx?$/, use: ["awesome-typescript-loader"] },

      // "source-map-loader" 用于提取 source map
      { enforce: "pre", test: /\.js$/, use: ["source-map-loader"] },

      // 用插件分离 css 与 js
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
        // use: ExtractTextWebpackPlugin.extract({
        //   fallback: "style-loader",
        //   use: ["css-loader", "sass-loader"]
        // })
      }
    ]
  },

  plugins: [
    new wepbpack.HotModuleReplacementPlugin(), // 热加载插件
    new HtmlWebpackPlugin({
      template: "./index.temp.html" // 指向所创建的模板目录
    }),
    // new ExtractTextWebpackPlugin("styles.css")
  ],

  // 关于 webpack-dev-server 的相关设置
  devServer: {
    contentBase: './dist', // 服务器加载页面的根目录
    open: true, // 是否打开浏览器窗口
    hot: true, // 是否启用热更新
    progress: false, // 在控制台输出webpack的编译进度
    stats: { colors: true }, // 不同类型的信息用不同的颜色显示
    port: 8888, // 服务器端口
    // proxy: {
    //   "/api/v1/topics/*": {
    //     target: "https://cnodejs.org/api/v1",
    //     secure: false,
    //   }
    // }
  }
};