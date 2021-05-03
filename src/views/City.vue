<template>
  <van-index-bar :index-list='computedCityList' @select="handleSelect">
    <div v-for="data in cityList" :key="data.type">
      <van-index-anchor :index="data.type" />
      <van-cell :title="item.name" v-for="(item,index) in data.list" :key="index" @click="handleChangePage(item.name, item.cityId)"/>
    </div>
  </van-index-bar>
</template>

<script>
import http from '../util/http'
import { IndexBar, IndexAnchor, Cell, Toast } from 'vant'
import { onMounted, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  components: {
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    [Toast.name]: Toast
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      cityList: []
    })
    const computedCityList = computed(() => state.cityList.map(item => item.type))
    const handleCityData = (cities) => {
      const letterArr = []
      const newCities = []
      for (let code = 65; code < 91; code++) {
        letterArr.push(String.fromCharCode(code))
      }
      letterArr.forEach((letter) => {
        const list = cities.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        if (list.length > 0) {
          newCities.push({
            type: letter,
            list: list
          })
        }
      })
      return newCities
    }
    const handleSelect = (index) => {
      Toast(index)
    }
    const handleChangePage = (name, cityId) => {
      store.commit('changeCityName', name)
      store.commit('changeCityId', cityId)
      router.back()
    }
    onMounted(() => {
      http({
        url: '/gateway?k=4794006',
        headers: {
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then(res => {
      /* console.log(res.data.data.cities) */
        state.cityList = handleCityData(res.data.data.cities)
      })
    })
    return {
      ...toRefs(state),
      handleCityData,
      computedCityList,
      handleSelect,
      handleChangePage
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
