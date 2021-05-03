<template>
  <van-list
    v-model:loading="state.loading"
    :finished="state.finished"
    finished-text="我是有底线的"
    @load="onLoad"
    :immediate-check='false'
  >
    <van-cell v-for="data in state.datalist" :key="data.filmId" @click = 'handleClick(data.filmId)'>
      <img :src="data.poster">
      <h3>{{data.name}}</h3>
      <p v-show = 'data.grade'>观众评分：{{data.grade}}</p>
      <p>主演：{{data.actors === undefined ? '暂无主演' : data.actors.map(item => item.name).join(' ')}}</p>
      <p>{{data.nation}} | {{data.runtime}}分钟</p>
    </van-cell>
  </van-list>
</template>

<script>
import http from '@/util/http.js'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { List, Cell } from 'vant'

export default {
  components: {
    [List.name]: List,
    [Cell.name]: Cell
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      datalist: [],
      loading: false,
      finished: false,
      current: 1, // 记录第几页数据
      total: 0
    })
    // const computedActors = computed(() => {
    //   return state.datalist.actors === undefined ? '暂无主演' : state.datalist.actors.map(item => item.name).join(' ')
    // })
    const handleClick = (id) => {
      router.push(`/detail/${id}`)
    }
    const onLoad = () => {
      if (state.datalist.length === state.total && state.datalist.length !== 0) {
        state.finished = true
      } else {
        state.current++
        http({
          url: `/gateway?cityId=${store.state.CityModule.cityId}&pageNum=${state.current}&pageSize=10&type=1&k=9109303`,
          headers: {
            'X-Host': 'mall.film-ticket.film.list'
          }
        }).then(res => {
          state.datalist = [...state.datalist, ...res.data.data.films]
          state.loading = false
        })
      }
    }
    onMounted(() => {
      http({
        url: `/gateway?cityId=${store.state.CityModule.cityId}&pageNum=1&pageSize=10&type=1&k=9109303`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        state.datalist = res.data.data.films
        state.total = res.data.data.total
      })
    })
    return {
      state,
      handleClick,
      onLoad
      // computedActors
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
      width: 80px;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
