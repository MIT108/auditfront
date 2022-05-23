/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import {
  IS_USER_AUTHENTICATED_GETTER,
  GET_USER_TOKEN_GETTER,
  AUTO_LOGIN_ACTION
} from '../store/storeConstants'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'pages-login',
    component: () => import('@/pages/auth/Login.vue'),
    meta: {
      layout: 'blank',
      auth: false
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/Dashboard.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/pages/account/AccountSettings.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/pages/role',
    name: 'role',
    component: () => import('@/pages/role/Index.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/pages/courier',
    name: 'courier',
    component: () => import('@/pages/courier/Index.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/pages/departement',
    name: 'Departement',
    component: () => import('@/pages/departement/Index.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/pages/User',
    name: 'user',
    component: () => import('@/pages/users/Index.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/pages/polytiqueSecuriter',
    name: 'polytiqueSecuriter',
    component: () => import('@/pages/polytiqueSecuriter/Index.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/pages/Document',
    name: 'Document',
    component: () => import('@/pages/document/Index.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/pages/Auditer',
    name: 'Auditer',
    component: () => import('@/pages/auditer/Index.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})


router.beforeEach((to, from, next) => {
  store.dispatch(`auth/${AUTO_LOGIN_ACTION}`)
  // if (to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]) {
  //   next('/')
  // }else if(!to.meta.auth && store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]){
  //   next('/dashboard')
  // }else{
  //   next()
  // }
  // if (to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]) {
  //   console.log("yess oh");
  //   next('/')
  // } else if(to.meta.auth && store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]){
  //   next('/dashboard')
  // }else{
  //   next()
  // }
  if (to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]) {
    next('/')
  } else {
    next()
  }
  // console.log('====================================');
  // console.log(store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]);
  // console.log(to.meta.auth);
  // console.log('====================================');
  // next()


})

export default router
