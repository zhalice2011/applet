
const { resolve } = require('path')
const r = url => resolve('__dirname',url)
const assetsPath = resolve(process.cwd(),"./mina")

module.export = {
    "json": {
        "pages":[
            "pages/index/index",
          ],
        "tabBar": {
            "selectedColor":"#5aaca5",
            "color":"#565656",
            "list":[]
        }
    },
    "window":{
        "backgroundTextStyle":"light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "权利的游戏",
        "navigationBarTextStyle":"black"
    },
    "assetsPath":assetsPath,
    "app":r('./app')
}