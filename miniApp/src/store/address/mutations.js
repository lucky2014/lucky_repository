export default {
    // login(state, token) {
    //     state.token = token;
    //     return state
    // },
    // storeInfo(state,msg){
    //     state.storeInfo = msg;
    //     return state
    // }
    listReceiverInfos (state,msg){
        var obj = [];
        var me = this;
        var newList = [...msg]
        for(var i=0;i<newList.length;i++){
            if(newList[i].isDefault){
                obj = newList.splice(i,1)
            }
        }
        if(obj.length>0){   
            newList.unshift(obj[0])
            state.chooseAdd = obj[0]
        }else{
            state.chooseAdd = {}
        }
        state.addressList = newList
        return state
    },
    isAjax (state,type){
        state.type = type
        return state
    },
    chooseAdd (state,obj){
        state.chooseAdd = obj
        return state
    }
};