export default {
    lottery(state,msg){
        state.canScratch = true;
        state.scratch.lottery = msg.returnObject;
        return state;
    },
    setProps(state,prop,value){
        return state[prop]?state[prop] = value:state
    },
    getActivityInfo(state,msg){
        state.activityInfo = msg.returnObject;
        state.startTime = msg.returnObject.startTime;
        state.endTime = msg.returnObject.endTime;
        return state;
    },
    getTimes(state,msg){
        state.activityTime = msg.returnObject;
        return state;
    },
    scratchCanshow(state){/*判断是否中奖 */
        if(state.scratch.lottery.prizeName&&state.scratch.lottery.prizeName!=='谢谢参与'){
            if(state.activityTime==0){
                state.dialog.gift = false;
            }else{
                state.dialog.gift = true;
            }
        }else{
            state.dialog.gift = false;
        }
    },
    getBestPrize(state,msg){
        state.scratch.lottery = msg.returnObject||{};
        state.scratch.lottery.isBest = true;
        if(state.scratch.lottery.prizeName&&state.scratch.lottery.prizeName!=='谢谢参与'){
            state.dialog.gift = true;
        }else{
            state.dialog.gift = false;
        }
    },
    getDistribuated(state,msg){
        msg.returnObject.question.optionList.map((list)=>{
            list.active = false;
        })
        state.distribuated.answerResult = msg.returnObject.answerResult;
        state.distribuated.answered = msg.returnObject.answered;/*false为未回答过问题，true为答过题 */
        if(!state.attach){/*这是本人 */
            if(msg.returnObject.askHelpResult){/* 有好友已经助力过了并且助力成功 */
                state.distribuated.askHelpResult = msg.returnObject.askHelpResult;
            }else if(msg.returnObject.answered&&!msg.returnObject.answerResult){/*用户本人回答过并且回答错误 */
                state.dialog.questionError.show = true;
            }else if(msg.returnObject.answered&&msg.returnObject.answerResult){/* 用户本人回答过并且回答正确 */
                state.dialog.questionSuccess.show = true;
            }
        }else{
            state.distribuated.showQuestion = true;/*助力的话一直显示问题 */
            state.distribuated.thisHelperHelped = msg.returnObject.thisHelperHelped;
            if(msg.returnObject.askHelpResult){/* 已经有好友帮忙答对了 */
                if(msg.returnObject.thisHelperHelped&&msg.returnObject.helperTag==state.activity.openId){/* 好友自己本人助力成功 */
                    state.distribuated.askHelpResultSelf = true;
                }else if(!msg.returnObject.thisHelperHelped&&msg.returnObject.helperTag!=state.activity.openId){/*有好友给助力发起者助力成功 */
                    state.distribuated.askHelpResult = msg.returnObject.askHelpResult;
                }
            }else{/*助力失败 */
                if(msg.returnObject.thisHelperHelped){/* 当前好友已经助力过了但是助力失败 */
                    state.dialog.questionError.show = true;
                }
            }
        }
        state.distribuated.list = msg.returnObject;
    },
    addUserInfo(state){
        state.dialog.prizeInfo = false;
    },
    submitAnswer(state,msg){
        state.distribuated.questionRecord = msg.returnObject;
        if(state.distribuated.questionRecord){
            if(state.attach==''){
                state.dialog.questionSuccess.show = true;
            }else{
                state.dialog.questionSuccess.show = true;
            }
        }else{
            state.dialog.questionError.show = true;
        }
    },

    
    lotteryRecordLite(state,msg){
        state.lotteryRecordLite = msg.returnObject;
        return state;
    },
    showError_me(state,value){

    },
    getActivityUserInfo(state, msg){
        state.getActivityUserInfo = msg;
    },
}