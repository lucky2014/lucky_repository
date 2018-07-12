<template>
    <scroll-view id="sortList" class="headNavWrapper" scroll-x>
        <ul class="liWrapper">
            <li status="0" :class="ative==0?'active orderStatus chooseLi':'orderStatus chooseLi'" @click="chooseNav(0)">
            <span>全部</span>
            </li>
            <li status="1" :class="ative==1?'active orderStatus chooseLi':'orderStatus chooseLi'" @click="chooseNav(1)">
            <span>待付款</span>
            </li>
            <li status="2" :class="ative=='2|8|9'?'active orderStatus chooseLi':'orderStatus chooseLi'" @click="chooseNav('2|8|9')">
            <span>待发货</span>
            </li>
            <li status="3" :class="ative==3?'active orderStatus chooseLi':'orderStatus chooseLi'" @click="chooseNav(3)">
            <span>待收货</span>
            </li>
            <li status="7" :class="ative==7?'active orderStatus chooseLi':'orderStatus chooseLi'" @click="chooseNav(7)">
                <span>已完成</span>
            </li>
            <li status="5" :class="ative==5?'active orderStatus chooseLi':'orderStatus chooseLi'" @click="chooseNav(5)">
                <span>已关闭</span>
            </li>
        </ul>
    </scroll-view>
</template>
<script>
export default {
    data(){
        return {
            ative : 0
        }
    },
    methods : {
        chooseNav(status){
            this.ative = status
            this.$emit("status",status)
        }
    },
    props : ["actives"],
    watch : {
        actives(v){
            this.ative = v
        }
    }
}
</script>
