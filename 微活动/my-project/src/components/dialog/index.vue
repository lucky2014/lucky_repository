<template>
    <div><!--通用-->
        <mu-dialog class="myOwnDialog" :open="dialog.rule" :title="'活动规则'"><!--活动规则-->
            <div class="dialog-area" style="text-align:left;" v-html="activityInfo.rule">
            </div>
            <span class="dialog-close"  @click="closeRule"></span>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" :open="dialog.errorTip.show" :title="'提示'"><!--接口请求报错提示语-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/error.png`" alt="">
                <p class="error-text font-large">{{dialog.errorTip.tip}}</p>
            </div>
            <span class="dialog-close" @click="closeError"></span>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" :open="dialog.errorTip_4017.show" :title="'提示'"><!--接口请求报错提示语-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/error.png`" alt="">
                <p class="error-text font-large">{{dialog.errorTip_4017.tip}}</p>
            </div>
        </mu-dialog>
        <div class="progress-dialog" v-show="progress">
            <mu-circular-progress class="progress" color="#fff" :size="40" :strokeWidth="2"/><!--加载图标-->
        </div>
        <Me v-if="attach==''" :goScratch="goScratch" :joinActivity="joinActivity"></Me><!--自己-->
        <Friend v-else :goScratch="goScratch" :joinActivity="joinActivity"></Friend><!--好友助力-->
        <scratch></scratch>
    </div>
</template>
<script>
import {mapState,mapMutations,mapGetters} from 'vuex'
import Friend from './friend.vue'
import Me from './me.vue'
import Scratch from './scratch.vue'
export default {
    props:['infoConfirm'],
    components:{
        Friend,
        Me,
        Scratch
    },
    computed:mapState({
        scratch:'scratch',
        dialog:'dialog',
        activityInfo:'activityInfo',
        progress:'progress',
        attach:'attach',
        base:'base',
        distribuated:'distribuated'
    }),
    watch:{
        'dialogForm.dialog.show'(val){
            if (val) {
                setTimeout(() => {
                    this.dialogForm.dialog.show = false
                }, 1500)
            }
        }
    },
    methods:{
        formConfirm(){
            this.$store.dispatch("formDialog")
        },
        close(){
            this.dialog.gift = false;
        },
        goScratch(){
            this.distribuated.askHelpResult = false;
            this.dialog.questionSuccess.show = false;
            this.dialog.questionError.show = false;
            this.distribuated.askHelpResultSelf = false;
            this.$router.push('/scratch');
        },
        joinActivity(){
            location.href = "http://mp.weixin.qq.com/s?__biz=MzA3MTQ4MTEzMA==&mid=504008587&idx=1&sn=123ef4a1f4bb0895ffe2169d00f97dca&chksm=04d2cdce33a544d815e677ac293c457df35f74cd4b7c51ac2311515283f2ee3a820d614f189f#rd"
        },
        closeRule(){
            this.dialog.rule = false;
        },
        closePrizeInfo(){
            this.dialog.prizeInfo = false;
        },
        closeQuestionError(){
            this.dialog.questionError.show = false;
        },
        closeDialogForm(){
            this.dialogForm.dialog.show = false;
        },
        // closeQuestionSuccess(){
        //     this.dialog.questionSuccess.show = false;
        // },
        closeError(){
            this.dialog.gift = false;
            this.dialog.errorTip.show = false;
        }
    }
}
</script>
<style>
    .mu-dialog{
        position: relative;
    }
    .progress-dialog{
        position: fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        z-index:999;
    }
    .progress{
        position: absolute;
        left:50%;
        top:50%;
        margin-top:-68px;
        margin-left:-30px;
    }
    .dialog-confrim{
        width:70%;
    }
    .demo-popup-top {
        width: 100%;
        opacity: .8;
        height: 48px;
        line-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        color:#f00;
        max-width: 375px;
    }
    .grid-box{
        border-bottom:1px solid #979797;
    }
    .grid_area_box{
        position: relative;
        align-items:center;
        text-align: left;
    }
    .grid_area_box .addressName{
        position: absolute;
        left:0;
        top: 5px;
    }
    .grid_area{
        height: 96px;
        line-height: 32px;
        text-indent: 66px;
    }
    .grid_line1,.grid_line2,.grid_line3{
        position: absolute;
        height:4px;
        border-top: 1px solid #979797;
    }
    .grid_line1{
        top:30px;
        width:100%;
        left:0;
    }
    .grid_line2{
        top: 60px;
        width: 100%;
        left: 0;
    }
    .grid_line3{
        top: 90px;
        width: 100%;
        left: 0;
    }
    .grid-box span,.grid-box input{
        float: left;
        line-height: 32px;
    }
    .grid-box input{
        padding-left: 6px;
        width:80%;
    }
    .mu-dialog-body{
        position: relative;
        z-index: 80;
        overflow:initial !important;
    }
    .dialog-area{
        max-height:400px;
        overflow: scroll !important;
    }
    .dialog-close{
        position: absolute;
        width: 36px;
        height:36px;
        right:-16px;
        top:-120px;
        background: url(../../assets/img/close.png) no-repeat;
        background-size: 100% 100%;
    }
    .mu-dialog{
        position: relative;
        max-width:260px;
    }
    .error-text{
        color: #292929;
    }
    .mu-dialog:before{
        content: "";
        width: 100%;
        height: 87px;
        display: block;
        background: url(../../assets/img/rank.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: -85px;
        z-index: 20;
    }
    .mu-dialog:after{
        content: "";
        background: url(../../assets/img/dialog_tp.png) no-repeat;
        background-size: 100% 100%;
        width: 124%;
        height: 48px;
        position: absolute;
        left: -12%;
        top: -16px;
    }
    .dialog-area p{
        color: #575757;
    }
    .dialog-gift{
        width:120px;
        display: block;
        margin-left:auto;
        margin-right:auto;
    }
    .dialog-area{
        text-align: center;
    }
    .dialog-error{
        width:160px;
    }
    .mu-dialog-title{
        position: relative;
        z-index: 30;
        top:-34px;
        text-shadow: -1px 1px 0 #979797;
        color: #FFFFFF;
         -webkit-justify-content: center;
        justify-content: center;
    }
</style>


