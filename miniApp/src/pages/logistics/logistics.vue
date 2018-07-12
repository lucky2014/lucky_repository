<template>
    <div class="logistics">
        <logisticsinfo :logistics="logistics"/>
        <logisticslist :logistics="logistics"/>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import logisticsinfo from '@/components/logistics/logisticsInfo.vue'
import logisticslist from '@/components/logistics/logisticsList.vue'
export default {
    data(){
        return {
            logistics : {},
        }
    },
    mounted(){
        if(this.$root.$mp.query.orderid){
            var data = {
                orderNo :this.$root.$mp.query.orderid
            }
            utils.getOrderTraceForBuyerView(data,(msg)=>{
                this.logistics= msg
            })
        }
    },
    components : {
        logisticsinfo,
        logisticslist,
    },
    onUnload(){
        this.logistics = {}
    }
}
</script>
<style>
.logistics{}
.logistics .logisticsInfo{ padding:15px;  background:url(https://store.iliujia.com/imgs/b/map.png); background-size:100% 100%; font-size:14px; color: #606060;}
.logistics .logisticsInfo span{ color:#474747; font-size:14px; }

.logisticsList{ padding:15px; background:#fff; }
.logisticsList ul{ margin-left:66px; }
.logisticsList li{ position:relative; padding:0 0 24px 24px; border-left:1px solid #f0f0f0; }
.logisticsList li:last-child{ border-left:none; }
.logisticsList li h4{ margin-bottom:3px; font-size:14px; color:#A2A2A2; line-height:1em; font-weight:normal; }
.logisticsList li>p{ font-size:14px; color:#A2A2A2; line-height:20px; }
.logisticsList li>p span{ color:#4A90E2; }
.logisticsList li .timeDiv{ position:absolute; left:-66px; top:-2px; width:46px; font-size:12px; text-align:right; color:#A2A2A2; line-height:16px; }
.logisticsList li .timeDiv p{ margin-bottom:2px; font-size:12px; color:#A2A2A2; line-height:1em; }
.logisticsList .circle{ position:absolute; left:-5px; top:0; width:9px; height:9px; background:#D8D8D8; border-radius:50%; }

.logisticsList .current h4{ color:#BEA474; }
.logisticsList .current>p{ color:#BEA474; }
.logisticsList .current .circle{ background:#BEA474; }

.logisticsList .status1 .timeDiv p,.logisticsList .status2 .timeDiv p{ font-size:14px; }
.logisticsList .status2 .circle{ left:-9px; top:-1px; width:17px; height:17px; background:url(https://store.iliujia.com/imgs/b/checkOn.png); background-size:100% 100%; }

.noData{ display:none; position:absolute; left:0; top:96px; bottom:0; width:100%; padding:20px 0; background:#fff; }
.noData img{ display:block; width:160px; margin:40% auto 15px; }
.noData p{ font-size:14px; color:#A2A2A2; line-height:20px; text-align:center; }
</style>

