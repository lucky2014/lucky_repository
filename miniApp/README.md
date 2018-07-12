# my-project

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



页面结构:
---- 登录页面: (pages/login/login)              // 初次进入时必定进入的页面
==>> ---- 章鱼Mall: (pages/storeList/storeList)
     ---- ---- 收货地址: (pages/address/address)
     ---- ---- ---- 管理收件人: (pages/addaddress/addaddress)
     ---- 阿楠小铺:
     ---- ---- 首页: (pages/index/index)
     ---- ---- ---- 商品搜索：(pages/search/search)
     ---- ---- ---- 商品详情: (pages/goodsDetail/goodsDetail)
     ---- ---- ---- 商品详情/商品列表: (pages/goodsList/goodsList)
     ---- ---- 分类: (pages/classify/classify)
     ---- ---- ---- 全部
     ---- ---- ---- 化妆品
     ---- ---- ---- 零食
     ---- ---- ---- 服装
     ---- ---- ---- 水果
     ---- ---- 购物车: (pages/cart/cart)
     ---- ---- ---- 订单中心: (pages/preorder/preorder)
     ---- ---- ---- ---- 支付: (pages/pay/pay)
     ---- ---- 我的: (pages/user/user)
     ---- ---- ---- 优惠券: (pages/coupon/coupon)
     ---- ---- ---- 订单列表:   (pages/orderList/orderList)
     ---- ---- ---- ---- 订单详情: (pages/orderDetail/orderDetail)
     ---- ---- ---- ---- 订单查询: (pages/searchOrder/searchOrder)
     ---- ---- ---- ---- 物流:     (pages/logistics/logistics)
