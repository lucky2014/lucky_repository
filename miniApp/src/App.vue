<script>
export default {
  created () {
    
  }
}
</script>
<style>
    em,b,i{display: inline;}
      /* this rule will be remove */
      *{
        transition: width 2s;
        -moz-transition: width 2s;
        -webkit-transition: width 2s;
        -o-transition: width 2s;
      }
      *,view,block,text,button,label{ margin: 0; padding: 0; list-style: none; font-size: 14px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-o-box-sizing: border-box;font-family:microsoft yahei,'HelveticaNeue',sans-serif;}
      a{
          color: #1c1b20;
      }
      body{ background: #F4F4F4;min-width: 320px;}
      input,button,select,textarea{  
          outline:none;
          border:none;
          -webkit-appearance:none;
      }
      .clearFix:before,.clearFix:after{
          content: "";
          display: table;
          clear: both;
      }
      img{ display:block; }
      textarea{ resize:none; border:1px solid #f0f0f0; }
      a{ text-decoration: none;}
      .hide{ display: none !important;}
      .margin14{ margin: 14px auto;}
      .f999{ color: #999;}
      .tc{ text-align: center;}
      .ml10{ margin-left:10px; }
      .mb10{ margin-bottom:10px; }
      .p15{ padding:15px; }
      
      /* input的placeholder字体颜色大小 */
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color:#A2A2A2; font-size:14px;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color:#A2A2A2; font-size:14px;
      }
      input:-ms-input-placeholder{
          color:#A2A2A2; font-size:14px;
      }
      input::-webkit-input-placeholder{
          color:#A2A2A2; font-size:14px;
      }
      textarea:-ms-input-placeholder{
          color:#A2A2A2; font-size:14px;
      }
      textarea::-webkit-input-placeholder{
          color:#A2A2A2; font-size:14px;
      }
      
      /*引导遮罩*/
      .mask{ position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,.6); text-align: right; z-index: 100;
      display: none;}
      .mask img{ display: block; width: 80%; margin: 0 0 0 15%;}
      .markTip{position: fixed; top: 36%; text-align: center; width: 100%;}
      .markTip span{ background: rgba(0,0,0,.6); display: inline-block; padding: 5px 12px 7px; border-radius: 6px; color: #fff;}
      
      
      
      /*背景透明度*/
      .inShade{
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height:100%;
          z-index: 999;
          background-color: rgba(0,0,0,.8);
          display: none; color: #fff;
      }
      .inShade img{
          width: 55%;
          position: absolute;
          right: 5%;
          top: 5%;
      }
      input[disabled]{
          background-color: #A2A2A2 !important;
      }
      
      /*汽修按钮颜色-蓝色*/
      .carAutoBtn{background: #2896fe !important;}
      
      /*返回按钮*/
      .microStore .btn>span{font-size: 18px;}
      .autoService .btn{ background:#2896fe;}
      
      #shareTips{display: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;background: rgba(0,0,0,0.5);z-index: 999;}
      #shareTips img{position: absolute;top: 0;right: 0; width: 65%;}
      
      /*缺省数据*/
      .noDataFixed{position: fixed;top: 50%;left: 50%;-webkit-transform:translate(-50%,-50%);margin-top: -22px;}
      .noDataFixed img{width: 181px;height: 181px;}
      .noDataFixed p{color: #A2A2A2;line-height: 20px;text-align: center;}
      </style>
      

