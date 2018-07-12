<template>
    <div>
        <div class="shareInner shopShareInner">
		<!-- <section class="backPicImg" style="background:url({{resizeImg backPic 375 200 1 'crop_middle'}}) no-repeat;background-size:100%;background-position: center;width:100%;height:173px;"></section> -->
            <!-- <div class="backPicImg">
                <img src="" crossOrigin='Anonymous' />
            </div>
            <p class="storeName trait">
                <span>{{store.storeName}}</span>
                <img src="" crossOrigin='Anonymous' />
            </p>
            <p class="shopIdentify">
                <img src="../imgs/c/identify.png"/>
                <span v-if="store.isCertification">该店铺已通过实名认证</span>
                <span v-else>该店铺未通过实名认证</span>
            </p>
            <p class="shortIntro">{{store.shortIntro}}</p>
            <div>
                <div class="qrcode"></div>
                <span class="theme_color">微信长按或扫描识别二维码进店</span>
            </div> -->
            <div>213123123123123</div>
        </div>
    </div>
</template>
<script>
import html2canvas from "html2canvas";
export default {
    computed : {
        store(vue){
            return vue.$store.state.info.storeInfo
        }
    },
    mounted(){
        html2canvas(".shopShareInner").then(function(canvas) {
            document.body.appendChild(canvas);
        });
    }
}
</script>
