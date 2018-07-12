/*
    功能: 优惠券页面
*/
<template>
    <div>
        <!-- 功能:  优惠券导航(“可使用”“不可使用”) -->
        <div class="couponsNav" v-show="showCouponsNav">
            <ul>
                <li v-for="(nav,index) of PAGE_DEFAULT_VALUE.couponsNav" :key="index" @click="toggleCoupons(index)">
                    <span :class="{showBaseLine: showBaseLine[index]}">{{nav}}</span>
                </li>
            </ul>
        </div>
        <!-- 功能:  优惠券列表 -->
        <div id="coupon-list-box" class="coupon-container" v-if="couponList.length&&showBaseLine[0]">
            <couponList :couponList="couponList" :couponIdC="couponIdC" @couponcho="couponcho"/>
        </div>
        <!--功能:  如无优惠券时，显示-->
        <div v-else>
            <Empty :msg="msg"/>
        </div>
        <!-- 功能： 查看历史优惠券     -->
        <p :class="couponList.length?'gotoHistory':'gotoHistory noCoponList'" @click="goHistory" v-if="haveHistory">
			<i></i>
			<span>查看历史优惠券</span>
			<i></i>
		</p>
    </div>
</template>
<script>
import utils from '@/utils/index.js';
import couponList from '@/components/coupon/couponList.vue';
import Empty from '@/components/empty.vue'

const PAGE_DEFAULT_VALUE = {
    couponsNav : ['可使用','不可使用']
}

export default {
    data(){
        return {
            couponList : [],            // 功能： 储存所有优惠券信息的数组
            msg : "暂时没有优惠券哦~",
            couponIdC : {},
            haveHistory : 1,            // 功能： 控制“查看历史优惠券”功能显示隐藏
            showCouponsNav : 0,         // 功能： 根据路由 控制优惠券导航条“可用”“不可用”显示隐藏
            showBaseLine: [true,false], // 功能:  控制优惠券导航条“可用”“不可用”下划线
            PAGE_DEFAULT_VALUE : PAGE_DEFAULT_VALUE // 功能:  网页默认值
        }
    },
    onShow(){
        var me = this;
        console.log('进入优惠券网页时路由查询参数: ',this.$root.$mp.query)
        /*
            功能： 通过查询路由参数对象来发送不同的请求
            参数:  list: 由订单中心页面“优惠券”跳转到该页面
                   isUser: 
                   默认: 点击“查看历史优惠券”跳转到该页面
        */
        if(this.$root.$mp.query.list){
            let pages = getCurrentPages();
            let currPage = pages[pages.length - 2];
            this.couponList = currPage.data.$root[0].couponList
            console.log('由订单中心页面“优惠券”跳转到优惠券页面: ',this.couponList)
            this.couponIdC = currPage.data.$root[0].chooseCoupon
            this.showCouponsNav = 1
            this.haveHistory = 0
        }else{
            if(this.$root.$mp.query.isUser){
                var data = {
                    isUsed : 0,
                }
                utils.listStoreCouponCustomer(data,(msg)=>{
                    me.couponList = msg;
                })
                this.haveHistory = 0
            }else{
                var data = {
                    isUsed : 1,
                }
                // 请求功能: 获取优惠券网页中优惠券列表
                // 请求参数:  isUsed
                utils.listStoreCouponCustomer(data,(msg)=>{
                    console.log('进入优惠券网页时优惠券列表: ',msg)
                    me.couponList = msg;
                })
            }
        }
    },
    components : {
        couponList,
        Empty,
    },
    methods : {
        couponcho(obj){
            this.$store.commit("chooseCou",obj);
            wx.navigateBack();
        },
        goHistory(){
            var data = {
                isUsed : 0,
            }
            // 请求功能： 获取优惠券网页中历史优惠券列表
            // 请求参数:  isUsed
            utils.listStoreCouponCustomer(data,(msg)=>{
                console.log('点击查看历史优惠券： ',msg)
                this.couponList = msg;
            })
            this.haveHistory = 0
        },
        toggleCoupons(ind){ // 功能:  切换优惠券种类“可用”“不可用”
            var vm = this
            vm.showBaseLine.map(function(item,index){
                if(index === ind){
                    vm.$set(vm.showBaseLine,index,true)
                }else{
                    vm.$set(vm.showBaseLine,index,false)
                }
            })
        }
    },
    onUnload(){
        this.couponList = [];
        this.couponIdC = {};
        this.haveHistory = 1;
        this.showCouponsNav = 0
        this.showBaseLine = [true,false]
    }
}
</script>
<style>
.couponsNav {
    padding-left: 15px;
    padding-right: 15px;
    height: 40px;
}
.couponsNav ul {
    display: flex;
    height: 40px;
}
.couponsNav ul li {
    flex: 1;
    height: 40px;
    position: relative;
}
.couponsNav ul li span {
    display: block;
    /*width: 60px;*/
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-style: 13px;
    font-family: "PingFangSC-Regular";
    color: #FF5200;
}
.couponsNav ul li .showBaseLine {
    border-bottom: 1px solid #FF5200;  
}
.coupon-container {
    margin: 10px 15px 0;
}
.couponList li{
    position: relative;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
}
/* 上部展示 */
.couponList li .show-area{
    display: -webkit-flex;
    display: flex;
    height: 94px;
    padding: 0 13px 6px 20px;
    align-items: center;
}
/* 上左详情 */
.couponList li .show-area .show-left{
    -webkit-flex: 1;
    flex: 1;
}
.couponList li .show-detail{
    display: -webkit-flex;
    display: flex;
    align-items: center;
    height: 66px;;
}
.couponList li .show-detail em{
    font-size: 24px;
    color: #AA2327;
    font-style: normal;
}
.couponList li .show-detail em i{
    font-size: 48px;
    font-style: normal;
}
.couponList li .show-detail .limit{
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    margin-left: 14px;
}
.couponList li .show-detail .limit b{
    font-size: 12px;
    color: #606060;
    letter-spacing: -0.32px;
    line-height: 16px;
    font-style: normal;
 }
 #coupon-list-box li .show-detail .limit i {
     font-size: 12px;
     letter-spacing: -0.32px;
     line-height: 16px;
     font-style: normal;
 }
 .couponList li .indate{
    font-size: 12px;
    color: #A2A2A2;
    letter-spacing: -0.32px;
    font-style: normal;
    line-height: 17px;
    margin-left: 4px;
 }
 /* 上左详情 */
.couponList li .show-right {
    display: inline-block;
    width: 70px;
    height: 70px;
    background: #e3e3e3;
    border-radius: 5px;
}
.couponList li .show-right.uesImmediate{
    background: #F5A623;
}
.couponList li .show-right span{
    display: inline-block;
    color: #fff;
    font-size: 16px;
    text-align: center;
    width: 32px;
    height: 50px;
    margin: 10px 19px;
}
 /* 下编辑 */
.couponList li .edit-area {
    height: 42px;
    border-top: 1px dashed #E3E3E3;
    padding: 0 24px;
}
.couponList li .edit-area p{
    line-height: 42px;
    font-size: 12px;
    color: #A2A2A2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
/* 半圆 */
.couponList li .semicircle{
    position: absolute;
    bottom: 35px;
    display: block;
    width: 7px;
    height: 14px;
    background: #F4F4F4;
    z-index: 9;
}
.couponList li .semicircle.semicircle-left {
    left: 0px;
    border-radius:0px 10px 10px 0;
}
.couponList li .semicircle.semicircle-right{
    right: 0px;
    border-radius:10px 0 0 10px;
}
/* 查看历史优惠券按钮 */
.gotoHistory{
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    height: 16px;
    line-height: 16px;
    margin-bottom: 15px;
}
.gotoHistory.noCoponList{
    position: fixed;
    top: 50%;
    left: 0;
    right: 0;
    margin-top: 150px;
}
.gotoHistory i{
    display: inline-block;
    width: 50px;
    height: 2px;
    background: #CACACA;
}
.gotoHistory span{
    font-size: 12px;
    color: #A2A2A2;
    margin: 0 7px;
}

/*.couponList_C .limit {
    margin-top: 20px;
}*/
/* 不可用优惠券 */
.couponList li.reason1 .show-detail em,
.couponList li.reason3 .show-detail em,
.couponList li.reason6 .show-detail em,
.couponList li.reason1 .show-detail .limit b,
.couponList li.reason3 .show-detail .limit b,
.couponList li.reason6 .show-detail .limit b {
    color: #a2a2a2;
}
.notAllowReason .edit-area{
    display: -webkit-flex;
    display: flex;
    align-items: center;
}
.notAllowReason .edit-area img{
    width: 20px;
    height: 20px;
}
.notAllowReason .edit-area p{
    -webkit-flex:1;
    flex: 1;
    margin-left: 4px;
}
.couponList li .show-right.cantUse{
    opacity: 0.3;
}
.couponList li .timeOut{
    width: 70px;
    height: 70px;
    background-repeat: no-repeat;
    background-size: cover;
}
.couponList li .timeOut.notAllowReason3,.couponList li .timeOut.notAllowReason6{
    background-image: url(https://store.iliujia.com/imgs/c/coupon/isTimeout.png);
}
.couponList li .timeOut.notAllowReason1 {
    background-image: url(https://store.iliujia.com/imgs/c/coupon/isUse.png);
}
.notAllowReason .usedAlready{
    position: absolute;
    top: 0;
    left: 0;
}

/* 下单选择优惠券头部 */
.coupon-header{
    background: #fff;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
}
.coupon-header li{
    display: inline-block;
    width: 50%;
    text-align: center;
    float: left;
}
.coupon-header li span{
    font-size: 13px;
    color: #606060;
    padding: 0 8px 10px;
}
.couponliJu:before{
    content: '';
    width: 50px;
    height: 50px;
    display: block;
    position: absolute;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.couponList li .show-detail .limit b.newPersonCoupon{
    display: inline-block;
    border-radius: 18px;
    height: 19px;
    line-height: 19px;
    font-style: normal;
    font-size: 10px;
    text-align: center;
    padding: 0 8px;
    margin-right: 6px;
    color: #ff5200;
    margin-bottom: 5px;
}
.notAllowReason.allGoods:before{
    background-image: url(https://store.iliujia.com/imgs/couponRangeImg2.png);
}
.notAllowReason.specialGoods:before{
    background-image: url(https://store.iliujia.com/imgs/couponRangeImg4.png);
}
.canUse.allGoods:before{
    background-image: url(https://store.iliujia.com/imgs/couponRangeImg1.png);
}
.canUse.specialGoods:before{
    background-image: url(https://store.iliujia.com/imgs/couponRangeImg3.png);
}
</style>
