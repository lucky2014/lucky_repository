<template>
    <ul class="logisticsInfo" v-if="logistics.logisticsCompanyName">
        <li class="gongsi">物流公司：<span>{{logistics.logisticsCompanyName}}</span></li>
        <li class="bianhao">快递单号：<span>{{logistics.logisticsBillNo}}</span></li>
        <li class="dingdan">订单编号：<span>{{logistics.orderId}}</span></li>
    </ul>
</template>
<script>
export default {
    props:["logistics"]
}
</script>

