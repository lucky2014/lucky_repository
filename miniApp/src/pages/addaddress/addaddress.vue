<template>
    <div class="conDiv">
        <div class="inputDiv">
            <input type="text" placeholder="收件人姓名" maxlength="16" :focus="focusInput=='name'" :value="name" confirm-hold v-model.lazy="name">
            <span>{{name.length}}/16</span>
        </div>
        <div class="inputDiv">
            <input type="number" placeholder="手机号"  v-model.lazy="phone" :focus="focusInput=='phone'" :value="phone">
        </div>
        <div class="inputDiv">
            <picker mode="selector" :range="provinceList" :range-key="'name'" @change="province">
                <view  class="picker">
                    {{provinceName||'省'}}
                </view>
            </picker>
        </div>
        <div class="inputDiv" v-show="provinceName">
            <picker mode="selector" :range="cityList" :range-key="'name'" @change="city">
                <view  class="picker">
                    {{cityName||'市'}}
                </view>
            </picker>
        </div>
        <div class="inputDiv" v-show="cityName">
            <picker mode="selector" :range="districtList" :range-key="'name'" @change="district">
                <view  class="picker">
                    {{districtName||'县'}}
                </view>
            </picker>
        </div>
        <div class="inputDiv">
            <textarea placeholder="详细地址(无需重复填写省市区)" maxlength="60"  v-model.lazy="detail"  :focus="focusInput=='detail'" :value="detail"/>
            <span>{{detail.length}}/60</span>
        </div>
        <div class="inputDiv">
            <input type="number" placeholder="邮政编码选填"  v-model.lazy="eMail" :value="eMail">
        </div>
        <div class="save" @click="saveFn">保存</div>
    </div>
</template>
<script>
import utils from '@/utils/index.js';
import index from '../../store/info';
export default {
    data(){
        return {
            name : "",
            phone : "",
            provinceList : [],
            cityList : [],
            districtList : [],
            provinceName : "",
            provinceCode : 0,
            cityCode : 0,
            cityName : "",
            districtCode : 0,
            districtName : "",
            detail : "",
            eMail : "",
            focusInput : "",
            id : 0,
        }
    }, 
    mounted(){
        if(this.$root.$mp.query.index){
            var obj = this.stateList[this.$root.$mp.query.index];
            this.name = obj.name;
            this.phone = obj.phone;
            this.provinceName = obj.provinceName;
            this.provinceCode = obj.provinceId;
            this.cityName = obj.cityName;
            this.cityCode = obj.cityId;
            this.districtName = obj.districtName;
            this.districtCode = obj.districtId;
            this.detail = obj.address;
            this.eMail = obj.postCode
            this.id = obj.id;
            this.isDefault = obj.isDefault; 
            var data1 = {
                areaCode : obj.provinceId,
            }
            utils.getAreaCode(data1,(msg)=>{
                this.cityList = msg;
            })
            var data2 = {
                areaCode : obj.cityId,
            }
            utils.getAreaCode(data2,(msg)=>{
                this.districtList = msg;
            })
        }
        utils.getAreaCode({},(msg)=>{
            this.provinceList = msg;
        })
    },
    computed : {
        stateList(vue){
            return vue.$store.state.addressList.addressList
        }
    },
    methods : {
        changeName : function(e){
            this.name = e.target.value;
        },
        changePhone : function(e){
            this.phone = e.target.value;
        },
        province : function(e){
            var me = this;
            this.provinceName = this.provinceList[e.target.value].name
            this.provinceCode = this.provinceList[e.target.value].code
            this.cityName = ""
            this.cityCode = ""
            this.districtName = ""
            this.districtCode = ""
            var data = {
                areaCode : me.provinceCode,
            }
            utils.getAreaCode(data,(msg)=>{
                this.cityList = msg;
            })
        },
        city : function(e){
            var me = this;
            this.cityName = this.cityList[e.target.value].name
            this.cityCode = this.cityList[e.target.value].code
            this.districtName = ""
            this.districtCode = ""
            if(me.cityCode!="820100"&&me.cityCode!="820200"){
                var data = {
                    areaCode : me.cityCode,
                }
                utils.getAreaCode(data,(msg)=>{
                    this.districtList = msg;
                })
            }else{
                this.districtName = "无";
                this.districtCode = 1;
                this.districtList = [{name:'无'}];
            }
        },
        district : function(e){
            this.districtName = this.districtList[e.target.value].name
            this.districtCode = this.districtList[e.target.value].code
        },
        detailAdd : function(e){
            this.detail = e.target.value;
        },
        addMail : function(e){
            this.eMail = e.target.value;
        },
        alert : function(msg){
            wx.showToast({
                title: msg,
                icon: 'none',
                duration: 1500
            })
        },
        saveFn : function(){
            if(!this.name){
                this.alert("请输入收件人姓名")
                this.focus = "name"
            }else if (this.name.length<2){
                this.alert("收件人姓名不能少于两个字")
                this.focus = "name"
            }else if(!/^1[34578]\d{9}$/.test(this.phone)){
                this.alert("请输入正确的手机号")
                this.focus = "phone"
            }else if(!this.provinceCode||!this.cityCode||!this.districtCode){
                this.alert("请选择省市区")
            }else if(!this.detail){
                this.alert("请输入详细地址")
                this.focus = "detail"
            }else{
                var data = {
                    name: this.name,
                    phone: this.phone,
                    provinceName: this.provinceName,
                    cityName: this.cityName,
                    provinceId: this.provinceCode,
                    cityId: this.cityCode,
                    address: this.detail,
                    postCode: this.eMail,
                    isDefault: 0,
                    districtName: this.districtName,
                    districtId: this.districtCode,
                    isDefault: this.isDefault||0
                }
                if(this.id){
                    data.id = this.id;
                    utils.updateReceiverInfo(data,()=>{
                        this.$store.dispatch('setAddlist')
                        wx.navigateBack()
                    })
                }else{
                    utils.saveReceiverInfo(data,(msg)=>{
                        this.$store.dispatch('setAddlist')
                        wx.navigateBack()
                    })
                }
            }
        }
    },
    onUnload(){
        this.name = "";
        this.phone = "";
        this.provinceName = "";
        this.provinceCode = 0;
        this.cityName = "";
        this.cityCode = 0;
        this.districtName = "";
        this.districtCode = 0;
        this.detail = "";
        this.eMail = "";
        this.id = 0;
        this.isDefault = 0;
    },
}
</script>
<style>
.conDiv{
    background-color: #ffffff;
}
.inputDiv{
    border-top: 1px solid #F0F0F0;
    margin-left: 15px;
    padding: 0px 15px 0px 0;
    font-size: 14px;
    position: relative;
}
.inputDiv picker,.inputDiv input{
    padding: 13px 0;
}
.inputDiv input{
    height: 20px;
    line-height: 20px;;
}
.inputDiv span{
    position: absolute;
    font-size: 14px;
    color: #B2B2B2;
    right: 13px;
    bottom: 18px;
}
.inputDiv textarea{
    width: 100%;
    box-sizing: border-box;
    padding:13px 5px;
    border: none;
}
.save{
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    text-align: center;
    background: #ff5200;
    border: 1px solid #ff5200;
    color: #fff;
}
</style>

