
import store from '../store/index.js'
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute,second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
//const url = "https://store.iliujia.com/micro-store-cus/";
const url = "https://store.yinnima.com/micro-store-cus/";
function ajaxFn (cmd,data,cb,fcb) {
  wx.showLoading({
    mask : true,
    title : '加载中'
  })
  var token = store.state.info.token;
  var storeId = store.state.info.storeId;
  wx.request({
    url: url + cmd + ".do",
    method : 'POST',
    header: { 'content-type': "application/x-www-form-urlencoded", "client": "miniApp", "cookie":"token="+token+";channel=caiyuanbao;storeId="+storeId+";"},
    dataType : 'json',
    data:data,
    success: function(res) {
      if(res.data.resultCode == 1000){
          wx.hideLoading()
          cb&&cb(res.data.returnObject);
          //res && cb(res.returnObject);
      }else{
        if(!fcb){
          wx.hideLoading()
          wx.showToast({
            title : res.data.returnObject,
            icon : "none",
            mask : true,
          })
        }else{
          wx.hideLoading()
          fcb(res.data)
        }
      }
    },
  });
}
export default {
  alert(msg,type){
    wx.showToast({
      title: msg,
      icon: type||'none',
      duration: 2000
    })
  },
  getStoreInfo(fn){ //获取店铺信息
    return ajaxFn("store/getStoreInfo","",fn);
  },
  listCategory(fn){ //分类列表
    return ajaxFn("goodsCategory/listCategory","",fn);
  },
  listCategoryGoods(pamars,fn){//分类商品列表
    return ajaxFn("goodsCategory/listCategoryGoods",pamars,fn);
  },
  getProductInfo(pamars,fn){//商品详情
    return ajaxFn("product/getProductInfo",pamars,fn);
  },
  getUserInfo(pamars,fn){//用户信息
    return ajaxFn("customer/getUserInfo",pamars,fn);
  },
  getBusinessOrdersNum(fn){//订单数
    return ajaxFn("store/getBusinessOrdersNum","",fn);
  },
  listStoreModules(fn){//首页模块列表
    return ajaxFn("modules/listStoreModules","",fn);
  },
  listStoreProductsForModules(pamars,fn){//首页模块详情
    return ajaxFn("product/listStoreProductsForModules",pamars,fn);
  },
  listReceiverInfos(fn){//收件人列表
    return ajaxFn("customer/listReceiverInfos","",fn);
  },
  listCartProducts(pamars,fn){//购物车列表
    return ajaxFn("cart/listCartProducts",pamars,fn)
  },
  listStoreCouponCustomer(pamars,fn){//卡券列表
    return ajaxFn("coupon/listStoreCouponCustomer",pamars,fn)
  },
  listStoreProducts(pamars,fn){//搜索列表
    return ajaxFn("product/listStoreProducts",pamars,fn)
  },
  listCustomerCoupons(fn){//优惠券列表
    return ajaxFn("coupon/listCustomerCoupons","",fn)
  },
  getAreaCode(pamars,fn){//省市县列表
    return ajaxFn("customer/getAreaCode",pamars,fn)
  },
  saveReceiverInfo(pamars,fn){//新增地址
    return ajaxFn("customer/saveReceiverInfo",pamars,fn)
  },
  updateReceiverInfo(pamars,fn){//修改地址
    return ajaxFn("customer/updateReceiverInfo",pamars,fn)
  },
  deleteReceiverInfo(pamars,fn){//删除地址
    return ajaxFn("customer/deleteReceiverInfo",pamars,fn)
  },
  saveDefaultReceiverInfo(pamars,fn){//设为默认dizhi
    return ajaxFn("customer/saveDefaultReceiverInfo",pamars,fn)
  },
  saveProductToCart(pamars,fn){//加入购物车
    return ajaxFn("cart/saveProductToCart",pamars,fn)
  },
  getStoreCouponCustomer(pamars,fn){//领取卡券
    return ajaxFn("coupon/getStoreCouponCustomer",pamars,fn)
  },
  preOrderFromCart(pamars,fn){//购物车去结算
    return ajaxFn("order/preOrderFromCart",pamars,fn)
  },
  deleteCartProduct(pamars,fn){//删除购物车
    return ajaxFn("cart/deleteCartProduct",pamars,fn)
  },
  updateCartProductsCount(pamars,fn){//编辑购物车
    return ajaxFn("cart/updateCartProductsCount",pamars,fn)
  },
  preOrder(pamars,fn){//biede去结算
    return ajaxFn("order/preOrder",pamars,fn)
  },
  addMiniAppStoreCollect(pamars,fn){//添加收藏
    return ajaxFn("miniAppStore/addMiniAppStoreCollect.do",pamars,fn)
  },
  listMiniAppStoreCollect(fn){//获取收藏列表
    return ajaxFn("miniAppStore/listMiniAppStoreCollect","",fn)
  },
  submitOrder(pamars,fn,cfn){//提交订单
    return ajaxFn("order/submitOrder",pamars,fn,cfn)
  },
  listOrders(pamars,fn){//订单列表
    return ajaxFn("order/listOrders",pamars,fn)
  },
  closeAndDelOrder(pamars,fn){//关闭和删除订单
    return ajaxFn("order/closeAndDelOrder",pamars,fn)
  },
  confirmReceive(pamars,fn){//确定收货
    return ajaxFn("order/confirmReceive",pamars,fn)
  },
  getOrderInfo(pamars,fn){//订单详情
    return ajaxFn("order/getOrderInfo",pamars,fn)
  },
  getOrderTraceForBuyerView(pamars,fn){//物流
    return ajaxFn("order/getOrderTraceForBuyerView",pamars,fn)
  },
  payOrder(pamars,fn){//支付
    return ajaxFn("order/payOrder.do",pamars,fn)
  },
  delMiniAppStoreCollect(pamars,fn){//取消收藏
    return ajaxFn("miniAppStore/delMiniAppStoreCollect",pamars,fn)
  },
  addNewPersonalityCouponCustomer(fn){//获取新人优惠券
    return ajaxFn("coupon/addNewPersonalityCouponCustomer","",fn)
  },
  getStoreCouponCustomerByGoodsId(pamars,fn){//获取特定商品优惠券
    return ajaxFn("coupon/getStoreCouponCustomerByGoodsId",pamars,fn)
  },
  getPostageByProvinceAndProduct(pamars,fn){ // 功能:  商品详情页中根据商品id和省份id来获取邮费
    return ajaxFn('product/getTransferFee',pamars,fn)
  }
} 
