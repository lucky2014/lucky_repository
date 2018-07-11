## 一、iconfont使用：http://iconfont.cn/home/index?spm=a313x.7781069.1998910419.2

1. 注册账号： 190401817@qq.com@github
2. 加入购物车
3. 加入项目
4. 下载到本地
5. 将样式和字体转到本地

## 二、项目的联调，测试与发布上线

1. 前后端联调，config/index里：

    <pre>proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {"^/api" : "/static/mock"},
        // changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      }
    },</pre>

2. webpack默认是不能通过IP地址访问的，需要在package.json里配置--host 0.0.0.0

    <pre>"scripts": {
    "dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js"
  },</pre>

3. 事件修饰符：@touchstart.prevent=fn，组织默认行为

    * @click.stop="doThis" //阻止单击事件冒泡
    * @submit.prevent="onSubmit" //阻止事件的默认行为
    * @click.stop.prevent="doThat" //修饰符可以串联
    * @click.capture="doThis"  //添加事件监听时使用事件捕获形式
    * @click.self="doThat"  //只有在本元素触发时执行回调，而不是资子元素
    * @:keyup.13="submit"， @:keyup.enter="submit" //按键修饰符
    * 全部记住按键别名：记住所有的keycode比较困难，所以vue为最常见的按键提供了别名：
        
        .enter, .tab, .delete, .esc, space, .up, .down, .left, .right<br />

        可以通过全局config.keyCodes对象自定义按键修饰符别名： Vue.config.keyCodes.f1 = 13, //@keyup.fi="submit"

4. 低版本手机白屏问题：是因为有些手机不支持promise。解决办法是babel-polyfill，在入口文件main.js: import "babel-polyfill"

5. 打包路径：在config/index: build对象： assetsPublicPath: '/project'

6. 一步组件按需加载，在router文件里： component: () => import("@pages/home/Home")，只要是vue组件都可以用一步组件加载。

7. 让router-link标签变成需要的标签，tag="li"

8. scoped样式控制不到： .container >>> .item{ overflow:hidden; }

9. swiper重新加载时，不能立刻计算宽高：
    
    <pre>swiperOptions: {
    observeParents: true,
    observer: true}</pre>

10. 浏览器配置：在package.json文件，添加属性：

    <pre>browserslist: {
    "iOS >= 8",
    "> 1%",
    "last 2 versions",
    "not ie <= 8"}</pre>

11. 对于低版本手机不支持ES6语法，导致白屏，可以通过babel-polyfill来解决。

## 三、基础知识

1. <router-link to="'home'">, <a v-link="{path: 'home',activeClass: 'active'}">

## 二、Javascript笔记

1. this是指函数运行时所在的环境。
2. let声明的变量，只在它所在的代码块内有效。
3. padding-top/bottom:50%; 元素的参照物是父元素的宽度。
4. 页面滚动位置：document.documentElement.scrollTop