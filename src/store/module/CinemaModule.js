import http from '@/util/http'
export default {
  state: {
    cinemaList: []
  },
  mutations: {
    setCinemaList (state, data) {
      state.cinemaList = data
    },
    clearCinemaList (state) {
      state.cinemaList = []
    }
  },
  actions: {
    getCinemaList (store) {
      return http({
        url: `/gateway?cityId=${store.rootState.CityModule.cityId}&ticketFlag=1&k=1353571`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('setCinemaList', res.data.data.cinemas)
      })
    }
  }
}
