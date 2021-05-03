<template>
  <div v-if='filminfo'>
    <detail-header v-top :title='filminfo.name'></detail-header>
    <div :style="{backgroundImage:'url('+filminfo.poster+')'}" style="height:200px;background-size:cover;background-position:center"></div>
    <h3>
      {{filminfo.name}}-{{filminfo.filmType.name}}
    </h3>
    <div>
      {{filminfo.category}}
    </div>
    <div>
      {{computedDate}}上映
    </div>
    <div>
      {{filminfo.nation}} | {{filminfo.runtime}}分钟
    </div>
    <div :class=" isShow ? '' : 'synopsis' ">
      {{filminfo.synopsis}}
    </div>
    <div style="text-align:center">
      <i class="iconfont" :class=" isShow ? 'icon-less' : 'icon-moreunfold' " @click="isShow = !isShow"></i>
    </div>

    <h3>演职人员</h3>
    <swiper
      :slides-per-view="4"
      :space-between="30"
    >
      <swiper-slide v-for="(data,index) in filminfo.actors" :key="index">
        <img :src="data.avatarAddress" style="width:100%">
        <div style="text-align:center">
          <div>{{data.name}}</div>
          <div>{{data.role}}</div>
        </div>
      </swiper-slide>
    </swiper>

    <h3>剧照</h3>
    <swiper
      :slides-per-view="3"
      :space-between="30"
    >
      <swiper-slide v-for="(data,index) in filminfo.photos" :key="index">
        <div :style="{backgroundImage:'url('+data+')'}" style="height:100px;background-size:cover;background-position:center" @click="handleClick(index)"></div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import http from '@/util/http'
import moment from 'moment'
import detailHeader from './detail/DetailHeader'
import { onMounted, reactive, toRefs, computed, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.scss'
import { ImagePreview } from 'vant'

export default {
  components: {
    detailHeader,
    Swiper,
    SwiperSlide
  },
  directives: {
    top: {
      mounted (el) {
        el.style.display = 'none'
        window.onscroll = () => {
          if (document.body.scrollTop || document.documentElement.scrollTop > 50) {
            el.style.display = 'block'
          } else {
            el.style.display = 'none'
          }
        }
      }
    }
  },
  setup () {
    const store = useStore()
    const state = reactive({
      filminfo: null,
      isShow: false
    })
    const computedDate = computed(() => {
      return moment(state.filminfo.premiereAt * 1000).format('YYYY-MM-DD')
    })
    const handleClick = (index) => {
      ImagePreview({
        images: state.filminfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left',
        loop: false
      })
    }
    onMounted(() => {
      // console.log(history.state.current.substring(8))
      store.commit('hideTabbar')
      http({
        url: `/gateway?filmId=${history.state.current.substring(8)}&k=961793`,
        headers: {
          'X-Host': 'mall.film-ticket.film.info'
        }
      }).then(res => {
      /* console.log(res.data.data.film) */
        state.filminfo = res.data.data.film
      })
    })
    onUnmounted(() => {
      store.commit('showTabbar')
    })
    return {
      ...toRefs(state),
      computedDate,
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
  .synopsis {
    height: 50px;
    overflow: hidden;
  }
</style>
