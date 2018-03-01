export default [
  {
    path: '/example',
    component: resolve => require(['views/example/index.vue'], resolve),
    children: [
      {
        path: 'list',
        name: 'list',
        component: resolve => require(['views/example/list.vue'], resolve),
      },
    ],
  },
]
