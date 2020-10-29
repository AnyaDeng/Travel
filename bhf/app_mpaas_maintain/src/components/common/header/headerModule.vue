<template>
  <div class="headerModule">
    <div v-for="(headerParam,index) in headerParams" :key="index">
      <!--滨海国金所logo-->
      <div class="bhfaeLogo" v-if="headerParam === headerBtn.bhfaeLogo">
        <img src="../../../common/img/bhfaeLogo-white@2x.png" alt="">
      </div>
      <!--财富页面标题-->
      <span class="treasureTitle" v-else-if="headerParam === headerBtn.treasureTitle">财富</span>
      <!--消息icon-->
      <span class="icon-message" v-else-if="headerParam === headerBtn.message" @click="onClick(headerParam)"></span>
      <!--回退箭头icon-->
      <span class="icon-back" v-else-if="headerParam === headerBtn.backArrow" @click="onClick(headerParam)"></span>
      <!--头像-->
      <div class="flex-f flex-hc" v-else-if="headerParam === headerBtn.headPortrait">
        <div class="img" @click="onClick(headerParam)">
          <div class="setImg" v-if="getUserStorage('icon') !== ''"
               v-bind:style="{backgroundImage: 'url(' + iconUrl + ')'}"
               v-lazy="iconUrl"></div>
          <div class="defaultImg" v-else></div>
        </div>
        <div class=" flex-f flex-dir-c flex-x-vl">
          <div class="flex-center-left">
            <p class="name" id="name" :class="{ fontActive: getUserStorage('name') === ''}">{{getUserDisplayName()}}</p>
            <p class="real-name " v-if="isRealName === '1'">
              <img src="../../../common/img/realName.png" alt="">
            </p>
            <p class="real-name" v-if="isRealName !== '1'">
              <img src="../../../common/img/noRealName.png" alt="">
            </p>
            <p class="accountCharityStatus" v-if="accountCharityStatus" @click="onClick(headerBtn.charity)">
              <img src="../../../common/img/headerCharityImg.png" alt="">
            </p>
          </div>
        </div>
      </div>
      <!--客服图标-->
      <span class="icon-service" v-else-if="headerParam === headerBtn.service" @click="onClick(headerParam)"></span>
      <!--取消-->
      <span v-else-if="headerParam === headerBtn.cancel" @click="onClick(headerParam)">取消</span>
      <!--证件号-->
      <span v-else-if="headerParam === headerBtn.certificateLogin" @click="onClick(headerParam)">证件号</span>
      <!--跳过-->
      <span v-else-if="headerParam === headerBtn.skip" @click="onClick(headerParam)">跳过</span>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['headerParams', 'iconUrl', 'accountCharityStatus', 'isRealName'],
    data() {
      return {};
    },
    methods: {
      onClick(btnType) {
        try {
          this.analysys.ma_btnClick(`点击头部${this.headerBtnName[btnType]}按钮`);
        } catch (e) {
        }
        this.$emit('btnClickListen', {'btnType': btnType});
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../../common/stylus/mixin.styl';
  .headerModule
    display: inline-block
    .img
      width 0.30rem
      height 0.30rem
      border-radius 50%
      background-color #fff
      .setImg
        width 0.30rem
        height 0.30rem
        border-radius 50%
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      .defaultImg
        width 0.30rem
        height 0.30rem
        border-radius 50%
        background-image url("../../../common/img/headPhotoImg@3x.png")
        background-size 100%

    .name
      max-width 1.54rem
      font-size 0.14rem
      margin-left 0.1rem
      color #F7FAFE
      font-family: SourceHanSansCN-Regular;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;

    .real-name
      width 0.35rem
      height 0.12rem
      margin-left 0.1rem
      img
        width 0.35rem
        height 0.12rem

    .accountCharityStatus
      width 0.35rem
      height 0.12rem
      margin-top 0.04rem
      margin-left 0.07rem
      img
        width 0.26rem
        height 0.12rem
        animation donateRotate 1s infinite

    .cancel
      font-family SourceHanSansCN-Medium
      font-size 0.14rem
      color #ffffff
      letter-spacing 0

    .icon-share
      &:before
        font-size 0.21rem

    .expandClickRange
      display inline-block
      width 0.5rem

    .icon-serviceBlue
      &:before
        color #262D39

    .bhfaeLogo
      img
        width: 0.925rem
        height: 0.255rem
    .treasureTitle
      font-family SourceHanSansCN-Medium
      font-size: 0.21rem
      color: #FFFFFF
      letter-spacing 0
      line-height: 0.315rem

</style>
