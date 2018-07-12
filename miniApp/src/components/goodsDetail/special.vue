/*
    功能:  商品详情 特殊优惠券组件
*/
<template>
    <div class="specialCoupon couponCss">
        <li from="special">
            <div class="show-area">
                <div class="show-left">
                    <p class="show-detail">
                        <em>¥<i>{{special.couponBase.couponAmount}}</i></em>
                        <span class="limit">
                            <i class="theme_color">专属优惠</i>
                            <b v-if="special.couponBase.limitAmount">满{{special.couponBase.limitAmount}}可用</b>
                            <b v-else>无门槛</b>
                        </span>
                    </p>
                    <i class="indate" v-if="special.couponBase.endTime">{{special.couponBase.startTime}}-{{specialCoupon.couponBase.endTime}}</i>
                </div>
                <p v-if="special.couponBase.currentNum" :class="['show-right', special.youCanGet?'youCanGet':'cantGet']"><text @click="getFn(special.couponBase.id)">立即\n领取</text></p>
                <p v-else class="show-right getNum0"><text>立即\n领取</text></p>
            </div>
            <span class="semicircle semicircle-top"></span>
            <span class="semicircle semicircle-bottom"></span>
        </li>
    </div>
</template>
<script>
import { formatTime } from '@/utils/index.js';
import utils from '@/utils/index.js'
export default {
    props : ["specialCoupon"],
    computed : {
        special(){
            var special = {...this.specialCoupon}
            console.log(special.couponBase)
            special.couponBase.startTime = special.couponBase.startTime?formatTime(new Date(special.couponBase.startTime)).substring(0,16):'';
            special.couponBase.endTime = special.couponBase.endTime?formatTime(new Date(special.couponBase.endTime)).substring(0,16):'';
            if (special.lastCoupons || special.couponBase.limitGetCount) {
                special.youCanGet = 1;
            }
            return special
        }
    },
    methods : {
        getFn(baseId){
            this.$emit("baseId",baseId)
            // var data = {
            //     baseId : baseId,
            //     goodsId : goodsId,
            // }
            // utils.getStoreCouponCustomer(data,(msg)=>{
                
            // })
        }
    }
}
</script>


