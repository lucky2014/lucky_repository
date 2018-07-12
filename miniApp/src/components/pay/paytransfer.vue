<template>
    <ul class="payLists payTransfer">
        <li class="alipayma" @click="addModel('zhikouling')">
            <i></i>
            <span>支付宝吱口令</span>
            <b></b>
        </li>
        <li class="weChat" @click="addModel('weixin')">
            <i></i>
            <span>微信收款码</span>
            <b></b>
        </li>
        <li class="alipay" @click="addModel('zhifubao')" v-if="store.zfbQrUrl">
            <i></i>
            <span>支付宝支付</span>
            <b></b>
        </li>
    </ul>
</template>
<script>
import utils from '@/utils/index.js'
export default {
    methods : {
        addModel(type){
            if(type=='zhikouling'&&this.store.zfbCommand){
                this.$emit("addType",type)
            }else if(type=='zhikouling'&&!this.store.zfbCommand){
                utils.alert("商户未设置吱口令")
            }
            if(type=='zhifubao'&&this.store.zfbQrUrl){
                this.$emit("addType",type)
            }else if(type=='zhifubao'&&!this.store.zfbQrUrl){
                utils.alert("商户未设置支付宝收款码")
            }
            if(type=='weixin'&&this.store.wxQrUrl){
                this.$emit("addType",type)
            }else if(type=='weixin'&&!this.store.wxQrUrl){
                utils.alert("商户未设置二维码收款码")
            }
        }
    },
    computed : {
        store (vue){
            return this.$store.state.info.storeInfo
        }
    },
}
</script>

