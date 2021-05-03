<template>
  <tabbar v-show="isTabbarShow"></tabbar>
  <section>
    <router-view/>
  </section>
</template>

<script>
import tabbar from '@/components/Tabbar.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  components: {
    tabbar
  },
  setup () {
    const store = useStore()
    return {
      isTabbarShow: computed(() => store.state.TabbarModule.isTabbarShow)
    }
  }
}
</script>

<style>
  li{
    list-style: none;
  }
  *{
    margin:0;
    padding: 0;
    touch-action: manipulation
  }
  html,body{
    height: 100%;
  }
  a{
    text-decoration: none;
  }
  section{
    padding-bottom: 50px;
  }
</style>
