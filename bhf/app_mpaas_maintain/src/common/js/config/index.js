import Vue from 'vue';

let env_config = process.env.ENV_CONFIG;

Vue.prototype.apiUrl = function () {
  return {
    onlineServer: switchUrl_online(),
    activityServer: switchUrl_activity()
  }
};

function switchUrl_online() {
  switch (env_config) {
    case 'build195':
      return 'http://139.199.49.195:1081/gateway/';
    case 'build21': // 国寿牛测试
      return 'http://10.20.200.21:81/online-server/';
    case 'build21pub': // 21 公网
      return 'http://114.251.152.84:20081/online-server/';
    case 'build131': // 挡板测试
      return 'http://10.20.200.131:81/online-server/';
    case 'build131pub': // 挡板测试公网
      return 'http://114.251.152.84:9181/online-server/';
    case 'build11': // 开发
      return 'http://10.20.200.11:81/online-server/';
    case 'build101':
      return 'http://10.20.200.101:81/online-server/';
    case 'build101pub': // 101 公网
      // return 'http://114.251.152.84:9081/online-server/';
      return 'https://h5-testapp.bhfae.com:9081/online-server/'
    case 'build111':
      return 'http://10.20.200.111:81/online-server/';
    case 'build111pub': // 111 公网
      return 'http://114.251.152.84:7081/online-server/';
    case 'build121':
      return 'http://10.20.200.121:81/online-server/';
    case 'build121pub': // 121 公网
      return 'http://114.251.152.84:8081/online-server/';
    case 'build91':
      return 'http://10.10.200.91:81/online-server/';
    case 'release':
    case 'prepare':
      return 'https://app.wms.bhfae.com/gateway/';
    default:
      return 'online-server/';
  }
}

function switchUrl_activity() {
  switch (env_config) {
    case 'build195':
      return 'http://139.199.49.195:1081/gateway/';
    case 'build21': // 国寿牛测试
      return 'http://10.20.200.21:81/activity-server/';
    case 'build21pub': // 21 公网
      return 'http://114.251.152.84:20081/activity-server/';
    case 'build131': // 挡板测试
      return 'http://10.20.200.131:81/activity-server/';
    case 'build131pub': // 挡板测试公网
      return 'http://114.251.152.84:9181/activity-server/';
    case 'build11': // 开发
      return 'http://10.20.200.11:81/activity-server/';
    case 'build101':
      return 'http://10.20.200.101:81/activity-server/';
    case 'build101pub': // 101 公网
      // return 'http://114.251.152.84:9081/activity-server/';
      return 'https://h5-testapp.bhfae.com:9081/activity-server/';
    case 'build111':
      return 'http://10.20.200.111:81/activity-server/';
    case 'build111pub': // 111 公网
      return 'http://114.251.152.84:7081/activity-server/';
    case 'build121':
      return 'http://10.20.200.121:81/activity-server/';
    case 'build121pub': // 121 公网
      return 'http://114.251.152.84:8081/activity-server/';
    case 'build91':
      return 'http://10.10.200.91:81/activity-server/';
    case 'release':
    case 'prepare':
      return 'https://activity.wms.bhfae.com/gateway/';

    default:
      return 'activity-server/';
  }
}

Vue.prototype.isProduction = function () {
  return env_config === 'release' || env_config === 'prepare';
};

// 文件地址
Vue.prototype.getFileHost = function () {
  switch (env_config) {
    case 'build195':
      return 'http://139.199.49.195:99';
    case 'build21': // 国寿牛测试
      return 'http://10.20.200.21:99';
    case 'build21pub': // 21 公网
      return 'http://114.251.152.84:20099';
    case 'build131': // 挡板测试
      return 'http://10.20.200.131:99';
    case 'build131pub': // 挡板测试公网
      return 'http://114.251.152.84:9199';
    case 'build11': // 开发
      return 'http://10.20.200.11:99';
    case 'build101':
      return 'http://10.20.200.101:99';
    case 'build101pub': // 101 公网
      // return 'http://114.251.152.84:9099';
      return "https://h5-testapp.bhfae.com:9099";
    case 'build111':
      return 'http://10.20.200.111:99';
    case 'build111pub': // 111 公网
      return 'http://114.251.152.84:7099';
    case 'build121':
      return 'http://10.20.200.121:99';
    case 'build121pub': // 121 公网
      return 'http://114.251.152.84:8099';
    case 'build91':
      return 'http://10.10.200.91:99';
    case 'release':
    case 'prepare':
      return 'https://wf-public.bhfae.com';
    default:
      return 'https://wf-public.bhfae.com';
  }
};

// H5地址
Vue.prototype.getH5Host = function() {
  switch (env_config) {
    case "build195":
      return "http://139.199.49.195:99";
    case 'build21': // 国寿牛测试
      return 'http://10.20.200.21:99';
    case 'build21pub': // 21 公网
      return 'http://114.251.152.84:20099';
    case 'build131': // 挡板测试
      return 'http://10.20.200.131:99';
    case 'build131pub': // 挡板测试公网
      return 'http://114.251.152.84:9199';
    case "build11": // 开发
      return "http://10.20.200.11:99";
    case "build101":
      return "http://10.20.200.101:99";
    case "build101pub": // 101 公网
      // return "http://114.251.152.84:9099";
      return "https://h5-testapp.bhfae.com:9099";
    case "build111":
      return "http://10.20.200.111:99";
    case 'build111pub': // 111 公网
      return 'http://114.251.152.84:7099';
    case "build121":
      return "http://10.20.200.121:99";
    case 'build121pub': // 121 公网
      return 'http://114.251.152.84:8099';
    case 'build91':
      return 'http://10.10.200.91:99';
    case "release":
    case 'prepare':
      return "https://h5-cdn.bhfae.com";
    default:
      return "https://h5-cdn.bhfae.com";
  }
};

// 错误日志上传地址
Vue.prototype.getCrashHost = function () {
  switch (env_config) {
    case 'build195':
      return 'http://139.199.49.195:93/crash';
    case 'build11': // 开发
      return 'http://10.20.200.11:93/crash';
    case 'build101':
      return 'http://10.20.200.101:93/crash';
    case "build101pub": // 101 公网
      return 'https://crash.bhfae.com/crash';
    case 'build111':
      return 'http://10.20.200.111:93/crash';
    case "build111pub": // 111 公网
      return 'https://crash.bhfae.com/crash';
    case 'build121':
      return 'http://10.20.200.121:93/crash';
    case 'dev':
      return 'http://10.20.200.21:93/crash'; // 本地起项目暂时上传至48
    case 'build91':
      return 'http://10.10.200.91:93/crash';
    case 'release':
    case 'prepare':
      return 'https://crash.bhfae.com/crash';
    default:
      return 'http://10.20.200.21:93/crash'; // 默认打包暂时上传至48
  }
};


// 获取包名
Vue.prototype.getAppPackageName = function () {
  return 'com.bhfae.fae.production';
};

// 在app store中的appId
Vue.prototype.getAppIdInAppStore = function () {
  return '1188594060';
};

// 后台返回前台超时时间 min
Vue.prototype.getTimeOutInterval = function () {
  return Vue.prototype.isProduction() ? 30 : 10;
};

// 页面keep-alive超时时间min
Vue.prototype.keepAliveOverTime = 2;

// 获取页面路由key
Vue.prototype.appPageName = 'pageName';
// 获取页面路由名称
Vue.prototype.getAppPageName = function () {
  return Vue.prototype.getSessionStorage(this.appPageName);
};
// 网络恢复事件监听key
Vue.prototype.getNetWorkKey = function () {
  return Vue.prototype.getSessionStorage(Vue.prototype.appPageName) + '_netOk';
};

// 回退事件监听key
Vue.prototype.getRouterBackKey = function () {
  return Vue.prototype.getSessionStorage(Vue.prototype.appPageName) + '_back';
};

// 路由回退事件
Vue.prototype.routerBack = function () {
  this.$router.isBack = true;
  this.$router.back(-1);
};

// app 下载连接 (所有入口,包括版本升级和官网二维码都是这个)
Vue.prototype.downloadAppUrl = function () {
  let h5Url = window.globalVue.$store.getters.h5Url;
  let downloadAppUrl = 'https://h5-cdn.bhfae.com/common/app/web/download_app/index.html';
  if (h5Url.indexOf('https') !== -1) {
    downloadAppUrl = h5Url + this.fileRelativePath() + '/web/download_app/index.html';
  }
  return downloadAppUrl;
};

// 登录超时
Vue.prototype.loginTimeOutKey = 'loginTimeOutKey';

// 设备信息(经度,维度,imei,imsi)
Vue.prototype.bhfaeDeviceKey = 'bhfae_device_attach';

Vue.prototype.paramValueType = {
  FILE_SERVER_URL: 'FILE_SERVER_URL', //file url
  QUERY_ONLINE_H5_SERVER_URL: 'QUERY_ONLINE_H5_SERVER_URL', //H5 url
  KEYBOARD_CONFUSE_SWITCH: 'KEYBOARD_CONFUSE_SWITCH', //是否混淆键盘
  QUERY_ONLINE_APP_VERSION_ANDROID: 'QUERY_ONLINE_APP_VERSION_ANDROID', //app最新版本android
  QUERY_ONLINE_APP_VERSION_IOS: 'QUERY_ONLINE_APP_VERSION_IOS', //app最新版本ios
  APP_CLIENT_UPDATE_ANDROID: 'APP_CLIENT_UPDATE_ANDROID', //android客户端更新地址
  APP_CLIENT_UPDATE_IOS: 'APP_CLIENT_UPDATE_IOS', //ios客户端更新地址
  PASSWORD_SECRET: 'PASSWORD_SECRET', //秘钥
  QUERY_ONLINE_H5_VERSION: 'QUERY_ONLINE_H5_VERSION', //查询H5版本号
  QUERY_ONLINE_SUBSCRIBE_POPUP_SWITCH: 'QUERY_ONLINE_SUBSCRIBE_POPUP_SWITCH', //查询是否弹框提示'合格投资者承诺'弹框
  QUERY_ONLINE_SUBSCRIBE_POPUP_CONTENT: 'QUERY_ONLINE_SUBSCRIBE_POPUP_CONTENT', //查询弹窗内容
  QUERY_ONLINE_SUBSCRIBE_POPUP_INTERVAL: 'QUERY_ONLINE_SUBSCRIBE_POPUP_INTERVAL', //查询弹窗频率
  QUERY_ONLINE_CHARITY_PRODUCT_URL: 'QUERY_ONLINE_CHARITY_PRODUCT_URL', // 查询 国善行 守护计划链接地址
  OFFLINE_REMIT_MIN: 'OFFLINE_REMIT_MIN', //大额充值申请金额下限(含)
  LOGIN_PASSWORD_MODIFY_INTERVAL_DAY: 'LOGIN_PASSWORD_MODIFY_INTERVAL_DAY' // 修改密码弹窗

};

// 查询字典项ID配置
Vue.prototype.dictListType = {
  CUSTOMER_PROFESSION: 'CUSTOMER_PROFESSION', // 职业类型
  LOGIN_TYPE: 'LOGIN_TYPE',
  CUSTOMER_RISK: 'CUSTOMER_RISK', // 风险评估字典项
  PRODUCT_SORT_DAY: 'PRODUCT_SORT_DAY' // 银行产品期限过滤项
};

// 查询活动ID配置
Vue.prototype.contentIdType = {
  ASSET_ICON: 'ASSET_ICON', // 我的页面上部分icon
  ASSET_ICON_A: 'ASSET_ICON_A', // 我的页面底部icon
  POPUP: 'POPUP', // 查询弹窗配置
  MAIN_LOGIN_BANNER: 'MAIN_LOGIN_BANNER', // 查询主banner图列表
  MAIN_LOGIN_BANNER_MIDDLE: 'MAIN_LOGIN_BANNER_MIDDLE', // 查询副banner图列表
  MAIN_LOGIN_BANNER_B: 'MAIN_LOGIN_BANNER_B', // 查询底部banner图列表
  MAIN_LOGIN_BANNER_A: 'MAIN_LOGIN_BANNER_A', // 查询主banner下方图图片列表
  MAIN_ICON: 'MAIN_ICON', // 查询icon展示列表
  PRODUCT_DEPOSIT_BANNER_A: 'PRODUCT_DEPOSIT_BANNER_A', // 查询顶部银行产品banner列表 投资页
  PRODUCT_REGULAR_BANNER_A: 'PRODUCT_REGULAR_BANNER_A', //  查询顶部固收产品banner列表 投资页
  ASSET_BANNER_PRODUCT: 'ASSET_BANNER_PRODUCT ' // 资产页高端产品轮播图
};

// TODO: 生产改成正式SCHEME
Vue.prototype.URL_SCHEME = {
  BHFAE_APP: 'bhfaeapp://',
  BHFAE_H5: 'h5.bhfae.com://',
  BHFAE_H5_NPAY: 'npay.meituan.com://'
};
