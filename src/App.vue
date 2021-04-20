<template>
  <div>
    <tabbar v-show="isTabbarShow"></tabbar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from './components/Tabbar'
import { mapState } from 'vuex'

export default ({
  components: {
    tabbar
  },
  computed: {
    ...mapState('TabbarModule', ['isTabbarShow'])
  }
})
</script>

<style>
  li{
    list-style: none;
  }
  *{
    margin:0;
    padding: 0;
  }

  html,body{
    height: 100%;
  }

  section{
    padding-bottom: 50px;
  }
</style>
