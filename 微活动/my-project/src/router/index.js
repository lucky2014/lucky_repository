import Vue from 'vue'
import Router from 'vue-router'
import Scratch from '../pages/scratch/index.vue'
import Question from '../pages/question/index.vue'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/scratch',
      name: '刮刮卡',
      component: Scratch
    },
    {
      path: '/',
      name: '问卷',
      component: Question,
    }
  ]
});
router.beforeEach((to, from, next) => {
  next();
  // if (to.path === '/login') {
  //   next()
  // } else {
  //   if (!store.state.storeInfo.user) {
  //     next({ path: '/login' })
  //   } else {
  //     next()
  //   }
  //   if (!store.state.user && (from.path === '/my') && (to.path === '/ToolCompute')) {
  //     next({ path: '/login' })
  //   }
  // }
})
export default router;