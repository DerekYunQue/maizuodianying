<template>
  <div class="cinema" :style="{height:height}">
    <ul>
      <li v-for="data in cinemalist" :key="data.cinemaId">
        <div>{{data.name}}</div>
        <div class="address">{{data.address}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from '@/util/http'
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      cinemalist: [],
      height: 0
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 50 + 'px'
    http({
      url: '/gateway?cityId=310100&ticketFlag=1&k=1353571',
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
