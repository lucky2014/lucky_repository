<template>
    <div class="template-container">
        <div id="banner">
            <!-- <img class="scratch_box_head" src="@/assets/img/scratch_box_head.jpg" alt=""> -->
            <img class="scratch_box_head" :src="`${base}scratch_box_head.jpg`" alt="">
        </div>
        <div class="scrtach_fluid">
            <Scrtach config="" :classStyle="classStyle"></Scrtach>
            <div v-show="!canScratch" class="scratch_btn_bg">
                <mu-raised-button label="刮我中大奖" @click="lotteryClick" class="theme-bg-color scratch-btn btns-default giftInfo white-color m-r-4"/>
            </div>
        </div>
        <div class="check-times m-t-3">
            <p class="time font-large">剩余抽奖次数:&nbsp;&nbsp;&nbsp;{{this.times}}次</p>
        </div>
        <div class="m-t-3 m-b-3 buttons">
            <!-- <mu-raised-button label="领奖信息" @click="()=>{dialog.prizeInfo=true}" class="btn-default-color btns-default giftInfo white-color m-r-4"/> -->
            <mu-raised-button label="领奖信息" @click="getActivityUserInfo" class="btn-default-color btns-default giftInfo white-color m-r-4"/>
            <mu-raised-button label="我的奖品" @click="getMyGift" class="btn-active-color btns-default myGift white-color"/>
        </div>
        <IndexDialog></IndexDialog>
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex'
    import Scrtach from '../../components/scratch.vue'
    import IndexDialog from '../../components/dialog/index.vue'
    export default {
        // props:['storeSelf'],
        data(){
            return {
                config:{

                },
                classStyle:{
                    // backgroundImage:'url(http://h5.iliujia.com/test_2/src/img/h5bclist1.png)'
                }
            }
        },
        computed:mapState({
            activity:'activity',
            base:'base',
            times:'activityTime',
            dialog:'dialog',
            lotteryRecordLite:'lotteryRecordLite',
            distribuated:'distribuated',
            canScratch:'canScratch',
        }),
        components:{
            Scrtach,
            IndexDialog
        },
        methods:{
            lotteryClick(){
                let params = {};
                let lotteryRecordLite = [...this.lotteryRecordLite];
                params = {...this.activity};
                
                this.$store.dispatch('lottery',params);/*抽奖接口 */
            },
            getMyGift(){
                this.$store.dispatch("getBestPrize",this.activity)
            },
            getActivityUserInfo(){
                var params = {...this.activity};
                this.$store.dispatch("getActivityUserInfo", params)
                this.dialog.prizeInfo = true;
            }
        },
        mounted(){
            // this.storeSelf = this.$store;
            this.$store.dispatch("getTimes",{activityId:this.activity.activityId,account:this.activity.openId});
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 通过下面这个API隐藏右上角按钮
                WeixinJSBridge.call('hideOptionMenu');
            });
        }
    }   
</script>
<style>
    .m-t-93px{
        margin-top: 93px;
    }
    .ele-1{
        width:100%;
    }
    .scratch_btn_bg{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index:200;
    }
    .scratch-btn{
        margin-left:18px;
        background: #28bb7a;
    }
    .check-times.m-t-3{ margin-top: 10px; }
    .scrtach_fluid{
        width:290px;
        height:130px;
        margin:0 auto;
        position: relative; margin-top: -460px;
    }
    .scratch-logo img{
        width:290px;
        display: block;
        margin:0 auto;
    }
    #banner img{
        width:100%;
    }
    .check-times{
        color:#fff;
        text-align: center;
    }
    .m-t-3.m-b-3.buttons{ margin-top:160px; }
</style>


