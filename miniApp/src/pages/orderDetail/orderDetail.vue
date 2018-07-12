<template>
    <div class="orderDetail">
        <div class="statusDiv">
            <top  :msg="order"/>
        </div>
        <order :order="order"/>
    </div>
</template>
<script>
import order from "@/components/orderDetail/orderDetail.vue"
import top from "@/components/orderDetail/top.vue"
import utils from "@/utils/index.js"
export default {
    data(){
        return {
            order : {}
        }
    },
    mounted(){
        if(this.$root.$mp.query.id){
            var data = {
                orderId : this.$root.$mp.query.id
            }
            utils.getOrderInfo(data,(msg)=>{
                this.order = msg
            })  
        }
    },
    components : {
        order,
        top,
    },
    onUnload(){
        this.order = {}
    }
}
</script>
<style>
.orderDetail{padding-bottom: 50px;}
img,image{height: 100%;width: 100%;}
.orderDetail .orderStatus{ position:relative; }
.orderDetail .orderStatus img{ display:block; width:100%;height: 100px}
.orderDetail .orderStatus div{ position:absolute; top:50%; left:30px; margin-top:-11px; }
.orderDetail .orderStatus p{ font-size:16px; line-height:22px; color:#fff; }
.orderDetail .orderStatus span{ font-size:12px; line-height:14px; color:#fff; }
.orderDetail .orderStatus .timeSpan{ display:block; }

.addressDiv{ position:relative; margin-top:10px; padding:15px 40px 15px 50px; background:#fff; }
.addressDiv div span{ font-size:16px; color:#1C1B20; line-height:22px; }
.addressDiv div .phoneSpan{ float:right; }
.addressDiv p{ margin-top:5px; font-size:12px; color:#606060; line-height:17px; }
.addressDiv .posIcon{ position:absolute; left:15px; top:50%; margin-top:-12px; width:21px;height: 21px}
.addressDiv .arrIcon{ position:absolute; right:15px; top:50%; margin-top:-11px; width:22px; height: 22px;}

.distributionDiv{ display:none; margin-top:10px; padding:15px; background:#fff; }
.distributionDiv p{ font-size:14px; color:#A2A2A2; line-height:21px; }
.distributionDiv span{ font-size:14px; color:#474747; line-height:21px; }

/*用户留言*/
.buyerMessage{ clear: both; overflow: hidden; background: #fff; padding: 10px 15px; color:#A2A2A2; font-size:14px; line-height:20px; border-top: 1px solid #f0f0f0;}
.buyerMessage span{ flex:1; color: #a2a2a2;}
.buyerMessage div{ flex:3; color: #606060; text-align: right;}
.buyerMessage p{ float:right; width:70%; color:#606060; text-align:right; }

.goodsInfo{ margin:10px 0; }
.priceDiv div{ padding:10px 15px; background:#fff; }
.priceDetail{ border-bottom:1px solid #f0f0f0; }
.priceDetail p{ margin-bottom:3px; color:#A2A2A2; font-size:14px; line-height:20px; }
.priceDetail p span{ float:right; color:#1B1B1B; }
.priceTotal p{ color:#A2A2A2; }
.priceTotal span{ float:right; color:#AA2327; }

.remarkDiv{ display:none; margin-bottom:10px; padding:10px 15px; background:#fff; }
.remarkDiv textarea{ display:none; padding:5px 10px; width:100%; height:32px; border:1px solid #f0f0f0; font-size:12px; line-height:16px; }
.remarkInfo{ display:none; color:#A2A2A2; font-size:14px; line-height:20px; overflow:hidden; }
.remarkInfo p{ float:right; width:70%; color:#606060; text-align:right; }

.orderInfo{ padding:12px; background:#fff; }
.orderInfo p{ font-size:12px; color:#A2A2A2; line-height:17px; }
.orderInfo span{ font-size:12px; color:#606060; }

.orderList li{ position:relative; margin-top:10px; background:#fff; }
.orderList .statusDiv{ position:relative; padding:10px 15px; height:40px; line-height:20px; font-size:13px; color:#A2A2A2; border-bottom:1px solid #f0f0f0;box-sizing: border-box;}
.orderList .statusDiv span{ color:#A2A2A2; font-size:13px; }
.orderList .statusDiv .receiverName{ display:inline-block; max-width:130px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; vertical-align:top; }
.orderList .statusDiv .statusSpan{ float:right; }
.orderList .statusDiv .payTypeSpan{ position:absolute; right:15px; top:50%; margin-top:-12.5px; width:67px; height:25px; line-height:25px; text-align:center; border-radius:13px; overflow:hidden; background-color:rgba(255,82,0,0.3); font-size:12px; color:#FF5200; }

.orderList li .myicon-checked{ display:none; }
.otherList li{ padding-left:36px; }
.otherList .statusDiv,.otherList .goodsList dl,.otherList .priceDiv,.otherList .buttonDiv{ padding-left:0; }
.otherList li .myicon-checked{ display:block; position:absolute; left:8px; top:50%; margin-top:-0.75em; }
.otherList.orderList .buttonDiv{ padding-left:0; }

.goodsList dl{ position:relative; padding:15px; width:100%; overflow:hidden; border-bottom:1px solid #f0f0f0; background: #fff;box-sizing: border-box;}
.goodsList dt{ float:left; width:90px; height:90px; overflow:hidden; }
.goodsList dt img{ display:block; width:100%; }
.goodsList dd{ padding-left:100px; }
.goodsList dd .goodsName{ margin-bottom:4px; font-size:14px; line-height:19px; color:#1B1B1B; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.goodsList dd .specSpan{ max-height:34px; font-size:12px; line-height:17px; color:#A2A2A2; overflow:hidden; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; }

.goodsList .bottomDiv{ position:absolute; bottom:15px; left:115px; right:15px; line-height:16px; }
.goodsList .bottomDiv .priceSpan{ float:left; padding-right:5px; font-size:16px; line-height:22px; color:#1B1B1B; text-align: right;}
.goodsList .bottomDiv .profitSpan{ float:left; padding-top:3px; font-size:12px; line-height:17px; color:#AA2327; }
.goodsList .bottomDiv .numberSpan{ float:right; padding-top:3px; font-size:12px; line-height:17px; color:#A2A2A2; }
.payDiv{position:fixed; bottom:0; left:0; right:0; padding:4px 4px 4px 10px; background:#fff; box-shadow:0 3px 9px 1px rgba(0,0,0,0.30); }
.payDiv p{ display:inline-block; font-size:12px; color:#A2A2A2; line-height:40px; }
.payDiv p span{ font-size:18px; color:#AA2327; line-height:40px; }
.payDiv a{ float:right; width:130px; height:40px; line-height:40px; text-align:center; font-size:14px; background:#AA2327; color:#fff; }
</style>


