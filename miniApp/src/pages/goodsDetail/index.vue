<template>
    <div id="goodsDetail" v-if="goodsInfo">
      <!-- 功能: 商品详情头部 -->
      <div class="goodsDetail_header">
            <div class="topGood">
              <festivalButton v-if="storeInfo.festivalButton == 'y'" />
              <!-- 功能:  轮播图 -->
              <banner :imgList="goodsInfo.imgage.images"/>
              <!-- 功能:  商品信息 -->
              <goods :goodsInfo="goodsInfo"/>
            </div>
      </div>
      <!-- 功能:  特殊优惠券 -->
      <special :specialCoupon="specialCoupon" v-if="specialCoupon" @baseId="getCoupon"/>
      <!-- 功能:  商铺优惠券-->
      <div class="shopCoupons" v-if="shopCouponsNum">
        <div class="shopCouponsLeft">
          <span>领券</span>
        </div>
        <div class="shopCouponsRight" @click="showShopCouponsInfo">
          <span class="bgcRed">店铺优惠券</span>
          <span class="getCoupons">有{{shopCouponsNum}}张可领</span>
          <img src="../../../static/arrow_right.png" class="icon_right"/>
        </div>
      </div>
      <!-- 功能:  商家优惠券详情 对应商铺优惠券-->
      <div class="shopCouponsInfo" v-show="isShowShopCouponsInfo" :animation="animation">
        <div class="couponsInfoTop">
          <span>商家优惠券</span>
          <img src="../../../static/cut.png" alt="close" @click="closeModel">
        </div>
        <div class="couponsInfoContent">
          <ul>
            <li v-for="(shopCoupon,indexx) of shopCoupons" :key="index"> 
              <div class="shopCouponLeft">
                <div class="info">
                  <div class="moneyLimit">
                    <span class="allType"></span>
                    <span>¥</span>
                    <span class="money">{{shopCoupon.couponBase.couponAmount}}</span>
                  </div>
                  <div class="amountLimit">
                    <p>每人限领{{shopCoupon.couponBase.limitGetCount}}张</p>
                    <p>满{{shopCoupon.couponBase.limitAmount}}可用</p>
                  </div>
                </div>
                <div class="time">
                  <i>
                    {{shopCoupon.couponBase.startTime}}
                    -
                    {{shopCoupon.couponBase.endTime}}
                  </i>
                </div>
                <span class="iconTop"></span>
                <span class="iconBtm"></span>
              </div>
              <div class="shopCouponRight">
                <span 
                  :class="{active: haveCouponNum[index] == shopCoupon.couponBase.limitGetCount }" 
                  v-if="shopCoupon.couponBase.currentNum">
                  立即<br>领取
                </span>
                <span 
                  :class="{active: haveCouponNum[index] == shopCoupon.couponBase.limitGetCount }"
                  v-else
                >
                  您已<br>领取
                </span> 
              </div>
            </li>
          </ul>
        </div>
        <div class="couponsInfoBtm">
          完成
        </div>  
      </div> 
      <!-- 功能:  邮费 -->
      <div class="postage">
        <span class="postageLeft">配送至:&nbsp;&nbsp;</span>
        <!-- 说明:  picker 为微信组件 -->
        <picker mode="selector" :range="provinceList" :range-key="'name'" @change="getProvince" :value="index" class="postageCenter">
            <view  class="picker">
                <span class="province">{{selectedProvince}}</span>
                <span class="icon">
                  <img src="../../../static/arrow_up@2x.png" alt="向下选择">
                </span>
            </view>
        </picker>
        <span class="postageRight">运费为{{postage}}元</span>
      </div>

      <!-- 功能:  商铺信息 -->
      <store />
      <!-- 功能： 商品详情 -->
      <detail :goodsInfo="goodsInfo"/>
      <!-- 功能:  商品详情导航 -->
      <div class="goodsDetail_nav">
        <ul class="ulLeft">
          <li class="myShop" @click="goindex">
            <a>
                <i></i>
                <span>店铺</span>
            </a>
          </li>
          <li class="service" @click="showtapaa">
            <a>
                <i></i>
                <span>客服</span>
            </a>
          </li>
          <li class="shoppingCar" @click="gocar">
            <a>
              <i></i>
              <span>购物车</span>
              <p>{{carnum}}</p>
            </a>
          </li>
        </ul>
        <ul class="ulRight">
          <li class="canBuy status1" status="1" v-if="goodsInfo.status==1&&goodsInfo.totalCurrentNum" @click="addCar">加入购物车</li>
          <li class="canBuy status2" status="2" v-if="goodsInfo.status==1&&goodsInfo.totalCurrentNum" @click="addCar">立即下单</li>
          <li class="cantBuy status3" status="3" v-else>{{goodsInfo.status==2||!goodsInfo.totalCurrentNum?'已售罄':'已下架'}}</li>
          <!-- <li class="cantBuy" status="4">已下架</li> -->
        </ul>
      </div>
      <!-- 功能:  商品下单 -->
      <div v-show="showSku">
        <sku :goodsInfo="goodsInfo" :editor="showSku" @closeAni="closeAni"/>
      </div>
      <!-- 功能:  联系客服 -->
      <div class="contactDialog" v-show="showtap">
    		<div class="contactMain">
          <dl v-if="storeInfo.contactQrCode">
            <dt><img :src="storeInfo.contactQrCode" width="100%" @click="lookImg(storeInfo.contactQrCode)"/></dt>
            <dd>点击后长按保存到手机加微信咨询</dd>
          </dl>
          <ul :class="storeInfo.contactPhone&&storeInfo.contactPhoneSub?'twoPhone':'onePhone'">
            <li v-if="storeInfo.contactPhone"><a @click="callout(storeInfo.contactPhone)"><i><img src="https://store.iliujia.com/imgs/c/phone1.png" width="100%" /></i>店主电话</a></li>
            <li v-if="storeInfo.contactPhoneSub"><a @click="callout(storeInfo.contactPhoneSub)"><i><img src="https://store.iliujia.com/imgs/c/phone2.png" width="100%" /></i>客服电话</a></li>
          </ul>
          <i class="triangleIcon"><img src="https://store.iliujia.com/imgs/c/triangleIcon1.png" width="100%" /></i>
    		</div>
    	</div>
    </div>
</template>
<script>

import utils from '../../utils/index.js'
import {formatTime} from '@/utils/index.js'
import banner from '@/components/goodsDetail/banner.vue'
import detail from '@/components/goodsDetail/detail.vue'
import goods from '@/components/goodsDetail/goods.vue'
import store from '@/components/goodsDetail/store.vue'
import sku from '@/components/goodsDetail/sku.vue'
import special from '@/components/goodsDetail/special.vue'
import CouponList from "@/components/coupon/couponList.vue"
import festivalButton from '@/components/festivalButton.vue'

export default {
  data(){
    return {
      goodsInfo : "",
  		showSku : false,
  		showtap : 0,
  		specialCoupon : {},
      selectedProvince : '北京', // 功能:  选择的省份,默认为北京
      provinceList : [],     // 功能:  省份选择器中的所有省份
      postage : 100,         // 功能:  根据选择的省份,计算邮费 
      isShowShopCouponsInfo : 0 , // 功能:  是否 显示商品优惠券详情
      shopCouponsNum : 0 ,    // 功能:  商铺优惠券数量
      shopCoupons : [] ,      // 功能:  商铺优惠券信息
      isOrNotGet : 0 ,        // 功能:  该优惠券是否已领取， 0表示未领取
      haveCouponNum: [] ,     // 功能:  拥有优惠券的数量
      animation : "",         // 功能:  动画效果
    }
  },
  mounted(){
    // 请求功能:  异步获取
	  this.$store.dispatch("getCartList")
    // 请求功能:  获取商品详细信息
    // 请求参数:  id  商品id(必选)
    var data = {
      id : this.$root.$mp.query.id,
	  }
    utils.getProductInfo(data,(msg)=>{
			this.goodsInfo = msg
			if (msg.origin_price && msg.max_price) {
                msg.priceLow = msg.origin_price;
                msg.priceHig = msg.max_price;
                if (msg.priceHig == msg.priceLow) {
                    msg.priceTotal = Number(msg.priceLow).toFixed(2);
                    msg.priceSZ = msg.priceTotal.split(".")[0];
                    msg.priceSF = msg.priceTotal.split(".")[1];
                } else {
                    msg.priceTotal = Number(msg.priceLow).toFixed(2) + "~" + Number(msg.priceHig).toFixed(2);
                    msg.priceSZ = Number(msg.priceLow).toFixed(2).split(".")[0];
                    msg.priceSF = Number(msg.priceLow).toFixed(2).split(".")[1];
                    msg.priceDZ = Number(msg.priceHig).toFixed(2).split(".")[0];
                    msg.priceDF = Number(msg.priceHig).toFixed(2).split(".")[1];
                }
      } else {
                msg.priceTotal = Number(msg.origin_price).toFixed(2) || Number(msg.max_price).toFixed(2);
                msg.priceSZ = msg.priceTotal.split(".")[0];
                msg.priceSF = msg.priceTotal.split(".")[1];
      }
		  var data = wx.getStorageSync('history')||[]
      data.unshift(JSON.stringify({
				storeId : this.storeInfo.id,
				goodsId : msg.id,
				storeName : this.storeInfo.storeName,
				goodsName : msg.name,
				price : msg.priceSZ+"."+ msg.priceSF,
				coverUrl :msg.coverUrl,
				timestamp : (new Date().getMonth()+1) +"月" + (new Date().getDate())+"日"
			}))
			data = Array.from(new Set(data))
  			wx.setStorage({
  				key:"history",
  				data:data
  			})
      })
    // 请求功能:  获取特定商品优惠券
    // 请求参数:  goodsId  商品id(必选)
    var data2 = {
			goodsId : this.$root.$mp.query.id,
		}
		utils.getStoreCouponCustomerByGoodsId(data2,(msg)=>{
			this.specialCoupon = msg[0]
		})
    // 请求功能:  获取商铺优惠券列表
    // 请求参数:  无
    utils.listCustomerCoupons(shopCoupons => {
      console.log('shopCoupons:',shopCoupons)  
      this.shopCouponsNum = shopCoupons.length
      // 功能:  格式化优惠券里的起止时间
      shopCoupons=shopCoupons.map(function(item){
        if(item.couponBase && item.couponBase.startTime){
          console.log('startTime: ',item.couponBase.startTime)
          item.couponBase.startTime = formatTime(new Date(item.couponBase.startTime)).slice(0,16)
        }
        if(item.couponBase && item.couponBase.endTime){
          console.log('endTime: ',item.couponBase.endTime)
          item.couponBase.endTime = formatTime(new Date(item.couponBase.endTime)).slice(0,16)
        }
        return item
      })
      console.log('shopCoupons: ',shopCoupons)
      this.shopCoupons = shopCoupons;
    })
    // 请求功能:  获取省份
    utils.getAreaCode({},(msg)=>{  
      this.provinceList = msg;
    })
  },
  components : {
    banner,
    goods,
    detail,
		store,
		sku,
		special,
    CouponList,
    festivalButton
  },
  computed : {
    storeInfo(vue){
      return vue.$store.state.info.storeInfo
    },
    carnum(vue){
      return vue.$store.state.info.cartList.data.length
    }
  },
  methods : {
    goindex(){
      wx.switchTab({
          url: '../index/main'
      })
    },
    gocar(){
      wx.switchTab({
          url: '../cart/main'
      })
    },
    closeAni(){
      setTimeout(()=>{
        this.showSku = false
      },300)
    },
    addCar(id){
      this.showSku = true;
    },
    showtapaa(){
      if(this.showtap){
        this.showtap = 0
      }else{
        this.showtap = 1
      }
    },
    callout(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    lookImg(img,e){
      wx.previewImage({
          urls: [img],
          success: function () {
          }
      })
    },
    getCoupon(baseId){
      var data = {
        baseId : baseId,
        goodsId : this.$root.$mp.query.id,
      }
      utils.getStoreCouponCustomer(data,(msg)=>{
        utils.alert("领取成功","success")
        setTimeout(()=>{
          var data2 = {
            goodsId : this.$root.$mp.query.id,
          }
          utils.getStoreCouponCustomerByGoodsId(data2,(msg)=>{
            this.specialCoupon = msg[0]
          })
        },1500)
      })
    },
    getProvince(e){   // 功能:  获取省份选择器中的所选省份来判断邮费
      let index = e.target.value;
      let province = this.provinceList[index]['name']
      let provinceId = this.provinceList[index]['id']
      this.selectedProvince = province
      let goodsId = this.goodsInfo.id;

      // 请求功能:  根据所选省份来获取邮费
      // 请求参数:  provinceId 省份id(必选)
      //            goodsId    商品id(必选)
      let params = {
        provinceId : provinceId,
        goodsId : goodsId
      }
      console.log('params: ',params)
      utils.getPostageByProvinceAndProduct(params,res => {
        console.log(res)
        this.postage = res 
      })
    },
    showShopCouponsInfo(){  // 功能:  控制商家优惠券详情显示
      console.log('显示商家优惠券详情')
      this.animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear'
      }).translateY('100%').step().export()
      this.isShowShopCouponsInfo = 1
      this.animation = 0
      console.log('show: ',this.isShowShopCouponsInfo)
    },
    closeModel(){
      this.animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'linear'
      }).translateY('100%').step().export()
      console.log('隐藏商家优惠券详情')
      this.isShowShopCouponsInfo = 0
      this.animation = ""
    }
  },
  onShareAppMessage: function(res){
		return {
			title: this.storeInfo.storeName,
			path : '/pages/login/main?scene='+this.storeInfo.id+"%23"+this.$root.$mp.query.id,
			success: function (res) {

			}
		}
	},
  onUnload(){
    this.goodsInfo = "";
    this.showSku = false;
    this.showtap = 0;
  }
}
</script>


<style>
  /* 邮费 */
  .postage {
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 10px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    display: flex;
    font-size: 14px;
  }
  .postage .postageLeft {
    flex: 1;
    text-align: left;
  }
  .postage .postageRight {
    flex: 2;
    text-align: right;
  }
  .postage .postageCenter {
    flex: 2;
    height: 30px;
    margin-top: 10px;
    border: 1px solid #A2A2A2;
    border-radius: 4px;
    text-align: center;
  }
  .postage .postageCenter .picker {
    height: 30px;
    line-height: 30px;
    display: flex;
  }
  .postage .picker .province {
    flex: 3;
  }
  .postage .picker .icon {
    flex: 1;
    position: relative;
  }
  .postage .picker .icon img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 24px;
    height: 14px;
  }
  /* 商铺优惠券 */
  .shopCoupons {
    padding-left: 15px;
    padding-right: 15px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    display: flex;
    font-size: 14px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }
  .shopCouponsLeft {
    flex: 2;
  }
  .shopCouponsRight {
    flex: 3;
  }
  .shopCoupons .shopCouponsRight {
    display: flex;
  }
  .shopCouponsRight .bgcRed {
    flex: 1;
    height: 20px;
    line-height: 20px;
    margin-top: 15px;
    color: #FF5200;
    border-radius: 18px;
    text-align: center;
    background-color: rgba(255, 82, 0, 0.2);
  }
  .shopCouponsRight .getCoupons {
    flex: 1;
    text-align: center;
  }
  .shopCouponsRight .icon_right {
    width: 7px;
    height: 12px;
    margin-top: 19px;
  }
  /* 商铺优惠券详情 */
  .shopCouponsInfo {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
  }
  .couponsInfoTop {
    box-sizing: border-box;
    height: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-style: 16px;
    text-align: center;
    background-color: #fff;
    position: relative;
  }
  .couponsInfoTop img {
    position: absolute;
    top: 5px;
    right: 15px;
    width: 20px;
    height: 20px;
  }
  .couponsInfoContent {
    padding-left: 15px;
    padding-right: 15px; 
    /*margin-bottom: 60px;*/
    background-color: #fff; 
  }
  .couponsInfoContent ul {
    background-color: #f4f4f4;
    overflow: hidden;
  }
  .couponsInfoContent ul li {
    display: flex;
    height: 100px;
    padding:10px;
    box-sizing:border-box;
    background-color: #fff;
    margin: 10px;
  }
  .iconTop {
    display: block;
    position: absolute;
    top: -17px;
    right: -8px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #f4f4f4;
  }
  .iconBtm {
    display: block;
    position: absolute;
    bottom: -17px;
    right: -8px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: #f4f4f4;
  }
  .shopCouponLeft {
    flex: 3;
    padding:5px;
    box-sizing:border-box;
    position: relative;
  }
  .shopCouponRight {
    flex: 1;
    border-left: 1px dotted #cacaca;
  }

  .shopCouponLeft .info {
    display: flex;
  }
  .shopCouponLeft .moneyLimit {
    flex: 1;
    position: relative;
    height: 40px;
    line-height: 40px;
  }
  .shopCouponLeft .amountLimit {
    flex: 2;
  }

  .allType {
    display: block;
    position: absolute;
    top: -15px;
    left: -15px;
    width: 40px;
    height: 40px;
    background-image: url("../../../static/couponRangeImg1.png");
    background-size: contain;
  }
  .amountLimit p {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .money {
    color: #AA2327;
    font-size: 24px;
  }
  .time i {
    font-size: 12px;
  }
  .shopCouponRight {
    height: 80px;
    text-align: center;
    position: relative; 
  }
  .shopCouponRight span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 60px;
    height: 60px;
    margin-left: 5px;
    padding-top:10px;
    box-sizing:border-box;
    border-radius: 10px;
    font-size: 16px; 
    background-color: #ff5200;
  }
  .shopCouponRight .active {
    background-color: #e8e8e8;
  }
  .shopCouponsInfo .couponsInfoContent {

  }
  .shopCouponsInfo .couponsInfoBtm {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    background-color: #FF5200;
  }
  /* 特殊优惠券 */
  .specialCoupon{
    margin: 0 15px 10px 15px; 
  }
  .specialCoupon.couponCss li .show-area .show-left{
    background: #fff;
  }
  .specialCoupon.couponCss li .show-detail em{
    color: #AA2327;
  }
  .specialCoupon.couponCss li .show-detail .limit i{
    width: 60px;
    height: 19px;
    line-height: 19px;
    text-align: center;
    background: rgba(255, 82, 0, 0.2);
    border-radius: 18px;
    font-size: 10px;
  }
  .specialCoupon.couponCss li .show-detail .limit b{
    color: #606060;
    text-align: center;
  }
  .specialCoupon.couponCss li .indate{
    color: #A2A2A2;
  }
  .specialCoupon.couponCss .show-right{
    background: #fff;
    width: 96px;
    border-left: 1px dashed #e3e3e3;
  }
  .specialCoupon.couponCss .show-right span{
    display: flex;
    align-items: center;
    justify-content: center;
    background: #F5A623;
    width: 70px;
    height: 70px;
    border-radius: 5px;
    margin-top: 11px;
    margin-left: 13px;
  }
  .specialCoupon.couponCss .semicircle{
    background: #F4F4F4;
    right: 88px;
  }


  .shopInfor{position: relative; background: #fff;overflow: hidden;}
  .shopInfor dl{float: left; margin-left:15px;padding: 15px 0;margin-right: 100px;overflow: hidden;}
  .shopInfor dl dt{position: absolute;top: 50%;left: 15px; margin-top: -35px; width: 70px;height: 70px;}
  .shopInfor dl dt image{width: 100%;height: 100%;border-radius: 50%;}
  .shopInfor dl dd{    margin-left: 80px;margin-top: 10px;}
  .shopInfor dl dd h2{font-size: 16px;line-height: 22px;font-weight: normal;}
  .shopInfor dl dd p{position: relative; display: flex; overflow: hidden;margin: 4px 0 10px 0;}
  .shopInfor dl dd p img{float: left; width: 18px;height: 21px;margin-right: 4px;}
  .shopInfor dl dd p span{color: #a2a2a2;font-size: 12px;line-height: 22px;letter-spacing: -0.32px;word-break:break-all; text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
  .shopInfor dl dd ul{overflow: hidden;}
  .shopInfor dl dd ul li{float: left; display: inline-block; font-size: 12px;line-height: 11px;}
  .shopInfor dl dd ul li b{font-weight: normal;font-family: Arial;}
  .shopInfor dl dd ul li:first-child{border-right: 1px solid #bea474;padding-right: 8px;margin-right: 8px;}
  .shopInfor .gotoIndex{display: inline-block;width: 66px;height: 24px;border-radius: 20px;font-size: 12px;text-align: center;line-height: 22px;position: absolute;right: 15px;top: 50%;margin-top: -12px;    color: #ff5200;border: 1px solid #ff5200;}
  .shopInfor dd p svg{display: inline-block;position: absolute;top: 50%;-webkit-transform:translate(0,-50%); margin-right: 6px;}
  .shopInfor dd p.shopName span{font-size: 16px;color: #1b1b1b;margin-left: 1px;}
  .shopInfor dd p.shopPhone{height: 24px;line-height: 24px; margin-top: 5px;}
  body{word-break: break-all;}
  .shareQr{display: inline-block;border-left: 1px dashed #F0F0F0;padding-left: 15px;height: 67px;position: absolute;right: 15px;top: 50%;margin-top: -39px;}
  .shareQr img{display: block;margin: 0 auto; width: 22px;height: 22px;margin-top: 10px;}
  .shareQr span{display: block;text-align: center; font-size: 12px;color: #606060;margin-top: 7px;}
  .topGood{background: #fff;margin: 12px 0;padding-bottom: 5px;}
  .goodsDetail_header .topGood{position: relative; margin-top: 0;}
  .goodsDetail_header .topGood .stock{font-size: 12px;color: #a2a2a2;display: inline-block;border: 1px solid #A2A2A2;padding: 0 7px;margin-left: 10px;margin-top: 8px;}
  .goodsDetail_header .topGood .stock b{font-size: 12px;color: #a2a2a2;font-weight: normal;}

  .detailInfor{background: #fff;margin-top: 12px;padding: 10px 0 58px;}
  .detailInfor h2{position: relative;margin:11px auto 20px;width: 90%;border-top: 1px solid #cacaca;font-size: 16px;font-weight: normal; color: #A2A2A2;padding: 0 15px;}
  .detailInfor h2.isBottom{border: none;text-align: center;font-size: 12px;line-height: 17px;margin: 0;padding: 10px 0;width: 100%;background: #f4f4f4;}
  .detailInfor h2>span{font-size: 16px;position: absolute;display: block;height: 26px;line-height: 26px;top: -13px;left: 50%; background: #fff;-webkit-transform: translate(-50%,0);padding: 0 5px;}
  .detailInfor img{display: block; width: 100%;}
  .detailInfor>div{padding: 0 15px 15px 15px; word-break: break-all;}
  .detailInfor .noDetail{margin: 30px 0;}
  .detailInfor .noDetail p{text-align: center;color: #a2a2a2;}
  .detailInfor .noDetail p:last-child{margin-top: 10px;}

  .goodsDetail_nav{position: fixed;left: 0;bottom: 0; background: #fff;width: 100%; height: 58px;overflow: hidden;box-shadow: 0 3px 9px 1px rgba(0,0,0,0.30);z-index:2; }
  .goodsDetail_nav .ulLeft{float: left; width: 44%;margin-top: 8px;}
  .goodsDetail_nav .ulLeft .shoppingCar{position: relative;}
  .goodsDetail_nav .ulLeft li{float: left; width: 33.3%;text-align: center;}
  .goodsDetail_nav .ulLeft li a i{display: block;margin: 0 auto; width: 24px;height: 24px; }
  .goodsDetail_nav .ulLeft li.myShop a i{background:url(https://store.iliujia.com/imgs/c/bk_goodsDetail.png) -9px -3px;;background-size: 240px 30px;}
  .goodsDetail_nav .ulLeft li.service a i{background: url(https://store.iliujia.com/imgs/c/bk_goodsDetail.png) -47px -3px;background-size: 240px 30px;}
  .goodsDetail_nav .ulLeft li.shoppingCar a i{background: url(https://store.iliujia.com/imgs/c/bk_goodsDetail.png) -85px -3px;background-size: 240px 30px;}
  .goodsDetail_nav .ulLeft li.myShop a:active i{background: url(https://store.iliujia.com/imgs/c/bk_goodsDetail.png) -129px -3px;background-size: 240px 30px;}
  .goodsDetail_nav .ulLeft li.service a:active i{background: url(https://store.iliujia.com/imgs/c/bk_goodsDetail.png) -167px -3px;background-size: 240px 30px;}
  .goodsDetail_nav .ulLeft li.shoppingCar a:active i{background: url(https://store.iliujia.com/imgs/c/bk_goodsDetail.png) -205px -3px;background-size: 240px 30px;}
  .goodsDetail_nav .ulLeft li.service a.current i{background: url(https://store.iliujia.com/imgs/c/bk_goodsDetail.png) -168px -3px;background-size: 240px 30px;}
  .goodsDetail_nav .ulLeft li.service a.current span{ color:#1C1B20; }
  .goodsDetail_nav .ulLeft li a span{color: #a2a2a2;font-size: 12px;}

  .goodsDetail_nav .ulRight{position: absolute;right: 0;  width: 53%;overflow: hidden;margin-top: 4px;}
  .goodsDetail_nav .ulRight li{float: left; width: 49%;height: 50px;cursor: pointer;line-height: 50px; text-align: center;color: #fff;}
  .goodsDetail_nav .ulRight li.status1{background: #1C1B20;font-size: 14px;}
  .goodsDetail_nav .ulRight li.status2{background: #aa2327;font-size: 14px;}
  .goodsDetail_nav .ulRight li.cantBuy{background: #a2a2a2;color: #fff;width: 100%;font-size: 14px;}

  .swiper-slide img{width: 100%;}
  .swiper-pagination-bullet-active{background: #fff;}
  li.shoppingCar p{position: absolute;top: -4px;left: 54%; display: inline-block; width: 18px;height: 18px;border-radius: 50%; background: #AA2327;text-align: center;color: #fff;font-size: 12px;line-height: 18px;}

  .contactDialog img{width: 100%;height: 100px;}
  .contactDialog  .triangleIcon img{height: 7px;width: 18px;}
  .contactDialog .onePhone img{height: 34px;}
  .contactDialog{position: fixed;left:0;top:0;right:0;bottom:0;background-color: rgba(0,0,0,.3); z-index:1; }
  .contactDialog .contactMain{ position:absolute; bottom:74px; left:15px; padding:10px 10px 15px; width:130px; background:#fff; border-radius:10px; }
  .contactDialog dl{ padding:5px 0 10px; }
  .contactDialog dt{ margin-bottom:6px; width:100%; padding:0 5px; box-sizing: border-box}
  .contactDialog dd{ font-size:12px; color:#606060; line-height:14px; text-align:center; }
  .contactDialog ul{ overflow:hidden; padding-top:5px; }
  .contactDialog li a{ display:block; font-size:12px; color:#606060; line-height:16px; }
  .contactDialog .onePhone i{ display:inline-block; margin:-2px 15px 0 0; width:34px; height:34px; vertical-align:middle; }
  .contactDialog .twoPhone li{ float:left; width:50%; }
  .contactDialog .twoPhone a{ text-align:center; }
  .contactDialog .twoPhone i{ display:block; margin:0 auto 2px; width:34px; height:34px; }
  .contactDialog .twoPhone i img{height: 34px;}
  .contactDialog .triangleIcon{ position:absolute; bottom:-6px; left:50%; margin-left:-9px; width:18px; }


  /* 优惠券和邮费 */
  .coupTrans{
  	background: #fff;
  	margin-bottom: 10px;
  }
  .coupTrans ul li{
  	display: flex;
  	align-items: center;
  	padding-right:15px;
  	margin-left: 15px;
  	height: 40px;
  	line-height: 40px;
  }
  .coupTrans ul li.couponRow{
  	border-bottom: 1px solid #F0F0F0;
  }
  .coupTrans ul .getCouBtn{
  	display: flex;
  	align-items: center;
  }
  .coupTrans ul .getCouBtn>span{
  	color: #1b1b1b;
  }
  .couponRow .rowTitle {
  	flex: 1;
  	color: #a2a2a2;
  }
  .couponRow em{
  	display: inline-block;
  	border-radius: 18px;
  	height: 19px;
  	line-height: 19px;
  	font-style: normal;
  	font-size: 10px;
  	text-align: center;
  	padding: 0 8px;
  	margin-right: 6px;
  }
  .couponRow .arrowIcon{
  	    display: inline-block;
  	    width: 18px;
  	    height: 18px;
  	    background: url(https://store.iliujia.com/imgs/c/arrowIcon.png);
  	    background-size: 100% 100%;
  }
  .transAmount .rowTitle{
  	color: #a2a2a2;
  }
  .transAmount .selectAddress {
  	position: relative;
  	border: 1px solid #A2A2A2;
  	border-radius: 4px;
  	height: 30px;
  	width: 148px;
  	margin-left: 10px;
  	line-height: 28px;
  	padding: 0 15px 0 5px;
  }
  .transAmount .selectAddress input {
  	position: absolute;
  	left: 1px;
  	top: 0;
  	height: 28px;
  	width: 97%;
  	padding: 0 15px 0 5px;
  }
  .transAmount .showTrans{
  	flex: 1;
  	text-align: right;
  	color: #1b1b1b;
  }
  .transAmount .showTrans i{
  	font-style: normal;
  }
  .transAmount .arrow-down{
  	position: absolute;
  	top: 11.5px;
  	right: 10px;
  	display: inline-block;
  	width: 12px;
  	height: 7px;
  	background-image: url(https://store.iliujia.com/imgs/c/arrow-down.png);
  	background-size: 100% 100%;
  	background-repeat: no-repeat;
  }


  /* 大B店铺信息展示 */
  .storeDivb{
  	padding: 12px 15px;
  	display: flex;
  	align-items: center;
  	background: #fff;
  }
  .storeDivb dt img{
  	width: 60px;
  	height: 50px;
  }
  .storeDivb dd{
  	flex: 1;
  	margin-left: 12px;
  }
  .storeDivb dd .shopName span {
  	font-size: 16px;
  	color: #1C1B20;
  	line-height: 22px;
  }
  .storeDivb dd .shopPhone span{
  	font-size: 12px;
  	color: #a2a2a2;
  	line-height: 17px;
  	margin-top: 3px;
  }
  /* 优惠券和邮费 */
  .coupTrans{
  	background: #fff;
  	margin-bottom: 10px;
  }
  .coupTrans ul li{
  	display: flex;
  	align-items: center;
  	padding-right:15px;
  	margin-left: 15px;
  	height: 40px;
  	line-height: 40px;
  }
  .coupTrans ul li.couponRow{
  	border-bottom: 1px solid #F0F0F0;
  }
  .coupTrans ul .getCouBtn{
  	display: flex;
  	align-items: center;
  }
  .coupTrans ul .getCouBtn>span{
  	color: #1b1b1b;
  }
  .couponRow .rowTitle {
  	flex: 1;
  	color: #a2a2a2;
  }
  .couponRow em{
  	display: inline-block;
  	border-radius: 18px;
  	height: 19px;
  	line-height: 19px;
  	font-style: normal;
  	font-size: 10px;
  	text-align: center;
  	padding: 0 8px;
  	margin-right: 6px;
  }
  .couponRow .arrowIcon{
  	    display: inline-block;
  	    width: 18px;
  	    height: 18px;
  	    background: url(https://store.iliujia.com/imgs/b/arrowIcon.png);
  	    background-size: 100% 100%;
  }
  .transAmount .rowTitle{
  	color: #a2a2a2;
  }
  .transAmount .selectAddress {
  	position: relative;
  	border: 1px solid #A2A2A2;
  	border-radius: 4px;
  	height: 30px;
  	width: 148px;
  	margin-left: 10px;
  	line-height: 28px;
  	padding: 0 15px 0 5px;
  }
  .transAmount .selectAddress input {
  	position: absolute;
  	left: 1px;
  	top: 0;
  	height: 28px;
  	width: 97%;
  	padding: 0 15px 0 5px;
  }
  .transAmount .showTrans{
  	flex: 1;
  	text-align: right;
  	color: #1b1b1b;
  }
  .transAmount .showTrans i{
  	font-style: normal;
  }
  .transAmount .arrow-down{
  	position: absolute;
  	top: 11.5px;
  	right: 10px;
  	display: inline-block;
  	width: 12px;
  	height: 7px;
  	background-image: url(https://store.iliujia.com/imgs/b/arrow-down.png);
  	background-size: 100% 100%;
  	background-repeat: no-repeat;
  }

  .couponDialog {
  	display: none;
  	position: fixed;
  	left: 0;
  	bottom: 0;
  	width: 100%;
  	background: #fff;
  	z-index: 999;
  	padding: 0 10px;
  }
  .couponDialog .selectCouponTitle{
  	font-size: 16px;
  	color: #474747;
  	text-align: center;
  	margin:15px 0;
  }
  .couponDialog>i{
  	position: absolute;
  	right: 0px;
  	top: 0px;
  	display: inline-block;
  	width: 40px;
  	height: 40px;
  }
  .couponDialog>i img{
  	width: 20px;
  	height: 20px;
  	margin: 10px;
  }
  .couponDialog #coupon-list-box{
  	max-height: 394px;
  	overflow-y: scroll;
  	margin-bottom: 44px;
  	background: #f4f4f4;
  }
  .couponCss{
  	padding: 0 8px 10px 8px;
  }
  .couponCss li{
  	position: relative;
  	height: 94px;
  	border-radius: 3.45px;
  	margin-top: 10px;
  }
  /* 上部展示 */

  .couponCss li .show-area {
  	display: flex;
  	height: 94px;
  	align-items: center;
  }

  /* 上左详情 */
  .couponCss li .show-area .show-left {
  	flex: 1;
  	padding: 0 13px 6px 20px;
  	background: #F5A623;
  	border-radius: 3.45px 0 0 3.45px;
  	background: #fff;
  }

  .couponCss li .show-detail {
  	display: flex;
  	align-items: center;
  	height: 66px;
  }

  .couponCss li .show-detail em {
  	font-size: 24px;
  	font-style: normal;
  	color: #AA2327;
  }

  .couponCss li .show-detail em i {
  	font-size: 48px;
  	font-style: normal;
  }

  .couponCss li .show-detail .limit {
  	display: flex;
  	flex-direction: column;
  	margin-left: 14px;
  	color: #fff;
  	margin-top: 4px;
  }

  .couponCss li .show-detail .limit b {
  	font-size: 12px;
  	letter-spacing: -0.32px;
  	line-height: 16px;
  	font-style: normal;
  	margin-top: 4px;
  	color: #606060;
  }
  .specialCoupon.couponCss li .show-detail .limit b{
  	text-align: center;
  }
  .couponCss li .show-detail .limit i {
  	font-size: 12px;
  	letter-spacing: -0.32px;
  	line-height: 16px;
  	font-style: normal;
  	height: 19px;
  	line-height: 19px;
  	text-align: center;
      border-radius: 18px;
      font-size: 10px;
      color: #606060;
  }
  .specialCoupon.couponCss li .show-detail .limit i{
  	background: rgba(255, 82, 0, 0.2);
      color: #ff5200;
  	width: 60px;
  }
  .couponCss li .indate {
  	font-size: 12px;
  	letter-spacing: -0.32px;
  	font-style: normal;
  	line-height: 17px;
  	margin-left: 4px;
  	color: #A2A2A2;
  }
  .couponCss .show-right{
  	height: 92px;
  	text-align: center;
  	border-radius: 0 3.45px 3.45px 0;
  	background: #fff;
  	width: 96px;
      border-left: 1px dashed #e3e3e3;
  }
  .couponCss li[from=special] .show-right.cantGet:after{
  	background-image:none;
  }
  .couponCss li[from=special] .show-right.cantGet span{
  	background: #e8e8e8;
  }
  .couponCss .show-right text{
  	display: inline-block;
  	font-size: 16px;
  	color: #fff;
  	margin-top: 21px;
  	display: flex;
      align-items: center;
      justify-content: center;
  	background: #F5A623;
  	width: 70px;
  	height: 70px;
  	border-radius: 5px;
  	margin-top: 11px;
  	margin-left: 13px;
  }
  .couponCss .show-right.cantGet text{
  	background: #e8e8e8;
  }
  .couponCss .semicircle{
  	position: absolute;
  	width: 14px;
  	height: 7px;
  	background: #F4F4F4;
  	right: 88px;
  }
  .couponCss .semicircle.semicircle-top{
  	top: 0;
  	border-radius: 0 0 10px 10px;
  }
  .couponCss .semicircle.semicircle-bottom {
  	bottom: 0;
  	border-radius: 10px 10px 0 0;
  }
  .couponCss li:before {
      content: '';
      background-image: url(https://store.iliujia.com/imgs/couponRangeImg3.png);
      width: 50px;
      height: 50px;
      display: block;
      position: absolute;
      background-size: 100% 100%;
      background-repeat: no-repeat;
  }
  .couponDialog .selectCouponBtn {
  	position: absolute;
  	left: 0;
  	right: 0;
  	bottom: 0;
  	border-top: 1px solid #F0F0F0;
  	height: 44px;
  	line-height: 44px;
  	font-size: 16px;
  	text-align: center;
  	z-index: 1000;
  	color: #fff;
  }
</style>


