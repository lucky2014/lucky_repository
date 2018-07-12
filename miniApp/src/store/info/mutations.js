export default {
    login(state, token) {
        state.token = token;
        return state
    },
    storeInfo(state,msg){
        state.storeInfo = msg;
        return state
    },
    getCartList (state,msg){
        state.cartList = msg
        return state
    },
    getCollectList(state,msg){
        state.collectList = msg
        return state
    },
    setStoreId(state,id){
        state.storeId = id
        return state
    },
    chooseCou (state,obj){
        state.chooseCou = obj
        return state
    }
};