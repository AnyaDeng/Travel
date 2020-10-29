<template>
  <div>
    <div class="modal" v-show="show" transition="fade">
    </div>
    <div v-show="show" class="modal-backup" transition="fade"></div>
    <div v-show="show" class="modal-dialog">
      <div class="modal-content">
        <!--内容区域-->
        <div class="modal-body">
          <slot name="body">
            <div class="showBcBackground">
              <img v-if="popupPath" :src="popupPath" :onerror="defaultImg"/>
            </div>
          </slot>
        </div>
        <!--尾部,关闭按钮-->
        <div @click="close(0)" href="javascript:void(0)" class="positionCloseIcon">
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
        show: false,   // 是否显示模态框
        popupPath: '',
        defaultImg: 'this.src="' + require('../../../common/img/imgLoadFaild.png') + '"'
      };
    },
    mounted() {
    },
    methods: {
      close(type) {
        this.show = false;
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  .showBcBackground
    min-width: 2.45rem;
    min-height: 1.63rem;
    margin auto
    img
      width 100%
      height 100%

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
    z-index: 1001
    outline: 0

  .modal-dialog
    z-index: 1003;
    position: fixed
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
    z-index: 1000
    background: rgba(0, 0, 0, 0.6)
</style>
