import Vue from 'vue'
import App from './App'
import store from './store'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/login/main','pages/index/main','pages/address/main','pages/coupon/main','pages/search/main','pages/addaddress/main','pages/preorder/main','pages/storeList/main','pages/goodsList/main','pages/goodsDetail/main','pages/pay/main','pages/searchOrder/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#FF5200',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#fff'
    },
    tabBar : {
      "list": [{
        "pagePath": "pages/index/main",
        "text": "首页",
        "iconPath": "./static/home.png",
        "selectedIconPath": "./static/homeC.png"
      }, {
        "pagePath": "pages/classify/main",
        "text": "分类",
        "iconPath": "./static/classify.png",
        "selectedIconPath": "./static/classifyC.png"
      }, {
        "pagePath": "pages/cart/main",
        "text": "购物车",
        "iconPath": "./static/cart.png",
        "selectedIconPath": "./static/cartC.png"
      }, {
        "pagePath": "pages/user/main",
        "text": "我的",
        "iconPath": "./static/user.png",
        "selectedIconPath": "./static/userC.png"
      }],
      "color": "#1c1b20",
      "selectedColor": "#ff5200"
    }
  }
}
