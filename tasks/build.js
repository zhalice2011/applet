


// require('shelljs/global')  //可以使用一些脚本命令

// const {resolve} = require('path')
// const fs = require('fs')
// const webpack = require('webpack')
// const _ = require('lodash')
// const r = url => resolve(process.cwd(),url)

// const config = require('../config')
// const webpackConf = require('./webpack.config')

// //console.log("周达理",config)

// const assetsPath = config.assetsPath

// rm('-rf',assetsPath)  //编译之前我们需要删除上一次编译的文件

// mkdir(assetsPath)  //1.新建目录

// const renderConf = webpackConf
// const entry = () => _.reduce(config.json.pages,(en,i) => {
//     en[i] = resolve(__dirname,'../',`${i}.mina`)
//     return en
// },{})   //后面跟上一个空对象就是 表示做一个初始的对象

// console.log("我们拿到的所有的入口文件",entry)

// renderConf.output = {
//     path:config.assetsPath,
//     filename:'[name].js'
// }
// renderConf.entry = entry()
// renderConf.entry.app = config.app

// const compiler = webpack(renderConf)  //2.webpack编译器  传入配置文件renderConf

// //writeFileSync同步写入
// fs.writeFileSync(resolve(config.assetsPath,'./app.json'),JSON.stringify(config.json),'utf8')

// //3.监听文件的变化 随时进行编译
// compiler.watch({},(err,stats)=>{
//     if(err) process.stdout.write(err) //输出错误

//     console.log("[webpack:build]",stats.toString({
//         chunks:false,
//         colors:true
//     }))
// })


require('shelljs/global')

const { resolve } = require('path')
const fs = require('fs')
const webpack = require('webpack')
const _ = require('lodash')
const r = url => resolve(process.cwd(), url)
const config = require('../config')
const webpackConf = require('./webpack.conf')

const assetsPath = config.assetsPath

rm('-rf', assetsPath)
mkdir(assetsPath)

const renderConf = webpackConf
const entry = () => _.reduce(config.json.pages, (en, i) => {
  en[i] = resolve(__dirname, '../', `${i}.mina`)

  return en
}, {})

renderConf.output = {
  path: config.assetsPath,
  filename: '[name].js'
}

renderConf.entry = entry()
renderConf.entry.app = config.app

const compiler = webpack(renderConf)

fs.writeFileSync(resolve(config.assetsPath, './app.json'), JSON.stringify(config.json), 'utf8')

compiler.watch({}, (err, stats) => {
  if (err) process.stdout.write(err)

  console.log('[webpack:build]', stats.toString({
    chunks: false,
    colors: true
  }))
})