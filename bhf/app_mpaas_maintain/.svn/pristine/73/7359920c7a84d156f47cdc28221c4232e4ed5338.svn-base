<template>
  <div class="swiperPopup">
    <div class="modal" v-show="show" transition="fade" @click="close">
    </div>
    <div v-show="show" class="modal-backup" transition="fade"></div>
    <div v-show="show" class="modal-dialog">
      <div class="modal-content">
        <!--内容区域-->
        <div class="modal-body">
          <div class='showBcBackground'>
            <swiper :options="swiperPopupOption" style="width:100%;height: 100%">
              <swiper-slide style="height: 100%;width:100%;" v-for="item in showImgList" :key="item.img">
                <slot name="body">
                  <div v-if="item.link" @click="swiperJumpLink(item)">
                    <img :src="item.img" alt="" :onerror="defaultImg" style="width: 100%;background-size: contain">
                  </div>
                  <img v-if="!item.link" :src="item.img" :onerror="defaultImg" alt=""
                       style="width: 100%;background-size: contain">
                </slot>
              </swiper-slide>
              <div class="swiper-pagination swiper-popup" slot="pagination">
              </div>
            </swiper>
          </div>
        </div>
        <!--尾部,关闭按钮-->
        <div @click="close" href="javascript:void(0)" class="positionCloseIcon">
          <div class="borderRadius024">
            <span class="✕style">✕</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        swiperPopupOption: {
//          autoHeight: true, //高度随内容变化
          preloadImages: true,
          updateOnImagesReady: true,
          notNextTick: true,
          autoplay: false,
          pagination: {
            el: '.swiper-popup',
            type: 'bullets',
            clickable: true,
            bulletClass: 'content-bullet',
            bulletActiveClass: 'content-bullet-active'
          },
          observer: true
        },
        show: false,   // 是否显示模态框
        img_list: [],
        setImgWidth: '',
        setImgHeight: '',
        defaultImg: 'this.src="' + require('../../../common/img/imgLoadFaild-swiper.png') + '"',
        showImgList: [], // 展示的图片对象
        showIndex: 0
      };
    },
    mounted() {
    },
    methods: {
      close() {
        if (this.showIndex === this.img_list.length) {
          this.show = false;
        }else{
          this.showIndex++;
          this.reloadData();
        }
      },
      reloadData() {
        if (!this.isNotEmpty(this.img_list)) {
          this.close();
          return;
        }
        if (this.showIndex >= this.img_list.length) {
          this.showIndex = 0;
          this.img_list = [];
          this.close();
          return;
        }
        let item = this.img_list[this.showIndex];
        this.showImgList = [item];
      },
      swiperJumpLink(item) {
        if (!this.isNotEmpty(item.link)) return;
        this.analysys.ma_bannerClick(item);
        this.showBhfaeBrowser(this.urlJoinCommonParam(item.link));
        this.showIndex++;
        this.reloadData();
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  .swiperPopup
    .showBcBackground
      width: 2.81rem
      height: 3.5rem
      border-radius: 0.1rem
      .swiper-container
        border-radius: 0.1rem
        .noneBanner
          position: relative
          border-radius: 0.1rem
          img
            border-radius: 0.1rem
            position: absolute
            bottom: 0rem
            left: 0rem
        .swiper-slide
          position: relative
          border-radius: 0.1rem
          img
            border-radius: 0.1rem
            position: absolute
            bottom: 0rem
            left: 0rem
      .swiper-popup
        bottom: 0.04rem !important

    .✕style
      height: 0.38rem
      line-height: 0.38rem
      display: block
      color: #FFF
      text-align: center
      font-size: 0.19rem

    .borderRadius024
      width: 0.38rem
      height: 0.38rem
      border: 1px solid #FFF
      border-radius: 0.24rem

    .positionCloseIcon
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translate(-50%, 0);

    .modal
      position: fixed;
      left: 0
      top: 0
      right: 0
      bottom: 0
      z-index: 901
      outline: 0

    .modal-dialog
      z-index: 1003;
      position: absolute
      left: 50%
      top: 50%
      transform: translateX(-50%) translateY(-55%)
      -webkit-transform: translateX(-50%) translateY(-55%)
      border-radius: 0.08rem

    .modal-content
      position: relative

    .modal-backup
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 900
      background: rgba(0, 0, 0, 0.6)
</style>
