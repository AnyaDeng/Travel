<template>

  <!--启动页面-->
  <div class="container-startUp "
       style="height:100%; position: fixed; top:0;bottom: 0;left: 0;right: 0">
    <swiper :options="swiperOption" ref="mySwiper" style="height: 100%;">
      <!-- slides -->
      <swiper-slide class="relative" v-for="(item,index) in items" :key="item.id">
        <img :src="item.img" alt="" style="width: 100%;  background-size: contain; overflow: hidden">
        <div class="startTxt" :style="{'top': positionTop}">
          <p class="title">{{item.title}}</p>
          <p class="name" v-html="item.name">{{item.name}}</p>
        </div>
        <button class="begin" :style="{'bottom': positionBottom}" v-if="index == items.length - 1"
                @click="immediateExperience">
          <span>进入滨海国金所</span>
        </button>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination" :style="{'margin-bottom': marginBottom}">
      </div>
    </swiper>
  </div>


</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        pageConfig: {
          headerBg: this.headerColor.transparent,
          underHeader: true
        },
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            modifierClass: 'myOnly-pagination-',
            bulletActiveClass: 'my-bullet-active'
          }
        },
        positionTop: '4.645rem',
        positionBottom: '0.43rem',
        marginBottom: '0.57rem',
        counter: 0,
        items: [{
          title: '更正规',
          name: '中国人寿发起，腾讯参股。</br>中国人寿自己的金融科技助保平台',
          img: 'static/img/gengzhenggui.png'
        }, {
          title: '更安全',
          name: '专业全面的风控体系，保障产品安全。客户账户资金</br>与国金所，运营资金严格分离，保障资金安全。',
          img: 'static/img/genganquan.png'
        },
          {
            title: '更卓越',
            name: '发挥中国人寿稳健经营和腾讯科技创新的协同优势，</br>为您提供一站式多样化的财富管理服务。',
            img: 'static/img/gengzhuoyue.png'
          }]
      };
    },
    created() {
    },
    mounted() {
      this.sendMsgToParent();
      let _this = this;
      this.checkUserAgent(function () {
        _this.positionTop = '4.645rem';
        _this.positionBottom = '0.745rem';
        _this.marginBottom = '0.91rem';
        _this.beginFitX = true;
      }, function () {
        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;
        if (clientWidth / clientHeight === 320 / 480) { // iphone4
          _this.positionTop = '4rem';
          _this.positionBottom = '0.15rem';
          _this.marginBottom = '0.15rem';
        } else {
          _this.positionTop = '4.645rem';
          _this.positionBottom = '0.45rem';
          _this.marginBottom = '0.57rem';

        }
      }, function () {
        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;
        if (clientWidth / clientHeight > 360 / 640) {
          _this.positionTop = '4rem';
          _this.positionBottom = '0.15rem';
          _this.marginBottom = '0.15rem';

        } else {
          _this.positionTop = '4.645rem';
          _this.positionBottom = '0.45rem';
          _this.marginBottom = '0.57rem';
        }
      });
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      immediateExperience() {
        this.analysys.ma_btnClick('点击进入滨海国金所按钮');
        this.$router.push({
          path: '/unloginHomePage'
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../static/css/swiper.min.css"
  .container
    padding-bottom: 0
    height: 100%
    width: 100%
    position: relative
    background: #f7f7f9
    .container-startUp
      padding-bottom: 0
      width: 100%
      position: relative
      background: #ffffff
      .swiper-wrapper
        z-index: 11
      .myOnly-pagination-bullets
        left: 0
        bottom: 0
        width: 100%
        height: auto
        display: inline-block
        border-radius: 0.015rem
        background: none
        opacity: 1
        margin: 0

      .swiper-pagination-bullet
        width: 6px
        height: 6px
        display: inline-block
        border-radius: 3px
        background: #ECC584
        opacity: 0.5
        margin: 0 0.037rem
      .my-bullet-active
        opacity 1
        width: 28px
        height 6px
        background-color #ECC584
      .startTxt
        width: 100%
        display: flex
        display: -webkit-flex
        flex-direction: column
        justify-content: flex-start
        align-items: center
        -webkit-align-items: center
        position: absolute
        left: 50%
        transform: translate(-50%, 0)
        .title
          font-family: SourceHanSansCN-Medium;
          font-size: 0.23rem;
          color: #907033;
          letter-spacing: 0;
          text-align center
        @media screen and (-webkit-min-device-pixel-ratio: 0) {
          .title {
            background: -webkit-gradient(linear, left top, right top, from(#EDBE8A), to(#D1A474));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
        .name
          padding-top 0.095rem
          font-family: SourceHanSansCN-Normal;
          font-size: 0.12rem;
          line-height: 0.18rem
          color: #9DA4B6;
          letter-spacing: 0;
          text-align center
      .begin
        position: absolute
        left: 50%
        transform: translate(-50%, 0)
        width: 1.945rem
        height 0.44rem
        line-height 0.44rem
        text-align: center
        background: #ffffff
        border: 0.01rem solid #CC924F
        border-radius: 0.04rem
      .beginFitX
        margin-top 1.2rem
      span
        font-family SourceHanSansCN-Regular
        color: #CC924F
        font-size: 0.16rem


</style>
