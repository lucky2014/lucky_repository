<template>
    <div><!--表单相关-->
        <mu-dialog class="myOwnDialog" :open="dialog.gift" :title="'奖品信息'"><!--中奖的弹框-->
            <div class="dialog-area">
                <b style="margin-right:8px;">{{scratch.lottery.isBest?'您目前抽中的最高奖项为：  ':'你抽中了'}}</b>
                {{scratch.lottery.prizeLevel}}
                <img class="dialog-gift m-t-1 m-b-1" :src="scratch.lottery.imgUrl||scratch.lottery.prizeImgUrl" alt="">
                <p>{{scratch.lottery.prizeName}}</p>
                <p v-if="scratch.lottery.prizeName=='ofo骑行卡'" class="theme-color m-t-1">您的兑换码为"RS666"。打开ofo入口（支付宝、APP等），在“优惠券”兑换处输入此码即可领取优惠券（领后7天内有效）。如有问题可咨询ofo客服热线4001507507</p>
            </div>
            <span class="dialog-close" @click="close"></span>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" :open="dialog.prizeInfo" :title="'领奖信息'"><!--表单弹出框-->
            <div class="dialog-area">

                <div class="flex grid-box m-b-1"><span>姓名:</span><input type="text" v-model="dialogForm.values.name" class="grid mu-text-field-input"/></div>
                <div class="flex grid-box m-b-1"><span>电话:</span><input type="text" v-model="dialogForm.values.phone" class="grid mu-text-field-input"></div>
                <div class="grid_area_box">
                    <span class="addressName"><span>收货地址:</span></span>
                    <textarea maxlength="35" v-model="dialogForm.values.address" class="grid_area mu-text-field-input" name="" id="" cols="30" rows="10"></textarea>
                    <p class="grid_line1"></p>
                    <p class="grid_line2"></p>
                    <p class="grid_line3"></p>
                    <div class="buttons m-t-2">
                        <mu-flat-button @click="addUserInfo" class="btn-active-color dialog-confrim white-color" label="确定" slot="actions" primary/>
                    </div>
                    <p class="theme-color font-small m-t-1">
                        *所有奖品将于活动结束后7个工作日内兑现，电子奖品将以短信形式发送。
                    </p>
                </div>
            </div>
            <span class="dialog-close" @click="closePrizeInfo"></span>
        </mu-dialog>
        <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="dialogForm.dialog.show"><!--用于校验类提示-->
            {{dialogForm.dialog.tip}}
        </mu-popup>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'
    export default {
        props:['infoConfirm'],
        computed:mapState({
            scratch:'scratch',
            dialog:'dialog',
            base:'base',
            activity:'activity',
            dialogForm:'dialogForm',
            getActivityUserInfo:'getActivityUserInfo',
        }),
        watch:{
            'dialogForm.dialog.show'(val){
                if (val) {
                    setTimeout(() => {
                        this.dialogForm.dialog.show = false
                    }, 1500)
                }
            },
            'getActivityUserInfo'(to){
                console.log(JSON.stringify(to,null,2));
                this.dialogForm.values.name = to.returnObject.name;
                this.dialogForm.values.phone = to.returnObject.phone;
                this.dialogForm.values.address = to.returnObject.address;
            }
        },
        methods:{
            addUserInfo(){/*表单提交验证 */
                const phoneReg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if(this.dialogForm.values.name==""){
                    this.dialogForm.dialog.tip = '请填写您的姓名';
                    this.dialogForm.dialog.show = true;
                }else if(!phoneReg.test(this.dialogForm.values.phone)){
                    this.dialogForm.dialog.tip = '请填写您的联系方式';
                    this.dialogForm.dialog.show = true;
                }else if(this.dialogForm.values.address==""){
                    this.dialogForm.dialog.tip = '请填写您的收货地址';
                    this.dialogForm.dialog.show = true;
                }else{
                    this.dialogForm.dialog.show = false;
                    this.$store.dispatch("formDialog");
                }
            },
            close(){
                this.dialog.gift = false;
            },
            closePrizeInfo(){
                this.dialog.prizeInfo = false;
            }
        }
    }
</script>