<template>
    <div>

    </div>
</template>
<script>
import {ajaxFn} from '../../utils/index.js'
export default {
  mounted(){
    var vue = this;
    wx.showLoading({
      title: '登录中',
    })
    wx.login({
        success: res => {
            var data = {
                "code" : res.code,
                'miniAppId': "wx3e4cbdc0a7dd10ba", //测试的：wx4316810127c1240a
                "appKey": "zHhDHrcjhmGFbPQiHfjZGjgBjnzpMKH" , //测试的：FdnIRBbOtaWaxxFpNDrPZneBujnnHoqP
            }
            wx.request({
                // url: "https://wx.yinnima.com/liujia-certification-server/wxlogin/wxMiniAppLogin.do?"+(new Date()).getTime(),
                url: "https://h5.iliujia.com/liujia-certification-server/wxlogin/wxMiniAppLogin.do?"+(new Date()).getTime(),
                method : 'POST',
                header: {'content-type': "application/x-www-form-urlencoded"},
                dataType : 'json',
                data:data,
                success: function(res) {
                    if(res.data.resultCode == 1000){
                        vue.$store.commit('login', res.data.returnObject.token);
                        if(vue.$root.$mp.query.scene){
                            var text = decodeURIComponent(vue.$root.$mp.query.scene)
                            if(text.indexOf("#")!=-1){
                                vue.$store.commit("setStoreId",text.split("#")[0]);
                                vue.$store.dispatch('getStoreInfo')
                                wx.reLaunch({
                                    url: "./../goodsDetail/main?id="+text.split("#")[1]
                                })
                            }else{
                                vue.$store.commit("setStoreId",text);
                                vue.$store.dispatch('getStoreInfo')
                                wx.reLaunch({
                                    url: "./../index/main?"
                                })
                            }
                        }else{
                            wx.reLaunch({
                                url: "./../storeList/main?" + (new Date()).getTime()
                            })
                        }
                    }else{
                        
                    }
                },
                fail : function(res){
                //fcb&&fcb(res)
                }
            });
        },
        fail : function(res){
            console.log(res)
        }
    })
  }
}
</script>
