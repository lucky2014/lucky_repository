<template>
    <div>
        <div class="payOut" v-show="type=='weixin'||type=='zhifubao'">
            <div class="payInfor">
                <div class="qrcode">
                    <image :src="type=='weixin'?store.wxQrUrl:store.zfbQrUrl" mode="widthFix" @click="lookImg(type=='weixin'?store.wxQrUrl:store.zfbQrUrl)"/>
                </div>
                <ul class="alipayShow" v-show="type=='zhifubao'">
                    <li><span>1</span><p>点击后长按保存二维码到本地相册；</p></li>
                    <li><span>2</span><p>打开支付宝扫一扫，选择右上角的相册；</p></li>
                    <li><span>3</span><p>打开相册，选择保存的二维码图片，完成支付转账</p></li>
                </ul>
                <ul class="wechatShow" v-show="type=='weixin'">
                    <li><span>1</span><p>点击后长按保存二维码到本地相册；</p></li>
                    <li><span>2</span><p>打开微信扫一扫，选择右上角的相册；</p></li>
                    <li><span>3</span><p>打开相册，选择保存的二维码图片，完成支付转账</p></li>
                </ul>
                <p class="remark">注：请转账成功后及时联系卖家，确认收款。</p>
                <i class="closeBtn"  @click="cancel"><img src="https://store.iliujia.com/imgs/c/cutShare.png" width="100%" /></i>
            </div>
        </div>
        <div class="ZKLOut" v-show="type=='zhikouling'">
            <div class="ZKLInfor">
                <div class="con">
                    <h3>吱口令</h3>
                    <textarea type="text" class="zkl" id="content" readonly :value="store.zfbCommand">
                    </textarea>
                    <p class="remark">注：请转账成功后及时联系卖家，确认收款。</p>
                </div>
                <div class="btnDiv">
                    <a class="cancel" @click="cancel">取消</a>
                    <button class="copy theme_color" @click="copy(store.zfbCommand)">复制</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/utils/index.js'
export default {
    props : ["type"],
    computed:{
        store(vue){
            return vue.$store.state.info.storeInfo
        }
    },
    methods : {
        copy(data){
            wx.setClipboardData({
                data: data,
                success: function(res) {
                    utils.alert("复制成功",'success')
                }
            })
        },
        cancel(){
            this.$emit("addType",0)
        },
        lookImg(img){
            wx.previewImage({
                urls: [img]
            })
        }
    }
}
</script>

