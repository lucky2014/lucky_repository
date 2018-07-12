<template>
    <div v-if="showModel">
        <div class="newCoupon-container">
            <div class="coupnInner">
                <div class="content">
                    <h3 class="congratulation">恭喜您</h3>
                    <p class="success">成功领取新人礼包</p>
                    <div class="amount">
                        <p>¥<span>{{count}}</span></p>
                    </div>
                    <p class="goToCouponList" @click="gocoupon">查看我的优惠券</p>
                </div>
                <i class="cutNew" @click="goClose"><img src="https://store.iliujia.com/imgs/c/cutShare.png" alt=""></i>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
export default {
    data () {
        return {
            showModel : 1,
        }
    },
    props : {
        count : {
            default : 0,
        }
    },
    methods : {
        goClose (){
            this.showModel = 0
        },
        gocoupon (){
            this.showModel = 0
            wx.navigateTo({
                url : '../coupon/main'
            })
        }
    }
}
</script>
<style>
.newCoupon-container{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0,0,0,0.5);
	z-index: 9999;
}
.newCoupon-container .coupnInner{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform:translate(-50%,-50%);
	width: 280px;
}
.newCoupon-container .content{
	background-image: url(https://store.iliujia.com/imgs/share/couponModal1_bg.png);
	background-repeat:no-repeat;
	background-size: 100% 100%; 
	height: 420px;
}
.newCoupon-container .congratulation{
	font-size: 28px;
	color: #FFE5C7;
	text-align: center;
	text-shadow: 0 2px 4px rgba(255,79,15,0.50);
	padding-top: 30px;
}
.newCoupon-container .success{
	font-size: 16px;
	color: #FFE5C7;
	text-align: center;
	text-shadow: 0 2px 4px rgba(255,79,15,0.50);
}
.newCoupon-container .amount{
	width: 251px;
	height: 227px;
	margin: 6px auto 0;
	background-image: url(https://store.iliujia.com/imgs/c/newPersonCoupon.png);
	background-repeat:no-repeat;
	background-size: 100% 100%;
	overflow: hidden;
}
.newCoupon-container .amount p{
	font-size: 18px;
	color: #AA2327;
	text-align: center;
	margin-top: 70px;
}
.newCoupon-container .amount p span{
	font-size: 36px;
	color: #AA2327;
}
.newCoupon-container .goToCouponList{
	width: 170px;
	height: 70px;
	line-height: 70px;
	text-align: center;
	margin: 0 auto;
	font-size: 16px;
	color: #FF5200;
	background-image: url(https://store.iliujia.com/imgs/c/btnBk.png);
	background-repeat:no-repeat;
	background-size: 100% 100%; 
}
.newCoupon-container .cutNew{
	display: block;
	width: 40px;
	height: 40px;
	margin: 18px auto 0;
}
.newCoupon-container .cutNew img{
	width: 26px;
	height: 26px;
	margin:7px;
}
</style>

