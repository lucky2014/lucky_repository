<template>
    <div class="scratch" :style="classStyle">
		<div @touchstart="(e)=>{this.canScratch!==true?e.preventDefault:''}" class="scratch-cvs">
            
        </div>
        <span class="gift theme-color">{{this.scratch.lottery.prizeName}}</span>
    </div>
</template>
<script>
    import {mapState,mapMutations,mapGetters} from 'vuex'
    class Scratch {
        constructor(config){
            this.el = config.el;
            this.renderSrc = config.renderSrc;
            this.cvsObj = document.createElement("canvas");
            let canvasPar = document.querySelector(this.el);
            canvasPar.innerHTML = "";
            canvasPar.appendChild(this.cvsObj);
            this.w = this.cvsObj.width;
            this.h = this.cvsObj.height;
            this.cvs = this.cvsObj.getContext("2d");
            this.pR = this.w/100*5;
            this.callback = config.callback;
            this.initCallback = config.initCallback;
            this.canScratch = config.canScratch;
            this.init();
        }
        paintImage(){
            var _this = this;
            var img = new Image();
            img.src = this.renderSrc;
            img.onload = function(){
                _this.cvs.drawImage(img,0,0,_this.w,_this.h);
            }
        }
        paintRect(clr){
            var _this = this;
            _this.cvs.beginPath();
            _this.cvs.fillStyle=clr;
            _this.cvs.fillRect(0,0,_this.w,_this.h);
            _this.cvs.closePath();
        }
        paintText(text,bg,txObj){
            var _this = this;
            _this.cvs.beginPath();
            _this.paintRect(bg);
            // _this.cvs.font = txObj.font;
            // //设置字体填充颜色
            // _this.cvs.fillStyle = txObj.color;
            // _this.cvs.textAlign='center';//文本水平对齐方式
            // //从坐标点(50,50)开始绘制文字
            // _this.cvs.fillText(text, _this.w/2, _this.h/2+txObj.size/2);
        }
        paintSpot(x,y){
            var _this = this;
            _this.cvs.beginPath();          
            _this.cvs.arc(x,y, _this.pR, 0, Math.PI * 2,true);
            _this.cvs.globalCompositeOperation = 'destination-out';
            _this.cvs.fill();
        }
        touchMove(e){
            var _this = this;  
            if(e.changedTouches){                         
                e=e.changedTouches[e.changedTouches.length-1];                     
            }
            var bridgeRect = this.cvsObj.getBoundingClientRect();
            var x = (e.clientX + document.body.scrollLeft || e.pageX)-bridgeRect.left||0,                         
            y = (e.clientY + document.body.scrollTop || e.pageY)-bridgeRect.top || 0;    
            _this.paintSpot(x+this.pR,y+this.pR,_this.pR);
        }
        touchEnd(e){
            var _this = this;
            let timer = null;
            let timer2 = null;
            clearTimeout(timer);
            clearTimeout(timer2);
            _this.cvs.clearRect(0,0,_this.w,_this.h);
            timer2 = setTimeout(function(){
                _this.callback();
            },1000)
        }
        init(){
            var _this = this;
            this.paintText("刮我中大奖","#FD6403",{color:"#CFCFCF",font:"30px 微软雅黑",size:30});
            // this.paintImage();
            _this.cvsObj.addEventListener("touchmove", function(e){
                _this.touchMove(e)
            });
            _this.cvsObj.addEventListener("touchend", function(e){
                _this.touchEnd(e)
            });
        }
    }
    
    export default {
        props:['renderSrc','classStyle'],
        data(){
            return {
                config:{}
            }
        },
        computed:{
            ...mapState({
                scratch:'scratch',
                dialog:'dialog',
                activityTime:'activityTime',
                canScratch:'canScratch',
                activity:'activity',
            })
        },
        watch:{
            'dialog.gift'(to){
                if(this.activityTime>0){
                    if(!this.dialog.gift){
                        new Scratch(this.config);
                        this.$store.commit("setProps",'canScratch',false);
                    }
                }
            }
        },
        mounted(){
            this.config = {
                el:".scratch-cvs",
                parEl:'.scratch',
                renderSrc:this.renderSrc||'../../static/scratch_area.png'||'../assets/img/area.png',
                canScratch:this.canScratch,
                callback:()=>{
                    this.$store.commit("scratchCanshow");
                    this.$store.dispatch("getTimes",{activityId:this.activity.activityId,account:this.activity.openId});
                }
            };
            var timer = null;
            clearTimeout(timer);
            new Scratch(this.config);
        }
    }   
</script>
<style>
    .scratch{
        position: relative;
        display: flex;
        display: -webkit-flex;
        display: -o-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height:100%;
        background: url(../assets/img/scratch_box.png) no-repeat;
        background-size:100% 100%;
    }
    .scratch-cvs{
        position: absolute;
        left:8px;
        width: calc(100% - 16px);
        width:-webkit-calc(100% -16px);
        height: calc(100% - 32px);
        height:-webkit-calc(100% - 32px);
        top:16px;
        z-index: 10;
    }
    .scratch-cvs canvas{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
    }
</style>