import axios from 'axios'
import store from '../store/index.js'
const Qs = require('qs');
// const directUrl = 'https://'+location.host+'/';
const directUrl = 'https://h5.iliujia.com/'

let axiosDate = new Date();
var axios_instance = axios.create({
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
})
function fetch (url, params) {
    store.dispatch('FETCH_LOADING', true)
    return new Promise((resolve, reject) => {
        axios_instance.post(directUrl+url, params)
        .then(response => {
            // 关闭  loading图片消失
            store.dispatch('FETCH_LOADING', false)
            resolve(response.data)
        })
        .catch((error) => {
            // 关闭  loading图片消失
            store.dispatch('FETCH_LOADING', false)
            axiosDate = new Date()
            reject(error)
        })
    })
}
export default {
    addUserInfo(params){
        return fetch('question/addUserInfo.do',params)
    },
    getJsConfig(){
        return fetch('activity/getJsConfig.do',{url:location.href});
    },
    lottery(params){
        return fetch('lottery/lottery.do',params)
    },
    getActivityInfo(params){
        return fetch('activity/getActivityInfo.do',params)
    },
    getTimes(params){
        return fetch('lottery/getTimes.do',params)
    },
    getBestPrize(params){
        return fetch('lottery/getBestPrize.do',params)
    },
    getDistribuated(params){
        return fetch('question/getDistribuated.do',params)
    },
    getDistribuatedShare(params){
        return fetch('question/getDistribuatedShare.do',params)
    },
    lotteryRecordLite(params){
        return fetch('record/lotteryRecordLite.do',params)
    },
    submitAnswer(params){
        return fetch('question/submitAnswer.do',params)
    },
    getActivityUserInfo(params){
        return fetch('question/getActivityUserInfo.do',params)
    }
}