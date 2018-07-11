<template>
    <div>
        <div id="banner_big">
            <img :src="`${base}/banner.jpg`" alt="">
        </div>
        <div class="question-box question-container">
            <div class="question-box" v-show="distribuated.showQuestion"><!--已经开始-->
                <div class="questionList-container">
                    <QuestionList class="questionList-box"></QuestionList>
                    <!-- <p class="center"><a href="https://mp.weixin.qq.com/s/H93Ahqd7byAjcpmKSDRAMg" class="white-color question-link border-link-color m-t-1 font-large">不知道答案？点我查看正确答案</a></p> -->
                    <div class="buttons m-t-100px m-b-4"><!--问题列表的按钮组-->
                        <mu-raised-button label="取消" v-on:click="cancelQuestion" class="btn-default-color question-cancel btns-default white-color m-r-4"/>
                        <mu-raised-button label="确定" v-on:click="goScratch" class="btn-active-color question-sure btns-default white-color"/>
                    </div>
                </div>
            </div>
            <div v-show="!distribuated.showQuestion"><!--还未开始答题-->
                <mu-raised-button v-on:click="startQuestion" label="开始答题" class="btn-active-color btn-start white-color"/>
                <div class="question-info-box m-t-4 flex">
                    <mu-raised-button label="活动规则" v-on:click="showRule" class="white-bg-color activityRule question-btns theme-color"/>
                    <mu-raised-button label="我的奖品" v-on:click="getMyGift" class="white-bg-color question-gift question-btns theme-color"/>
                </div>
                <div class="question-activity-time">
                    <p class="white-color font-large">活动时间：{{showTime}}</p>
                </div>
            </div>
        </div>
        <IndexDialog></IndexDialog>
    </div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
import QuestionList from '../../components/questionList.vue'
import IndexDialog from '../../components/dialog/index.vue'
export default {
    data(){
        return {
            isStart:false
        }
    },
    computed:{
        ...mapState({
            dialog:'dialog',
            base:'base',
            dialogForm:'dialogForm',
            distribuated:'distribuated',
            activity:'activity',
            device:'device',
            attach:'attach',
            activityInfo:'activityInfo'
        }),
        ...mapGetters({
            showTime:'showTime'
        })
    },
    watch:{
        'distribuated.answered'(to){
            if(to&&this.distribuated.answerResult){
                this.dialog.questionSuccess.show = false;
                this.dialog.noTimes = false;
                this.$router.replace('/scratch');
            }
        }
    },
    methods:{
        startQuestion(){
            //本人, this.distribuated.answered是否已答过题
            if(!this.attach && this.distribuated.answered){
                this.$store.dispatch("getDistribuated",{activityId:this.activity.activityId,openId:this.activity.openId});
            }else if(this.attach && this.distribuated.answered){
                this.$store.dispatch("getDistribuated",{activityId:this.activity.activityId,openId:this.activity.openId});
            }else{
                this.distribuated.showQuestion = true;
            }
        },
        showRule(){
            this.dialog.rule = true;
        },
        getParams(){
            const question = this.distribuated.list.question;
            const option = [];
            question.optionList.map((list)=>{
                if(list.active){
                    list.optionId = list.id;
                    list.answer = list.content;
                    option.push(list);
                }
            });
            question.answers = [
                {
                    questionId:question.id,
                    content:question.content,
                    option:option
                }
            ]
            question.location = '';
            question.address = '';
            question.device = this.device;
            if(this.attach){/*好友助力 */
                question.helpdActorId = this.attach;
            }
            const params = {
                actorId:this.activity.openId,
                activityId:this.activity.activityId,
                answers:JSON.stringify(question),
                startTime:new Date().getTime()
            }
            return params;
        },
        goScratch(){
            let hasChoosed = false;
            this.dialog.noTimes = false;
            this.distribuated.list.question.optionList.map((list,i)=>{
                if(list.active){
                    hasChoosed = true;
                }
            })
            if(!hasChoosed){
                this.dialogForm.dialog.show = true;
                this.dialogForm.dialog.tip = "至少选择一个问题";
            }else{/*dialog中的index.vue已经判断好是好友还是自己本人 */
                const params = this.getParams();
                this.$store.dispatch('submitAnswer',params);
            }
        },
        getMyGift(){
            this.$router.push('/scratch');
        },
        cancelQuestion(){
            this.distribuated.showQuestion = false;
        }
    },
    components:{
        QuestionList,
        IndexDialog
    },
    mounted(){
        this.$store.dispatch('getActivityInfo',{activityId:this.activity.activityId});
        this.$store.dispatch("getTimes",{activityId:this.activity.activityId,account:this.activity.openId});
        if(this.attach){/*好友助力 */
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 通过下面这个API隐藏右上角按钮
                WeixinJSBridge.call('hideOptionMenu');
            });
            this.$store.dispatch("getDistribuatedShare",{activityId:this.activity.activityId,helperId:this.activity.openId,actorId:this.attach});
        }else{/*活动参与者即本人 */
            this.$store.dispatch("getDistribuated",{activityId:this.activity.activityId,openId:this.activity.openId});
        }
        
    }
}
</script>

<style>
    .question-box.question-container{ margin-top: -100px; position: relative;}
    .m-t-100px{
        margin-top:100px;
    }
    .question-link{
        display: inline-block;
        border-bottom-width: 2px;
        border-bottom-style: solid;
    }
    .question-container{
        margin-left: 15px;
        margin-right:15px;
    }
    .question-sure{
        margin-left:auto;
    }
    .question-activity-time{
        margin-top:40px;
        text-align: center;
        width:100%;
    }
    .question-btns{
        width:42.5%;
    }
    #banner_big img{
        width:100%;
        min-height:270px;
    }
    @media screen and (max-width:320px){
        #banner_big img{
            min-height:230px;
        }
    }
    .question-gift{
        margin-left:auto;
    }
    .questionList-box{
        margin-left:20px;
        margin-right:20px;
    }
    .btn-start{
        width:100%;
    }
</style>
