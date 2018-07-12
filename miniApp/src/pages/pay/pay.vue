<template>
    <div id="payment">
        <h1>
            <p>支付金额</p>
            <i>¥<em>{{info.actualPrice}}</em></i>
            <span>共（<b>{{info.num}}</b>）件：</span>
        </h1>
        <ul class="alipay-header" v-if="store.parentStoreId == 0&&store.payOnlineStatus == 1">
            <li :class="tap==1?'current':''" sign="1" @click="chooseTap(1)" v-if="store.payOnlineStatus == 1">
                <p><span>快捷支付（推荐）</span></p>
            </li>
            <li :class="tap==2?'current':''" sign="2" @click="chooseTap(2)" v-if="store.parentStoreId == 0">
                <p><span>转账支付</span></p>
            </li>
        </ul>
        <div v-show="tap==1" v-if="store.payOnlineStatus == 1">
            <paydirect :orderNo="info.orderNo"/>
        </div>
        <div v-show="tap==2" v-if="store.parentStoreId == 0">
            <paytransfer @addType="addType"/>
        </div>
        <showmodel :type="type"  @addType="addType"/>
    </div>
</template>
<script>
import paydirect  from '@/components/pay/payDirect.vue'
import paytransfer  from '@/components/pay/payTransfer.vue'
import showmodel from '@/components/pay/showModel.vue'
export default {
    data(){
        return {
            info : {},
            tap : 1,
            type : "",
        }
    },
    computed : {
        store (vue){
            if(vue.$store.state.info.storeInfo.payOnlineStatus!=1){
                this.tap = 2
            }
            return vue.$store.state.info.storeInfo
        }
    },
    components : {
        paydirect,
        paytransfer,
        showmodel,
    },
    mounted(){
        if(this.$root.$mp.query){
            this.info = this.$root.$mp.query
            if(this.store.payOnlineStatus!=1){
                this.tap = 2
            }
        }
    },
    methods : {
        chooseTap(id){
            this.tap = id
        },
        addType(type){
            this.type = type
        }
    },
    onUnload(){
        this.info = {};
        this.tap = 1;
        this.type = "";
    }
}
</script>
<style>
img,image{height: 100%;width: 100%;}
li.current span {color: #ff5200;border-bottom: 3px solid #ff5200;}
#payment h1{height: 50px;line-height: 50px;background: #fff;font-weight: normal;}
#payment h1 p{display: inline; font-size: 14px;margin-left: 16px;}
#payment h1 span{float: right;font-size: 12px;color: #a2a2a2;}
#payment h1 span b{font-weight: normal;font-size: 12px;color: #a2a2a2;}
#payment h1 i{ float: right;margin-right: 15px; color: #aa2327;font-size: 18px;font-style: normal;}
#payment h1 i em{color: #aa2327;font-size: 18px;font-style: normal;}

#payment .alipay-header{background: #fff;margin-top: 10px;overflow: hidden;}
#payment .alipay-header li{float: left; display: inline-block; height: 44px;line-height: 44px;width: 50%;text-align: center;}
#payment .alipay-header li p{height: 30px;line-height: 30px; margin-top: 7px;}
#payment .alipay-header li:first-child p {border-right: 1px solid #f0f0f0;}
#payment .alipay-header li span{display: inline-block;font-size: 16px;padding-bottom: 3px;}

#payment ul.payLists{background: #fff;}
#payment ul.payLists li{overflow: hidden; border-top:  1px solid #F0F0F0;}
#payment ul.payLists li>i{float: left; width: 21px;height: 21px;margin: 10px 15px;}
#payment ul.payLists li.alipay>i,#payment ul.payLists li.alipayma>i{background: url(https://store.iliujia.com/imgs/c/bk_payment.png) -3px -5px;background-size: 80px 30px;}
#payment ul.payLists li.weChat>i{
    background-image: url(https://store.iliujia.com/imgs/c/weChat.png) ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
#payment ul.payLists li.weChatPay>i {
    background-image: url(https://store.iliujia.com/imgs/c/bk_fastPay.png) ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
#payment ul.payLists li>span{float: left; height: 40px;line-height: 40px;color: #a2a2a2;font-size: 14px;}
#payment ul.payLists li b{float: right; display: inline-block; width: 22px;height: 22px;margin: 9px 10px;background: url(https://store.iliujia.com/imgs/c/bk_payment.png) -54px -4px;background-size: 80px 30px;}

.payOut,.ZKLOut{position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index:4;}
.payOut .payInfor {position: fixed;background: #fff;width: 80%;padding-bottom: 15px;border-radius: 10px;left: 50%;top: 50%;transform: translate(-50%, -50%);}
.payOut .payInfor canvas{margin: 20px 20px 10px;}
.payOut .payInfor .qrcode{ width:53%; margin:0 auto 10px; padding-top:30px; }
.payOut .payInfor .qrcode image{display: block; width: 100%;height: auto;}
.payOut .payInfor .remark{margin:20px 15px 0;padding:5px 10px;font-size: 12px;color: #AA2327;border:1px dashed #AA2327;line-height:16px;}
#payment .wechatShow{}
#payment .wechatShow li,.ZKLOut li{ color:#606060; font-size:14px; line-height:16px; text-align:center; border:none; }
#payment .alipayShow,#payment .wechatShow{  padding:0 20px; }
#payment .alipayShow li,#payment .wechatShow li{ position:relative; padding:0 0 0 8px; border:none; color:#606060; font-size:14px; line-height:16px; }
#payment .alipayShow li:last-child,#payment .wechatShow li:last-child{ border-left:none; }
#payment .alipayShow li p,#payment .wechatShow li p{ padding:0 0 20px 12px; border-left:1px solid #F0F0F0; text-align: justify;
    line-height: 1.5;}
#payment .alipayShow li:last-child p,#payment .wechatShow li:last-child p{ padding-bottom:0; border-left:none; }
#payment .alipayShow li span,#payment .wechatShow li span{ position:absolute; left:0; top:0; width:16px; height:16px; border-radius:8px; color:#fff; background:#A2A2A2; line-height:16px; text-align:center; font-size:12px; }
#payment .closeBtn{ position:absolute; left:50%; bottom:-50px; margin-left:-14px; width:28px; height:28px; }

.exitPayment a{display: block;width: 100%; color: #fff;text-align: center;font-size: 16px;}

.zhikouling{position: fixed;top: 0;left: 0;bottom: 0;right: 0;background-color: rgba(0,0,0,.5);}
.zhikouling .zhiInfor{}
.ZKLOut{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,.6);}
.ZKLOut .ZKLInfor{background: #fff;width: 76.8%;position: absolute;top: 50%;left: 50%;transform: translate3d(-50%,-50%,0);box-sizing: border-box;border-radius: 10px;}
.ZKLOut .ZKLInfor .con{padding: 20px 26px;}
.ZKLOut .ZKLInfor h3{font-size: 18px;color: #606060;text-align: center;margin-bottom: 20px;}
.ZKLOut .zkl{width:100%;height:40px;border:none;font-size: 14px;color: #606060;background-color: #fff !important;}
.ZKLOut .remark{padding:5px 10px;font-size: 12px;color: #AA2327;border:1px dashed #AA2327;line-height:16px;margin-top: 20px;}
.ZKLOut .btnDiv{height: 44px;line-height: 44px;border-top: 1px solid #E8E8E8;}
.ZKLOut .btnDiv a,.ZKLOut .btnDiv button{width: 50%;float: left;box-sizing: border-box;font-size: 16px;text-align: center;height: 44px;line-height: 44px;background-color: #fff !important;border-radius: 0 0 0 10px;}
.ZKLOut .btnDiv a{border-right: 1px solid #E8E8E8;color: #A2A2A2;}
.ZKLOut .btnDiv button{border-radius: 0 0 10px 0;}
</style>


