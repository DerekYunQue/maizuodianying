<template>
  <div>
    <tabbar v-show="$store.state.isTabbarShow"></tabbar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from './components/Tabbar'

export default ({
  components: {
    tabbar
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
