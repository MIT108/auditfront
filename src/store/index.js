/* eslint-disable */
import Vuex from 'vuex'
import auth from './module/auth/index'
import users from './module/users/index'
import courier from './module/courier/index'
import role from './module/role/index'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    users,
    role,
    courier
  },
})
