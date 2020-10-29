<template>
  <div class="navigation  window clear displayNone" :class="{'displayNoneClear': pageConfig.navigation}" :style="{'height': pageConfig.setNavigationHeight}">
    <div class="width_100 flex-f ">
      <router-link to="homePage" v-if="checkToken() === true" class="flex-f flex-dir-c flex-x-vc flex-hc flex-g1">
        <span class="icon-homeImg icon"></span>
        <span class="tab-label">首页</span>
      </router-link>
      <router-link to="unloginHomePage" v-else="checkToken() === false"
                   class="flex-f flex-dir-c flex-x-vc flex-hc flex-g1">
        <span class="icon-homeImg icon"></span>
        <span class="tab-label">首页</span>
      </router-link>
      <router-link to="/investmentFrontPage" class="flex-f flex-dir-c flex-x-vc flex-hc flex-g1">
        <span class="icon-treasureImg icon"></span>
        <span class="tab-label">财富</span>
      </router-link>
      <router-link to="assets" class="flex-f flex-dir-c flex-x-vc flex-hc flex-g1">
        <span class="icon-assetImg icon"></span>
        <span class="tab-label">我的</span>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      pageConfig: {
        type: Object
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "navigation.styl";

  [class*="icon-"] {
    font-size: 0.27rem;
    margin: 0.04rem 0 0.015rem 0;
  }

  [class*="icon-"]:before {
    color: #263147;
  }

</style>

