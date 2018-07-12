<template>
    <div>
        <div v-if="!showEmpty">
            <addressList @delectid="delectFn" @defaultid="defaultFn" @editorid="editorFn" :choose="choose" @chooseObj="chooseObj"/>
        </div>
        <div v-else>
            <Empty :msg="msg"/>
        </div>
        <div class="buttons_bottom addDiv" @click="editor">
            <a class="buttons_buttom_add theme_bk_color themeBtn_single fixedBtn"><em>+</em>新建地址</a>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
import addressList from '@/components/address/addressList.vue'
import editor from '@/components/address/editor.vue'
import Empty from '@/components/empty.vue'
export default {
    data () {
        return {
          msg : '暂无收件人',
          choose : 0,
          showEmpty: false,
        }
    },
    mounted (){
        this.isEditor = false;
        if(this.$root.$mp.query.type){
            this.choose = 1
        }else{
            this.$store.dispatch('getAddlist');
        }
    },
    computed : {
        addressList(vue){
            this.showEmpty = vue.$store.state.addressList.addressList
            return vue.$store.state.addressList.addressList
        }
    },
    watch : {
        addressList : function(v){
        }
    },
    components : {
        addressList,
        Empty,
    },
    methods : {
        listReceiverInfos: function(){
            utils.listReceiverInfos((msg)=>{
                this.addressList = msg
            })
        },
        editor : function(){
            wx.navigateTo({
                url : '../addaddress/main'
            })
        },
        delectFn : function(obj){
            var data = {
                receiverId: obj.id
            }
            utils.deleteReceiverInfo(data,()=>{
                this.$store.dispatch("setAddlist")
            })
        },
        defaultFn : function(id){
            var data = {
                receiverId: id
            }
            utils.saveDefaultReceiverInfo(data,()=>{
                this.$store.dispatch('setAddlist')
            })
        },
        editorFn : function(obj){
            wx.navigateTo({
                url : '../addaddress/main?index='+obj.index
            })
        },
        chooseObj : function(obj){
            this.$store.commit("chooseAdd",obj);
            wx.navigateBack();
        }
    },
    onUnload(){
        this.choose = 0
    }
}
</script>
<style>
*,input{font-size: 14px;}
._em,._i,._b{display: inline;}
.fr{ float: right;}.adMore{ float: left; position: absolute; left: 76px; top: 10px; right: 76px;}

.weui-media-box_appmsg .weui-media-box__hd{ line-height: 30px; height: 48px; text-align: left;}
.weui-media-box_appmsg .weui-media-box__hd i{ display: inline-block; color: red; border:1px solid red;
font-style: normal; padding: 0 4px; line-height: 20px; border-radius: 3px;}
.weui-media-box_appmsg .weui-media-box__hd img.edit{ width: 24px; height: 24px;
float: right;}

.weui-media-box.weui-media-box_appmsg{ background: #fff;}

.weui-cells.weui-cells_form{ margin-top: 0;}
.weui-cells.weui-cells_form .weui-cell{ border-top: 1px solid #F0F0F0;}
.weui-cells.weui-cells_form .weui-cell:before{ border-top: none;}

.weui-cells.weui-cells_form .weui-cell__bd.weui_text:after{ height: 0;
    width: 0; border-width: 0;}

.bg-danger, .bg-error{ background:#fff; color: red;}
.buttons_bottom a i{ display: block; position: absolute; right: 0; width: 1px; height: 50px; background: #ccc;}
.buttons_bottom a.active{ color: #fff;}
.buttons_bottom a.buttons_buttom_add{ display: block; width: 100%;text-align: center;line-height: 44px;}
.buttons_bottom a.buttons_buttom_add em{ font-size: 26px;  font-style: normal;padding-right: 4px; font-weight: bold;position: relative;top: 3px}

.weui-textarea-counter{ position: relative;}
.weui-cell-warn{ position: absolute; left: 0; top: 0; display: none; color: red;}

#count{ color:#A2A2A2;}
.weui-media-box.weui-media-box_appmsg{ padding: 10px 12px 8px;}
.addressAll .weui-media-box__title{ margin-bottom:5px; text-align: left; font-size:16px; line-height:18px; color:#1C1B20; }

.weui-media-box_appmsg{ display: block; overflow: hidden; display: block; display: block}

.weui-switch, .weui-switch-cp__box{ width:36px; height:20px; }
.weui-switch-cp__box:before, .weui-switch:before{ width:36px; height:20px; background: #e8e8e8; }
.weui-switch-cp__box:after, .weui-switch:after{ width:18px; height:18px; }
.weui-cells.weui-cells_form .weui-cell{ border-top:1px solid #F0F0F0; }
.weui-cells.weui-cells_form .weui-cell_switch{ /* padding-top:11px; padding-bottom:11px; */ color:#A2A2A2; border-top:none; }
.weui-cell{ margin-left:15px; padding:13px 15px 13px 0; }

input::-webkit-input-placeholder {color:#A2A2A2;}
input:-moz-placeholder {color:#A2A2A2;}
input::-moz-placeholder {color:#A2A2A2;}
input:-ms-input-placeholder {color:#A2A2A2;}

.addDiv{ position:fixed; bottom:0; left:0; right:0;z-index: 100; }
.addDiv a{ background:#fff;background: #ff5200;border: 1px solid #ff5200;height: 44px;color: #fff;font-size: 16px;}

.addressAll .weui-media-box:before{ border-top:none; }
.addressAll .weui-media-box{ border-bottom:1px solid #F0F0F0; }

.weui-cell_swiped .weui-cell__bd {
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
}
.weui-cell__ft .weui-swiped-btn {
    float:left;
    color: inherit;
    padding:0;
    width: 100%;
    height: 100%;
    text-align:center;
    vertical-align: middle;
    line-height: 50px;
    background:  #A0A0A0;
}
.weui-cell__bd{
    position: relative;
}
#name{
    padding-right: 50px;
}
.nameCount{
    position: absolute;
    top: 0;
    right: 0;
    color: #B2B2B2;
    font-style: normal;
}
.nameCount b,
.nameCount i{
    font-style: normal;
    font-weight: normal;
}
.addressAll{
    padding-bottom: 60px;
}
.weui-cell__ft .weui-swiped-btn.delete-swipeout{
    background: #AA2327;
}
.list-content{ padding-right:30px; line-height: 30px; height: auto; text-align: left;}
.list-content i{ display:block; width:32px; font-size:12px; color:#AA2327; border:1px solid #AA2327; font-style: normal; line-height:16px; border-radius: 3px; text-align:center; }
.list-content img.edit{ width: 27px; height: 27px; float: right;}
.addressAll .weui-cell{ padding:0; }
.addressAll .weui-cells:before,.addressAll .weui-cells:after{ border:none; }
.addressAll .weui-cell__bd{ padding:15px 15px 15px 0; border-bottom: 1px solid #F0F0F0; }
.addressAll .weui-media-box__desc{ font-size:12px; line-height:16px; color:#A2A2A2; }
.addressAll .leftDiv{ float:left; width:76px; }
/*.addressAll .editIcon{ position:absolute; right:15px; top:50%; margin-top:-13.5px; }*/

.lists_contianer{padding-bottom: 40px;}
.lists_contianer>li{display: flex;flex-direction:column; background: #fff;margin-bottom: 10px;}
.address_infor{display: flex;align-items: center;padding: 15px;border-bottom: 1px solid #F0F0F0;}
.icon_container{width: 44px;height: 100%;display: block;}
.icon_container i{display: block;width: 21px;height: 24px; background: url(https://store.iliujia.com/imgs/c/pos.png);background-size: 100% 100%;}
.perInfor_container{flex:1;}
.perInfor_container div{display: flex;}
.perInfor_container div span{font-size: 16px;letter-spacing: -0.49px;color: #1C1B20;line-height: 22px;}
.perInfor_container .phone{flex:1;text-align: right;}
.perInfor_container p{color: #606060;letter-spacing: 0.03px;font-size: 12px;line-height: 17px;margin-top: 5px;}
.isDefault i{display: inline-block;width: 23px;height: 23px;margin-right: 10px; background: url(https://store.iliujia.com/imgs/c/right.png);background-size: 100% 100%;}
.isDefault.notDefault i{background: url(https://store.iliujia.com/imgs/c/right_no.png);background-size: 100% 100%;}

.edit_container{display: flex;align-items:center;height: 40px;line-height: 40px;padding: 0 15px;}
.edit_container .isDefault{display: flex;flex:1; align-items:center;font-size: 12px;color: #A2A2A2;letter-spacing: -0.37px;}
.edit{align-items:center; display: flex; flex:1; text-align: right;font-size: 12px;color: #A2A2A2;letter-spacing: -0.37px;}
.edit li,.edit li a{flex:1; align-items:center;font-size: 12px;color: #A2A2A2;letter-spacing: -0.37px;}
.edit i{display: inline-block;width: 23px;height: 23px;margin-right: 4px; vertical-align: top; margin-top: 8px;}
.editIcon i{background: url(https://store.iliujia.com/imgs/c/editAddress.png);background-size: 100% 100%;}
.delete-swipeout i{background: url(https://store.iliujia.com/imgs/c/delete.png);background-size: 100% 100%;}
</style>

