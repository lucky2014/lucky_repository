<template>
    <div>
        <div v-for="(item,index) in couponList" :key="index" :class="'commonList-parent '+item.couponBase.statusChange">
            <div class="info-list-icons">
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell weui-cell_switch weui-cell_swiped">
                        <div class="weui-cell__bd">
                            <div class="coupon-list coupon-table">
                                <div class="coupon-list-lf lf coupon-cell dashed">
                                    <div class="coupon-list-lf-main clearFix">
                                        <div class="coupon-list-lf-top coupon-table">
                                            <span class="coupon-strong lf">
                                                {{item.couponBase.couponAmount}}
                                            </span>
                                            <span class="coupon-desc lf">
                                                <span class="coupon-con"><span class="coupon-name">{{item.couponBase.limitAmount?'满'+item.couponBase.limitAmount+'可用':'无门槛'}}</span>
                                                
                                                <span class="coupon-name">{{item.couponBase.limitGetCount?'每人限领'+item.couponBase.limitGetCount+'张':''}}</span></span>
                                            </span>
                                        </div>
                                        <p class="couponBaseTime">{{item.time}}</p>
                                    </div>
                                    <div class="radius1 lf"></div>
                                </div>
                                <div class="coupon-list-rt lf coupon-table">
                                    <div class="radius2 lf"></div>
                                    <p class="coupon-cell">
                                        <span class="coupon-block coupon-bold" @click="getCoupon(item.couponBase.status,item.couponBase.id)">
                                            立即领取
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { formatTime } from '@/utils/index.js';
export default {
    props :["couponList"],
    computed : {
        couponListC : function(){
            var me = this;
            var newList = this.couponList.map(function(v,i){
                v.time = formatTime(new Date(v.couponBase.startTime)).substring(0,16)+"-"+formatTime(new Date(v.couponBase.endTime)).substring(0,16)
                // console.log(v)
                // console.log(i + "..." +v.lastCoupons)
                // console.log(i + "..." +v.limitGetCount)
                if(v.couponBase.currentNum<=0 && v.couponBase.status==1){
                    v.couponBase.status = 2
                }else if(v.lastCoupons == 0 &&  v.couponBase.limitGetCount){
                    v.couponBase.status = 0
                }else{
                    v.couponBase.status = v.couponBase.status||1
                }
                // if(v.couponBase.baseStatus==3){
                //     v.newStatus = 3;
                // }else{
                //     v.newStatus = v.couponBase.status;
                // }
                // if(v.newStatus!=1){
                //     v.statusChange = me.getStatus(v.newStatus);
                //     v.change = me.getStatus(v.newStatus);
                // }else if(v.lastCoupons==0){
                //     v.change = me.getStatus(0)
                // }else{
                //     v.change = "getting";
                // }
                v.couponBase.statusChange = me.getStatus(v.couponBase.status)
                return
            })
            return newList
        }
    },
    methods : {
        getStatus : function(index){
            var statusAdmin = {
                "1":"getting",//keyong
                "2":"isGet",//领完
                "3":"outdate",//过时
                "0":"isGetOut"//领取
            }
            return statusAdmin[index]
        },
        getCoupon : function(status,id){
            if(status == 1){
                this.$emit("baseid",id)
            }
        },
    }
}
</script>

