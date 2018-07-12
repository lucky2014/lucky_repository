<template>
    <ul class="payLists payDirect">
        <li class="weChatPay" @click="gopay">
            <i></i>
            <span>快捷支付</span>
            <b></b>
        </li>
    </ul>
</template>
<script>
import utils from "@/utils/index.js"
export default {
    props : ["orderNo"],
    methods : {
        gopay(){
            var data = {
                orderNos: this.orderNo,
                source: 'JSAPI',
                PayType: 'XCX'
            }
            utils.payOrder(data,(msg)=>{
                wx.requestPayment({
                    timeStamp:msg.timeStamp,
                    nonceStr:msg.nonceStr,
                    package:msg.package,
                    signType:msg.signType,
                    paySign:msg.sign,
                    success : function(res){
                        wx.redirectTo({
                            url : '../orderList/main?status=0'
                        })
                    },
                    fail : function(){

                    }
                })
            })
        }
    }
}
</script>

