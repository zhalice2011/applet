
//es6  安装这个就可以支持 async 和 await
import regeneratorRuntime from 'regenerator-runtime'  //转化器
global.regeneratorRuntime = regeneratorRuntime //挂载到global下面



import _ from 'lodash'
global._ = _

import R from 'ramda'
import { clearTimeout } from 'timers';
global.R = R

const asyncWrap = fn => (options = {}) => new Promise((resolve,reject) => {
    let conf = {
        success: res => {
            resolve(res)
        },
        fail: err => {
            reject(err)
        }
    }

    //我们通过这个async给他传入一个东西 老提
    wx[fn](R.merg(conf ,options))
})
wx.loginAsync = asyncWrap('login')  //登录
wx.getUserInfoAsync = asyncWrap('getUserInfo') //获取用户信息
wx.requestAsync = asyncWrap('request')
wx.getSystemInfoAsync = asyncWrap('getSystemInfo')


//动画的执行和技术

let lastTime = 0
global.requestAnimationFrame = callback => {
    const currentTime = new Date().getTime()
    const timeToCall = Math.max(0,16-(currentTime-lastTime))
    const timer = global.setTimeout(function(){
        callback(currentTime + timeToCall)
    },timeToCall)

    lastTime = currentTime + timeToCall 

    return timer
}

global.cancelAnimationFrame = timer => {
    clearTimeout(timer)
}
import TWEEN from 'tween.js'

TWEEN.now = function(){
    return new Date().getTime()
}

global.TWEEN = TWEEN