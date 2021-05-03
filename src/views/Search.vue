<template>
  <div>
    <van-search v-model="value" show-action placeholder="请输入搜索关键词" @cancel="onCancel"/>
    <van-list>
      <van-cell v-for="data in computedCinemaList" :key="data.cinemaId">
        <div>{{data.name}}</div>
        <div class="address">{{data.address}}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Search, List, Cell } from 'vant'
import { onMounted, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  components: {
    [Search.name]: Search,
    [List.name]: List,
    [Cell.name]: Cell
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      value: ''
    })
    const computedCinemaList = computed(() => {
      if (state.value === '') {
        return []
      } else {
        return store.state.CinemaModule.cinemaList.filter(item => item.name.toUpperCase().includes(state.value.toUpperCase()) || item.address.toUpperCase().includes(state.value.toUpperCase()))
      }
    })
    const onCancel = () => {
      router.replace('/cinema')
    }
    onMounted(() => {
      if (store.state.CinemaModule.cinemaList.length === 0) {
        store.dispatch('getCinemaList')
      }
    })
    return {
      ...toRefs(state),
      onCancel,
      computedCinemaList
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
