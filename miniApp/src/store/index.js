import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import info from './info/index.js';
import bugInfo from './bugInfo/index.js'
import addressList from './address/index.js'
import orderCenter from './orderCenter/index.js'
import coupon from './coupon/index.js'

export default new Vuex.Store({
    modules: {
        info : info,
        bugInfo : bugInfo,
        addressList : addressList,
        orderCenter : orderCenter,
        coupon : coupon,
    }
});