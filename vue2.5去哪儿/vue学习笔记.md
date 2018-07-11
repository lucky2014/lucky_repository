
## 注意

目前最新版的vue-cli，已经改名为@vue/cli，同时安装@vue/cli-init。然后安装以下步骤安装脚手架：

1. vue init webpack my-project
2. cd my-project
3. npm install
4. npm run dev


## 课程学习笔记

1. MVP模式中，70%以上的代码都是在操作DOM，其中model层的作用不是很明显。
2. MVVM模式中，有model、view和vm层，M层是我们在vue里面写的data，模板是V层，接下来写的代码都是对数据进行操作的。VM层是框架帮我们监听的，编码的重点是视图层和模型层。很多时候我们只需要监听数据，其他操作修改DOM都是框架帮我们做的，数据变化，vue会帮我们改变视图层，vue也能监听到视图层的操作，然后通过vm层去调用你写的一些逻辑代码，通过逻辑代码从而改变了model层的数据，当数据变化的时候，VM层又自动的把数据变化映射到View层。所以，MVVM开发最只要的是model。你可以这样理解，以前用jquery开发的时候，面向的是DOM的开发，而MVVM开发模式，面对的是数据进行编程，也就是你的代码量会显著的减少。
3. 全局组件：
    <pre>vue.component("Todolist", {
        props: ["content"],
        template: "<li>{{content}}</li>"
    })</pre>
4. 局部组件
    
    <pre>var app = new Vue({
        el: "#app",
        components: {
            todolist,
        },
        methods: {}
    });

    var todolist = {
        props: ["content"],
        template: ''
    }</pre>   

5. 创造一个vue的实例，然后让它去接管页面上的某一部分。

    <pre>var vm = new Vue({
        el: "#root",
        data: {
            aa: 1
        }
    });</pre>

    可以在控制台里输入vm，vm.$el，凡是以$开头的都是VUE的实例属性或方法。

    只能在根主键定义data为一个对象，其他地方要定义为一个函数，返回一个对象。因为子组件可能会被调用很多次，而每个子组件的数据都是不一样的。独立数据存储，不产生数据相互影响的局面。

6. 生命周期函数就是vue实例在某一个时间点会自动执行的函数。
7. 模板语法：插值表达式，v-text值是JS的表达式

8. 计算属性：computed,计算过一次后，它会有缓存，如果它依赖的值没有变化，那么它不会再重新计算。还有get、set方法。
9. 方法：methods：{}，计算过后，没有缓存，重新执行。
10. 监听方式，某个值变化：watch： {}，也具备缓存的机制。但是可能代码比较冗余。

11. 样式绑定： 
    <pre>:class="{aa: aa}", :class="[aa, 'aaDefault']"
        style ="{}"
        :style ="表达式"
        :style = "[表达式, {fontSize: '20px'}]"</pre>
12. v-if如果隐藏不会显示在页面中，v-show如果隐藏，代码还存在。v-show性能比较高，因为它不会频繁的添加删除DOM。
13. diff算法，可以给每个元素定义不一样的key，这样就不会形成缓存复用。
14. 数组循环改变页面的方法：
    * 数组的变异方法：push、splice、shift、unshift、pop、sort、reverse，
    * 直接修改整个list。
    * vue.set(vm.userInfom, "address", "beijing")
    * vm.$set(vm.userInfom, "address", "beijing")
15. 组件使用的细节点：is="row"，标准标签，row组件名
    
    <pre>* <tr is="row"></tr>
    * template 标签不会显示在页面上
    * 只能在根组件定义data为一个对象，其他地方要定义为一个函数，返回一个对象。因为子组件可能会被调用很多次，而每个子组件的数据都是不一样的。独立数据存储，不产生数据相互影响的局面。
    * refs</pre>
16. 通过ref操作DOM：
    <pre><div ref="hekllo"></div>

    alert(this.$refs.hello)</pre>

17. 单项数据流概念：父组件可以向子组件传递数据，但是子组件最好不要直接修改父组件的数据。可以在子组件里定义一个数据，这个数据初始值等于父组件传过来的数据，相当于克隆一个副本。

18. 参数验证：

    <pre>type:String,
        required: false,
        default: "000",
        validataor: function(value){
            return (value.length > 5)
        }</pre>
19. 非props特性，可以传值到子组件的最外层的属性里。
20. 给组件定义原生的事件：@click.native="clickHandler"

21. 非父子组件间传值——（bus/总线机制/发布订阅模式/观察者模式)

    总线机制是在vue的作用域里定义一个全局的bus方法，然后给这个方法一个$emit事件。在其他组件里使用bus事件的时候，在mounted钩子函数里调用即可：

    <pre>Vue.prototype.bus = new Vue();
    Vue.component("child", {
        data: function(){
            return {
                _content: this.content
            }
        },
        props: ["content"],
        template: "<div> @click="handleClick">{{_content}}</div>",
        methods: {
            handleClick: function(){
                this.bus.$emit("change", this._content)
            }
        },
        mounted: function(){
            var _this = this;
            this.bus.$on("change", function(msg){
                _this._content = msg;
            })
        }
    })</pre>

22. Vue中的插槽(slot)

    * <slot></slot>
    * 默认内容： <slot>默认内容</slot>,父组件不穿的内容时
    * 具名插槽： <div slot="header"></div>,<slot name="header"></slot>
    * 作用域插槽： 子组件要怎么渲染数据不管，从父组件来。
    
        <pre>子组件：
            <slot v-for="item of list" :item="item"></slot>
            父组件：
            <child>
                <template slot-scope="props">
                    <li>{{props.item}}</li>
                </template>
            </child>
        </pre>

23. 动态组件： <component :is="type"></component>,意思是，这个动态组件会根据is的值的不同，加载不同的组件。data.type="child-one"

24. v-once指令: 只执行一次，就放进内存里。

    Vue.component("child-one", {
        template: "<div v-once>child-one</div>"
    })

25. 路由是什么？路由就是根据网址的不同，返回不同的内容给用户。我们通过JS感知到URL的变化后，用JS动态的把当前页面的内容清空掉，再把下一个页面的内容挂载到页面上。所以路由是由前端来做。好处：不去重新加载内容，而是通过就JS动态的将页面的内容挂载到页面上来，页面切换快。节约HTTP请求的资源，缺点是首屏事件慢，SEO慢。
