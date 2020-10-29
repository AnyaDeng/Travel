<template>
  <div v-transfer-dom>
    <x-dialog v-model="showDialogStyle" hide-on-blur
              :dialog-style="{'max-width': '100%', width: '100%', height: '60%', 'background-color': 'transparent'}">
      <div
        style="padding: 0 0.12rem;margin: auto;width: 3rem;height: 3.5rem;border-radius: 0.1rem; color:#fff;text-align:center;background: #ffffff">
        <p
          style="font-size: 0.17rem;color: #232323;height: 0.45rem;line-height: 0.45rem;border-bottom: 1px solid #CBD0D9;">
          满标提示</p>
        <img style="width: 3rem;height: 1.8rem;margin-top: 0.08rem" src="../../common/img/mbts.png" alt="">
        <p style="margin-top: 0.13rem;font-size: 0.18rem;color: #323B4F;">让您等待产品期间仍有收益</p>
        <div @click="goToSee" style="width: 2.3rem;margin-top: 0.24rem;"
             class="background textAlign lineHeight_045 marginAuto borderRadius_100 height_045">
          <span class="color_fff fontSize_016">去看看</span>
        </div>
      </div>
      <div @click="close">
        <x-icon type="ios-close-outline" style="fill:#fff;margin-top: 0.13rem"></x-icon>
      </div>
    </x-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XDialog, TransferDomDirective as TransferDom} from 'vux';

  export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog
    },
    data() {
      return {
        showDialogStyle: true
      };
    },
    mounted() {
    },
    methods: {
      goToSee() {
        this.showDialogStyle = false;
      },
      close() {
        this.showDialogStyle = false;
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "slowMarking.styl"
  .background {
    background-image: linear-gradient(-227deg, #EBC678 0%, #D7AB69 100%);
    box-shadow: 0 4px 8px 0 rgba(213, 167, 100, 0.30);
    border-radius: 0.5rem;
  }

  .ios-close-outline {
    width: 0.4rem;
    height: 0.4rem;
  }
</style>
