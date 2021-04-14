<template>
    <div>
        <film-swiper>
          <div class='swiper-slide'>
            <img src="https://static.maizuo.com/v5/upload/189bcf606b4bf49ad5de201a2ea5024d.jpg?x-oss-process=image/quality,Q_70">
          </div>
        </film-swiper>
        <film-header style = 'position: sticky; top: 0px; background: white;z-index:99'></film-header>
        <router-view></router-view>
    </div>
</template>

<script>
import filmHeader from './film/FilmHeader'
import filmSwiper from './film/FilmSwiper'
export default {
  components: {
    filmHeader,
    filmSwiper
  }
}
</script>

<style scoped lang='scss'>
  .swiper-slide {
    img {
      width: 100%
    }
  }
</style>
