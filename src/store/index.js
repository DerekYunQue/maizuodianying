import { createStore } from 'vuex'
import CityModule from './module/CityModule'
import CinemaModule from './module/CinemaModule'
import TabbarModule from './module/TabbarModule'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    CityModule,
    CinemaModule,
    TabbarModule
  }
})
