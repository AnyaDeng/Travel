<template>
  <swiper>
    <swiper-slide v-for="(page, index) of pages" :key="index">
      <div class="icons">
        <div class="icon" v-for="item of page" :key="item.id">
          <div class="icon-img">
            <img class="icon-img-content" :src='item.imgUrl' :alt='item.alt' />
          </div>
          <p class="icon-des" >{{item.des}}</p>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  name: 'HomeIcons',
  computed: {
    pages: function () {
      const pages = []
      this.iconList.forEach((item, index) => {
        let page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  data () {
    return {
      iconList: [{
        id: '001',
        imgUrl: 'https://imgs.qunarzz.com/sight/p0/1708/2b/2b3b94de99c0a425a3.img.jpg_224x148_ab7a0138.jpg',
        alt: '[北京]八达岭长城手机电子导游【含19个讲解点、景点故事】不含门票',
        des: '热门景点'
      }, {
        id: '002',
        imgUrl: 'https://imgs.qunarzz.com/p/tts6/2004/c7/e0c905c813de8202.jpg_224x148_f94ffe45.jpg',
        alt: '[北京]慕田峪长城直通车【品牌慕巴士】休息区+观景平台+免费迎宾茶',
        des: '热门景点'
      }, {
        id: '003',
        imgUrl: 'https://imgs.qunarzz.com/p/tts0/1905/1b/acbaa67ca03c8502.png_224x148_18a86dc5.png',
        alt: '[北京]【可选五环上门接】北京故宫+八达岭长城1日游|故宫深度半日游',
        des: '热门景点'
      }, {
        id: '004',
        imgUrl: 'https://imgs.qunarzz.com/p/tts3/1910/35/ee1f2ce0ac76402.jpg_224x148_b693c438.jpg',
        alt: '[北京]【精选·颐和园一日游】天坛公园+圆明园+颐和园（可独立成团）',
        des: '热门景点'
      }, {
        id: '005',
        imgUrl: 'https://imgs.qunarzz.com/p/tts3/2001/32/2fb8cefb819e6402.jpg_224x148_96145a72.jpg',
        alt: '[北京]慕田峪长城直通车+门票一日游【赞巴士®休息区+热水+摆渡车】',
        des: '热门景点'
      }, {
        id: '006',
        imgUrl: 'https://imgs.qunarzz.com/p/tts3/2001/32/2fb8cefb819e6402.jpg_224x148_96145a72.jpg',
        alt: '',
        des: '热门景点'
      }, {
        id: '007',
        imgUrl: 'https://imgs.qunarzz.com/p/tts3/2001/32/2fb8cefb819e6402.jpg_224x148_96145a72.jpg',
        alt: '',
        des: '热门景点'
      }, {
        id: '008',
        imgUrl: 'https://imgs.qunarzz.com/p/tts3/2001/32/2fb8cefb819e6402.jpg_224x148_96145a72.jpg',
        alt: '',
        des: '热门景点'
      }, {
        id: '002',
        imgUrl: 'https://imgs.qunarzz.com/p/tts6/2004/c7/e0c905c813de8202.jpg_224x148_f94ffe45.jpg',
        alt: '[北京]慕田峪长城直通车【品牌慕巴士】休息区+观景平台+免费迎宾茶',
        des: '热门景点'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varible.styl"
  @import "~styles/Mixins.styl"
  .icons
    overflow hidden
    width 100%
    height 0
    padding-bottom 50%
    .icon
      position relative
      overflow hidden
      float left
      width 25%
      padding-bottom 25%
      .icon-img
        overflow hidden
        position absolute
        top 10%
        left 10%
        right 10%
        bottom .44rem
        border-radius .2rem
        .icon-img-content
          height 100%
      .icon-des
        position absolute
        bottom .1rem
        left 0
        right 0
        text-align center
        color $darkTextColor
        ellipsis()
</style>
