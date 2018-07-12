import utils from '../../utils/index.js'
export default {
    getStoreInfo({ state, commit }) {
        utils.getStoreInfo(function(msg){
            commit("storeInfo",msg)
        })
    },
    getCartList({ state, commit }) {
        var data = {
			pageNum: 1,
			pageSize: 1000,
			storeId: state.storeInfo.id,
		}
        utils.listCartProducts(data,(msg)=>{
            commit("getCartList",msg);
        })
    },
    getCollectList({ state, commit }){
        utils.listMiniAppStoreCollect((msg)=>{
            commit("getCollectList",msg);
        })
    },
}