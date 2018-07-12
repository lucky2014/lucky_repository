<template>
    <div class="logisticsList">
		<ul v-if="logistics.result">
            <li v-for="(v,index) in logistics.result[0].logisticsSteps" :key="index" :class="index==0?'status1 current':'status1'"><p>{{v.remark}}</p><div class="timeDiv"><p>{{v.theDate}}</p>{{v.theTime}}</div><i class="circle"></i></li>
        </ul>
    </div>
</template>
<script>
export default {
    props:["logistics"],
    watch : {
        logistics(logistic){
            if(logistic.result){
                logistic.result[0].logisticsSteps.map(function(v){
                    var acceptTime = v.acceptTime.split(" ");
                    var theDate = acceptTime[0].split("-");
                    var theTime = acceptTime[1].split(":");
                    v.theDate = theDate[1]+"-"+theDate[2];
                    v.theTime = theTime[0]+":"+theTime[1];
                })
                logistic.result[0].logisticsSteps.reverse();
            }
        }
    }
}
</script>

