<template>
        <ul class="myOrderList">
            <li @click="golist(1)"><a><span id="unPays">{{(businessOrders.CunPays||0)}}</span>待付款</a></li>
            <li @click="golist('2|8|9')"><a><span id="unShipping">{{(businessOrders.unShipping||0)+(businessOrders.BunPays||0)+(businessOrders.AgentPays||0)}}</span>待发货</a></li>
            <li @click="golist(3)"><a><span id="shipping">{{businessOrders.shipping||0}}</span>待收货</a></li>
            <li @click="golist(7)"><a><span id="finish">{{businessOrders.finish||0}}</span>已完成</a></li>
        </ul>
</template>
<script>
export default {
    props:["businessOrders"],
    methods : {
        golist(status){
            wx.navigateTo({
                url : '../orderList/main?status='+status
            })
        }
    }
}
</script>
