<template>
    <div>
      <ul class="orderList" v-if="orderList2.data.length">
            <li v-for="(item,index) in orderList2.data" :key="index" :orderId="item.id" :orderNo="item.orderNo">
                <div class="statusDiv"><span class="receiverName">{{item.receiverName}}</span><span class="orderNo">{{item.receiverMoible}}</span><span class="statusSpan" :style="'color:'+item.statusColor">{{item.statusName}}</span></div>
                <div class="statusDiv">订单号：<span class="orderNo">{{item.orderNo}}</span><span class="payTypeSpan" v-if="item.isOnlinePay">快捷支付</span></div>
                <div class="goodsList" @click="goDetail(item.id)">
                    <a>
                        <dl v-for="(items,indexs) in item.orderDetails" :key="indexs">
                            <dt><image :src="items.goodsPic" mode="aspectFill"/></dt>
                            <dd>
                                <p class="goodsName">{{items.goodsName}}</p>
                                <p class="specSpan" v-if="items.skuDesc">
                                    {{items.skuDesc}}
                                </p>
                                <div class="bottomDiv">
                                    <span class="priceSpan">¥{{items.perPrice}}</span>
                                    <span class="numberSpan">x {{items.num}}</span>
                                </div>
                            </dd>
                        </dl>
                    </a>
                </div>
                <div class="priceDiv">共<span class="totalNumber">{{item.orderDetails.length}}</span>件，买家实付（含运费<span class="freight">{{item.transferFeeNoFree}}</span>）：<span class="totalPrice">¥{{item.totalPrice}}</span></div>
                <div class="buttonDiv">
                    <div v-if="item.status==1">
                        <a class="orderBtn2 confirmBtn ml10" @click="gotopay(item.totalPrice,item.orderDetails.length,item.orderNo)">去支付</a>
                        <a class="orderBtn1" @click="closeFn(item.id,index)">关闭订单</a>
                    </div>
                    <div v-if="item.status==3|item.status==7">
                        <a class="orderBtn2 confirmBtn ml10" @click="gotowu(item.orderNo,index)">查看物流</a>
                    </div>
                    <div v-if="item.status==5">
                        <a class="orderBtn1" @click="delectFn(item.id,index)">删除订单</a>
                    </div>
                </div>
            </li>
        </ul>
      <!--该页面请求数据暂未拿到时，显示空页面，该功能暂时隐藏-->
      <!--<Empty v-else :msg="msg"/>-->
    </div>
</template>
<script>
// import Empty from '../empty.vue'
import utils from '@/utils/index.js'
export default {
    data(){
        return {
            msg : '暂无数据'
        }
    },
    props : ["orderList","status"],
    computed : {
        orderList2(){
            var list = this.orderList.data.map(function(h){
                var v = {...h}
                v.totalPrice = (v.totalPrice+v.transferFeeNoFree-v.transferFee).toFixed(2)
                v.transferFeeNoFree = v.transferFeeNoFree.toFixed(2)
                v.orderDetails.map(function(x){
                    var i = {...x}
                    i.perPrice = i.perPrice.toFixed(2)
                    return i
                })
                if(v.status == "1"){
                    v.statusName = '待付款';
                    v.statusColor = "#AA2327";
                }else if(v.status == "2"||v.status == "8"||v.status == "9"){
                    v.statusName = '待发货';
                    v.statusColor = "#AA2327";
                }else if(v.status == "3"){
                    v.statusName = '待收货';
                    v.statusColor = "#6CB287";
                }else if(v.status == "5"){
                    v.statusName = '已关闭';
                    v.statusColor = "#A2A2A2";
                }else if(v.status == "7"){
                    v.statusName = '已完成';
                    v.statusColor = "#AA2327";
                }
                return v
            })
            return {data:list}
        }
    },
    // watch : {
    //     orderList(list){
    //         list.data.map(function(v){
    //             v.totalPrice = v.totalPrice.toFixed(2)
    //             v.transferFeeNoFree = v.transferFeeNoFree.toFixed(2)
    //             v.orderDetails.map(function(i){
    //                 i.perPrice = i.perPrice.toFixed(2)
    //                 return i
    //             })
    //             if(v.status == "1"){
    //                 v.statusName = '待付款';
    //                 v.statusColor = "#AA2327";
    //             }else if(v.status == "2"||v.status == "8"||v.status == "9"){
    //                 v.statusName = '待发货';
    //                 v.statusColor = "#AA2327";
    //             }else if(v.status == "3"){
    //                 v.statusName = '待收货';
    //                 v.statusColor = "#6CB287";
    //             }else if(v.status == "5"){
    //                 v.statusName = '已关闭';
    //                 v.statusColor = "#A2A2A2";
    //             }else if(v.status == "7"){
    //                 v.statusName = '已完成';
    //                 v.statusColor = "#AA2327";
    //             }
    //         })
    //     }
    // },
    components : {
        // Empty,
    },
    methods : {
        closeFn(id,index){
            var me = this;
            wx.showModal({
                title: '确认关闭?',
                content: '您确定要关闭该订单吗？(注：关闭订单后，已使用的优惠券不能被退回)',
                success: function(res) {
                    if (res.confirm) {
                        var data = {
                            orderId:id,
                            operatorType:1
                        }
                        utils.closeAndDelOrder(data,()=>{
                            if(me.status == 1){
                                me.orderList.data.splice(index,1)
                            }else{
                                me.orderList.data[index].status = 5
                            }
                        })
                    } else if (res.cancel) {

                    }
                }
            })
        },
        delectFn(id,index){
            var me = this;
            wx.showModal({
                title: '确认删除?',
                content: '您确定要删除该订单吗?',
                success: function(res) {
                    if (res.confirm) {
                        var data = {
                            orderId:id,
                            operatorType:2
                        }
                        utils.closeAndDelOrder(data,()=>{
                            me.orderList.data.splice(index,1)
                        })
                    } else if (res.cancel) {

                    }
                }
            })
        },
        goDetail(id){
            wx.navigateTo({
                url : '../orderDetail/main?id='+id
            })
        },
        gotowu(id,index){
            wx.navigateTo({
                url : "../logistics/main?orderid="+id
            })
        },
        gotopay(prize,num,id){
            wx.navigateTo({
                url : "../pay/main?actualPrice="+prize+"&num="+num+"&orderNo="+id
            })
        }
    }
}
</script>
<style>
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
.goodsList dt image{ display:block; width:100%; height: 90px;}
.goodsList dd{ padding-left:100px; }
.goodsList dd .goodsName{ margin-bottom:4px; font-size:14px; line-height:19px; color:#1B1B1B; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.goodsList dd .specSpan{ max-height:34px; font-size:12px; line-height:17px; color:#A2A2A2; overflow:hidden; display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; }

.goodsList .bottomDiv{ position:absolute; bottom:15px; left:115px; right:15px; line-height:16px; }
.goodsList .bottomDiv .priceSpan{ float:left; padding-right:5px; font-size:16px; line-height:22px; color:#1B1B1B; text-align: right;}
.goodsList .bottomDiv .profitSpan{ float:left; padding-top:3px; font-size:12px; line-height:17px; color:#AA2327; }
.goodsList .bottomDiv .numberSpan{ float:right; padding-top:3px; font-size:12px; line-height:17px; color:#A2A2A2; }
.orderList .priceDiv{ padding:10px 15px; border-bottom:1px solid #f0f0f0; text-align:right; line-height:20px; font-size:13px; color:#A2A2A2; }
.orderList .priceDiv span{ color:#A2A2A2; font-size:13px; }
.orderList .priceDiv .buyerPrice,.orderList .priceDiv .totalPrice{ margin-top:-2px;font-size: 18px;color: #1B1B1B; line-height:25px; }

.orderList .buttonDiv{ padding:10px 13px; overflow:hidden; }
.orderList .buttonDiv a{ float:right; padding:0 10px; height:28px; line-height:26px; font-size:14px; border-radius:14px; }
.orderList .buttonDiv .orderBtn1{ border:1px solid #A2A2A2; color:#A2A2A2; }

.orderList .buttonDiv .orderBtn2 {border: 1px solid #AA2327; color: #AA2327;}
</style>
