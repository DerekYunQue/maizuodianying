import { createRouter, createWebHashHistory } from 'vue-router'
import Film from '../views/Film.vue'
import Cinema from '../views/Cinema.vue'
import Search from '../views/Search.vue'
import City from '../views/City.vue'
// import Center from '../views/Center.vue'
import Detail from '../views/Detail.vue'
import Nowplaying from '../views/film/Nowplaying.vue'
import Comingsoon from '../views/film/Comingsoon.vue'

const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: 'nowplaying',
        component: Nowplaying
      },
      {
        path: 'comingsoon',
        component: Comingsoon
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/center',
    component: () => import(/* webpackChunkName: "kerwingroup" */ '../views/Center.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "kerwingroup" */ '../views/Login.vue')
  },
  {
    path: '/detail/:myid', // 动态路由
    component: Detail,
    name: 'kerwinDetail'
  },
  {
    path: '/:pathMatch(.*)*', // 通配符
    redirect: '/film'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  const auth = ['/center', '/order', '/money', '/card']

  if (auth.includes(to.fullPath)) {
    // console.log('验证token')
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
