<template>
    <div>
        <div class="coupon-dialog-model bounceInDialog" v-show="lookAll">
            <div class="coupon-dialog">
                <div class="coupon-list-title">
                    <img src="https://store.iliujia.com/imgs/c/coupon/banner.png">
                </div>
                <div id="coupon-list-box" class="coupon-container">
                    <couponlist :couponList="couponList" @baseid="getCoupon"/>
                </div>
                <div class="coupon-list-footer">
                    <a class="myCoupon" @click="gotoList">查看我的优惠券</a>
                </div>
                <div class="dialog-footer">
                    <img class="cutShare" src="https://store.iliujia.com/imgs/c/cutShare.png" @click="cutShare">
                </div>
            </div>
        </div>
        <div class="couponInput bounceIn" v-show="showCoupon" v-if="haveall">
            <i class="closeGift" @click="close"><img src="https://store.iliujia.com/imgs/c/cut1.png"></i>
            <div class="giftDiv" @click="showList">
                <img src="https://store.iliujia.com/imgs/c/coupon/coupon.png">
                <a class="couponBtn"></a>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import couponlist from './couponList.vue'
export default {
    data(){
        return {
            showCoupon : false,
            lookAll : false,
            couponList : [],
            haveall : false,
        }
    },
    components:{
        couponlist,
    },
    onShow(){
        this.showCoupon = true
    },
    methods : {
        close : function(){
            this.showCoupon = false
        },
        showList : function(){
            this.lookAll = true
        },
        cutShare : function(){
            this.lookAll = false
        },
        getCoupon : function(id){
            var data = {
                baseId : id,
            }
            utils.getStoreCouponCustomer(data,(msg)=>{
                utils.alert("领取成功",'success')
                setTimeout(()=>{
                    this.setCouponList();
                },1500)
            })
        },
        setCouponList : function(){
            utils.listCustomerCoupons((msg)=>{
                if(msg.length){
                    this.showCoupon = true
                    this.haveall = true
                    this.couponList = msg;
                }
            })
        },
        gotoList : function(){
            this.lookAll = false
            wx.navigateTo({
                url : "../coupon/main"
            })
        }
    },
    mounted(){
        this.setCouponList();
    }
}
</script>
<style>
div,view,*{font-size: 14px;}
.weui-cell{padding:0;}
.info-list-icons .weui-cells{
    padding: 0;
    margin:0;
    background-color: transparent;
    overflow: initial;
    position: relative;
    font-size: 17px;
}
.lf{
    float: left;
}
.rt{
    float: right;
}
.weui-cells:before,.weui-cells:after{
    border:none;
}
.weui-cell__ft img{
    width:34px;
    display: block;
    margin:0 auto;
}
.weui-cell__ft .coupon-table{
    height: 100%;
    width:100%;
    text-align: center;
}
.weui-cell__ft .coupon-table a{
    font-size: 14px;
    color: #AA2327;
    letter-spacing: -0.5px;
}   
.coupon-container{
    margin-left: 4%;
    margin-right: 4%;
}
#coupon-nav{
    width:100%;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(213,213,213,0.50);
}
.coupon-nav-list{
    width:33.33%;
    text-align: center;
    padding-top: 12px;
    padding-bottom: 12px;
}
.coupon-nav-list a{
    font-size: 13px;
    color: #606060;
    letter-spacing: -0.35px;
    line-height: 15px;
}
.coupon-nav-list a.active{
    color:#BEA474;
}
.coupon-list{
    background-color: #fff;
    /* margin-top:10px; */
    box-shadow: 0 1px 2px 0 rgba(213,213,213,0.50);
    border-radius: 3px;
    width:100%;
    height: 54px;
}
.dashed{
    height: 100%;
    position: relative;
}
.coupon-list-lf{
    width:80%;
    position: relative;
}
@media screen and (max-width: 320px) {
    .coupon-list-lf{
        width: calc(77.5%);
        position: relative;
    }
}
.commonList-parent.outdate .coupon-strong,.isGet .coupon-strong,.isGetOut .coupon-strong{
    color: #A2A2A2;
}
.coupon-table{
    display: table;
}
.coupon-cell{
    display: table-cell;
    vertical-align: middle;
    height: 80px;
}
.coupon-list-rt .coupon-cell{
    padding-left: 6px;
}
.coupon-flex{
    display: flex;
    align-items: flex-end;
}
.radius1{
    width:20px;
    height:80px;
    background:url(https://store.iliujia.com/imgs/c/coupon/group_4_png.png) no-repeat;
    background-color: #E9002E;
    background-size: 100% 100%;
    position: absolute;
    right:0;
    top:0;
    z-index: 2;
    right: -5px;
}
.outdate .radius1{
    background-image: url(https://store.iliujia.com/imgs/c/coupon/group_3_png.png);
}
.radius2{
    position: relative;
    width:0px;
    height: 100%;
    z-index: 20;
}
.isGetOut .radius1{
    background-image: url(https://store.iliujia.com/imgs/c/coupon/group_2_png.png);
    background-color: #E9002E;
}
.isGet .radius1{
    background-image: url(https://store.iliujia.com/imgs/c/coupon/group_3_png.png);
    background-color: #E9002E;
}
.outdate .radius2{
    background:url(https://store.iliujia.com/imgs/c/coupon/group_2_outdate.svg) no-repeat;
    background-color: #E9002E;
}
.isGet .radius2{
    background:url(https://store.iliujia.com/imgs/c/coupon/group_2_outdate.svg) no-repeat;
    background-color: #E9002E;
}
.isUsed .radius2{
    background:url(https://store.iliujia.com/imgs/c/coupon/group_2_isUsed.svg) no-repeat;
    background-color: #E9002E;
}
.isGetOut .radius2{
    background:url(https://store.iliujia.com/imgs/c/coupon/group_2_isUsed.svg) no-repeat;
    background-color: #E9002E;
}
.radius2:after{
    content: "";
    display: block;
    width: 64px;
    height: 48px;
    border-radius: 50%;
    position: absolute;
    left: -40px;
    top: 50%;
    margin-top: -24px;
}
.outdate .radius2:after{
    background:url(https://store.iliujia.com/imgs/c/coupon/outdate.png) no-repeat;
    background-size: 100% 100%;
}
.isGet .radius2:after{
    background:url('https://store.iliujia.com/imgs/c/coupon/isGet.png') no-repeat;
    background-size: 100% 100%;
}
.isUsed .coupon-list-rt:after{
    content: "";
    background:url(https://store.iliujia.com/imgs/c/coupon/isUsed.png) no-repeat;
    background-size: 100% 100%;
    width:40px;
    height: 40px;
    position: absolute;
    right:0;
    bottom: 0;
}
.isGetOut .coupon-list-rt:after{
    content: "";
    background:url(https://store.iliujia.com/imgs/c/coupon/isGetting.png) no-repeat;
    background-size: 100% 100%;
    width:40px;
    height: 40px;
    position: absolute;
    right: -1px;
    bottom: -2px;
}
.outdate .coupon-list-rt,.isGet .coupon-list-rt{
    background-color: #E3E3E3;
}
.isUsed .coupon-list-rt,.isGetOut .coupon-list-rt{
    background-color: rgba(245,166,35,0.30);
}
.coupon-list-lf-main{
    padding-bottom: 16px;
    padding-top: 10px;
    height: 100%;
    padding-left: 0%;
    padding-right: 0;
    width:100%;
    position: relative;
}
.coupon-list-lf-top{
    width:100%;
}
.coupon-strong{
    font-size: 32px;
    float: left;
    color: #AA2327;
}
.coupon-strong:before{
    content: "￥";
    font-size:16px;
    position: relative;
    left:6px;
}
.coupon-desc{
    font-size: 12px;
    color: #606060;
    letter-spacing: -0.32px;
    line-height: 1.3;
    height: 48px;
    margin-left:10px;
    word-break: break-all;
    position: relative;
    bottom: 8px;
}
.coupon-con{
    width: 100px;
    position: absolute;
    left: 0;
    bottom: 0;
}
.coupon-name{
    display: block;
}
.coupon-time{
    font-size: 12px;
    color: #A2A2A2;
    letter-spacing: -0.32px;
    padding-left: 5%;
}
.coupon-block{
    display: block;
}
.coupon-bold{
    font-size: 20px;
    width:40px;
    margin:0 auto;
    text-align: center;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: -0.43px;
    line-height: 18.4px;
    position: relative;
    left:-8px;
}
.coupon-num{
    display: inline-block;
    width: 100%;
    text-align: center;
    font-style: normal;
    color:#A2A2A2;
    font-size: 12px;
}
.coupon-list-rt{
    width: 20%;
    height: 100%;
    background: #F5A623;
}
.backFn{
    padding: 10px 20px;
    background: #BEA474;
    width: 92%;
    position: fixed;
    bottom: 16px;
    left:4%;
    color:#fff;
}
.bounceOutDialog{
    visibility: hidden;
    opacity: 0;
    transition: all .5s ease;
}
.coupon-dialog-model{
    position: fixed;
    left: 0;
    top:0;
    bottom:0;
    right:0;
    background-color: rgba(0,0,0,.6);
    z-index: 999;
    overflow: hidden;
}
.coupon-list-title{
    width:100%;
    height: 132px;
    background: #F5A623;
    overflow: hidden;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
.commonList-parent:nth-child(1) .coupon-list{
    margin-top:0;
}
.coupon-list-title img{
    width:100%;
    height: 132px;
}
.coupon-dialog{
    width:88%;
    position: absolute;
    left:6%;
    top:10%;
    border-radius: 12px;
    background: #E9002E;
}
.coupon-dialog-model #coupon-list-box{
    max-height: 220px;
    overflow: scroll;
    /* margin-top: 10px; */
    min-height: 50px;
}
.coupon-list-footer{
    height: 70px;
    text-align: center;
}
.coupon-list-footer a{
    display: inline-block;
    margin:0 auto;
    height:40px;
    width: 160px;
    border: 1px solid #FFFFFF;
    border-radius: 79px; 
    line-height: 40px;
    color: #FFFFFF;
    margin-top:15px;
    font-size: 14px;
}
.dialog-footer{
    text-align: center;
    color: #fff;
    position: absolute;
    width:100%;
    bottom:-90px;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: -0.38px;
}
.dialog-footer img{
    display: block;
    width: 27px;
    height: 27px;
    margin: 0 auto 25px;
}
.bounceIn {
    opacity: 1;
    visibility: visible;
    -webkit-transition: .5s opacity .2s;
    transition: .5s opacity .2s;
    -webkit-animation:bounceIn 1s ease-in-out;
    display: block;
}
.bounceInDialog{
    visibility: visible;
    opacity: 1;
    transition:all .6s ease;
}
.couponInput{
    position: fixed;
    right:8px;
    bottom: 84px;
    width:118px;
    height: 160px;
    cursor: pointer;
}
.topGood>a{
    position: relative;
}
.topGood>a:before,.home_shopGoods ul li>a:before,#goodsDetail .swiper-container:before{
    background-size: 100% 100%;
    display: block;
    width: 63px;
    height:63px;
    position: absolute;
    left:0;
    top:0;
    content: "";
    z-index: 10;
}
#goodsDetail .swiper-container:before{
    width: 82px;
    height: 82px;
    left: 6px;
    top: 6px;
}
.topGood>a:before{
    left:14px;
    top:14px;
}
/*#allGoods .home_shopGoods ul li:nth-child(2n+3){
    margin-left: 4%;
}*/
.couponInput img{
    width: 100%;
    margin:0 auto;
}
.closeGift img{
    height: 100%;
}
.giftDiv img{
    height: 112px;
}
.couponBtn{
    width:80px;
    height:24px;
    font-size: 12px;
    color: #fff;
    background-color:#F5A623;
    border-radius: 24px;
    display: block;
    margin:0 auto;
    margin-top: 5px;
    background:url(https://store.iliujia.com/imgs/c/coupon/couponInput.png) no-repeat;
    background-size: 100%;
    margin-left: 16px;
}
#goodsClassify .home_shopGoods{
    background-color: #F0F0F0;
}
.noMoreData{
    background-color: transparent;
}
.closeGift{
    position:absolute;
    top:-6px;
    right: 5px;
    width:32px;
    height: 32px;
    padding:5px;
    box-sizing: border-box;
}

@-webkit-keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@-webkit-keyframes bounceInDialog {
  from, 20%, 40%, 60%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
.navBar{
    z-index: 90;
}
.commonList-parent{
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
}
#goodsClassify .home_shopGoods {
    margin-top: 50px;
    min-height: 500px;
}
.couponBaseTime{
    font-size: 12px;
    padding-left: 10px;
    position: relative;
    top: -6px;
    color: #A2A2A2;
}
.isGet .coupon-desc,.isGetOut .coupon-desc{
    color: #A2A2A2;
}
</style>


