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
        {{filminfo.premiereAt | dataFilter}}上映
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
      <detail-swiper :perslide="4" swiperclass="swiper-actors">
        <div class="swiper-slide" v-for="(data,index) in filminfo.actors" :key="index">
          <img :src="data.avatarAddress">
          <div style="text-align:center">
            <div>{{data.name}}</div>
            <div>{{data.role}}</div>
          </div>
        </div>
      </detail-swiper>

      <h3>剧照</h3>
      <detail-swiper :perslide="2" swiperclass="swiper-photos">
        <div class="swiper-slide" v-for="(data,index) in filminfo.photos" :key="index">
          <div :style="{backgroundImage:'url('+data+')'}" style="height:100px;background-size:cover;background-position:center" @click="handleClick(index)"></div>
        </div>
      </detail-swiper>
    </div>
</template>

<script>
import Vue from 'vue'
import http from '@/util/http'
import moment from 'moment'
import detailSwiper from './detail/DetailSwiper'
import detailHeader from './detail/DetailHeader'
import { ImagePreview } from 'vant'

Vue.filter('dataFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})

Vue.directive('top', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = () => {
      if (document.body.scrollTop || document.documentElement.scrollTop > 50) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})

export default {
  data () {
    return {
      filminfo: null,
      isShow: false
    }
  },
  components: {
    detailSwiper,
    detailHeader
  },
  mounted () {
    /* console.log(this.$router.history.current.params.myid) */
    http({
      url: `/gateway?filmId=${this.$router.history.current.params.myid}&k=961793`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      /* console.log(res.data.data.film) */
      this.filminfo = res.data.data.film
    })
  },
  methods: {
    handleClick (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: 'top-left',
        loop: false
      })
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
