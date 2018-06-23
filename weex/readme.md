1. 定义：weex是一款使用web开发体验来开发高性能原生应用的框架。
2. 开发调试工具： weexplayground，在appStore上下载。需要真机调试，因为样式有些不支持简写，有坑。
3. 环境搭建：

    * 安装依赖：node.js
    * npm install -g weex-toolkit注册weex命令
    * weex create myproject：创建项目myproject——weex init myproject
    * cd myproject
    * npm install
    * npm start
    * 编译和运行：默认情况下weex create命令并不初始化IOS和Andriod项目，你可以用platform add 来添加：weex platform add ios/andriod/web
    * weex-toolkit提供了强大的调试功能，只需要在命令行输入weex debug
    

4. weex 通用样式，

    * 适配和缩略的介绍
    
        1. weex对于长度值目前只支持像素值，不支持相对单位（em、rem）；适配以750px为标准。
        2. 设定边框，border目前不支持类似这样border:1px solid #ccc;的组合写法。
        3. 设定背景色，background目前不支持类似这样background:red的写法，需要修改为具体的background-color:red;
        4. 社区：https://yq.aliyun.com/articles/61067
   
    * 定位
        
        1. weex支持position定位，relative|absolute|fixed|sticky，默认值为relative。
        2. weex目前不支持z-index设置元素层级关系，但靠后的元素层级更高，因此，对于层级高的元素，可将其排列在后面。
        3. 如果定位元素超过容器边界，在Android下，超出部分将不可见，原因是在Android端元素overflow默认值为hidden。
        
    * 其他要注意的地方：
    
        1. weex支持线性渐变linear-gradient，不支持radial-gradient径向渐变。
        2. weex中box-shadow仅仅支持IOS。
        3. 目前<image>组件无法定义一个或几个角的border-radius，只对IOS有效，对Android无效。
        4. weex中，flexbox是默认并且唯一的布局模型，每个元素都默认拥有了display:flex属性。

5. weex内置组件

    * A组件

        1. weex中a组件定义了指向weex页面打包后的一个js地址。
        2. 组件中无法添加文本，需要在其中加上text组件才能添加文本。支持color；font-size；font-weight；font-style；font-family；text-decoration；text-aline；text-overflow（内容超长时的省略样式）;lines(指定文本行数).
        3. 此组件支持除了自己外的所有weex组件作为子组件。
        4. 支持所有通用样式。
        5. 请不要为<a>组件添加click事件。

    * web组件，相当于html的iframe

        1. <web>组件用于在页面中嵌入一张网页；src用以指定资源地址。
        2. 不支持任何子组件。
        3. pagestart,<web>组件开始加载时执行。
        4. pagefinish，<web>组件完成加载时执行。
        5. error,<web>组件加载错误时执行。

    * webview组件

        1. 一系列<web>组件的操作接口。可以通过调用this.$refs.el来获取元素的引用。
        2. goBack(webElement)，加载历史记录里的前一个资源地址。
    
    * list组件

        1. <list>组件是垂直列表功能的核心组件。
        2. <cell> 组件，列表中的子项；类似与html中的ul和li的关系。
        3. <header>到达屏幕顶部时，吸附在屏幕顶部。
        4. <refresh>给列表添加下拉刷新的功能。
        5. loadmore 事件，loadmoreoffset{number}触发事件所需距离。
        6. scroll事件列表滚动时触发的该事件。
        7. offset-accuracy{number}控制scroll事件发生的频率。(默认10px）

    * <refresh>组件
        
        1. 用于提供下拉加载功能。<scroller>和 <list>的子组件，只有被这两个组件包含时才能正常展示。
        2. refresh事件，当list组件和scroller组件被下拉时触发。
        3. pullingdown，当list组件和scroller组件被下来时触发，可以从事件的参数对象中获取dy，pullingDistance，viewHeight，type；

6. <vue-router>介绍：
    
    * 针对vue.js开发的一个前端路由工具，可以方便快速的开发单页面应用。
    * vue-router是以vue.js插件的形式存在的，我们在使用vue-router之前需要先引入vue文件，因为vue是weex内置的前端框架，所以不需要在引入一次了，只需要引入vue-router并注册就可以了。
    * 我们需要在template模板中添加<router-view>的方式定了路由的出口，路由匹配到了对应的vue文件就会替换这个标签。
    * 我们在向应用中注册router之前，需要先创建一个路由实例，并且配置对应的路由规则。
    * 在应用中注入路由功能，我们还需要给入口组件添加router属性，使应用和路由建立。

        