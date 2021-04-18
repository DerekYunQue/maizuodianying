<template>
  <div>
    <van-nav-bar title="影院" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        {{ $store.state.cityName }}<van-icon name="arrow-down" size="18" color="#7A7A7B" />
      </template>
      <template #right>
        <van-icon name="search" size="23" color="#7A7A7B" />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{height:height}">
      <van-list>
        <van-cell v-for="data in $store.state.cinemaList" :key="data.cinemaId">
          <div>{{data.name}}</div>
          <div class="address">{{data.address}}</div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BetterScroll from 'better-scroll'
import { NavBar, Icon, List, Cell } from 'vant'
Vue.use(NavBar).use(Icon).use(List).use(Cell)

export default {
  data () {
    return {
      height: 0
    }
  },
  methods: {
    onClickLeft () {
      /* 清空数组 */
      this.$store.commit('clearCinemaList')
      this.$router.push('/city')
    },
    onClickRight () {
      this.$router.push('/cinema/search')
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 100 + 'px'
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaList', this.$store.state.cityId).then(res => {
        this.$nextTick(() => {
          new BetterScroll('.cinema', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  li{
    padding: 5px;
    .address{
      font-size: 12px;
      color: #797d82;
    }
  }
  .cinema {
    overflow: hidden;
    position: relative;
  }
</style>
