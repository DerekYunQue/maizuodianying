<template>
  <div>
    <ul>
      <router-link to="/film" active-class="active" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="isActive ? 'active' : 'inactive'">
          <i class="iconfont icon-training"></i>
          <span>电影</span>
        </li>
      </router-link>
      <router-link to="/cinema" active-class="active" custom v-slot='{ navigate, isActive }'>
        <li @click="navigate" :class="isActive ? 'active' : 'inactive'">
          <i class="iconfont icon-all"></i>
          <span>影院</span>
        </li>
      </router-link>
      <router-link to="/center" active-class="active" custom v-slot='{ navigate, isActive }'>
        <li @click="navigate" :class="isActive ? 'active' : 'inactive'">
          <i class="iconfont icon-account"></i>
          <span>我的</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  div{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 25px;
    text-align: center;
    background: white;
    z-index: 99;
    ul{
      display: flex;
      li{
        flex: 1;
        display: flex;
        flex-direction: column;
        i{
          font-size: 18px;
        }
        span{
          font-size: 12px;
        }
      }
    }
  }
  .active{
    color: red;
  }
  .inactive{
    color: black;
  }
</style>
