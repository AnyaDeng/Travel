<template>
  <div id="homePage" class="loginHomePage">
    <v-refresh ref="refresh" :on-refresh="onRefresh" :pageConfig="pageConfig">
      <div class="product-content">
        <div class="cntBox">
          <!--banner轮播图-->
          <div class="row swiper-container-box" :class="{'swiper-container-box-margin': isNotEmpty(activityIconList)}">
            <swiper :options="swiperOption" style="width:100%;" :style="{'height': bannerHeight}">
              <swiper-slide style="height: 100%;width:100%;" v-for="item in mainBannerList" :key="item.img">
                <img v-lazy="item.img" alt="" :onerror="defaultImg"
                     style="width: 100%;background-size: contain" @click="jumpLink(item)">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination">
              </div>
            </swiper>
            <!--活动展示区-->
            <div class="activityModules flex-center-leftSpaceRight" v-if="isNotEmpty(activityIconList)">
              <div class="iconBox" v-for="(item,index) in activityIconList" :key="index" @click="jumpLink(item)">
                <div>
                  <span v-if="item.isMark === '1'" class="iconTag flex-center-center" :class="{'iconTagCnt': isNotEmpty(item.markTag)}"><i>{{item.markTag}}</i></span>
                  <img :src="item.img">
                </div>
                <span class="iconTlt">{{item.title}}</span>
              </div>
            </div>
          </div>

          <div class="recommendModule" v-if="isNotEmpty(productRecommendList) || isNotEmpty(mainBannerImgList)">
            <!--活动img展示模块-->
            <div class="bannerImgModules flex-center-center" v-if="isNotEmpty(mainBannerImgList)">
              <div class="flex-center-leftRight">
                <img v-for="(item,index) in mainBannerImgList" :key="index" v-lazy="item.img" alt="" :onerror="defaultImg" @click="jumpLink(item)">
              </div>
            </div>

            <!--产品推荐展示模块-->
            <productRecommend v-if="isNotEmpty(productRecommendList)" :productList="productRecommendList" @listenToChildEvent="openRecommendH5"></productRecommend>
          </div>

          <div class="recommendModule" v-if="isNotEmpty(mainBannerMiddleList)">
            <!--页面中部轮播图-->
            <div class='center-swiper-box flex-center-center'>
              <swiper class="swiper-box-inner" :options="centerSwiperOption">
                <swiper-slide style="height: 100%;width:100%;" v-for="item in mainBannerMiddleList" :key="item.img">
                  <img v-lazy="item.img" alt="" :onerror="defaultImg"
                       style="width: 100%;height:100%;background-size: contain" @click="jumpLink(item)">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination">
                </div>
              </swiper>
            </div>
          </div>

          <!--银行产品展示模块(活期/期享/定享/益享)-->
          <bankProductModule v-if="isNotEmpty(bankProductModuleList)" :productModuleList="bankProductModuleList" :heightBase="bankModuleHeightBase" @listenToChildEvent="openBankH5"></bankProductModule>
          <div class="emptyModule" v-else>
            <div class="noProduct" v-if="bankShowType === bankShowTypes.queryFailed">
              <div class="img-noProduct"></div>
              <div class="warn-noProduct"><span>页面加载失败，请重试</span></div>
              <div class="refreshBtn"><span @click="refreshBankList">刷新一下</span></div>
            </div>
            <div class="skeletonModule" v-else-if="bankShowType === bankShowTypes.showSkeleton">
              <van-skeleton title :row="1" row-width="[100%]" />
              <van-skeleton avatar-size="48" avatar avatar-shape="square" :row="2" />
            </div>
          </div>

          <div class="regularModule" v-if="isNotEmpty(mainBannerBottomList) || isNotEmpty(fixedProductList)">
            <!--银行产品底部轮播图-->
            <div class='bottom-swiper-box flex-center-center' v-if="isNotEmpty(mainBannerBottomList)">
              <swiper class="swiper-box-inner" :options="centerSwiperOption">
                <swiper-slide style="height: 100%;width:100%;" v-for="item in mainBannerBottomList" :key="item.img">
                  <img v-lazy="item.img" alt="" :onerror="defaultImg"
                       style="width: 100%;height:100%;background-size: contain" @click="jumpLink(item)">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination">
                </div>
              </swiper>
            </div>

            <!--固收推荐-->
            <div class="row product-list redularProduct" v-if="isNotEmpty(fixedProductList)">
              <div class="list-header">
                <div class="list-header-title">
                  <span>鸿运来尊享</span>
                </div>
                <div class="list-header-link" @click="jumpInvestmentFrontPage">
                  <div class="header-link">
                    <span>更多</span>
                  </div>
                </div>
              </div>
              <fixedProductModule :productList="fixedProductList" @listenToChildEvent="viewDetails"></fixedProductModule>
            </div>
          </div>

          <!--转让专区-->
          <div class="row product-list" v-if="isNotEmpty(transferProductList)">
            <div class=" list-header">
              <div class="list-header-title">
                <span>鸿运来转让专区</span>
              </div>
              <div class="list-header-link" @click="jumpTransferProductList">
                <div class="header-link">
                  <span>更多</span>
                </div>
              </div>
            </div>
            <transferProductModule :productList="transferProductList"
                                   @listenToChildEvent="transferProductClick"></transferProductModule>
          </div>
        </div>

        <!--页面结束标签-->
        <v-pageEndTag @click.native="showVconsole()"></v-pageEndTag>
      </div>
    </v-refresh>
    <!--营销swiper弹窗-->
    <div>
      <swiperPopup ref="swiperPopup"></swiperPopup>
    </div>
    <!--给个好评弹窗-->
    <div class="evaluatePopup">
      <confirm ref="praisedialog" :modal-options.sync="modal">
      </confirm>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Skeleton } from 'vant';
  import swiperPopup from 'components/common/popup/swiperPopup';
  import productRecommendModule from './productModule/productRecommendModule.vue';
  import bankProductModule from './productModule/bankProductModule.vue';
  import fixedProductModule from './productModule/fixedProductModule.vue';
  import transferProductModule from './productModule/transferProductModule.vue';

  export default {
    components: {
      'van-skeleton': Skeleton,
      'swiperPopup': swiperPopup,
      'productRecommend': productRecommendModule,
      'bankProductModule': bankProductModule,
      'fixedProductModule': fixedProductModule,
      'transferProductModule': transferProductModule
    },
    data() {
      return {
        swiperOption: {
          preloadImages: true,
          updateOnImagesReady: true,
          notNextTick: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'swiper-container-bullet',
            bulletActiveClass: 'swiper-container-bullet-active'
          },
          observer: true
        },
        centerSwiperOption: {
          preloadImages: true,
          updateOnImagesReady: true,
          notNextTick: true,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'swiper-container-bullet',
            bulletActiveClass: 'swiper-container-bullet-active'
          },
          observer: true
        },
        mainBannerList: [],
        mainBannerMiddleList: [],
        activityIconList: [],
        pageConfig: {
          headerLeft: this.headerBtn.bhfaeLogo,
          headerRight: [this.headerBtn.message, this.headerBtn.service],
          headerBg: this.headerColor.transparent,
          navigation: true,
          gradientBar: {
            opacity: 0,
            color: this.headerColor.darkBlue2
          },
          underHeader: true
        },
        fixedProductList: [],
        bannerHeight: '1.86rem',
        defaultImg: 'this.src="' + require('../../../../static/img/loading-login@3x.png') + '"',
        modal: {
          color: true,
          showCancelButton: false,
          confirmButtonText: '去给好评',
          isShowCloseBtn: true,
          min: true,
          highpraise: true
        },

        transferProductList: [], // 转让申请列表
        swiperImgList: [],
        childrenElement: '',

        productRecommendList: [], // 产品推荐列表

        mainBannerImgList: [],
        mainBannerBottomList: [],
        isNeedShowProcessLoginAlert: true,

        bankModuleHeightBase: 0.905,
        bankProductModuleList: [],
        bankProductList: [],
        bankDepositProductList: [],
        bankStructureProductList: [],
        bankShowType: '1',
        bankShowTypes: {
          'queryFailed': '0',
          'showSkeleton': '1',
          'empty': '2'
        }
      };
    },
    activated() {
      this.$refs.swiperPopup.show = false;
      this.keepAliveTimeStamp(this.$route.name, () => {
        this.keepAliveFnc();
      });
      if (this.entryCheckAction()) { // 推送,链接 打开APP,需执行相关动作
        this.$nextTick(() => {
          this.entryDoAction();
        })
      } else {
        // 处理首页弹窗展示逻辑
        this.handleAlert();
      }

      this.pageConfig.gradientBar.opacity = 0;
      this.pageConfig.gradientBar.color = this.headerColor.darkBlue2;
      this.sendMsgToParent();
      // 监听scroll事件
      this.childrenElement = this.$refs.refresh.$refs.viewBox;
      this.childrenElement.addEventListener('scroll', this.eventListenerScroll, false);
    },
    mounted() {
      this.reSizeBannerHeight();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    beforeRouteLeave(to, from, next) {
      // 监听scroll事件移除
      this.childrenElement.removeEventListener('scroll', this.eventListenerScroll, false);
      next();
    },
    created() {
      // 固收转让购买成功以后刷新列表
      this.$bus.on('refresh_transferList', this.queryTransferList);
    },
    methods: {
      // 监听屏幕滑动
      eventListenerScroll() {
        let scrollTop = parseFloat(this.childrenElement.scrollTop);
        this.pageConfig.gradientBar.opacity = this.pageScroll(scrollTop);
        this.sendMsgToParent();
      },
      keepAliveFnc() {
        // 查询产品推荐列表
        this.getProductPreferList((productList) => {
          this.productRecommendList = [];
          this.productRecommendList = productList;
        });

        this.queryMainBannerList();
        this.queryMainIconList();
        this.queryMainBannerMiddleList();
        // 已登录首页轮播图(图标下方)
        this.queryMainBannerImgList();
        // 已登录首页轮播图(银行产品下方)
        this.queryMainBannerBottomList();

        this.queryFixedIncomeProductList();

        this.bankShowType = this.bankShowTypes.showSkeleton;
        // 查询银行产品模块及产品列表
        this.queryBankProducts();

        // 查询转让申请列表
        this.queryTransferList();
      },
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen(params) {
        if (params.btnType === this.headerBtn.message) {
          // 跳转系统消息
          const params = {
            'action': 'news'
          };
          this.showAppH5(params);
        } else if (params.btnType === this.headerBtn.service) {
          // 跳转智齿客服
          this.showCustomerService();
        }
      },
      // banner图/活动icon跳转链接
      jumpLink(item) {
        if (!this.isNotEmpty(item.link)) return;
        this.mtj_event('app_homePage_swiper_' + item.contentItemId, '已登录首页轮播图或活动icon点击' + item.contentItemId + this.notEmpty(item.title, ''));
        if (item.contentId === 'MAIN_ICON') {
          this.analysys.ma_activityClick(item);
        } else {
          this.analysys.ma_bannerClick(item);
        }
        this.showBhfaeBrowser(this.urlJoinCommonParam(item.link))
      },
      // 动态设置主banner组件高度
      reSizeBannerHeight() {
        this.checkUserAgent(() => { // iPhone X
          this.bannerHeight = '2.10rem'; // 2.18
        }, () => { // iPhone
          this.bannerHeight = '1.86rem'; // 1.94
        }, () => { // Android
          this.bannerHeight = '1.66rem'; // 1.74
        });
      },
      handleAlert() {
        if (this.isUserRealName() === false) {
          // 未实名,引导去实名
          this.emitShowRealNameAlert();
        } else {
          // 权限校验
          this.handlePermissionAlert();
        }
      },
      // 授权弹窗逻辑处理
      handlePermissionAlert() {
        const token = this.getSessionStorage("token");
        const permissionKey = this.getLocalStorage("bhfae_accountPermissionFlag");
        if (this.checkToken(token) && permissionKey !== token) { // 登录后token且与账户权限标志不一致
          this.isNeedShowProcessLoginAlert = true;
          this.setLocalStorage("bhfae_accountPermissionFlag", token);
          this.checkAllPermissions(this.doGetBhfaeDeviceInfo, this.afterPermission);
          setTimeout(() => {
            this.afterPermission();
          }, 10000)
        } else {
          this.processLoginAlert(); // 不需要权限弹框则继续执行 登录后的弹框逻辑
        }
      },
      doGetBhfaeDeviceInfo() {
        this.getBhfaeDeviceInfo((permissionDenyNames) => {
          if (this.isNotEmpty(permissionDenyNames)) {
            const msg = `您已设置拒绝滨海国金所获取${permissionDenyNames.join()}权限。您可在“设置-应用-权限管理”下修改对应的权限设置，以获得更加优质的服务。`;
            this.$alert(msg, '', () => {
              this.afterPermission();
            });
          } else {
            this.afterPermission();
          }
        });
      },
      afterPermission() {
        if (this.isNeedShowProcessLoginAlert) {
          this.isNeedShowProcessLoginAlert = false;
          this.processLoginAlert();
        }
      },
      processLoginAlert() {
        if (this.isShowPopup_ad()) { // 是否展示营销(智惠存)弹框
          this.queryPopupList(() => {
            this.handleRateAlert();
          });
        } else {
          this.handleRateAlert();
        }
      },
      isShowPopup_ad() {
        return this.getSessionStorage('bhfae_popup_ad') !== '1';
      },
      // 查询swipe弹窗图片URL
      queryPopupList(callback) {
        this.queryActivityList(this.contentIdType.POPUP, contentList => {
          this.swiperImgList.splice(0, this.swiperImgList.length);
          if (this.isNotEmpty(contentList)) {
            this.swiperImgList = contentList;
            this.swipePopupShow();
          } else {
            callback();
          }
        }, () => {
          callback();
        }, () => {
          callback();
        });
      },
      // swipe弹窗弹出
      swipePopupShow() {
        this.setSessionStorage('bhfae_popup_ad', '1');
        if (!this.getAppPageName() === 'homePage') return;
        this.$refs.swiperPopup.img_list = this.swiperImgList;
        this.$refs.swiperPopup.reloadData();
        this.$refs.swiperPopup.show = true;
      },
      // 处理评分逻辑
      handleRateAlert() {
        if (this.isShowRatePopup() && this.getAppPageName() === 'homePage') {
          this.scorePopupShow();
        }
      },
      onRefresh(done) {
        this.keepAliveFnc();
        done();
      },
      // 查询固收产品列表
      queryFixedIncomeProductList() {
        const params = {
          rows: '3'
        };
        this.queryRegularProductList(params, (productList) => {
          this.fixedProductList = productList;
        });
      },
      // 查询主banner图列表
      queryMainBannerList() {
        this.queryActivityList(this.contentIdType.MAIN_LOGIN_BANNER, contentList => {
          this.mainBannerList.splice(0, this.mainBannerList.length);
          if (this.isNotEmpty(contentList)) {
            this.mainBannerList = contentList;
          } else {
            this.mainBannerList = [{img: '../../../../static/img/loading-login@3x.png'}];
          }
        });
      },
      // 查询副banner图列表
      queryMainBannerMiddleList() {
        this.queryActivityList(this.contentIdType.MAIN_LOGIN_BANNER_MIDDLE, contentList => {
          this.mainBannerMiddleList = [];
          this.mainBannerMiddleList = contentList;
        });
      },
      // 查询底部banner图列表
      queryMainBannerBottomList() {
        this.queryActivityList(this.contentIdType.MAIN_LOGIN_BANNER_B, contentList => {
          this.mainBannerBottomList = [];
          this.mainBannerBottomList = contentList;
        });
      },
      // 查询主banner下方图图片列表
      queryMainBannerImgList() {
        this.queryActivityList(this.contentIdType.MAIN_LOGIN_BANNER_A, (contentList) => {
          this.mainBannerImgList = [];
          this.mainBannerImgList = contentList.length > 1 ? contentList.slice(0, 2) : []; // 列表元素数量小于2不展示,大于2只展示前2条
        });
      },
      // 查询icon展示列表
      queryMainIconList() {
        this.queryActivityList(this.contentIdType.MAIN_ICON, (contentList) => {
          this.activityIconList = [];
          this.activityIconList = contentList.length > 1 ? contentList.slice(0, 4) : []; // 列表元素数量小于2不展示,大于4只展示前4条
        });
      },
      viewDetails(product) {
        this.analysys.ma_btnClick('跳转固收产品详情');
        const params = {
          'action': 'regular_product_list',
          'productId': product.productId
        };
        this.showAppH5(params);
      },
      scorePopupShow() {
        if (this.isDayOverTime() && this.isIOSDevice()) {
          this.checkRankDisplayType(() => {
            this.toPromiseFun();
          });
        }
      },
      //点击吐槽、去好评按钮回调函数
      toPromiseFun() {
        this.$refs.praisedialog.confirm().then(() => {
          this.mtj_event('app_homePage_highpraise_btn', '首页点击给好评');
          this.analysys.ma_btnClick('首页点击给好评');
          this.openAppStore(); // 跳转应用商店
          this.$refs.praisedialog.show = false;
        });
      },
      // 点击重新查询银行列表按钮
      refreshBankList() {
        this.analysys.ma_btnClick('点击重新查询银行列表按钮');
        this.bankShowType = this.bankShowTypes.showSkeleton;
        // 查询银行产品模块及产品列表
        this.queryBankProducts();
      },
      // 查询银行产品模块及产品列表
      queryBankProducts() {
        // 获取银行产品模块信息
        this.getProductModuleList((moduleList) => {
          if (this.isNotEmpty(moduleList)) {
            this.bankProductModuleList = this.notEmpty(moduleList, []);
            this.bankDepositProductLists();
            this.structureDepositProductList();
          }
          this.bankShowType = this.bankShowTypes.empty;
        }, () => { // 请求失败
          this.bankShowType = this.bankShowTypes.queryFailed;
        });
      },
      // 查询银行活期/定享/期享产品列表
      bankDepositProductLists() {
        const typeSmart = this.accountAssetType().OPEN_DEPOSIT;
        const typeBill = this.accountAssetType().BILL_DEPOSIT;
        const typePeriodic = this.accountAssetType().PERIODIC_DEPOSIT;
        const param = {
          'productType': `${typeSmart},${typeBill},${typePeriodic}`
        };
        this.queryDepositProductList(param, (res) => {
          let productList = this.notEmpty(res.body, []);
          if (this.isNotEmpty(productList)) {
            // 产品列表各产品利率求和
            productList.forEach((item, index, arr) => {
              item.totalRate = this.rateSum(item.expectRate, item.extraRate, item.saleRate);
              item.moduleId = this.notEmpty(item.subModuleId, '').substring(0, 1);
            });
          }
          this.bankDepositProductList = productList;
          this.bankProductList = [];
          this.bankProductList = this.bankDepositProductList.concat(this.bankStructureProductList);
          this.handleProductModuleData(this.bankProductList);
        });
      },
      // 查询益享(结构化存款)产品列表
      structureDepositProductList() {
        this.queryStructureDepositProductList({}, (res) => {
          let productList = this.notEmpty(res.body, []);
          if (this.isNotEmpty(productList)) {
            // 产品列表各产品利率求和
            productList.forEach((item, index, arr) => {
              item.totalRate = this.rateSum(item.expectRate, item.extraRate, item.saleRate);
              item.moduleId = this.notEmpty(item.subModuleId, '').substring(0, 1);
            });
          }
          this.bankStructureProductList = productList;
          this.bankProductList = [];
          this.bankProductList = this.bankDepositProductList.concat(this.bankStructureProductList);
          this.handleProductModuleData(this.bankProductList);
        });
      },
      // 处理主/子模块产品列表
      handleProductModuleData(productLists) {
        // 循环遍历产品模块
        let [...handleModuleList] = this.bankProductModuleList;
        handleModuleList.forEach(module => {
          // 匹配产品模块对应产品
          const moduleProductList = productLists.filter(item => item.moduleId === module.moduleId);
          module['productList'] = this.sortProductsByFields(moduleProductList);
          // 匹配产品子模块对应产品
          module.productSubModuleList.forEach(subModule => {
            subModule['productList'] = this.sortProductsByFields(moduleProductList).filter(item => item['subModuleId'] === subModule['subModuleId']);
          });
          // 子集产品判空
          module['productSubModuleList_render'] = module.productSubModuleList.filter(item => this.isNotEmpty(item.productList));
          // 获取子产品模块最大利率/最小利率
          module['productSubModuleList_render'].forEach(subModule => {
            subModule.maxRate = Math.max.apply(Math, subModule.productList.map(function (product) {
              return product.totalRate;
            }));
            subModule.minRate = Math.min.apply(Math, subModule.productList.map(function (product) {
              return product.totalRate;
            }));
          });
          // 此处参数用于组件"展开更多"功能
          const listLength = module['productSubModuleList_render'].length;
          module['moduleInitHeight'] = (listLength >= 2 ? this.bankModuleHeightBase * 2  : this.bankModuleHeightBase * listLength) + 'rem';
          module['moduleAllHeight'] = this.bankModuleHeightBase * listLength + 'rem';
        });
        this.bankProductModuleList = [];
        this.bankProductModuleList = handleModuleList;
      },
      // 查询转让申请列表
      queryTransferList() {
        this.ajax(this.apiType().queryTransferApplyList, this.serviceType().query, {}, (responseData) => {
          if (this.isNotEmpty(responseData.body)) {
            this.transferProductList = responseData.body.filter((value, index) => index < 3);
          } else {
            this.transferProductList = [];
          }
        });
      },
      // 银行推荐产品跳转H5页面
      openRecommendH5(item) {
        if (item.productType === this.accountAssetType().REGULAR_TERM) {
          // 跳转固收产品详情
          this.viewDetails(item);
        } else {
          this.doOpenBankH5(item.productId, true);
          this.analysys.ma_btnClick('跳转银行产品详情');
        }
      },
      // 跳转银行H5页面
      openBankH5(item) {
        this.mtj_event('app_homePage_bcproduct', '首页点击银行存款产品_'+ this.notEmpty(item.shortName, ''));
        try {
          this.analysys.ma_btnClick(`首页点击银行存款产品_${this.notEmpty(item.shortName, '')}`);
        } catch (e) {
        }
        const productIdList = item.productList.map(item => item.productId).join();
        this.doOpenBankH5(productIdList);
      },
      doOpenBankH5(productIdList, isSingleProduct) {
        const params = {
          'action': 'bank_productDetail',
          'productId': productIdList,
          'isFromModule': isSingleProduct ? '' : '1'
        };
        this.showAppH5(params);
      },
      jumpInvestmentFrontPage(){
        this.analysys.ma_btnClick('首页点击鸿运来尊享更多跳转到财富页')
        this.$router.push({
          name: 'investmentFrontPage',
          params: {
            swiperProductModuleTag: 'swiperHonourEnjoy'
          }
        })
      },
      jumpTransferProductList() {
        this.mtj_event('app_homePage_ts_productList', '首页点击跳转固收转让受让产品列表页');
        this.analysys.ma_btnClick('首页点击鸿运来专区的更多')
        const params = {
          'action': 'regular_transfer_list'
        };
        this.showAppH5(params);
      },
      // 查询转让申请列表跳转
      transferProductClick(item) {
        this.mtj_event('app_homePage_ts_proInfo', '首页点击跳转固收转让受让产品');
        this.analysys.ma_btnClick('首页点击跳转固收转让受让产品');
        const params = {
          'action': 'regular_transferDetails',
          'productId': item.productId,
          'originalTradeAccountId': item.originalTradeAccountId
        };
        this.showAppH5(params);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../static/css/swiper.min.css"
  @import "homePage.styl"

  .scale-1px {
    position: relative;
    /*margin-bottom: 20px;*/
    border: none;
  }

  .scale-1px:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #D7A853;
    border-radius: 5px
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: left top;
    transform-origin: left top;
    z-index 4
  }

  .evaluatePopup .modal .modal-footer .btn-active
    border-left-1px(0px, #D2D7E0)

</style>
