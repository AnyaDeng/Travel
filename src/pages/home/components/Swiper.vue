<template>
  <div class="swaper">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide v-for="item of loopList" v-bind:key="item.id"><img class="swaper-img" :src="item.imageUrl" alt="item.imageURL"></swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>

    </swiper>
  </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  data: function () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      loopList: [{
        id: '0001',
        imageUrl: 'https://imgs.qunarzz.com/vs_ceph_vs_tts/358d8cb9-bc47-4377-8132-f67053b35203.jpg_r_390x260x90_a5bf474b.jpg'
      },
      {
        id: '0002',
        imageUrl: 'http://img1.qunarzz.com/sight/p71/201211/04/2b4b10de0239a1c893835fbb.jpg_710x360_f66ebbfd.jpg'
      },
      {
        id: '0003',
        imageUrl: 'https://i.keaitupian.net/up/07/eb/47/5b01704916f5487230d9d1d56c47eb07.jpg'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .swaper >>> .swiper-pagination-bullet-active
    background #eaeaea
  .swaper
    overflow hidden
    width 100%
    height 5.6rem
    padding-bottom 32%
    .swaper-img
      width 100%
      height 5.6rem
</style>
