<template>
  <div class="container-fluid">
    <v-refresh :on-refresh="onRefresh" :pageConfig="pageConfig" ref="refresh">
      <div class="assetsHeader">
        <div class="menuBar utilList flex-center-left" :class="{'iconFitIphoneX': this.isIphoneX()}">
          <div class="flex-icon" v-for="(item,index) in assetsIconListShow"
               :key="index" @click="jumpLink(item)">
            <div>
              <span v-if="item.isMark === '1'" class="iconTag flex-center-center" :class="{'iconTagCnt': isNotEmpty(item.markTag)}"><i>{{item.markTag}}</i></span>
              <img class="menuItem" :src="item.img">
            </div>
            <span class="name">{{item.title}}</span>
          </div>
          <div class="totalAsset" >
            <div @click="jumpToH5Page('account_assetAnalysis')">
              <div class="totalAssetTitle flex-center-leftRight">
                <div>
                  <span>持有本金(元)</span>
                  <span class="icon-reminder" @click.stop="handlePop"></span>
                </div>
                <div @click.stop="hideMoney()">
                  <span class="icon-assetVisible" v-if="confirmWillShow"></span>
                  <span class="icon-assetInvisible" v-else></span>
                </div>
              </div>
              <div class="amount">
                <countTo v-if="confirmWillShow" :endVal="accountAsset" :decimals="2"
                         :duration='1000'></countTo>
                <span v-else>****</span>
              </div>
            </div>
            <div class="benefit-old flex-center-left">
              <div class="yesterdayBenifitVal ">
                <span>昨日收益(元)</span>
                <div class="benifitVal">
                  <span v-if="confirmWillShow">{{ yesterdayBenifitVal | currency('', '2')}}</span>
                  <span v-else>****</span>
                </div>
              </div>
              <div>
                <span>累计到账收益(元)</span>
                <div class="benifitVal" v-if="isNotEmpty(confirmBenifit)">
                  <span  v-if="confirmWillShow">{{ confirmBenifit | currency('', '2')}}</span>
                  <span  v-else>****</span>
                </div>
                <div class="benifitVal" v-else>
                  <span>--</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="commonModule">
        <div class="item"  @click="jumpToH5Page('bank_productHoldList_all')" >
          <p class="top">银行存款<span class="icon-advance"></span></p>
          <p class="btm">
            <span  v-if="confirmWillShow">{{ bankAsset | currency('', '2')}}</span>
            <span  v-else>****</span>
          </p>
        </div>
        <div class="item"  @click="myRegular">
          <p class="top">鸿运来<span class="icon-advance"></span></p>
          <p class="btm">
            <span  v-if="confirmWillShow">{{ regularAsset | currency('', '2')}}</span>
            <span  v-else>****</span>
          </p>
        </div>
      </div>
      <div class="commonModule">
        <div class="item"  @click="jumpToH5Page('bank_accountList')" >
          <p class="top">银行电子户<span class="icon-advance"></span></p>
          <p class="center">用于银行存款产品提取</p>
          <p class="btm">
            <span class="bankAccountNum">{{bankAccountCount}}个</span>
          </p>
        </div>
        <div class="item"  @click="goAccountBalance">
          <p class="top">国金所账户<span class="icon-advance"></span></p>
          <p class="center">用于鸿运来产品购买</p>
          <p class="btm">
            <span  v-if="confirmWillShow">{{ available | currency('', '2')}}</span>
            <span  v-else>****</span>
          </p>
        </div>
      </div>
      <div class="moreServe" v-if="isNotEmpty(assetsBtmIconListShow)">
        <div class="moreServeText borderLine">更多服务</div>
        <div class="contentBox flex-center-left ">
          <div class="flex-icon" v-for="(item,index) in assetsBtmIconListShow"
               :key="index" @click="jumpLink(item)">
            <!--<img class="menuItem" :src="item.img">-->
            <div>
              <span v-if="item.isMark === '1'" class="iconTag flex-center-center" :class="{'iconTagCnt': isNotEmpty(item.markTag)}"><i>{{item.markTag}}</i></span>
              <img class="menuItem" :src="item.img">
            </div>
            <span class="name">{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="pageEndTag">
        <v-pageEndTag></v-pageEndTag>
      </div>
    </v-refresh>
    <div>
      <imgPopup ref="imgPopup"></imgPopup>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import countTo from 'vue-count-to';
  import imgPopup from 'components/common/popup/imgPopup.vue';

  export default {
    components: {
      countTo,
      'imgPopup': imgPopup
    },
    data() {
      return {
        pageConfig: {
          headerLeft: this.headerBtn.headPortrait,
          headerTitle: '',
          headerRight: this.headerBtn.service,
          navigation: true,
          iconUrl: '../../../common/img/gjsLogos.png',
          isRealName: this.getUserStorage('isRealName'),
          headerBg: this.headerColor.transparent,
          accountCharityStatus: false,
          gradientBar: {
            opacity: 0,
            color: this.headerColor.darkBlue2
          }
        },
        //总的
        accountAsset: 0,
        //余额
        available: 0,
        //固收定期
        regularAsset: 0, // 固收
        bankAsset: 0, // 银行总资产
        confirmWillShow: true,
        yesterdayBenifitVal: 0,  //昨日收益
        assetsIconListShow: [],  //顶部icon列表
        assetsBtmIconListShow: [], // 底部icon列表
        bankAccountCount: 0, // 银行卡电子户个数
        confirmBenifit: '' // 累计到账收益
      };
    },
    activated() {
      this.available = 0;
      this.bankAsset = 0
      this.accountAsset = 0;
      this.regularAsset = 0;
      this.yesterdayBenifitVal = 0;
      this.assetsBtmIconListShow = []
      this.bankAccountCount = 0;
      this.confirmBenifit = ''
      this.confirmWillShow = !!this.isAssetsAmountShow(this.AMOUNT_CONTROL().ASSETS_PAGE); // !!：第一个'!'将值转换成布尔值并取其值的非值，第二个'!'将其布尔值还原，类似于“负负得正”的道理
      this.keepAliveTimeStamp(this.$route.name, function () {
      });
      this.refreshPageHeader();
      this.keepAliveFnc();
      if (this.isUserRealName() === false) {
        // 未实名,引导去实名
        this.emitShowRealNameAlert();
      }
      // 是否刷新头像
      if (this.getSessionStorage('isNeedRefreshUserPortrait') === '1') {
        this.setSessionStorage('isNeedRefreshUserPortrait', '0');
        this.refreshIcon();
      }
      // 页面滚动
      this.pageConfig.gradientBar.opacity = 0;
      this.pageConfig.gradientBar.color = this.headerColor.darkBlue2;
      this.childrenElement = this.$refs.refresh.$refs.viewBox;
      this.childrenElement.addEventListener('scroll', this.eventListenerScroll, false);
      this.$refs.imgPopup.show = false;
      // 监听刷新用户信息完成,修改页面展示内容
      this.addObserve('refreshUserInfoFinish', () => {
        if (this.getAppPageName() === 'assets') {
          this.refreshPageHeader();
        }
      });
    },
    mounted() {
      this.refreshIcon();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
      // 监听H5刷新指令
      this.addObserve('refresh_asset', this.onRefresh);
    },
    beforeRouteLeave(to, from, next) {
      // 监听scroll事件
      this.childrenElement.removeEventListener('scroll', this.eventListenerScroll, false);
      next();
    },

    methods: {
      handlePop() {
        const imgUrl = this.$store.getters.h5Url + this.fileRelativePath() + `/img/assetsBenifitExplain.png?t=${this.webhub_getStartTime()}`;
        this.$refs.imgPopup.popupPath = imgUrl;
        this.$refs.imgPopup.show = true;
        this.mtj_event('app_assets_handlePop', '我的页点击气泡');
        this.analysys.ma_btnClick("点击持有本金右边气泡");
      },
      keepAliveFnc() {
        this.availableCapitalBalance();
        this.queryTotalAsset();
        this.isAccountCharity();
        this.accountYesterdayBenifit();  //查询账户昨日收益
        this.getAssetIcons();
        this.getAssetIconsA();
        this.queryDepositAccountCount() // 查询电子户开户数量
        this.queryAccountConfirmBenifit(); // 查询账户累计到账收益
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.headPortrait) {
          // 点击头像跳转个人中心
          this.$router.push({
            name: 'personalCenter'
          });
        } else if (params.btnType === this.headerBtn.charity) {
          this.mtj_event('app_assets_charity', '我的页点击爱心图标');
          // 点击头部爱心图标
        } else if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
          this.mtj_event('app_assets_service', '我的页点击智齿客服');
        }
      },
      refreshPageHeader() {
        this.pageConfig['isRealName'] = this.getUserStorage('isRealName');
        this.sendMsgToParent();
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      refreshIcon() {
        this.pageConfig.iconUrl = this.$store.getters.fileUrl + this.getUserStorage('icon') + '?' + Math.random();
      },
      onRefresh(done) {
        this.keepAliveFnc();
        this.refreshIcon();
        if (typeof done === "function") {
          done();
        }
      },
      hideMoney() {
        this.mtj_event('app_assets_eye', '我的页点击金额显示/隐藏按钮');
        this.analysys.ma_btnClick("点击金额显示/隐藏按钮");
        this.confirmWillShow = !this.confirmWillShow;
        this.recordAssetsAmountShow(this.confirmWillShow, this.AMOUNT_CONTROL().ASSETS_PAGE);
      },
      // 平台-查询账户余额
      availableCapitalBalance() {
        this.queryAvailableCapitalBalance(responseData => {
          if (this.isNotEmpty(responseData.body)) {
            this.available = responseData.body[0].availableCapitalBalance;
          }
        });
      },
      //查询总资产
      queryTotalAsset() {
        this.queryShareBalanceList('', (responseData) => {
          let open = 0, bill = 0, term = 0, structureAsset = 0;
          if (this.isNotEmpty(responseData.total)) {
            this.accountAsset = responseData.total.totalBalance;
          }
          if (this.isNotEmpty(responseData.body)) {
            let total = responseData.body;
            for (let i = 0; i < total.length; i++) {
              let type = total[i].productType;
              switch (type) {
                //固收
                case '0':
                  this.regularAsset = total[i].totalBalance;
                  break;
                //类活期存款
                case '4':
                  open = total[i].totalBalance;
                  break;
                //定期
                case '6':
                  term = total[i].totalBalance;
                  break;
                //分笔活期
                case '7':
                  bill = total[i].totalBalance;
                  break;
                // 结构性存款
                case '5':
                  structureAsset = total[i].totalBalance;
                  break;
              }
            }
            this.bankAsset = this.accurate_add_multi(open, bill, term, structureAsset);
          } else {
            this.bankAsset = 0;
            this.regularAsset = 0;
          }
        })
      },
      // 昨日收益
      accountYesterdayBenifit() {
        this.ajax(this.apiType().queryAccountYesterdayBenifit, this.serviceType().query, {}, (responseData) => {
          if (this.isNotEmpty(responseData.total)) {
            this.yesterdayBenifitVal = responseData.total.yesterdayBenifit;
          }
        });
      },
      // 累计到账收益
      queryAccountConfirmBenifit() {
        this.ajax(this.apiType().queryAccountConfirmBenifit, this.serviceType().query, {}, (responseData) => {
          if (this.isNotEmpty(responseData.total)) {
            this.confirmBenifit = responseData.total.confirmBenifit;
          }
        }, function (error) {
          console.log(JSON.stringify(error))
        }, function (error) {
          console.log(JSON.stringify(error))
        });
      },
      // 查询电子户开户数量
      queryDepositAccountCount() {
        this.ajax(this.apiType().queryDepositAccountCount, this.serviceType().query, {}, (responseData) => {
          if (this.isNotEmpty(responseData.body[0])) {
            this.bankAccountCount = responseData.body[0].num
          }
        });
      },
      jumpToH5Page(action) {
        this.handelAnalysysInfo(action)  // 埋点
        const params = {
          'action': action
        };
        this.showAppH5(params);
      },
      myRegular() {
        this.mtj_event('app_assets_deposit', '我的页点击我的定期');
        this.jumpToH5Page('regular_myRegular');
      },
      isAccountCharity() {
        this.queryAccountCharity(isCharity => {
          this.pageConfig.accountCharityStatus = isCharity
        })
      },
      goAccountBalance() {
        //账户余额
        this.mtj_event('app_assets_goAccountBalance', '我的页点击账户余额');
        this.jumpToH5Page('regular_accountBalance');
      },
      // 监听屏幕滑动
      eventListenerScroll() {
        let scrollTop = parseFloat(this.childrenElement.scrollTop);
        this.pageConfig.gradientBar.opacity = this.pageScroll(scrollTop);
        this.sendMsgToParent();
      },
      // icon跳转
      jumpLink(item) {
        try {
          this.analysys.ma_btnClick("点击跳转" + item.title);
        } catch (e) {
        }
        this.showBhfaeBrowser(this.urlJoinCommonParam(item.link));
      },
      // 获取[我的]页面icon
      getAssetIcons() {
        this.queryActivityList(this.contentIdType.ASSET_ICON, (list) => {
          this.assetsIconListShow = list;
        }, (error) => {
          this.$toast(error.message)
        }, (error) => {
          this.$toast(error.message)
        })
      },
      // 获取[我的]页面底部icon
      getAssetIconsA() {
        this.queryActivityList(this.contentIdType.ASSET_ICON_A, (list) => {
          this.assetsBtmIconListShow = list;
        }, (error) => {
          this.$toast(error.message)
        }, (error) => {
          this.$toast(error.message)
        })
      },
      // 处理点击事件埋点
      handelAnalysysInfo(action){
        const actionInfo  =  {
          account_assetAnalysis: '资产分析',
          bank_productHoldList_all: '银行存款',
          bank_accountList: '银行电子户',
          regular_accountBalance: '国金所账户',
          regular_myRegular: '鸿运来'
        }
        try {
          this.analysys.ma_btnClick("点击跳转-" + actionInfo[action]);
        } catch (e) {
        }
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "assets.styl"
</style>
