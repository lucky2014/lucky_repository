import utils from '../../utils/index.js'
export default {
    couponList ({state,commit}){
        var data = {
            isUsed:1,
        }
        utils.listStoreCouponCustomer(data,(msg)=>{
            commit("couponList",msg);
            commit("isCouponType",1);
        })
    }
}