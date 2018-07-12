<template>
    <div>
        <div class="addressDiv"><a>
            <div><span class="nameSpan">{{order.receiverName}}</span><span class="phoneSpan">{{order.receiverMoible}}</span></div>
            <p>{{order.receiverAddress}}</p>
            <i class="posIcon"><img src="https://store.iliujia.com/imgs/c/pos.png" width="100%" /></i>
        </a></div>
        <section class="buyerMessage mb10" v-if="order.mark"><span>买家留言：</span><div>{{order.mark}}</div></section>
        <div class="goodsInfo">
            <div class="goodsList">
                <a v-for="(item,index) in order.orderDetails" :key="index"><dl>
                    <dt><img :src="item.goodsPic" /></dt>
                    <dd>
                        <p class="goodsName">{{item.goodsName}}</p>
                        <p class="specSpan" v-if="item.skuDesc">
                            {{item.skuDesc}}
                        </p>
                        <div class="bottomDiv">
                            <span class="priceSpan">¥{{item.perPrice}}</span>
                            <span class="numberSpan">x {{item.num}}</span>
                        </div>
                    </dd>
                </dl></a>
            </div>
            <div class="priceDiv">
                <div class="priceDetail">
                    <p>商品总金额<span>¥{{order.goodsPrice}}</span></p>
                    <p>运费<span>¥{{order.transferFeeNoFree}}</span></p>
                    <p v-if="order.couponCamount!='0.00'">优惠金额<span>-¥{{order.couponCamount}}</span></p>
                </div>
                <div class="priceTotal">
                    <p>应付金额<span>¥{{order.totalPrice}}</span></p>
                </div>
            </div>
        </div>
        <div class="buyerMessage" style="margin-bottom:10px;" v-if="order.remark">给卖家留言：<p>{{order.remark}}</p></div>
        
        <div class="orderInfo">
            <p>订单编号：<span>{{order.orderNo}}</span></p>
            <p>下单时间：<span>{{order.createTimeNew}}</span></p>
            <!-- <p>付款时间：<span>{{order.payTimeNew}}</span></p> -->
        </div>
        <div class="payDiv" v-if="order.btn1">
            <p>合计：<span>¥{{order.totalPrice}}</span>（含运费）</p>
            <a @click="gopay(order.totalPrice,order.orderDetails.length,order.orderNo)">去支付</a>
        </div>
    </div>
</template>
<script>
import { formatTime } from '@/utils/index.js';
export default {
    props:["order"],
    watch : {
        order(msg){
            if(msg.orderDetails){
                msg.orderDetails.map(function(v){
                    v.perPrice = v.perPrice.toFixed(2)
                })
                if(msg.couponCamount){
                    msg.goodsPrice = (msg.totalPrice-msg.transferFee+msg.couponCamount).toFixed(2);
                }else{
                    msg.goodsPrice = (msg.totalPrice-msg.transferFee).toFixed(2);
                }
                msg.couponCamount = msg.couponCamount?msg.couponCamount.toFixed(2):'0.00'
                msg.totalPrice = (msg.totalPrice+msg.transferFeeNoFree-msg.transferFee).toFixed(2);
                msg.transferFeeNoFree = msg.transferFeeNoFree?msg.transferFeeNoFree.toFixed(2):'0.00'
                msg.createTimeNew = formatTime(new Date(msg.createTime))
                if(msg.payTime){
                    msg.payTimeNew = formatTime(new Date(msg.payTime))
                }else{
                    if(msg.status==5){
                        msg.payTimeNew = "已关闭";
                    }else{
                        msg.payTimeNew = "待付款";
                    }
                }
                if(msg.status == 1){
                    msg.btn1 = 1;
                }
            }
            
        }

    },
    methods:{
        gopay(price,num,order){
            wx.redirectTo({
                url : '../pay/main?actualPrice='+price+'&num='+num+'&orderNo='+order
            })
        }
    }
}
</script>
