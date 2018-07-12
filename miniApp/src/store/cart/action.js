import utils from '../../utils/index.js'
export default {
    getCartList({ state, commit }) {
        var data = {
			pageNum: 1,
			pageSize: 1000,
			storeId: state.info.storeInfo.id,
		}
        utils.listCartProducts((msg)=>{
            commit("getCartList",msg);
        })
    },
}