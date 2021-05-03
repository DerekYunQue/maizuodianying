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
import { NavBar, Icon, List, Cell } from 'vant'
import { onMounted, reactive, toRefs, computed, nextTick } from 'vue'
import BetterScroll from 'better-scroll'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Cell.name]: Cell
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      height: 0
    })
    const onClickLeft = () => {
      store.commit('clearCinemaList')
      router.push('/city')
    }
    const onClickRight = () => {
      router.push('/cinema/search')
    }
    onMounted(() => {
      state.height = document.documentElement.clientHeight - 100 + 'px'
      if (store.state.CinemaModule.cinemaList.length === 0) {
        store.dispatch('getCinemaList').then(res => {
          nextTick(() => {
            new BetterScroll('.cinema', {
              scrollbar: {
                fade: true
              }
            })
          })
        })
      } else {
        nextTick(() => {
          new BetterScroll('.cinema', {
            scrollbar: {
              fade: true
            }
          })
        })
      }
    })
    return {
      ...toRefs(state),
      onClickLeft,
      onClickRight,
      cityName: computed(() => store.state.CityModule.cityName),
      cinemaList: computed(() => store.state.CinemaModule.cinemaList)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
