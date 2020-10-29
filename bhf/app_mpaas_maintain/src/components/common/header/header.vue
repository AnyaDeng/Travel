<template>
  <div class="header window fixed" :class="{'hidden': headerParam.headerHide}" :style="{'height': pageConfig.setHeaderHeight, 'background': pageConfig.headerBg}">
    <div class="bgOpacity"
         :style="{'opacity': headerParam.gradientBar.opacity, 'background': headerParam.gradientBar.color}"></div>
    <div class="headerBox"
         :class="{'headerBoxWidth': isNotEmpty(pageConfig.headerTitle),'headerChangePercent': pageConfig.headerChangePercent,'headerBoxFlex': pageConfig.headerBoxFlex}">
      <!--头部左侧:-->
      <div class="left-cnt">
        <headerModule v-if="isNotEmpty(headerParam.headerLeft)" :headerParams="headerParam.headerLeft"
                      :iconUrl="headerParam.iconUrl" :accountCharityStatus="headerParam.accountCharityStatus" :isRealName="headerParam.isRealName"
                      @btnClickListen="headerClick"></headerModule>
      </div>
      <!--头部标题-->
      <div class="center-cnt" v-if="isNotEmpty(pageConfig.headerTitle)">
        <span v-cloak>{{pageConfig.headerTitle}}</span>
      </div>
      <!--头部右侧-->
      <div class="right-cnt">
        <headerModule v-if="isNotEmpty(headerParam.headerRight)" :headerParams="headerParam.headerRight"
                      @btnClickListen="headerClick"></headerModule>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import headerModule from 'components/common/header/headerModule';

  export default {
    components: {
      headerModule
    },
    props: {
      pageConfig: {
        type: Object
      }
    },
    computed: {
      /**
       * 格式化props进来的参数,对参数赋予默认值
       */
      headerParam: {
        get() {
          let headerParam = this.pageConfig;
          headerParam = {
            headerHide: this.notEmpty(headerParam.headerHide, false),
            headerLeft: this.handleHeaderParam(headerParam.headerLeft),
            headerTitle: this.getValidateString(headerParam.headerLeft),
            headerRight: this.handleHeaderParam(headerParam.headerRight),
            gradientBar: this.notEmpty(headerParam.gradientBar, {opacity: '', color: ''}),
            iconUrl: this.getValidateString(headerParam.iconUrl),
            accountCharityStatus: this.notEmpty(headerParam.accountCharityStatus, false),
            isRealName: this.getValidateString(headerParam.isRealName, '')
          };
          return headerParam;
        }
      }
    },
    data() {
      return {};
    },
    created() {
      this.$bus.on('appBackEcho', this.androidBack);
    },
    methods: {
      androidBack() {
        this.headerClick({'btnType': this.headerBtn.backArrow});
      },
      headerClick(params) {
        this.$bus.emit(this.getRouterBackKey(), params);
      },
      handleHeaderParam(headerParamInfo) {
        let info = this.notEmpty(headerParamInfo, []);
        if (!Array.prototype.isPrototypeOf(info)) {
          info = info.split(",");
        }
        return info;
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "header.styl";
  .fontActive {
    font-family: Roboto-Regular !important;
  }

  div[lazy=loading] {
    background-image: url(../../../common/img/gjsLogos.png) !important;
  }

  div[lazy=error] {
    background-image: url(../../../common/img/gjsLogos.png) !important;
  }
</style>
