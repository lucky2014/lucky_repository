import utils from '../../utils/index.js'
export default {
    getAddlist({ state, commit }) {
        utils.listReceiverInfos((msg)=>{
            commit("listReceiverInfos",msg);
            commit("isAjax",1)
        })
    },
    setAddlist({ state,commit }) {
        utils.listReceiverInfos((msg)=>{
            commit("listReceiverInfos",msg);
        })
    }
}