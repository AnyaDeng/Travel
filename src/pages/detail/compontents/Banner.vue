<template>
  <div>
    <div class="banner" @click="handleBannerClick">
      <img class="banner-img" src="https://imgs.qunarzz.com/sight/p0/1507/cc/19733fc0135062788140cbb48ae606a7.water.jpg_224x148_a5c76955.jpg" alt="">
      <div class="banner-info">
        <div class="banner-title">北京野生动物园</div>
        <div class="banner-number">
          <span class="iconfont icon-arrow">&#xe65f;</span>
          39
        </div>
      </div>
    </div>
    <common-gallary
      :imgs="imgs"
      v-show="isShowGallay"
      @closeGrallay="handleCloseGrallay"
    ></common-gallary>
  </div>
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
export default {
  name: 'DetailBanner',
  data () {
    return {
      isShowGallay: false,
      imgs: ['http://img1.qunarzz.com/sight/p0/201404/23/04b92c99462687fa1ba45c1b5ba4ad77.jpg_800x800_70debc93.jpg', 'http://img1.qunarzz.com/sight/p0/1709/76/7691528bc7d7ad3ca3.img.png_800x800_9ef05ee7.png']
    }
  },
  methods: {
    handleBannerClick () {
      this.isShowGallay = true
    },
    handleCloseGrallay () {
      this.isShowGallay = false
    }
  },
  components: {
    CommonGallary
  }
}
</script>

<style lang="stylus" scoped>
.banner
  overflow hidden
  position relative
  height 0
  padding-bottom 55%
  .banner-img
    width 100%
  .banner-info
    position absolute
    display flex
    flex 1
    line-height .6rem
    left 0
    right 0
    bottom 0
    color white
    background-image linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))
    .banner-title
      flex 1
      font-size .32rem
      padding 0 .2rem
    .banner-number
      height .32rem
      line-height .32rem
      padding 0 .2rem
      border-radius .2rem
      margin-top .14rem
      margin-right .14rem
      background rgba(0, 0, 0, 0.8)
</style>
