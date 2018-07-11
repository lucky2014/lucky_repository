<template>
    <div>
        <mu-dialog class="myOwnDialog" v-if="distribuated.thisHelperHelped" :open="true" :title="'提示'"><!--答过了，但是没有抽奖机会-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/success.png`" alt="">
                <p class="error-text font-large">您已经帮助该好友助力过了</p>
                <mu-flat-button @click="joinActivity" class="btn-active-color m-t-2 white-color" label="我要报名参加活动" slot="actions" primary/>
            </div>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" v-else-if="dialog.questionError.show" :open="dialog.questionError.show" :title="'提示'">
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/error.png`" alt="">
                <p class="error-text font-large">很抱歉您助力失败了，但您仍可通过参与活动获得抽奖机会</p>
                <mu-flat-button @click="joinActivity"  class="btn-active-color m-t-2 white-color" label="我要报名参加活动" slot="actions" primary/>
            </div>
            <span class="dialog-close" @click="closeQuestionError"></span>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" v-else-if="distribuated.askHelpResult" :open="distribuated.askHelpResult" :title="'提示'"><!--问卷错误提示语-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/error.png`" alt="">
                <p class="error-text font-large">啊呀，您慢了一步，已经有人帮助您的好友助力成功了，但您仍可通过参与活动获得抽奖机会</p>
                <mu-flat-button @click="joinActivity" class="btn-active-color m-t-2 white-color" label="我要报名参加活动" slot="actions" primary/>
            </div>
            <span class="dialog-close" @click="closeHelpResult"></span>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" v-else :open="distribuated.askHelpResultSelf" :title="'提示'"><!--好友助力过并且助力成功了-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/success.png`" alt="">
                <p class="error-text font-large">您已经帮助该好友助力成功了</p>
                <mu-flat-button @click="joinActivity" class="btn-active-color m-t-2 white-color" label="我要报名参加活动" slot="actions" primary/>
            </div>
            <span class="dialog-close" @click="closeHelpResultSelf"></span>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" :open="dialog.questionSuccess.show" :title="'恭喜您'"><!--回答正确，并且没有答过-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/success.png`" alt="">
                <p class="error-text font-large">恭喜你帮好友助力成功了，快去抽奖吧</p>
                <mu-flat-button @click="goScratch" class="btn-active-color m-t-2 white-color" label="进行抽奖" slot="actions" primary/>
            </div>
            <span class="dialog-close"></span>
            <span class="dialog-close" @click="closeQuestionSuccess"></span>
        </mu-dialog>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'
    export default {
        props:['goScratch', 'joinActivity'],
        computed:mapState({
            dialog:'dialog',
            base:'base',
            distribuated:'distribuated'
        }),
        methods:{
            closeQuestionError(){
                this.dialog.questionError.show = false;
            },
            closeHelpResult(){
                this.distribuated.askHelpResult = false;
            },
            closeHelpResultSelf(){
                this.distribuated.askHelpResultSelf = false;
            },
            closeQuestionSuccess(){
                this.dialog.questionSuccess.show = false;
            },
        },
        mounted(){
            
        }
    }
</script>