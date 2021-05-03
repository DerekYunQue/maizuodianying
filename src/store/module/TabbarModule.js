export default {
  state: {
    isTabbarShow: true
  },
  mutations: {
    hideTabbar (state) {
      state.isTabbarShow = false
    },
    showTabbar (state) {
      state.isTabbarShow = true
    }
  }

}
