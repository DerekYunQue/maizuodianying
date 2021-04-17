<template>
    <div>
        <van-index-bar :index-list='computedCityList' @select="handleSelect">
            <div v-for="data in citylist" :key="data.type">
                <van-index-anchor :index="data.type" />
                <van-cell :title="item.name" v-for="(item,index) in data.list" :key="index" @click="handleChangePage(item.name, item.cityId)"/>
            </div>
        </van-index-bar>
    </div>
</template>

<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Cell, Toast } from 'vant'
import http from '../util/http'

Vue.use(IndexBar).use(IndexAnchor).use(Cell)
export default {
  data () {
    return {
      citylist: []
    }
  },
  computed: {
    computedCityList () {
      return this.citylist.map(item => item.type)
    }
  },
  mounted () {
    http({
      url: '/gateway?k=4794006',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      /* console.log(res.data.data.cities) */
      this.citylist = this.handleCityData(res.data.data.cities)
    })
  },
  methods: {
    handleCityData (cities) {
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
    },
    handleSelect (index) {
      Toast(index)
    },
    handleChangePage (name, cityId) {
      this.$store.commit('changeCityName', name)
      this.$store.commit('changeCityId', cityId)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
