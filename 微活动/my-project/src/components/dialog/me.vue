<template>
    <div>
        <mu-dialog class="myOwnDialog" v-if="time==0&&distribuated.answered&&distribuated.askHelpResult" :open="dialog.noTimes" :title="'提示'"><!--答过了，但是没有抽奖机会-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/success.png`" alt="">
                <p class="error-text font-large">您今天已经参加过活动了，请明天再来吧</p>
                <mu-flat-button @click="goScratch"  class="btn-default-color m-t-2 white-color" label="点击查看我的奖品" slot="actions" primary/>
            </div>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" v-else-if="time>0&&distribuated.answered&&distribuated.askHelpResult" :open="true" :title="'提示'"><!--答过了，并且有抽奖机会-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/success.png`" alt="">
                <p class="error-text font-large">您今天已经答过题了
                <br/>快去抽奖吧</p>
                <mu-flat-button @click="goScratch" class="btn-active-color m-t-2 white-color" label="进行抽奖" slot="actions" primary/>
            </div>
        </mu-dialog>
        <mu-dialog v-else-if="dialog.questionError.show" class="myOwnDialog" :open="dialog.questionError.show" :title="'提示'">
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/error.png`" alt="">
                <p class="error-text font-large">抱歉,答错了，今天的答题机会已用完！您可通过邀请好友助力再次挑战，若您邀请的好友帮您答对了,您就可获得一次抽奖机会哦~</p>
                <mu-flat-button @click="needHelp"  class="btn-active-color m-t-2 white-color" label="邀请好友帮我答题" slot="actions" primary/>
                <mu-flat-button @click="goScratch"  class="btn-default-color m-t-2 white-color" label="查看我的抽奖次数" slot="actions" primary/>
            </div>
            <span class="dialog-close" @click="closeQuestionError"></span>
        </mu-dialog>
        <mu-dialog v-else class="myOwnDialog" :open="distribuated.askHelpResult" :title="'恭喜您'"><!--问卷错误提示语-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/success.png`" alt="">
                <p class="error-text font-large">好友为您助力成功，又能抽奖啦</p>
                <mu-flat-button @click="goScratch" class="btn-active-color m-t-2 white-color" label="进行抽奖" slot="actions" primary/>
            </div>
            <span class="dialog-close" @click="closeHelpResult"></span>
        </mu-dialog>
        <mu-dialog class="myOwnDialog" :open="dialog.questionSuccess.show" :title="'恭喜您'"><!--回答正确，并且没有答过-->
            <div class="dialog-area">
                <img class="dialog-error m-b-3" :src="`${base}/success.png`" alt="">
                <p class="error-text font-large">恭喜您，答对了!<br/>点击抽奖</p>
                <mu-flat-button @click="goScratch" class="btn-active-color m-t-2 white-color" label="进行抽奖" slot="actions" primary/>
                <mu-flat-button @click="joinActivity" class="btn-active-color m-t-2 white-color" label="我要报名参加活动" slot="actions" primary/>
            </div>
            <span class="dialog-close" @click="closeQuestionSuccess"></span>
        </mu-dialog>
        <div class="bg" @click="closeHelp_dialog" v-show="help_dialog">
			<img src="../../../static/x_arrow.png" alt="" class="wxGuide">
			<div class="tip_box" id="bangding">
				<ul>
					<li class="first">
						<img src="../../../static/x2.png" alt="">
					</li>
					<li class="center">请点右上角邀请好友助力</li>
					<li class="last">
						<img src="../../../static/x1.png" alt="">
					</li>
				</ul>
			</div>
		</div>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'
    export default {
        props:['goScratch', 'joinActivity'],
        data(){
            return {
                help_dialog:false,
            }
        },
        computed:mapState({
            dialog:'dialog',
            base:'base',
            time:'activityTime',
            distribuated:'distribuated'
        }),
        methods:{
            closeQuestionError(){
                this.dialog.questionError.show = false;
            },
            closeHelpResult(){
                this.distribuated.askHelpResult = false;
            },
            closeHelp_dialog(){
                this.help_dialog = false;
            },
            needHelp(){
                this.dialog.questionError.show = false;
                this.help_dialog = true;
            },
            closeQuestionSuccess(){
                this.dialog.questionSuccess.show = false;
            },
        }

    }
</script>
<style>
    .btn-active-color.m-t-2.white-color{
        width: 72%;
    }
    .tip_box{
        background-color:transparent;
        top:9em;
        margin-top:0;
    }
    .tip_box ul{
        overflow: hidden;
        line-height: 22px;
        text-align: justify;
        width: 80%;
        margin-left: 10%;
    }
    .tip_box ul li{
        float:left;
        width:16%;
        min-height:6rem;
    }
    .tip_box ul li img{
        width:100%;
    }
    .tip_box ul li.last{
        float: right;
    }
    .tip_box ul li.center{
        padding-top:5%;
        width:68%;
        color:#fff;
    }
    .tip_box p{
        overflow: hidden;
        height:8rem;
    }
    .tip_box p img{
        height:80%;
        float: right;
    }
    .tip{
        width:90%;
        margin:0 auto;
        text-align: center;
    }
    .bg{
        position: fixed;
        width: 100%;
        height:100%;
        background-color: rgba(0,0,0,.6);
        left:0;
        top:0;
        z-index:999;
    }
    .wxGuide{ 
        height: 8em;
        float: right;
        margin-right: 22px;
        margin-top: 32px;
     }
</style>