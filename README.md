# TypeScript + Webpack 搭建 React 应用模板

## 初始化应用

参考

- [React & Webpack with TypeScript](http://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
- [react+redux框架配置](http://blog.csdn.net/lx376693576/article/details/54591142)
- [入门Webpack](https://www.jianshu.com/p/42e11515c10f)
- [Webpack’s HMR](https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96)

### 创建应用根目录

```shell
mkdir react-app
cd react-app
```

在根目录 `react-app/` 下创建

- `README.md`
- `src/`
- `dist/`

### 在根目录下初始化应用

```shell
npm init
```

获得 `package.json` 文件

> react-app/
>
> ​	src/
>
> ​	dist/
>
> ​	package.json
>
> ​	README.md

### 在根目录下安装依赖

安装 React、React-DOM 并记录到 `package.json` 的 `"dependencies"` (`--save`)

```shell
npm install --save react react-dom @types/react @types/react-dom
```

此时根目录会生成 `node_mudules` 来保存这些非全局安装的依赖

> react-app/
>
> ​	src/
>
> ​	dist/
>
> ​	package.json
>
> ​	README.md
>
> ​	node_modules/
>
> ​		react
>
> ​		react-dom
>
> ​		... (等等)

再安装在开发环境下需要的依赖，并记录到 `package.json` 的 `"envDependencies"` (`--save-dev`)

```shell
npm install --save-dev webpack typescript awesome-typescript-loader source-map-loader
```

> [awesome-typescript-loader](https://www.npmjs.com/package/awesome-typescript-loader) helps Webpack compile your TypeScript code using the TypeScript’s standard configuration file named `tsconfig.json`
>
> [source-map-loader](https://www.npmjs.com/package/source-map-loader) uses any sourcemap outputs from TypeScript to inform webpack when generating *its own* sourcemaps. This will allow you to debug your final output file as if you were debugging your original TypeScript source code

### 在根目录下添加并配置 `tsconfig.json` 

详见：[tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",
    "target": "es5",
    "jsx": "react"
  },
  "include": [
    "./src/**/*"
  ]
}
```

### 在根目录下添加并配置 `webpack.config.js` 

1、安装webpack本地服务器

```shell
npm install --save-dev webpack-dev-server
```

2、定义 webpack 的入口与出口

```javascript
entry: "./src/index.tsx", // 定义入口，webpack 根据此入口找出应用的依赖
output: {  // 定义出口，存放 webpack “处理”后的文件
  filename: "bundle.js",
  path: __dirname + "/dist" 
}
```

3、配置热更新

- 方式一：CLI

```json
// from `package.json`
{
  "scripts": {
    // --open 表示自动打开浏览器窗口
    "start": "webpack-dev-server --open --hot"
  }
}
```

```javascript
// from `webpack.config.js`
devServer: {
  contentBase: './dist', // 服务器的根目录 (./dist 等效于 localhost:8888)
  progress: false, // 在控制台输出webpack的编译进度
  stats: { colors: true }, // 不同类型的信息用不同的颜色显示
  port: 8888 // 服务器端口
}
```

- 方式二：webpack.config.js

```json
// from `package.json`
{
  "scripts": {
    "start": "webpack-dev-server"
  }
}
```

```javascript
// from `webpack.config.js`
devServer: {
  open: true, // 是否自动打开浏览器窗口
  hot: true, // 是否启用热更新
  contentBase: './dist', // 服务器加载页面的根目录
  progress: false, // 在控制台输出webpack的编译进度
  stats: { colors: true }, // 不同类型的信息用不同的颜色显示
  port: 8888 // 服务器端口
},
// 增加热更新插件
plugins: [
  new wepbpack.HotModuleReplacementPlugin() // 热加载插件
]
```

4、定义 `npm run build`

```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack"
  }
}
```

> 对于 `"start"` 可直接执行 `npm start` 
>
> 对于其他，如 `"build"` 须执行 `npm run build`    

> 在根目录 `react-app/` 下执行 `npm run build` 后，webpack “处理”完成后，会在定义的出口位置 `/dist` 生成：`bundle.js` 以及 `bundle.js.map`，再在此文件夹中手动添加一个 `index.html` 并在浏览器中打开，即可显示页面

5、自动生成服务器根目录的 `index.html` (HtmlWebpackPlugin 插件)

- 在根目录 `react-app/` 下安装插件

```shell
npm install --save-dev html-webpack-plugin
```

- 在根目录 `react-app/` 下创建 `index.temp.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, minimal-ui"
  />
  <title>demo</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

- 在 `webpack.config.js` 中配置该插件

```javascript
plugins: [
  new wepbpack.HotModuleReplacementPlugin(), // 热加载插件
  new HtmlWebpackPlugin({
    template: "./index.temp.html" // 指向所创建的模板目录
  })
]
```

- 在根目录 `react-app/` 下执行 `npm run build`，自动生成 `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, minimal-ui"
  />
  <title>demo</title>
</head>

<body>
  <div id="root"></div>
<script type="text/javascript" src="bundle.js"></script></body>

</html>
```

## 处理Sass

参考

- [Webpack 2 handling Sass](https://www.constructcode.com/post/webpack-2-handling-sass)
- [An error with extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/569)

### 在根目录下安装依赖

- node-sass (sass-loader 依赖 node-sass)
- sass-loader
- css-loader
- style-loader

```shell
npm install --save-dev node-sass style-loader sass-loader css-loader
```

### 配置 `webpack.config.js`

```javascript
module: {
  rules: [
    // ...
    // 增加对 .scss 的 loader 处理

  	// loads 从右到左依次处理 .scss 文件，注意顺序
  	{ test: /\.scss$/, 
      use: ['style-loader', 'css-loader', 'sass-loader']
    }
  ]
}
```

> - sass-loader 将 .scss/.sass 编译为 .css 
> - css-loader 用于解析 .css 中的 `@import` 和 `url()`
> - style-loader 通过注入 `<script>` 标签将 CSS 引入 DOM

此时在根目录 `react-app/` 下执行 `npm run build`，css 和 js 会混在 `bundle.js` 中

> 此时在配置有热更新的前提下，修改 .sass 源码，页面可以实现无刷新更新样式 (修改 .tsx 源码则是实现页面有刷新更新)

### 分离 css 与 js

在根目录 `react-app/` 下安装插件

```shell
npm install --save-dev extract-text-webpack-plugin
```

配置 `webpack.config.js`

```javascript
module: {
  rules: [
    // ...

    // 用插件分离 css 与 js
    {
      test: /\.scss$/,
      // 使用 use (new)，使用 loader (old) 会报错
      use: ExtractTextWebpackPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"]
      })
    }
  ]
},

plugins: [
  // ...
  
  // 增加新插件
  new ExtractTextWebpackPlugin("styles.css")
]
```

此时在根目录 `react-app/` 下执行 `npm run build`，在 `dist/` 下会生成如下文件：

> dist/
>
> ​	index.html
>
> ​	bundle.js
>
> ​	bundle.js.map
>
> ​	styles.css
>
> ​	styles.css.map

且自动生成的 `index.html` 如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, minimal-ui"
  />
  <title>demo</title>
<link href="styles.css" rel="stylesheet"></head>

<body>
  <div id="root"></div>
<script type="text/javascript" src="bundle.js"></script></body>

</html>
```

> [Reloading extracted css with hot module replacement](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30)
>
> 此时，从 bundle.js 中提取出了 css，无法实现无刷新更新样式，须手动刷新页面来查看更新，因此在开发模式下，不建议提取 css 文件

## 引入 Redux

参考

- [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)

### 在根目录下安装插件

```shell
npm install --save redux react-redux @types/react-redux
```

> In this case we didn't need to install `@types/redux` because Redux already comes with its own definition files (`.d.ts` files)

### 设置 shape of state 

```javascript
// src/types/index.tsx

export interface StoreState {
    languageName: string;
    enthusiasmLevel: number;
}
```

### 定义 action

```javascript
// 定义 action 常量

export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
// use TypeScript's string literal types (字符串字面量类型)
export type INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';


export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
```

```javascript
// 定义 action 对象

import * as constants from '../constants'

export interface IncrementEnthusiasm {
  type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
  type: constants.DECREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

// action creator
export function incrementEnthusiasm(): IncrementEnthusiasm {
  return {
    type: constants.INCREMENT_ENTHUSIASM
  }
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
  return {
    type: constants.DECREMENT_ENTHUSIASM
  }
}
```

### 定义 Reducer

```javascript
// 定义 reducer 函数

import { EnthusiasmAction } from '../actions/index';
import { StoreState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../constants/index';

export function enthusiasm(state: StoreState, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    default:
      return state;
  }
}
```

### 生成 container

**Components** are often data-agnostic (与数据无关), and work mostly at a presentational level

**Containers** typically wrap components and feed them any data that is necessary to display and modify state

```javascript
// src/containers/Hello.tsx

import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName,
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
```

### 创建 store

```javascript
// src/index.tsx

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './containers/Hello';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';

import './index.css';

const store = createStore<StoreState>(enthusiasm, {
  enthusiasmLevel: 1,
  languageName: 'TypeScript',
});

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
```

# 应用模板搭建 cnode-web 端

## API分析

详见 [cnode API](https://cnodejs.org/api)

API路径前缀：**https://cnodejs.org/api/v1**

### 主题 (get)

#### /topics 主题列表

接收 get 参数

- page `Number` 页数
- tab `String` 主题分类。目前有 `ask` `share` `job` `good`
- limit `Number` 每一页的主题数量

#### /topic/:id 主题详情

### 用户 (get)

#### /user/:loginname 用户详情

## Debug

1、`.d.ts` 文件 (如 `@types/react-router`) 找不到某些 member (如 `Link`)

可能原因：在安装 `npm i @types/react-router --save` 时，下载的文件不全 (未下载 lib/ 文件夹)

解决办法：下载 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)中的所有 types，从中找到相应的 `@types/some-module`，替换项目的 `node_module/@types` 文件下的相应模块

## Web 页面介绍

主要分为三个页面，都是根据相应的 API 接口进行 http 的 GET 请求，得到响应的数据后，再渲染出页面

- 主题列表页

![主题列表页](https://raw.githubusercontent.com/Heng-Cai/cnode-web/master/preview/%E4%B8%BB%E9%A2%98%E5%88%97%E8%A1%A8%E9%A1%B5.gif)

- 主题详情页

![主题详情页](https://raw.githubusercontent.com/Heng-Cai/cnode-web/master/preview/%E4%B8%BB%E9%A2%98%E8%AF%A6%E6%83%85%E9%A1%B5.gif)

- 用户详情页

![用户详情页](https://raw.githubusercontent.com/Heng-Cai/cnode-web/master/preview/%E7%94%A8%E6%88%B7%E8%AF%A6%E6%83%85%E9%A1%B5.gif)