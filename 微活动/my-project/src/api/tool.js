import wx from 'weixin-js-sdk'
import api from './index'
export default {
    created(config) {
        api.getJsConfig().then((result) => {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.returnObject.appId, // 必填，公众号的唯一标识
                timestamp: result.returnObject.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.returnObject.nonceStr, // 必填，生成签名的随机串
                signature: result.returnObject.signature,// 必填，签名，见$("#timestamp").val()附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'checkJsApi', 'openLocation', 'getLocation', 'addCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                wx.onMenuShareTimeline({    //朋友圈
                    title: config.shareTitle, // 分享标题
                    link: config.wxShareUrl, // 分享链接
                    imgUrl: config.imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        config.callback&&config.callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({  //朋友
                    title: document.title, // 分享标题
                    desc: config.shareTitle, // 分享描述
                    link: config.wxShareUrl,  // 分享链接
                    imgUrl: config.imgUrl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        config.callback&&config.callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareQQ({ //QQ
                    title: document.title,  // 分享标题
                    desc: config.shareTitle, // 分享描述
                    link: config.wxShareUrl, // 分享链接
                    imgUrl: config.imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        config.callback&&config.callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareWeibo({ //微博
                    title: document.title,  // 分享标题
                    desc: config.shareTitle, // 分享描述
                    link: config.wxShareUrl, // 分享链接
                    imgUrl: config.imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        config.callback&&config.callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareQZone({ //QQ空间
                    title: document.title,  // 分享标题
                    desc: config.shareTitle, // 分享描述
                    link: config.wxShareUrl, // 分享链接
                    imgUrl: config.imgUrl, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        config.callback&&config.callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        })
    },
    getQueryString(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    timeFormat(t,long){
        t = new Date(t);
        var year = t.getFullYear();
        var month = this.formatNumFn(t.getMonth() + 1);
        var date = this.formatNumFn(t.getDate());
        var hour = this.formatNumFn(t.getHours());
        var minute = this.formatNumFn(t.getMinutes());
        var second = this.formatNumFn(t.getSeconds());
        if (long == 'long') {
          return year + "." + month + "." + date + "   " + hour + ":" + minute + ":" + second;
        } else {
          return year + "." + month + "." + date;
        }
    },
    formatNumFn: function (n) {
        return (n > 9) ? n : "0" + n;
    }
}