<template>
    <div class="wrapper">
      <swiper :options="swiperOptions">
      <swiper-slide v-for="item of swiperList">
        <img class="swiper-img" :src="item.imgUrl" :alt="item.alt">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  // ES5写法
  // data: function () {
  //   return {
  //     swiperOptions: {}
  //   }
  // }
  // ES6写法
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        loop: true
      },
      swiperList: [{
        id: '001',
        alt: '圆明园',
        imgUrl: 'https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20201/8216fd250c35366befc35f6353f934b9.jpg_890x330_9062b3ba.jpg'
      }, {
        id: '002',
        alt: '颐和园',
        imgUrl: 'https://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20201/86ca4dc2777b997607e97eb8471dcafd.jpg_890x330_0eee7728.jpg'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    overflow hidden
    width 100%
    height 0
    padding-bottom 31.25%
    background-color #cacaca
    .swiper-img
      width 100%
</style>
