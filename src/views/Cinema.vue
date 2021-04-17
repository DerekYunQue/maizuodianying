<template>
  <div>
    <van-nav-bar title="影院" left-arrow @click-left="onClickLeft">
      <template #left>
        {{ $store.state.cityName }}<van-icon name="arrow-down" size="18" color="#7A7A7B" />
      </template>
      <template #right>
        <van-icon name="search" size="23" color="#7A7A7B" />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{height:height}">
      <ul>
        <li v-for="data in cinemalist" :key="data.cinemaId">
          <div>{{data.name}}</div>
          <div class="address">{{data.address}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from '@/util/http'
import BetterScroll from 'better-scroll'
import Vue from 'vue'
import { NavBar, Icon } from 'vant'
Vue.use(NavBar).use(Icon)

export default {
  data () {
    return {
      cinemalist: [],
      height: 0
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push('/city')
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 100 + 'px'
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=1353571`,
      headers: {
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      this.cinemalist = res.data.data.cinemas

      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    })
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
