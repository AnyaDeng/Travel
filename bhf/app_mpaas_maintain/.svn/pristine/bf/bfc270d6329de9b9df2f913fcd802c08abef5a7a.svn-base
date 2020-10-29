<template>
  <div class="container-fluid">
    <div class="logo"></div>
    <div class="version">版本号 <span>{{getAppVersion()}}</span></div>
    <div class="row">
      <ul class="list-group">
        <custom-li class="list-group-item" @touch-delay="onCopyText">
          <span slot="structure" class="title">微信公众号</span>
          <div slot="structure">
            <span class="text">滨海国金所</span>
            <span class="icon-advance"></span>
          </div>
        </custom-li>
        <custom-li class="list-group-item" @touch-delay="onPhoneCall">
          <span slot="structure" class="title">客服电话</span>
          <div slot="structure" class="flex-center-leftRight">
            <div class="text">
              <p>400-813-9888 </p>
              <p>(周一至周日 9:30-18:30)</p>
            </div>
            <div>
              <span class="icon-advance"></span>
            </div>
          </div>
        </custom-li>
        <li class="list-group-item">
          <span class="title">客服邮箱</span>
          <span class="text">service@bhfae.com</span>
        </li>
        <li class="list-group-item">
          <span class="title">官方网站</span>
          <span class="text">www.bhfae.com</span>
        </li>
        <li class="list-group-item" @click="onCheckEdition">
          <span slot="structure" class="title">版本更新</span>
          <div slot="structure" class="flex-center-center">
            <span class="updateSpot" v-if="isNotEmpty(this.updateUrl)"></span>
            <span class="text">{{updateText}}</span>
            <span class="icon-advance"></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="company">滨海（天津）金融资产交易中心股份有限公司</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        apiName: {
          queryParamValue: this.apiType().queryParamValue
        },
        pageConfig: {
          headerLeft: this.headerBtn.backArrow,
          headerTitle: '关于滨海国金所',
          headerRight: ''
        },
        updateText: '', // 文案
        updateUrl: '' // 下载地址
      };
    },
    mounted() {
      let _this = this;
      this.sendMsgToParent();
      this.getLatestVersion(function (value) {
        _this.compareVersionFun(value);
      });
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      headerListen() {
        // 路由回退back(-1)
        this.routerBack();
      },
      onCopyText() {
        this.analysys.ma_btnClick('点击了微信公账号');
        if (this.isRunOnDevice() === false) return;
        let _this = this;
        this.copyTextToClipboard('滨海国金所', function () {
          let msg = '已复制公众号-请打开微信-粘贴并搜索公众号-即可关注滨海国金所';
          _this.$confirmCtrl('温馨提示', msg, '去关注', '取消', function () {
            _this.WXOpenWX(function () {
            }, function (error) {
              _this.$toast(error.msg);
            });
          });
        }, function (error) {
          _this.$toast(error.msg);
        })
      },
      onPhoneCall() {
        this.analysys.ma_btnClick('点击了客服电话');
        this.appOnPhoneCall();
      },
      //获取最新版本号
      getLatestVersion(callback) {
        let latestVer = this.$store.getters.AppVersion;
        if(this.isNotEmpty(latestVer)) {
          callback(latestVer);
        } else {
          this.doGetLatestVersion(callback);
        }
      },
      //获取url
      getLatestUrl(callback) {
        let updateUrl = this.$store.getters.updateUrl;
        if(this.isNotEmpty(updateUrl)) {
          callback(updateUrl);
        } else {
          this.doGetLatestUrl(callback);
        }
      },
      compareVersionFun (value){
        let _this = this;
        let hasNewVersion = this.hasNewVersion(this.getAppVersion(), value);  //有新版本
        if(hasNewVersion) {
          this.getLatestUrl(function (url) {
            _this.updateUrl = url;
            _this.updateText = '发现新版本';
          });
        }
      },
      onCheckEdition() {
        this.analysys.ma_btnClick('点击了版本更新');
        if(this.isNotEmpty(this.updateUrl)) {
          let _this = this;
          if(this.checkConnection() === 5000) {
            this.showSystemBrowser(this.updateUrl);
          } else {
            this.$confirm('', '您正在使用非wifi网络，将使用流量升级最新版本。', function () {
              _this.showSystemBrowser(_this.updateUrl);
            });
          }
        } else {
          this.$toast('已经是最新版本');
        }
      }
    }

  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "aboutUs.styl"
</style>
