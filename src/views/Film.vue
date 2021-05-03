<template>
  <div>
    <filmSwiper></filmSwiper>
    <filmHeader></filmHeader>
    <router-view/>
  </div>
</template>

<script>
import filmSwiper from './film/FilmSwiper'
import filmHeader from './film/FilmHeader'
export default {
  components: { filmSwiper, filmHeader },
  setup () {
    return {}
  }
}
</script>
