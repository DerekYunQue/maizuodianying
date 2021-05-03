<template>
  <ul>
    <router-link to='/film/nowplaying' custom v-slot='{ navigate, isActive}'>
      <li @click="navigate" :class="isActive ? 'active' : 'inactive' ">正在热映</li>
    </router-link>
    <router-link to='/film/comingsoon' custom v-slot='{ navigate, isActive}'>
      <li @click="navigate" :class="isActive ? 'active' : 'inactive' ">即将上映</li>
    </router-link>
  </ul>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  ul {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    li {
      flex: 1;
    }
  }
  .active {
    color :red;
    border-bottom: 3px solid red;
  }
</style>
