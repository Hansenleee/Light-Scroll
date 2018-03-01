import VueRouter from 'vue-router'
import routes from './routes/index'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
