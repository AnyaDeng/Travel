<template>
  <div>
    <div class="recommend-title">推荐列表</div>
    <ul>
      <li v-for="item of recommendList" :key="item.id">
        <div class="item border-bottom">
          <img class="item-img" :src="item.imgUrl" alt="">
          <div class="info">
            <p class="info-title">{{item.title}}</p>
            <p class="info-desc">{{item.des}}</p>
            <button class="info-button">查看详情</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  data () {
    return {
      recommendList: [{
        id: '001',
        imgUrl: 'https://imgs.qunarzz.com/sight/p0/1507/cc/19733fc0135062788140cbb48ae606a7.water.jpg_224x148_a5c76955.jpg',
        title: '北京野生动物园',
        des: '北京郊区的一座大型自然生态动物园'
      }, {
        id: '002',
        imgUrl: 'https://imgs.qunarzz.com/sight/p0/1507/cc/19733fc0135062788140cbb48ae606a7.water.jpg_224x148_a5c76955.jpg',
        title: '北京野生动物园',
        des: '北京郊区的一座大型自然生态动物园'
      }, {
        id: '003',
        imgUrl: 'https://imgs.qunarzz.com/sight/p0/1507/cc/19733fc0135062788140cbb48ae606a7.water.jpg_224x148_a5c76955.jpg',
        title: '北京野生动物园',
        des: '北京郊区的一座大型自然生态动物园'
      }, {
        id: '004',
        imgUrl: 'https://imgs.qunarzz.com/sight/p0/1507/cc/19733fc0135062788140cbb48ae606a7.water.jpg_224x148_a5c76955.jpg',
        title: '北京野生动物园',
        des: '北京郊区的一座大型自然生态动物园'
      }, {
        id: '005',
        imgUrl: 'https://imgs.qunarzz.com/sight/p0/1507/cc/19733fc0135062788140cbb48ae606a7.water.jpg_224x148_a5c76955.jpg',
        title: '北京野生动物园',
        des: '北京郊区的一座大型自然生态动物园'
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/varible.styl"
  .recommend-title
    margin-top .2rem
    line-height .8rem
    background-color #eee
    text-indent .2rem
  .item
    overflow hidden
    display flex
    height 1.9rem
    .item-img
      width 2.26rem
      height 1.48rem
      margin-top .2rem
      padding 0 .1rem
    .info
      overflow hidden
      flex 1
      padding .1rem
      min-width 0
      .info-title
        line-height .54rem
        font-size .32rem
        ellipsis()
      .info-desc
        line-height .44rem
        color #ccc
        ellipsis()
      .info-button
        line-height .44rem
        margin-top .16rem
        background #ff9300
        padding 0 .2rem
        border-radius .06rem
        color #ffffff
</style>
