import Vue from 'vue'
import Vuex from 'vuex'

import tool from '../api/tool.js'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)
const activityId = document.getElementById("activityId").value;
const openId = document.getElementById("openId").value;
const hashcode = document.getElementById("hashcode").value;
const thumbImgUrl = document.getElementById("thumbImgUrl").value;
let attach = '';
attach = tool.getQueryString("attach")||'';
if(openId == attach){
    attach = '';
}
const base = document.getElementById("base").value;
const state = {
    device:navigator.userAgent.indexOf("iPhone")!=-1?"iphone":'android',
    progress:false,
    base:base,
    thumbImgUrl:thumbImgUrl,
    canScratch:false,/*判断是否可以进入刮开区域 */
    lotteryRecordLite:[],
    attach:attach,
    startTime:0,
    endTime:0,
    activity:{
        activityId:activityId,
        openId:openId,
        hashCode:hashcode
    },
    activityInfo:{},
    activityTime:0,
    bestPrize:{},
    distribuated:{
        activeIndex:0,
        list:{
            question:{}
        },
        answered:false,
        answerResult:false,
        askHelpResult:false,
        showQuestion:false,
        askHelpResultSelf:false,/*好友本人回到问卷页面 */
        questionRecord:0
    },
    scratch:{
        lottery:{},
        getPrize:{}
    },
    dialogForm:{
        values:{
            name:"",
            phone:"",
            address:""
        },
        dialog:{
            tip:'',
            show:false
        }
    },
    dialog:{
        error:false,
        gift:false,/*判断刮开后是否有奖品 */
        rule:false,
        noTimes:true,
        prizeInfo:false,
        formValidate:false,
        success:{
            tip:'',
            show:false
        },
        errorTip_4017:{
            tip:'',
            show:false
        },
        questionSuccess:{
            tip:'',
            show:false
        },
        questionError:{
            tip:'',
            show:false
        },
        errorTip:{
            tip:'',
            show:false
        }
    },
    getActivityUserInfo: {
    }
} 
export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations
})