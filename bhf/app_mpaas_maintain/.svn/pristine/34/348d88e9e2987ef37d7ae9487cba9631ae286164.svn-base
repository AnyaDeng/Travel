<template>
  <div id="unloginHomePage" class="unloginHomePage">
    <div class="container-fluid">
      <div class="productBanner">
        <!--banner-->
        <div class="swiper-container-box">

          <swiper :options="swiperOption" style="width:100%;" :style="{'height': bannerHeight}">
            <!-- slides -->
            <swiper-slide style="height: 100%" v-for="item in banner_cnt" :key="item.title" :class="item.bgClass" :style="{'padding-top': paddingTop}">
              <div class="logoBox" :style="{'padding-top': paddingTop}" @click="showVconsole()">
                <span class="chinaLifeLogo"></span>
                <span class="delimiter"></span>
                <span class="tencentLogo"></span>
              </div>
              <div class="carousel-inner">
                <div class="bhfaeLogo"></div>
                <div>{{item.title}}</div>
                <div v-html="item.Subtitle">{{item.Subtitle}}</div>
              </div>
            </swiper-slide>

          </swiper>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination">
          </div>
          <div class="bannerArc"></div>
        </div>
      </div>
      <!--产品列表-->
      <div class="flex-y-top-center" style="height: 100%" @click="productToLogin()">
        <img :src="this.recommendImgUrl" alt="" :onerror="defaultImg" style="width: 100%;background-size: contain">
        <div class="openWealth" :style="{'bottom': positionBottom}" @click="bannerToLogin()">
          <span class="color_fff">立刻开启财富</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          observer: true,
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'swiper-container-bullet',
            bulletActiveClass: 'swiper-container-bullet-active'
          }
        },
        banner_cnt: [{
          bgClass: 'bannerZhuoyue',
          title: '更卓越',
          Subtitle: '发挥中国人寿稳健经营和腾讯科<br/>技创新的协同优势，为您提供一<br/>站式多样化的财富管理服务。'
        }, {
          bgClass: 'bannerAnquan',
          title: '更安全',
          Subtitle: '专业全面的风控体系，保障<br/>产品安全。客户账户资金与<br/>国金所运营资金严格分离，<br/>保障资金安全。'
        }, {
          bgClass: 'bannerZhenggui',
          title: '更正规',
          Subtitle: '中国人寿发起，腾讯参股。<br/>中国人寿自己的金融科技<br/>助保平台。'
        }],
        pageConfig: {
          headerHide: true,
          headerBg: this.headerColor.transparent,
          navigation: true,
          underHeader: true
        },
//        recommendImg: '',
        recommendImgUrl: '',
        apiName: {
          queryContentItemList: this.apiType().queryContentItemList
        },
        defaultImg: '',
        imgUrl: '',
        paddingTop: '0.2rem',
        bannerHeight: '2.73rem',
        positionBottom: '0.6rem'
      };
    },
    activated() {
      let _this = this;
      if (this.imgUrl === '') {
        _this.acquireScreen();
      } else {
        _this.keepAliveTimeStamp(_this.$route.name, function () {
          _this.acquireScreen();
        });
      }
      this.sendMsgToParent();
    },
    mounted() {
      this.reSizeBannerHeight();
//      this.acquireScreen();
    },
    methods: {
      reSizeBannerHeight() {
        let _this = this;
        this.checkUserAgent(function () { // iPhone X
          _this.paddingTop = '0.44rem';
          _this.bannerHeight = '2.97rem';
          _this.positionBottom= '0.99rem';
        }, function () { // iPhone
          _this.paddingTop = '0.2rem';
          _this.bannerHeight = '2.73rem';
          _this.positionBottom= '0.6rem';
        }, function () { // Android
          _this.paddingTop = '0.2rem';
          _this.bannerHeight = '2.73rem';
          _this.positionBottom= '0.6rem';
        });
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      islargeScreen() {
        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;
        return (clientWidth / clientHeight === 375 / 812);
      },
      bannerToLogin() {
        this.mtj_event("e_goLogin", "未登录首页点击bannner");
        this.analysys.ma_btnClick("点击立即开启财富");
        this.jumpLogin();
      },
      productToLogin() {
        this.mtj_event("e_goLogin", "未登录首页点击产品列表");
        this.analysys.ma_btnClick("点击产品列表");
        this.jumpLogin();
      },
      acquireScreen() {
        let _this = this;
        let contentId = '';
        let localRecommendImgUrl = this.getLocalStorage('bhfae_localRecommendImgUrl');
        if (this.islargeScreen()) {
          contentId = 'MAIN_UNLOGIN_PRODUCT_LARGE';
          _this.recommendImgUrl = (localRecommendImgUrl === null) ? localRecommendImgUrl : 'static/img/productListFour.png';
          _this.defaultImg = 'this.src="' + require('../../../../static/img/productListFour.png') + '"'
        } else {
          contentId = 'MAIN_UNLOGIN_PRODUCT_SMALL';
          _this.recommendImgUrl = (localRecommendImgUrl === null) ? localRecommendImgUrl : 'static/img/productListThree.png';
          _this.defaultImg = 'this.src="' + require('../../../../static/img/productListThree.png') + '"'
        }
        let params = {
          'contentId': contentId
        };
        this.ajax(this.apiName.queryContentItemList, this.serviceType().query, params, function (responseData) {
          _this.imgUrl = responseData.body[0].url;
          if (_this.imgUrl && _this.imgUrl !== '') {
            _this.recommendImgUrl = _this.$store.getters.fileUrl + _this.imgUrl;
            _this.setLocalStorage('bhfae_localRecommendImgUrl', _this.recommendImgUrl);
          }
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "unloginHomePage.styl"
</style>
