<template>
  <div class="container" :style="{'padding-bottom': paddingBottom,'height': bodyHeight}">
    <div class="fit">
      <v-header :pageConfig="pageConfig"></v-header>
      <div class="container-liner" :style="{'padding-top': paddingTop}" :class="{'paddingTop-clear': underHeader}">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" @listenToChildEvent="showMsgFromChild">
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" @listenToChildEvent="showMsgFromChild">
        </router-view>
      </div>
      <v-navigation :pageConfig="pageConfig"></v-navigation>
    </div>
    <v-authorityPopup ref="authority" @listenNetWork=""></v-authorityPopup>
    <v-netWorkAnomaly ref="netWorkAnomaly" @listenNetWork="hasNetWork"></v-netWorkAnomaly>
    <v-upgradePopup ref="upgradePopup"></v-upgradePopup>
    <confirm ref="dialog" :modal-options.sync="popupInfo"></confirm>
  </div>

</template>
<script type="text/ecmascript-6">
  import header from 'components/common/header/header';
  import navigation from 'components/common/navigation/navigation';
  import authorityPopup from 'components/common/popup/authorityPopup';
  import netWorkAnomaly from 'components/common/popup/netWorkAnomaly';
  import upgradePopup from 'components/common/popup/upgradePopup';

  export default {
    name: 'carrousel',
    components: {
      'v-upgradePopup': upgradePopup,
      'v-netWorkAnomaly': netWorkAnomaly,
      'v-authorityPopup': authorityPopup,
      'v-header': header,
      'v-navigation': navigation
    },
    data() {
      return {
        apiName: {
          checkTokenActive: this.apiType().checkTokenActive,
          queryParamValue: this.apiType().queryParamValue,
          queryCustomerRankDisplay: this.apiType().queryCustomerRankDisplay // app评分-查询客户评分展示方式
        },
        pageConfig: {
          headerBg: this.headerColor.transparent,
          underHeader: true
        },
        popupInfo: {
          title: '温馨提示',
          subTitle: '请实名认证，立即开启理财之门',
          img: 'static/img/zhice.png',
          cancelButtonText: '先去逛逛',
          confirmButtonText: '立即实名'
        },
        setHeaderHeight: '0.64rem',
        paddingTop: '0.64rem',
        underHeader: false,
        setNavigationHeight: '0.45rem',
        paddingBottom: '0',
        bodyHeight: '100%'
      };
    },
    created() {
      // 监听授权弹框事件
      this.addObserve('showAuthorityPopup', this.showAuthorityPopup);
      this.addObserve('showRealNameAlert', this.showAlert);
      this.addObserve('closeRealNameAlert', this.closeRealNameAlert);
      this.$bus.on('upgradePopupCtrl', this.handleUpgrade);
      this.setBodyHeight();
      let _this = this;
      this.checkUserAgent(function () {
        _this.setHeaderHeight = '0.88rem';
        _this.paddingTop = '0.88rem';
        _this.setNavigationHeight = '0.82rem';
        _this.paddingBottom = '0.34rem';
      }, function () {
        _this.setHeaderHeight = '0.64rem';
        _this.paddingTop = '0.64rem';
      }, function () {
        _this.setHeaderHeight = '0.44rem';
        _this.paddingTop = '0.44rem';
      });
    },
    mounted() {
      this.checkShowVconsole();
      this.$store.getters.bankProductModuleList = [];
      this.$store.getters.rateDisplayType = '0';
      this.$store.getters.fileUrl = this.getFileHost();
      this.$store.getters.h5Url = this.getH5Host();
      this.$store.getters.keyBoard_confuse_switch = '0';
      this.$store.getters.productId = '';
      this.$store.getters.passWordSecret = '';
      this.$refs.dialog.show = false;
      if (navigator.userAgent.indexOf('bhfae_cordova') === -1) {
        this.pageRequest(false);
      } else if (this.getSessionStorage('deviceready') === '1') {
        this.pageRequest(true);
      } else {
        let _this = this;
        document.addEventListener("deviceready", function () {
          _this.pageRequest(true);
        }, false);
      }
    },
    methods: {
      showAlert(pageName) {
        setTimeout(() => {
          this.showRealNameAlert(pageName);
        }, 500);
      },
      showRealNameAlert(pageName) {
        const jumpRouteName = this.handleJumpRouteName();
        const isNeedShowRealNameAlert = this.isNotEmpty(jumpRouteName) && jumpRouteName.includes('real_name');
        const isCurrentPage = pageName === this.getAppPageName();
        if (isNeedShowRealNameAlert && isCurrentPage) {
          this.$refs.dialog.show = true;
          this.$refs.dialog.confirm().then(() => {
            let params = {
              "action": "account_action",
              'ac_actions': jumpRouteName.join()
            };
            this.showPlatformH5(params);
            this.closeRealNameAlert();
          }).catch(() => {
            this.closeRealNameAlert();
          });
        }
      },
      closeRealNameAlert() {
        this.$refs.dialog.show = false
      },
      // 调试面板展示控制
      checkShowVconsole() {
        let env_config = process.env.ENV_CONFIG;
        // 环境包含build但是不包含builxxpub 时 开启vconsole
        if (env_config.indexOf('build') !== -1 && env_config.indexOf('pub') === -1 && env_config.indexOf('91') === -1) {
          this.setSessionStorage('bhfae_dragon', '1');
          this.openConsole();
        }
      },
      pageRequest(isApp) {
        this.getServiceState(); // 获取服务器状态
        if (!this.isLogin()) {
          this.fetchToken();
        }
        this.fetchDict();

        let env_config = process.env.ENV_CONFIG;
        if (env_config.indexOf('pub') === -1) {
          this.queryParamValueFile();
          this.queryParamValueH5();
        }

        this.queryParamValueKeyboard();
        this.queryCustomerRankDisplay();
        this.queryPasswordSecret();
        // 查询个人中心栏目配置项
        this.queryUserCenterColums();
        if (isApp) {
          this.validateVersion();
        }

      },
      // 设置最外层盒子高度
      setBodyHeight() {
        let clientHeight = document.body.clientHeight;
        this.bodyHeight = clientHeight + 'px';
      },
      showMsgFromChild(data) {
        this.pageConfig = data;
        this.pageConfig['setHeaderHeight'] = this.setHeaderHeight;
        this.pageConfig['setNavigationHeight'] = this.setNavigationHeight;
        this.underHeader = this.pageConfig.underHeader;
      },
      hasNetWork(keepAliveFnc) {
        this.$refs.netWorkAnomaly.show = true;
        this.$refs.netWorkAnomaly.confirm().then(() => {
          this.$refs.netWorkAnomaly.show = false;
        });
      },
      showAuthorityPopup(config) {
        this.$refs.authority.showPopup(config);
      },
      handleUpgrade(param) {
        let _this = this;
        _this.$refs.upgradePopup.isForceUpdate = param.isForceUpdate;
        _this.$refs.upgradePopup.msg = param.msg;
        _this.$refs.upgradePopup.show = true;
        _this.$refs.upgradePopup.confirm().then(() => {
          _this.$refs.upgradePopup.show = false;
          _this.showSystemBrowser(param.url);
        }).catch(() => {
          _this.$refs.upgradePopup.show = false;
          _this.setSessionStorage('bhfae_isIgnore_appUpdate', '1');
        });
      },
      queryParamValueFile() {
        let _this = this;
        let paramId = this.paramValueType.FILE_SERVER_URL;
        this.queryParamConfig(paramId, function (value) {
          _this.$store.getters.fileUrl = value;
        })
      },
      queryParamValueH5() {
        let _this = this;
        let paramId = this.paramValueType.QUERY_ONLINE_H5_SERVER_URL;
        this.queryParamConfig(paramId, function(value) {
          _this.$store.getters.h5Url = value;
        });
      },
      queryParamValueKeyboard() {
        let _this = this;
        let paramId = this.paramValueType.KEYBOARD_CONFUSE_SWITCH;
        this.queryParamConfig(paramId, function (value) {
          _this.$store.getters.keyBoard_confuse_switch = value
        })
      },
      // app评分-查询客户评分展示方式
      queryCustomerRankDisplay() {
        let params = this.customerRating();
        let _this = this;
        this.ajax(this.apiName.queryCustomerRankDisplay, this.serviceType().query, params, function (responseData) {
          _this.$store.getters.rateDisplayType = responseData.body[0].rankDisplayType;
        })
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
    z-index: 1
    .fit
      width 100%
      height 100%
      .container-liner
        height: 100%
        width: 100%
        position: relative
      .paddingTop-clear
        padding-top: 0 !important

</style>
