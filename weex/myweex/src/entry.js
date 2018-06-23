/*global Vue*/

/* weex initialized here, please do not move this line */
const router = require('./router');
const App = require('@/index.vue');
/* eslint-disable no-new */
new Vue(Vue.util.extend({el: '#root', router}, App));
router.push('/');



/*
	import foo from './src/component/routervue.vue'
	import router from './src/component/router.js'

	// 给根组件一个ID
	foo.el = "#root"

	// 给根组件设置路由
	foo.routrer = router

	export default new Vue(foo);

	// 制定一个路由入口

	router.push('index')
*/