<template>
  <div>
    <van-nav-bar title="影院" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <template #left>
        {{ cityName }}<van-icon name="arrow-down" size="18" color="#7A7A7B" />
      </template>
      <template #right>
        <van-icon name="search" size="23" color="#7A7A7B" />
      </template>
    </van-nav-bar>
    <div class="cinema" :style="{height:height}">
      <van-list>
        <van-cell v-for="data in cinemaList" :key="data.cinemaId">
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
import { mapActions, mapMutations, mapState } from 'vuex'
Vue.use(NavBar).use(Icon).use(List).use(Cell)

export default {
  data () {
    return {
      height: 0
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList']),
    ...mapState('CityModule', ['cityId', 'cityName'])
  },
  methods: {
    ...mapActions('CinemaModule', ['getCinemaList']),
    ...mapMutations('CinemaModule', ['clearCinemaList']),
    onClickLeft () {
      /* 清空数组 */
      this.clearCinemaList()
      this.$router.push('/city')
    },
    onClickRight () {
      this.$router.push('/cinema/search')
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 100 + 'px'
    if (this.cinemaList.length === 0) {
      this.getCinemaList(this.cityId).then(res => {
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
