import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityId: '310100',
    cityName: '上海',
    isTabbarShow: true
  },
  mutations: {
    changeCityName (state, name) {
      state.cityName = name
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    hideTabbar (state) {
      state.isTabbarShow = false
    },
    showTabbar (state) {
      state.isTabbarShow = true
    }
  },
  actions: {
  },
  modules: {
  }
})
