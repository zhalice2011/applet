//app.js
import "./style/base/sass"  //引入sass
import "./vendor"  //全局方法

App({
  async getUserInfo () { //拿到用户的资料
    if (this.globalData.userInfo) return userInfo

    const { code } = await wx.loginAsync()
    const { userInfo } =await wx.getUserInfoAsync()

    this.globalData.userInfo.userInfo
  },
  globalData: {
    userInfo: null
  }
})