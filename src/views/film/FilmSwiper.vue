<template>
  <div>
    <swiper
      :slides-per-view="1"
    >
      <swiper-slide>
        <img src="https://static.maizuo.com/v5/upload/189bcf606b4bf49ad5de201a2ea5024d.jpg?x-oss-process=image/quality,Q_70">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
  }
</style>
