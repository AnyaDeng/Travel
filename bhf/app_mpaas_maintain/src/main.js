// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import routes from './router';
import VueBus from 'vue-bus';
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'common/stylus/index.styl';
import VeeValidate from 'vee-validate';
import rules from 'common/js/validate.js';
import popup from 'common/js/common/popup.js';
import filterFunc from 'common/js/common/filterFunc.js';
import common from 'common/js/common/common.js';
import account from 'common/js/common/account.js';
import device from 'common/js/common/device.js';
import mtj from 'common/js/common/mtj.js';
import push from 'common/js/common/push.js';
import sms from 'common/js/common/sms.js';
import storage from 'common/js/common/storage.js';
import net from 'common/js/common/net.js';
import rate from 'common/js/common/rate.js';
import wxShare from 'common/js/common/wxShare.js';
import webHub from 'common/js/common/webHub.js';
import nebulajssdk from 'common/nebula-js-sdk/nebula-js-sdk'
import entryHub from 'common/js/common/entryHub.js';
import {store} from 'common/js/store/store';
import {iosSelect} from 'common/js/store/iosSelect';
import project from 'common/js/project';
import confirm from 'components/common/popup/popup.vue';
import confirmImgTextClose from 'components/common/popup/popupImgTextClose.vue';
import pullRefresh from 'components/common/pull-refresh/pull-refresh';
import refresh from 'components/common/pull-refresh/refresh';
import VueCordova from 'vue-cordova';
import netWorkAnomaly from 'components/common/popup/netWorkAnomaly';
import VueLazyLoad from 'vue-lazyload';
import config from 'common/js/config/index.js';
import alloylever from 'common/js/alloy/alloylever.js';

import productQuery from 'common/js/common/productQuery.js';
import tradeUtil from 'common/js/common/tradeUtil.js';
// 自定义vue事件(按钮点击置灰效果专用)
// 需修改点击效果,在子组件标签中添加----> :touchClass="'btnStyleNew'"
import customLi from 'components/common/touch/customLi.vue';
import customLiClick from 'components/common/touch/customLiClick.vue';
import smsCodeReminder from 'components/common/mobileValidateCode/smsCodeReminder'; // 短信提醒

// 页面结束标签
import pageEndTag from "components/common/pageEndTag/pageEndTag";
Vue.component("v-pageEndTag", pageEndTag);

import analysys from 'common/js/common/analysys.js'
Vue.prototype.analysys = analysys;

if (isBuildWithCordova()) { // 在手机APP运行
  Vue.component('custom-li', customLi);
} else { // 此处判断仅为兼容自动化测试时浏览器无法识别touch事件问题
  Vue.component('custom-li', customLiClick);
}
Vue.component('v-smsCodeReminder', smsCodeReminder);
Vue.component('confirm', confirm);
Vue.component('confirmImgTextClose', confirmImgTextClose);
Vue.component('v-scroll', pullRefresh);
Vue.component('v-refresh', refresh);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VeeValidate);
Vue.use(VueBus);
Vue.use(VueAwesomeSwiper);
Vue.use(VueCordova);
Vue.component('v-netWorkAnomaly', netWorkAnomaly);
Vue.use(VueLazyLoad, {
  error: './static/img/loading-login@3x.png',
  loading: './static/img/loading-login@3x.png'
});
import 'common/stylus/index.styl';

// add cordova.js only if serving the app through file://
let isFileProtocol = (window.location.protocol === 'file:' || window.location.port === '3000');
let isInApp = isBuildWithCordova();
if (isFileProtocol && isInApp) { // file协议 并且 在手机上运行
  let cordovaScript = document.createElement('script');
  cordovaScript.setAttribute('type', 'text/javascript');
  cordovaScript.setAttribute('src', 'cordova.js');
  document.body.appendChild(cordovaScript);

  let urlScript = document.createElement('script');
  urlScript.setAttribute('type', 'text/javascript');
  urlScript.setAttribute('src', 'js/handleOpenURL.js');
  document.body.appendChild(urlScript);
}

let bhfaeOpenScript = document.createElement('script');
bhfaeOpenScript.setAttribute('src', './static/nebula-js-sdk/bhfaeOpen-100.2.4.min.js')
document.body.appendChild(bhfaeOpenScript)

const router = new VueRouter({
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

window.globalVue = new Vue({
  router,
  store,
  template: '<App/>',
  components: {
    App,
    rules,
    popup,
    filterFunc,
    common,
    account,
    device,
    mtj,
    push,
    sms,
    storage,
    net,
    rate,
    wxShare,
    webHub,
    nebulajssdk,
    entryHub,
    project,
    routes,
    config,
    alloylever,
    productQuery,
    tradeUtil
  },
  data: {
    eventHub: new Vue()
  }
}).$mount('#app');

if (isBuildWithCordova()) { // 在手机APP运行
  document.addEventListener("deviceready", function () {
    doInit();
    setTimeout(function () {
      doDeviceReady();
    }, 4000);
  }, false);
} else { // 浏览器
  router.addRoutes(Vue.prototype.routes);
  let toPath = router.history.current.fullPath;
  if (Vue.prototype.checkToken()) {
    if (toPath === '/') {
      router.push('/homePage');
    } else {
      router.push(toPath);
    }
  } else {
    let path = Vue.prototype.getAppLaunchPath();
    router.push(path);
  }
}

function doInit() {
  setTimeout(function () {
    navigator.splashscreen.hide();
  }, 500);

  // 路由添加地址
  router.addRoutes(Vue.prototype.routes);

  // 系统字体变大,防止APP字体变大
  if (window.MobileAccessibility) {
    window.MobileAccessibility.usePreferredTextZoom(false);
  }
  // 监听 安卓虚拟返回按钮点击
  Vue.cordova.on('backbutton', () => {
    onBackKeyDown();
  });
  // 监听 程序暂停(例如,程序从前台进入后台)
  Vue.cordova.on('pause', () => {
    onPause();
  });
  // 监听 程序恢复(例如,程序从后台返回前台)
  Vue.cordova.on('resume', () => {
    onResume();
    validateVersion();
  });
  if (Vue.prototype.isIOSDevice()) {
    Vue.prototype.pushInit(); // iOS 启动初始化推送 安卓在获取位置后再初始化
  }
  Vue.prototype.smsInit();
  // 解决app恢复事件同时触发回退问题-初始化参数
  store.getters.isPause = false;
  // webHub 初始化
  Vue.prototype.initWebHub();
}

function doDeviceReady() {

  if (Vue.prototype.getSessionStorage('deviceready') === '1') {
    Vue.prototype.rewriteTimeStamp();
    router.push('/');
  } else {
    // cordova 就绪
    Vue.prototype.setSessionStorage('deviceready', '1');
    // 初始化页面跳转路径
    let path = Vue.prototype.getAppLaunchPath();
    router.push(path);
  }

}

const whiteList = [
  '/authority',
  '/startPage',
  '/login',
  '/certificateLogin',
  '/unloginHomePage',
  '/registerMobile',
  '/registerSms',
  '/registerResult',
  '/findLoginMobile',
  '/findLoginCertificate',
  '/findLoginValidateCode',
  '/findLoginPassword',
  '/gestureCipher',
  '/fingerprintLogin'
];
if (router.history.current.name && router.history.current.name !== '') {
  Vue.prototype.setSessionStorage(Vue.prototype.appPageName, router.history.current.name);
}
router.beforeEach((to, from, next) => {
  if (Vue.prototype.getSessionStorage('bhfae_showAlert') !== '1') { //  不添加这个判断,升级弹框就弹不出来了
    try {
      Vue.$vux.confirm.hide();
      Vue.$vux.alert.hide();
    } catch (e) {
    }
  }
  if (to.name === Vue.prototype.WEB_HUB) { // 如果是webhub,跳转去webhub.js处理
    Vue.prototype.webhub_backBrowser();
    return;
  }

  if (to.name && to.name !== '') {
    Vue.prototype.setSessionStorage(Vue.prototype.appPageName, to.name);
  }
  let _next = next;
  let _this = Vue.prototype;
  let pageName_out = _this.mtjPageName(from.path);
  _this.mtj_out(pageName_out);

  if (to.path === '/unloginHomePage') {
    if (_this.checkToken()) {
      let pageName_in = _this.mtjPageName('homePage');
      _this.mtj_in(pageName_in);
      _this.analysys.ma_pageView(pageName_in);
      next('/homePage');
    } else {
      let pageName_in = _this.mtjPageName('unloginHomePage');
      _this.mtj_in(pageName_in);
      _this.analysys.ma_pageView(pageName_in);
      next();
    }
  } else if (whiteList.indexOf(to.path) === -1 && !_this.checkToken()) {
    doTabClicked(false, to.name);
    _this.getLoginPath(function (path) {
      let pageName_in = _this.mtjPageName(path);
      _this.mtj_in(pageName_in);
      _this.analysys.ma_pageView(pageName_in);
      _next(path); // _next----vue实例指向问题
    });
  } else {
    doTabClicked(true, to.name);
    let pageName_in = _this.mtjPageName(to.path);
    _this.mtj_in(pageName_in);
    _this.analysys.ma_pageView(pageName_in);
    next();
  }
});

function doTabClicked(isLogin, name) {
  if (name === 'investmentFrontPage') {
    if (isLogin) {
      Vue.prototype.mtj_event('t_invest', '点击投资tab');
      Vue.prototype.analysys.ma_btnClick('点击财富tab');
    } else {
      Vue.prototype.mtj_event('e_goLogin', '未登录点击投资tab');
      Vue.prototype.analysys.ma_btnClick('未登录点击投资tab');
    }
  } else if (name === 'assets') {
    if (isLogin) {
      Vue.prototype.mtj_event('a_asset', '点击资产tab');
      Vue.prototype.analysys.ma_btnClick('点击我的tab');
    } else {
      Vue.prototype.mtj_event('e_goLogin', '未登录点击资产tab');
      Vue.prototype.analysys.ma_btnClick('未登录点击资产tab');
    }
  } else if (name === 'homePage') {
    if (isLogin) {
      Vue.prototype.analysys.ma_btnClick('点击首页tab');
    }
  }
}

function validateVersion() {
  Vue.prototype.validateVersion(); // 版本升级
}

var beginDate; // 两次点击退出按钮开始时间
var isToast = false; // 是否弹出弹框
function onBackKeyDown() {
  // 解决app恢复事件同时触发回退问题-参数校验
  if (store.getters.isPause) {
    return;
  }
  let url = location.href;
  if (disableBackCheck(url)) {
    return;
  }
  if (exitAppCheck(url)) {
    let endDate = new Date().getTime(); // 两次点击退出按钮结束时间
    // 提示过Toast并且两次点击时间小于2S
    if (isToast && endDate - beginDate < 2000) {
      beginDate = endDate;
      isToast = false;
      navigator.app.exitApp();
    } else {
      showToast('再按一次退出程序', 2000);
    }
  } else {
    Vue.prototype.$bus.emit('appBackEcho');
  }
}

function getCurrentPageName(url) {
  let arr = url.split('#/');
  if (arr.length >= 2) {
    return arr[1];
  }
  return null;
}

// 安卓返回按钮 退出APP
function exitAppCheck(url) {
  let pageName = getCurrentPageName(url);
  let exitPages = getExitPageNames();
  return (exitPages.indexOf(pageName) > -1);
}

function getExitPageNames() {
  // 几个一级页面
  return ['unloginHomePage', 'homePage', 'assets', 'investmentFrontPage'];
}

// 安卓返回按钮 无效
function disableBackCheck(url) {
  let pageName = getCurrentPageName(url);
  let pages = getDisableBackPageNames();
  return (pages.indexOf(pageName) !== -1);
}

function getDisableBackPageNames() {
  // 禁用安卓虚拟返回按钮 风险测评结果/充值/提现/投资/百信开户/百信充值-提现-存入-支取 结果页/百信银行智惠存充值-验证码/百信银行智惠存充值-协议支付签约/百信换卡结果页面/投资结果页面(爱心鸿运来)/转让申请结果页/转让受让结果页面
  return ['riskAssessmentResult', 'payResults', 'withdrawResult', 'investmentResult', 'setGestureCipher', 'charity_investmentResult', 'transfer_results', 'transfer_investmentResult'];
}

// 自定义弹框 2s消失
function showToast(msg, duration) {
  isToast = true;
  beginDate = new Date().getTime();
  duration = isNaN(duration) ? 3000 : duration; // duration是不是一个数字
  let m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "width:40%; min-width:160px; background:#000; opacity:0.8; height:30px; color:#fff; line-height:30px; text-align:center; border-radius:15px; position:fixed; top:85%; left:50%; transform: translate(-50%,0);z-index:999999; font-size:12px;";
  document.body.appendChild(m);
  setTimeout(function () {
    let d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function () {
      document.body.removeChild(m)
    }, d * 1000);
  }, duration);
}

function onPause() {
  // 解决app恢复事件同时触发回退问题-app暂停设置参数为true
  store.getters.isPause = true;
  Vue.prototype.$bus.emit('devicePause');
  // 处理暂停事件
  let userInfo = Vue.prototype.getSessionStorage('userInfo');
  if (userInfo && userInfo !== '') {
    Vue.prototype.setSessionStorage('oldTimeStamp', Date.parse(new Date()));
  }
}

function onResume() {
  // 解决app恢复事件同时触发回退问题-app恢复延时300ms初始化参数
  setTimeout(function () {
    store.getters.isPause = false;
  }, 300);
  // 处理恢复事件
  let userInfo = Vue.prototype.getSessionStorage('userInfo');
  if (userInfo && userInfo !== '') {
    let newTimeStamp = Date.parse(new Date());
    let oldTimeStamp = Vue.prototype.getSessionStorage('oldTimeStamp');
    let timeDifference = newTimeStamp - oldTimeStamp;
    let overTime = Vue.prototype.getTimeOutInterval() * 60 * 1000;
    if (timeDifference >= overTime) {
      Vue.prototype.$bus.emit(Vue.prototype.loginTimeOutKey);// 通知 bus 登录超时
      Vue.$vux.confirm.hide(); // 超时隐藏弹框
      Vue.prototype.exitLogin(function () {
        Vue.prototype.getLoginPath(function (path) {
          showToast('登录超时，请重新登录', 2000);
          router.push({
            path: path
          });
        });
      });
    }
  }
}

function isBuildWithCordova() {
  return navigator.userAgent.indexOf('bhfae_cordova') !== -1;
}
