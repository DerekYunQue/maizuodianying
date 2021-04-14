<template>
    <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad" :immediate-check='false'>
        <van-cell v-for="data in datalist" :key='data.filmId' @click = 'handleClick(data.filmId)'>
            <img :src="data.poster">
            <h3>{{data.name}}</h3>
            <p v-show = 'data.grade'>观众评分：{{data.grade}}</p>
            <p>主演：{{data.actors | actorFilter}}</p>
            <p>{{data.nation}} | {{data.runtime}}分钟</p>
        </van-cell>
    </van-list>
</template>

<script>
import http from '@/util/http.js'
import Vue from 'vue'
import { List, Cell } from 'vant'
Vue.filter('actorFilter', (actors) => {
  if (actors === undefined) return '暂无主演'
  return actors.map(item => item.name).join(' ')
})
Vue.use(List).use(Cell)
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1, // 记录第几页数据
      total: 0
    }
  },
  mounted () {
    http({
      url: '/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=9109303',
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/detail/${id}`)
    },
    onLoad () {
      if (this.datalist.length === this.total) {
        this.finished = true
        return
      }
      this.current++
      http({
        url: `/gateway?cityId=310100&pageNum=${this.current}&pageSize=10&type=1&k=9109303`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .van-cell {
        overflow: hidden;
        padding: 10px;
        img {
            float: left;
            width: 100px;
        }
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
