import Vue from 'vue';
import VConsole from 'vconsole';
// 调试面板vconsole调用
let vConsoleCount = 0;
let vConsoleDate = 0;
Vue.prototype.showVconsole = function () {
  if (vConsoleCount < 0) return;
  let newDate = Date.parse(new Date());
  let countDate = newDate - vConsoleDate;
  if (vConsoleCount !== 0 && countDate > 2000) {
    vConsoleCount = 1;
  } else {
    vConsoleCount++;
    if (vConsoleCount > 15) {
      vConsoleCount = -1;
      Vue.prototype.setSessionStorage('bhfae_dragon', '1');
      Vue.prototype.openConsole();
    }
  }
  vConsoleDate = newDate;
};

Vue.prototype.openConsole = function() {
  let consoleBar = new VConsole({
    defaultPlugins: ['system', 'network', 'element', 'storage'],
    maxLogNumber: 5000
  })
};

// 校验是否登录--userInfo
Vue.prototype.isLogin = function () {
  return this.getSessionStorage('userInfo');
};
// 校验是否已实名
Vue.prototype.isUserRealName = function () {
  return this.getUserStorage('isRealName') === '1';
};
// 校验是否已绑卡
Vue.prototype.isUserBindCard = function () {
  return this.getUserStorage('isBindCard') === '1';
};
// 校验是否已设置交易密码
Vue.prototype.isUserSetTradePassword = function () {
  return this.getUserStorage('isSetTradePassword') === '1';
};
// 校验是否已风险评估
Vue.prototype.isUserRisk = function () {
  return this.getUserStorage('risk') !== '';
};
// 校验风险测评结果是否已过期
Vue.prototype.isUserRiskExpire = function () {
  return this.getUserStorage('isRiskExpire') === '1';
};
// 判断跳转路由名称
Vue.prototype.getJumpRouteName = function () {
  let _this = this;
  if (_this.isUserRealName() === false) {
    return 'realName';
  } else if (_this.isUserBindCard() === false) {
    return 'bindBankCard';
  } else if (_this.isUserSetTradePassword() === false) {
    return 'setTradePassword';
  } else if (_this.isUserRiskExpire() === true) {
    return 'riskAssessmentExpire';
  } else if (_this.isUserRisk() === false) {
    return 'riskAssessment';
  } else {
    return '';
  }
};
// 判断跳转路由名称
Vue.prototype.handleJumpRouteName = function () {
  let jumpRouteName = [];
  if (this.isUserRealName() === false) {
    jumpRouteName.push('real_name');
  }
  if(this.isUserBindCard() === false){
    jumpRouteName.push('bind_card');
  }
  if(this.isUserSetTradePassword() === false){
    jumpRouteName.push('trade_password_set');
  }
  return jumpRouteName
};
// 校验入口路由是否存在于配置列表--需配置list列表
let sourcePageList = ['regular_productInfo', 'assets', 'charity_productInfo', 'changeBankCard'];
Vue.prototype.checkSourcePage = function (sourcePage) {
  return sourcePageList.indexOf(sourcePage) !== -1;
};
// 用户是否开启手势登录
Vue.prototype.isUserSetGestureLogin = function () {
  return this.getUserStorage('isSetGesture') === '1';
};
// 用户是否开启指纹登录
Vue.prototype.isUserSetFingerLogin = function () {
  let token = this.getLocalFingerPrint();
  return this.isNotEmpty(token);
};
// 验证登录次数
Vue.prototype.checkLoginTimes = function () {
  let getGuideKeyCnt = this.getLocalStorage(getGuideKey()) !== '' ? JSON.parse(this.getLocalStorage(getGuideKey())) : {};
  if (!getGuideKeyCnt['times']) {
    return '0';
  } else {
    let loginTimes = getGuideKeyCnt['times'];
    if (loginTimes === '') {
      return '0';
    }
    return loginTimes;
  }
};
// 存储登录次数
Vue.prototype.recordLoginTimes = function (count) {
  let times = '';
  if (count) {
    times = count;
  } else {
    times = Number(this.checkLoginTimes()) + 1 + '';
  }
  let getGuideKeyCnt = this.getLocalStorage(getGuideKey()) !== '' ? JSON.parse(this.getLocalStorage(getGuideKey())) : {};
  getGuideKeyCnt['times'] = times;
  this.setLocalStorage(getGuideKey(), JSON.stringify(getGuideKeyCnt));
};

// 触发实名弹框展示
Vue.prototype.emitShowRealNameAlert = function () {
  Vue.prototype.$bus.emit('showRealNameAlert', Vue.prototype.getAppPageName());
};

// 资产页面金额显隐判断
Vue.prototype.isAssetsAmountShow = function (type) {
  let getGuideKeyCnt = this.getLocalStorage(getGuideKey()) !== '' ? JSON.parse(this.getLocalStorage(getGuideKey())) : {};
  return getGuideKeyCnt[type] !== '0';
};
// 存储资产页面金额显隐状态
Vue.prototype.recordAssetsAmountShow = function (status, type) {
  let getGuideKeyCnt = this.getLocalStorage(getGuideKey()) !== '' ? JSON.parse(this.getLocalStorage(getGuideKey())) : {};
  getGuideKeyCnt[type] = status ? '1' : '0';
  this.setLocalStorage(getGuideKey(), JSON.stringify(getGuideKeyCnt));
};

// 查询用户开启/关闭指纹
Vue.prototype.getLocalFingerPrint = function () {
  let getGuideKeyCnt = this.getLocalStorage(getGuideKey()) !== '' ? JSON.parse(this.getLocalStorage(getGuideKey())) : {};
  return getGuideKeyCnt['fingerPrintToken'];
};
// 记录用户开启/关闭指纹
Vue.prototype.setLocalFingerPrint = function (token) {
  let getGuideKeyCnt = this.getLocalStorage(getGuideKey()) !== '' ? JSON.parse(this.getLocalStorage(getGuideKey())) : {};
  getGuideKeyCnt['fingerPrintToken'] = this.notEmpty(token, '');
  this.setLocalStorage(getGuideKey(), JSON.stringify(getGuideKeyCnt));
};

// 查询用户打开鸿运来尊享产品时间戳
Vue.prototype.getScribePopupTime = function () {
  let getGuideKeyCnt = this.getLocalStorage(getGuideKey()) !== '' ? JSON.parse(this.getLocalStorage(getGuideKey())) : {};
  return getGuideKeyCnt['SCRIBE_POPUP_TIME'];
};
// 记录用户打开鸿运来尊享产品时间戳
Vue.prototype.setScribePopupTime = function () {
  let getGuideKeyCnt = this.getLocalStorage(getGuideKey()) !== '' ? JSON.parse(this.getLocalStorage(getGuideKey())) : {};
  let timestamp = Date.parse(new Date());
  getGuideKeyCnt['SCRIBE_POPUP_TIME'] = this.notEmpty(timestamp, '');
  this.setLocalStorage(getGuideKey(), JSON.stringify(getGuideKeyCnt));
};

function getGuideKey() {
  let visitorId = Vue.prototype.getUserStorage('visitorId');
  return 'bhfae_visitor_' + visitorId;
}

// 退出登录
Vue.prototype.exitLogin = function (callback) {
  Vue.prototype.removeSessionStorage('token');
  Vue.prototype.removeSessionStorage('userInfo');
  Vue.prototype.removeSessionStorage("keepAliveTimeStamp");
  Vue.prototype.removeSessionStorage("bhfae_bank_account");
  Vue.prototype.removeSessionStorage("bhfae_tempLogin");
  Vue.prototype.removeSessionStorage("bhfae_popup_ad");
  Vue.prototype.removeSessionStorage("bhfae_bindCard_action");
  Vue.prototype.webhub_exit();
  Vue.prototype.emitCloseRealNameAlert();
  if (callback) {
    callback();
  }
};

// 关闭全局实名弹框
Vue.prototype.emitCloseRealNameAlert = function () {
  Vue.prototype.$bus.emit('closeRealNameAlert');
};

// 校验token
Vue.prototype.checkToken = function () {
  let value = this.getSessionStorage('token');
  let reg = /^[02468][0-9a-z]{32}$/;
  return reg.test(value);
};

Vue.prototype.timeFormat = function (value, fmt) {
  var o = {
    "M+": value.getMonth() + 1,
    "d+": value.getDate(),
    "h+": value.getHours(),
    "m+": value.getMinutes(),
    "s+": value.getSeconds(),
    "q+": Math.floor((value.getMonth() + 3) / 3),
    "S": value.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

// 判断移动设备类型
Vue.prototype.checkUserAgent = function (iphoneX, iphone, android) {
  if (this.isIOSDevice()) {
    if (this.isIphoneX()) {
      iphoneX();
    } else {
      if (iphone) {
        iphone();
      }
    }
  } else {
    if (android) {
      android();
    }
  }
};
// 判断移动设备类型是否为iPhoneX
Vue.prototype.isIphoneX = function () {
  let clientWidth = document.body.clientWidth;
  let clientHeight = document.body.clientHeight;
  if (this.isIOSDevice()) {
    if (clientHeight / clientWidth > 2.16) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
// 判断移动设备类型是否为ios
Vue.prototype.isIOSDevice = function () {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

// 判断是否存在某一类型产品--productType
// 0-固收
// 1-浮动
// 2-基金
// 3-保险
// 4-活期存款
// 5-结构性存款
// 9-虚拟产品

// 查询用户资产
Vue.prototype.queryAccountAsset = function (productType, callback) {
  let param = {
    'productType': this.isNotEmpty(productType) ? productType : ''
  };
  this.ajax(this.apiType().queryAccountAsset, this.serviceType().query, param, function (responseData) {
    if (callback) {
      callback(responseData);
    }
  });
};

// 查询用户资产信息
Vue.prototype.queryShareBalanceList = function (productType, callback) {
  let param = {
    'productType': this.isNotEmpty(productType) ? productType : ''
  };
  this.ajax(this.apiType().queryShareBalanceList, this.serviceType().query, param, function (responseData) {
    if (callback) {
      callback(responseData);
    }
  });
};

// 平台-查询账户余额
Vue.prototype.queryAvailableCapitalBalance = function (callback) {
  this.ajax(this.apiType().queryAvailableCapitalBalance, this.serviceType().query, {}, function (responseData) {
    if (callback) {
      callback(responseData);
    }
  });
};

// 查询用户是否是慈善户
Vue.prototype.queryAccountCharity = function (callback) {
  this.ajax(this.apiType().queryAccountCharity, this.serviceType().query, {}, function (responseData) {
    if (callback) {
      callback(responseData.body[0].accountCharityStatus === '1');
    }
  }, function () {
    callback(false)
  }, function () {
    callback(false)
  });
};

// 请求风险评估字典项
Vue.prototype.fetchDict = function (callback) {
  let _this = this;
  this.ajax(this.apiType().queryDictList, this.serviceType().query, {
    "dictId": _this.dictListType.CUSTOMER_RISK
  }, function (responseData) {
    _this.$store.dispatch('GenerateDicts', {
      "obj": responseData.body,
      "objName": "CUSTOMER_RISK"
    }).then(() => {
    });
    if (callback) {
      callback();
    }
  });
};
// 匹配风险评估字典项
Vue.prototype.getRiskName = function (riskCode) {
  if (riskCode === '') {
    return '未评估';
  }
  let dictionary = window.globalVue.$store.getters.dictionaryList;
  let dictionaryItem = eval("dictionary.CUSTOMER_RISK");
  if (!dictionaryItem) {
    return '--';
  }
  for (let i = 0; i < dictionaryItem.length; i++) {
    if (dictionaryItem[i].value === riskCode) {
      return dictionaryItem[i].label;
    }
  }
  return '--';
};

// 登录方式枚举
Vue.prototype.jumpLogin = function () {
  this.getLoginPath(function (path) {
    window.globalVue.$router.push({
      path: path
    });
  });
};
Vue.prototype.getLoginPath = function (callback) {
  let _this = Vue.prototype;
  if (this.getLocalStorage('bhfae_userInfo')) {
    _this.fingerTouchAvailable(function (type) {
      if (_this.isUserSetFingerLogin()) {
        callback('/fingerprintLogin');
      } else {
        callback(_this.checkGesture());
      }
    }, function () {
      callback(_this.checkGesture());
    });
  } else {
    callback('/login');
  }
};
Vue.prototype.checkGesture = function () {
  if (this.isUserSetGestureLogin()) {
    return '/gestureCipher';
  } else {
    return '/login';
  }
};
// 页面数据keep-alive判断根据时间戳刷新
Vue.prototype.keepAliveTimeStamp = function (routeName, callback) {
  let keepAliveTimeStamp = this.getSessionStorage('keepAliveTimeStamp') !== '' ? JSON.parse(this.getSessionStorage('keepAliveTimeStamp')) : {};
  let currentTimeStamp = Date.parse(new Date());
  let timeDifference = currentTimeStamp - keepAliveTimeStamp[routeName];
  let overTime = Vue.prototype.keepAliveOverTime * 60 * 1000;
  if (!keepAliveTimeStamp[routeName] || timeDifference >= overTime) {
    callback();
    keepAliveTimeStamp[routeName] = currentTimeStamp;
    this.setSessionStorage('keepAliveTimeStamp', JSON.stringify(keepAliveTimeStamp))
  }
};

// app重载覆盖主页刷新时间戳
Vue.prototype.rewriteTimeStamp = function () {
  let routeList = ['unloginHomePage', 'homePage', 'investmentFrontPage', 'assets'];
  let keepAliveTimeStamp = {};
  for (let i = 0; i < routeList.length; i++) {
    keepAliveTimeStamp[routeList[i]] = 1540524107000;
  }
  Vue.prototype.setSessionStorage('keepAliveTimeStamp', JSON.stringify(keepAliveTimeStamp))
};

// 跳转智齿客服
Vue.prototype.showCustomerService = function () {
  this.thirdLinks(this.getServiceUrl());
};
Vue.prototype.getServiceUrl = function () {
  let name = this.mtjPageName(this.getSessionStorage('currentRouterName'));
  this.mtj_event('e_customer_service', name + '面点客服按钮');

  // let host = `http://10.20.200.101:99/common/app/customerService/index.html?t=${new Date().getTime()}#service?`;
  let host = `https://h5-cdn.bhfae.com/common/app/customerService/index.html?t=${new Date().getTime()}#service?`;
  let serviceInfo = '';
  try {
    let visitorId = this.getUserStorage("visitorId");
    let token = this.getSessionStorage('token');
    let appVersion = this.getAppVersion();
    let appClientType = this.handelClientType(); // app操作系统 Android:'0'  iOS:'1'
    let appMachineBrand = this.getValidateString(Vue.prototype.deviceInfo().deviceManufacturer); // app设备品牌
    let appMachineModel = this.getValidateString(Vue.prototype.deviceInfo().deviceModel); // app设备型号
    let appSystemVersion = this.getValidateString(Vue.prototype.deviceInfo().deviceVersion); // app操作系统版本
    let uuid = this.getValidateString(Vue.prototype.deviceInfo().deviceUUID);
    let page = this.getAppPageName();
    let env_config = this.getValidateString(process.env.ENV_CONFIG);
    serviceInfo = `visitorId=${visitorId}&token=${token}&appVersion=${appVersion}&page=${page}&env=${env_config}&appClientType=${appClientType}&appMachineBrand=${appMachineBrand}&appMachineModel=${appMachineModel}&appSystemVersion=${appSystemVersion}&uuid=${uuid}`;
  } catch (e) {
  }
  return `${host}${serviceInfo}`;
};

// 已设置的昵称 > 真实姓名 > 脱敏手机号 > 空
Vue.prototype.getUserDisplayName = function () {
  let displayName = '';
  let nickName = this.getUserStorage('nickName');
  let realName = this.getUserStorage('name');
  let mobile = this.getUserStorage('mobile');
  if (nickName !== '') {
    displayName = nickName;
  } else if (realName !== '') {
    if (realName.length > 1) {
      displayName = '*' + realName.substring(1);
    } else {
      displayName = realName;
    }
  } else if (mobile !== '') {
    displayName = mobile;
  }
  return displayName;
};

// 程序启动跳转默认页面
Vue.prototype.getAppLaunchPath = function () {
  let appVersion = Vue.prototype.getAppVersion();
  let versionLocalStorage = Vue.prototype.getLocalStorage('bhfae_version');
  let isShowPrivacyAlert = Vue.prototype.getLocalStorage('bhfae_isShowPrivacyAlert');
  if (isShowPrivacyAlert !== '1') { // 1.未同意权限授权 授权提醒
    return '/authority';
  } else if (versionLocalStorage !== appVersion) { // 2.本号不一致跳转 引导页
    Vue.prototype.setLocalStorage('bhfae_version', appVersion);
    return '/startPage';
  } else if (this.isNotEmpty(this.getUserStorage('visitorId'))) {
    if (Vue.prototype.isUserSetFingerLogin()) { // 3.开启指纹跳转 指纹登录
      return '/fingerprintLogin';
    } else if (Vue.prototype.isUserSetGestureLogin()) { // 4.开启手势跳转 手势登录
      return '/gestureCipher';
    } else { // 跳转 默认页面
      return '/';
    }
  } else { // 跳转 默认页面
    return '/';
  }
};

// 获取APP本地版本号
Vue.prototype.getAppVersion = function () {
  let config = require("../../../../package.json");
  return config.version;
};

// 获取当前毫秒数
Vue.prototype.getTimestamp = function () {
  return Date.now();
};
// 页面滚动判断
Vue.prototype.pageScroll = function (scrollTop) {

  if (scrollTop <= 10) {
    return 0;
  } else if (scrollTop > 10 && scrollTop <= 20) {
    return 0.1;
  } else if (scrollTop > 20 && scrollTop <= 30) {
    return 0.2;
  } else if (scrollTop > 30 && scrollTop <= 40) {
    return 0.3;
  } else if (scrollTop > 40 && scrollTop <= 50) {
    return 0.4;
  } else if (scrollTop > 50 && scrollTop <= 60) {
    return 0.5;
  } else if (scrollTop > 60 && scrollTop <= 70) {
    return 0.6;
  } else if (scrollTop > 70 && scrollTop <= 80) {
    return 0.7;
  } else if (scrollTop > 80 && scrollTop <= 90) {
    return 0.8;
  } else if (scrollTop > 90 && scrollTop <= 100) {
    return 0.9;
  } else {
    return 1;
  }
};


// 判断内容非空
Vue.prototype.isNotEmpty = function (obj) {
  if (obj === undefined || obj === null) {
    return false;
  }
  if (typeof obj === 'string') {
    return obj.trim().length !== 0;
  }
  if (Array.prototype.isPrototypeOf(obj)) {
    return obj.length !== 0;
  }
  if (Object.prototype.isPrototypeOf(obj)) {
    return Object.keys(obj).length !== 0;
  }
  return true;
};


// 获取验证码公共方法--暂时只在绑卡页面引用
Vue.prototype.getSmsValidateCode = function (param, successCallback, errorCallback) {
  this.ajax(this.apiType().sendValidateCode, this.serviceType().api, param, function (responseData) {
    if (successCallback) {
      successCallback(responseData);
    }
  }, function (responseData) {
    if (errorCallback) {
      errorCallback(responseData);
    }
  });
};


// new Date()分别获取年/月/日/时/分/秒
Vue.prototype.getDateComponents = function (dateVal) {
  if (dateVal) {
    dateVal = typeof dateVal === 'string' ? Number(dateVal) : dateVal;
    let newDate = new Date(dateVal);
    let year = newDate.getFullYear(); //得到年份
    let month = newDate.getMonth();//得到月份
    let day = newDate.getDate();//得到日期
    let hours = newDate.getHours();//得到小时
    let minutes = newDate.getMinutes();//得到分钟
    let seconds = newDate.getSeconds();//得到秒
    month = month + 1;
    let date = {};
    date.year = year;
    date.month = month;
    date.day = day;
    date.hours = hours;
    date.minutes = minutes;
    date.seconds = seconds;
    return date;
  }
};

// iphone自带键盘中文输入法下输入英文字符自动带空格----替换响应空格为' '
Vue.prototype.replaceWhiteSpace = function (str) {
  return str.replace(/[ \t\n\x0B\f\r\s]/g, ' '); // 空字符为\0,空白符为[ \t\n\x0B\f\r],\s空格
};

// 拨打客服电话
Vue.prototype.appOnPhoneCall = function () {
  if (Vue.prototype.isRunOnDevice() === false) return;
  let number = '400-813-9888';
  if (Vue.prototype.isIOSDevice()) {
    Vue.prototype.callPhone(number);
  } else {
    this.$confirmCtrl('', number, '呼叫', '取消', function () {
      Vue.prototype.callPhone(number);
    });
  }
};
//获取图片验证码
Vue.prototype.getCodeRequest = function (graphCodeType) {
  let token = this.getSessionStorage('token');
  let getCodeurl = this.apiUrl().onlineServer + this.apiType().getGraphCode + '?token=' + token + '&d=' + Math.random() + '&graphCodeType=' + graphCodeType + '&appVersion=' + this.paramBase().appVersion;
  return getCodeurl;
};
Vue.prototype.toShowCode = function (graphCodeType) {
  let _this = this;
  let token = this.getSessionStorage('token');
  if (token !== '') {
    return this.getCodeRequest(graphCodeType);
  } else {
    this.fetchToken(function () {
      return _this.getCodeRequest(graphCodeType);
    });
  }
};
// 页面回退,异常sourcePage处理
Vue.prototype.getSourcePage = function (sourcePage) {
  if (this.isNotEmpty(sourcePage)) {
    return sourcePage;
  }
  return 'homePage';
};
// bus监听回调事件
Vue.prototype.addObserve = function (key, fallback) {
  this.$bus.off(key);
  this.$bus.on(key, fallback);
};
// bus监听网络恢复事件
Vue.prototype.netWorkIsOk = function (fallback) {
  this.$bus.off(this.getNetWorkKey());
  this.$bus.on(this.getNetWorkKey(), fallback);
};
// 金额/身份证号虚拟键盘相关----start
// 开启键盘
Vue.prototype.showKeyboard = function (flag, modal) {
  this.$refs.newCipherKeyboard.open(flag, modal);
};
// 键盘输入值处理回显
Vue.prototype.dealVal = function (eventVal) {
  let flag = eventVal.flag;
  let keyStatus = eventVal.keyStatus;
  let _this = eventVal.parentDom;
  let modalVal = eventVal.modalVal;
  let iptVal = _this[modalVal];
  if (keyStatus === 'keys') {
    if (flag === 'amount') {
      _this[modalVal] = Vue.prototype.checkoutAmount(iptVal, eventVal.keyVal);
      if (_this.$refs[modalVal]) {
        _this.$refs[modalVal].inputVal = Vue.prototype.checkoutAmount(iptVal, eventVal.keyVal);
      }
    } else {
      _this[modalVal] = Vue.prototype.checkoutId(iptVal, eventVal.keyVal);
      if (_this.$refs[modalVal]) {
        _this.$refs[modalVal].inputVal = Vue.prototype.checkoutId(iptVal, eventVal.keyVal);
      }
    }
  } else if (keyStatus === 'delete') {
    if (!Vue.prototype.isNotEmpty(iptVal)) return false;
    _this[modalVal] = iptVal.substring(0, iptVal.length - 1);
    if (_this.$refs[modalVal]) {
      _this.$refs[modalVal].inputVal = iptVal.substring(0, iptVal.length - 1);
    }
  }
};
// 点击空白部分关闭虚拟键盘
Vue.prototype.closeKeyboard = function (e) {
  let eTarget = e.target;
  let isInput = eTarget.tagName === 'INPUT' && eTarget.className === 'form-control' && eTarget.readOnly;
  let isPtag = eTarget.tagName === 'P' && eTarget.className === 'form-control';
  let isTdKeys = eTarget.tagName === 'TD' && eTarget.title === 'keys';
  let isDivKeys = eTarget.tagName === 'DIV' && eTarget.title === 'keys';
  if (isInput || isPtag || isTdKeys || isDivKeys) return;
  Vue.prototype.$bus.emit('outerCloseKeyboard');
};

//金额输入校验规则
Vue.prototype.checkoutAmount = function (iptVal, keyVal) {
  let val = iptVal + keyVal;
  if (keyVal === '00' && (/\.\d{1,2}/).test(iptVal)) {
    val = iptVal
  }
  let reg = /^([1-9]\d*|0)([.]?|(\.\d{1,2})?)$/;
  if (reg.test(val)) {
    return val
  } else {
    return val.substring(0, val.length - 1)
  }
};

//身份证号输入校验规则
Vue.prototype.checkoutId = function (iptVal, keyVal) {
  let val = iptVal + keyVal;
  let reg = RegExp(/X/);
  if (keyVal === 'X' && reg.test(iptVal)) {
    val = iptVal
  }
  return val;
};

// 金额/身份证号虚拟键盘相关----end

//vue--浏览器复制内容到剪切板
Vue.prototype.copyPolicyOnWeb = function (text, success, failed) {
  this.$copyText(text).then(function (e) {
    success();
  }, function (e) {
    failed();
  })
};

Vue.prototype.getBase64WithPath = function (localId, callBack) {
  let param = {
    'localId': localId
  }
  window.bhfaeOpen.getLocalImageData(param, (data) => {
    let base64DataPath = data.body.img
    callBack(base64DataPath)
  }, (err) => {
    console.log('获取本地图片失败', err);
  })
};

Vue.prototype.getBase64Image = function (img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let dataURL = canvas.toDataURL("image/png");
  return dataURL.replace("data:image/png;base64,", "");
};

Vue.prototype.getValidateString = function (obj) {
  return Vue.prototype.isNotEmpty(obj) ? obj : '';
};

Vue.prototype.notEmpty = function (obj, def) {
  if (Vue.prototype.isNotEmpty(obj)) {
    return obj;
  }
  return def;
};

// 比对版本号 source--本地版本号  target--服务器版本号
Vue.prototype.hasNewVersion = function (source, target) {
  let reg = /^\d+\.\d+\.\d+$/;
  if (reg.test(source) && reg.test(target)) {
    // 将两个版本号拆成数字
    let arr1 = source.split('.');  //259
    let arr2 = target.split('.');  //260
    let minLength = Math.min(arr1.length, arr2.length),
      index = 0,
      diff = 0;
    // 依次比较版本号每一位大小，当对比得出结果后跳出循环
    while (index < minLength && ((diff = parseInt(arr1[index]) - parseInt(arr2[index])) === 0)) {
      index++;
    }
    diff = (diff !== 0) ? diff : (arr1.length - arr2.length);
    return diff < 0;
  } else {
    return false;
  }
};

Vue.prototype.doGetLatestVersion = function (callback) {
  let _this = this;
  let androidVersionType = this.paramValueType.QUERY_ONLINE_APP_VERSION_ANDROID;
  let iosVersionType = this.paramValueType.QUERY_ONLINE_APP_VERSION_IOS;
  let paramId = this.isIOSDevice() ? iosVersionType : androidVersionType;
  this.queryParamConfig(paramId, function (value) {
    _this.$store.getters.AppVersion = value;
    if (callback) {
      callback(value)
    }
  })
};

Vue.prototype.doGetLatestUrl = function (callback) {
  let _this = this;
  let androidUrlType = this.paramValueType.APP_CLIENT_UPDATE_ANDROID;
  let iosUrlType = this.paramValueType.APP_CLIENT_UPDATE_IOS;
  let paramId = this.isIOSDevice() ? iosUrlType : androidUrlType;
  this.queryParamConfig(paramId, function (value) {
    _this.$store.getters.updateUrl = value;
    if (callback) {
      callback(value)
    }
  })
};

// 获取location和imei,imsi
Vue.prototype.getBhfaeDeviceInfo = function (callback) {
  let location = {};
  let phoneState = {};
  let permissionDenyNames = [];
  this.getBhfaeDeviceInfo_location( (result_location) => {
    if (result_location.code === '0000') {
      location = this.notEmpty(result_location.body, {});
      if (!this.isIOSDevice()) {
        this.pushInit(); // 获取位置后初始化推送(安卓)
      }
    } else if (result_location.code === '-3000') { // 永久拒绝
      permissionDenyNames.push(this.permissionCode.ACCESS_LOCATION.name);
    } else if (result_location.code === '-9999') { // GPS未开启
      if (!this.isIOSDevice()) {
        this.pushInit(); // 初始化推送(安卓)
      }
    }
    this.getBhfaeDeviceInfo_phoneState((result_phoneState) => {
      if (result_phoneState.code === '0000') {
        phoneState = this.notEmpty(result_phoneState.body, {});
      } else if (result_phoneState.code === '-3000') { // 永久拒绝
        permissionDenyNames.push(this.permissionCode.READ_PHONE_STATE.name);
      }
      let deviceInfo = {
        longitude: this.notEmpty(location.longitude, ''),
        latitude: this.notEmpty(location.latitude, ''),
        imei: this.notEmpty(phoneState.imei, ''),
        imsi: this.notEmpty(phoneState.imsi, '')
      };
      this.saveBhfaeDeviceInfo(deviceInfo);
      this.getBhfaeDeviceInfo_storage((result_storage) => {
        if (result_storage.code === '0000' && this.isNotEmpty(result_storage.body)) {
          const storage = this.permissionCode.READ_EXTERNAL_STORAGE;
          if (result_storage.body[storage.code] === '-3000') {
            permissionDenyNames.push(storage.name);
          }
        }
        callback(permissionDenyNames);
      });
    });
  });
  // 监听H5存储设备信息指令
  this.addObserve('save_bhfaeDeviceInfo', this.saveBhfaeDeviceInfo);
};

Vue.prototype.saveBhfaeDeviceInfo = function (deviceInfo) {
  this.setLocalDictionary(this.bhfaeDeviceKey, deviceInfo);
  this.modifyVisitorAttach(deviceInfo);
};

// 获取location
Vue.prototype.getBhfaeDeviceInfo_location = function (callback) {
  this.getBHLocation(function (result) {
    callback(result);
  }, function (error) {
    callback(error);
  }, true)
};
// 获取imei,imsi
Vue.prototype.getBhfaeDeviceInfo_phoneState = function (callback) {
  if (!this.isIOSDevice()) {
    this.getPhoneState(function (result) {
      callback(result);
    }, function (error) {
      callback(error);
    }, true)
  } else {
    callback({});
  }
};

// 获取存储的读取权限
Vue.prototype.getBhfaeDeviceInfo_storage = function (callback) {
  if (!this.isIOSDevice()) {
    this.getPermisson_storage(function (result) {
      callback(result);
    }, function (error) {
      callback(error);
    }, true)
  } else {
    callback({});
  }
};

// 更新设备信息
Vue.prototype.modifyVisitorAttach = function (param) {
  let params = {
    "pushId": this.notEmpty(Vue.prototype.getPushId(), ""), // 推送ID
    "longitude": this.notEmpty(param.longitude, ""), // 经度
    "latitude": this.notEmpty(param.latitude, ""), // 维度
    "imsi": this.notEmpty(param.imsi, ""), // 国际移动用户识别码(需SIM卡)
    "imei": this.notEmpty(param.imei, ""), // 国际移动设备身份码
    "machineId": this.notEmpty(Vue.prototype.deviceInfo().deviceUUID, "") // 设备ID
  };
  this.ajaxLong(this.apiType().modifyVisitorAttach, this.serviceType().api, params, false, null, function () {

  }, function () {

  }, function () {

  });
};

Vue.prototype.showAppH5 = function (params, path) {
  let urlPath = `${window.globalVue.$store.getters.h5Url}${Vue.prototype.fileRelativePath()}/${Vue.prototype.notEmpty(path, 'appH5')}/index.html#`;
  let queryString = Vue.prototype.object2Query(Vue.prototype.notEmpty(params, {}));
  let url = Vue.prototype.urlJoinQuery(urlPath, queryString);
  let targetURL = Vue.prototype.urlJoinCommonParam(url);
  Vue.prototype.showBhfaeBrowser(targetURL);
};

// 平台操作
Vue.prototype.showPlatformH5 = function (params) {
  Vue.prototype.showAppH5(params, 'h5/platform');
};

//相对文件地址
Vue.prototype.fileRelativePath = function () {
  return "/common/app"
};

Vue.prototype.AMOUNT_CONTROL = function(){
  return {
    ASSETS_PAGE: 'isAssetsAmountShow',
    MY_REGULAR_PAGE: 'isMyRegularAmountShow'
  }
};

// 获取json文件
Vue.prototype.getJsonFile = function (url, callback) {
  this.$http({
    method: "GET",
    url: url,
    timeout: null,
    responseType: "json",
    ContentType: "application/json",
    before: function (request) {
      request.method = "GET";
    },
    params: {
      _t: new Date().getTime()
    }
  }).then(function (responseData) {
    if (callback) {
      callback(responseData);
    }
  }, function () {
    console.log("请求失败:" + url);
  });
};

// 查询个人中心栏目配置项
Vue.prototype.queryUserCenterColums = function (callback) {
  const queryColumsUrl = `${this.$store.getters.h5Url}${this.fileRelativePath()}/userCenter/userCenter.json`;
  this.getJsonFile(queryColumsUrl, (responseData) => {
    if (this.isNotEmpty(responseData.body)) {
      this.setLocalStorage('bhfae_userCenterColumn', JSON.stringify(responseData.body));
      if (callback) {
        callback();
      }
    }
  });
};

// 查询活动banner/icon列表
Vue.prototype.queryActivityList = function (contentId, callBack, failCallback, errorCallback) {
  const param = {
    'contentId': contentId
  };
  this.ajax(this.apiType().queryActivityList, this.serviceType().query, param, (responseData) => {
    if (responseData.body && this.isNotEmpty(responseData.body)) {
      let contentList = []
      responseData.body.forEach(item => {
        if (item.url) {
          contentList.push(
            {
              img: `${this.$store.getters.fileUrl}${item.url}?${item.lastUpdateTime}`,
              contentItemId: item.contentItemId,
              title: item.title,
              link: item.link,
              sequence: item.sequence,
              contentId: item.contentId,
              isMark: item.isMark,
              markTag: item.markTag
            });
        }
      });
      if (this.isNotEmpty(contentList) && callBack) {
        callBack(contentList);
      }
    } else {
      callBack([]);
    }
  }, (error) => {
    if (failCallback) {
      failCallback(error);
    }
  }, (error) => {
    if (errorCallback) {
      errorCallback(error);
    }
  });
};

/**
 * 对象数组排序方法(多参数排序)
 * 主要用于产品列表排序
 * fields参数格式: ['-isSubscribeAvailableLimit', '-totalRate', 'sortDay']
 * fields参数备注 参数默认升序 参数前加"-"为降序
 * 用法: [].sort(this.sortByFields(['-isSubscribeAvailableLimit', '-totalRate', 'sortDay']));
 */
Vue.prototype.sortByFields = (fields) => (a, b) => fields.map(item => {
  let dir = 1;
  if (item[0] === '-') {
    dir = -1;
    item = item.substring(1);
  }
  return a[item] > b[item] ? dir : a[item] < b[item] ? -(dir) : 0;
}).reduce((p, n) => p || n, 0);

/**
 * 银行产品列表默认排序处理
 * 状态-是否在售(即限额isSubscribeAvailableLimit)降序 > 收益率(综合收益率)降序 > 日期(sortDay)升序 > 系统排序（运营）
 */
Vue.prototype.sortProductsByFields = (productList) => {
  return productList.sort(Vue.prototype.sortByFields(['-isSubscribeAvailableLimit', '-totalRate', 'sortDay']));
};
