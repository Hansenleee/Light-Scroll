/**
 * @file Routes
 */
import example from './example'

export default [
  ...example,
  {
    path: '/404',
    name: '404',
    component: resolve => require(['../../views/index/404.vue'], resolve),
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  // },
]

