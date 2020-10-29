import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.interceptors.push(function (request, next) {
  // console.log('request:' + JSON.stringify(request));
  request.method = 'POST';
  request.headers.set('Content-Type', 'application/x-www-form-urlencoded');

  let flag = request.params.flag;
  if (Vue.prototype.isNotEmpty(flag)) {
    delete request.params.flag; // 请求时删除flag;
  }
  next(function (response) {
    if (Vue.prototype.isNotEmpty(flag)) {
      // console.log('next-->flag:' + flag);
      if (Vue.prototype.isNotEmpty(response.body) && typeof response.body === 'object') {
        response.body.flag = flag;
      }
      //console.log('next-->response:' + JSON.stringify(response));
    }
    return response;
  });
});

Vue.prototype.isNoNetWork = function () {
  return this.checkConnection() === -1000;
};
Vue.prototype.handleNoNet = function (currentThis, errorfunc) {
  let _this = currentThis;
  // 解决程序启动断网情况下报错问题
  if (!_this.isNotEmpty(_this.$parent.$refs)) {
    window.globalVue.$router.push({
      path: '/'
    });
    return;
  }
  _this.$parent.$refs.netWorkAnomaly.show = true;
  _this.$parent.$refs.netWorkAnomaly.confirm().then(() => {
    _this.$parent.$refs.netWorkAnomaly.show = false;
    window.globalVue.$router.push({
      name: _this.$route.name,
      params: _this.$route.params
    });
  });
};

// **** 不需要token的请求
function getNoTokenAPI() {
  return [
    'queryAppVersion', // 检查版本更新
    'queryDictList', // 查询 字典项
    'queryParamValue', // 查询 相关参数
    'queryContentItemList' // 获取图文信息(banner)
  ];
}

function isNoTokenRequest(api) {
  return getNoTokenAPI().indexOf(api) !== -1;
}

// **** 需要token,但不校验token的请求
function getNoValidateTokenAPI() {
  return [
    'mobileRegisterValidate', // 手机号是否注册
    'sendValidateCode', // 发送 短信验证码
    'checkValidateCode', // 检查 短信验证码
    'openVisitorAccount', // 注册
    'findLoginPasswordValidate', // 找回密码,是否需要校验身份证
    'findLoginPassword', // 找回密码
    'loginValidate', // 登录,校验用户名是否存在
    'login', // 登录,手机号登录
    'gestureLogin', // 登录,手势登录
    'fingerPrintLogin', //登录,指纹登录
    'queryProductDetailInfo', // 根据产品编号获取产品详情
    'queryPayLimitList', // 查询银行列表限额
    'queryCustomerRankDisplay', // app评分-查询客户评分展示方式
    'addCustomerRank' // app评分-增加客户评分
  ];
}

function isNoCheckTokenRequest(api) {
  return getNoValidateTokenAPI().indexOf(api) !== -1;
}

// 普通请求
Vue.prototype.ajax = function (api, type, params, success, error, requestError) {
  this.ajaxWithAll(api, type, params, null, false, null, success, error, requestError);
};

// 长时间请求
Vue.prototype.ajaxLong = function (api, type, params, isLoading, timeout, success, error, requestError) {
  this.ajaxWithAll(api, type, params, null, isLoading, timeout, success, error, requestError);
};

// 全量请求
Vue.prototype.ajaxWithAll = function (api, type, params, formData, isLoading, timeout, success, error, requestError) {
  if (isNoTokenRequest(api)) { // 请求不需要token
    this.startRequest(api, type, params, formData, isLoading, timeout, success, error, requestError);
  } else { // 需要token
    let token = this.getSessionStorage('token');
    if (this.isNotEmpty(token)) { // token 存在
      this.handleHasToken(api, type, params, formData, isLoading, timeout, success, error, requestError);
    } else {
      this.handleNoToken(api, type, params, formData, isLoading, timeout, success, error, requestError);
    }
  }
};

Vue.prototype.handleHasToken = function (api, type, params, formData, isLoading, timeout, success, error, requestError) {
  let _isNoCheckToken = isNoCheckTokenRequest(api); // 无需校验token的请求
  let _isTempLogin = this.isNotEmpty(this.getSessionDictionary('bhfae_tempLogin')); // 临时登录(登陆成功,但未获取到用户数据)
  let _isOK = this.isLogin() && this.checkToken();// 登录 且 校验token
  if (_isNoCheckToken || _isTempLogin || _isOK) {
    this.startRequest(api, type, params, formData, isLoading, timeout, success, error, requestError);
  } else {
    let e = "异常:用户在使用登录前token! 接口:" + api + "或者,该接口需维护在无需校验token的列表中!!";
    console.log(e);
  }
};
Vue.prototype.handleNoToken = function (api, type, params, formData, isLoading, timeout, success, error, requestError) {
  let _this = this;
  if (this.isLogin()) { // 异常状况: 用户登录成功,但是没有token,需强制退出登录!
    this.exitLogin(function () {
      window.globalVue.$router.push({
        path: '/unloginHomePage'
      });
    });
  } else { // 获取token,然后执行 不需要登录token的请求!
    this.fetchToken(function () {
      if (isNoCheckTokenRequest(api)) {
        _this.startRequest(api, type, params, formData, isLoading, timeout, success, error, requestError);
      }
    }, (type === 'api' || isLoading));
  }
};

Vue.prototype.startRequest = function (api, type, params, formData, isLoading, timeout, success, error, requestError) {
  let _this = this;
  this.checkEncrptAPI(api, params, function (encrptParams) {
    _this.doStartRequest(api, type, encrptParams, formData, isLoading, timeout, success, error, requestError);
  });
};
// 是否使用activity服务器
Vue.prototype.isActivityUrl = function (api) {
  return this.activityUrls.indexOf(api) !== -1;
};
Vue.prototype.doStartRequest = function (api, type, params, formData, isLoading, timeout, success, error, requestError) {
  let newData = Object.assign(this.paramBase(), params);
  let _this = this;
  let host = this.apiUrl().onlineServer;
  if (this.isActivityUrl(api)) {
    host = this.apiUrl().activityServer;
  }
  Vue.http({
    method: 'POST',
    url: host + type + '?apiName=' + api,
    body: formData,
    params: newData,
    emulateJSON: true,
    timeout: (timeout === null) ? 30000 : timeout * 1000,
    before: function (request) {
      if (type === 'api' || isLoading) {
        _this.$loading();
      }
    }
  }).then(function (responseData) {
    _this.$loadingHide();
    let resultCode = responseData.body.resultCode;
    let message = responseData.body.message;
    if (resultCode === _this.requestStatus().success) {
      success(responseData.body);
    } else if (resultCode === _this.requestStatus().sessionTimeOut || resultCode === _this.requestStatus().sessionNotSame) {
      _this.removeSessionStorage('token');
      if (_this.isLogin()) {
        Vue.prototype.$bus.emit(Vue.prototype.loginTimeOutKey); // 通知 bus 登录超时
        _this.$hideConfirm(); // 让弹框消失
        _this.$alert('登录超时，请重新登录！', '', function () {
          _this.handleLoginTimeOut();
        });
      } else {
        if (isNoCheckTokenRequest(api)) { // 不需要登录后token的请求
          _this.fetchToken(function () {
            _this.doStartRequest(api, type, params, formData, isLoading, timeout, success, error, requestError);
          }, (type === 'api' || isLoading));
        }
      }
    } else {
      if (error) {
        error(responseData.body);
      } else {
        _this.$alert(message);
      }
    }
  }, function (errorData) {
    _this.$loadingHide();
    if (requestError) {
      requestError(errorData);
    } else {
      _this.$toast('服务器请求超时，请稍后再试');
    }
  });
};

// 说明:处理登录超时逻辑
Vue.prototype.handleLoginTimeOut = function () {
  let _this = this;
  this.exitLogin(function () {
    _this.jumpLogin();
    _this.fetchToken();
  });
};

// 获取token
Vue.prototype.fetchToken = function (callback, loadingCtrl) {
  let _this = this;
  Vue.http({
    method: 'POST',
    url: this.apiUrl().onlineServer + this.serviceType().api + '?apiName=' + this.apiType().fetchToken,
    params: this.paramBase(),
    emulateJSON: true,
    timeout: 5000,
    before: function (request) {
      if (loadingCtrl && loadingCtrl === true) {
        _this.$loading();
      }
    }
  }).then(function (responseData) {
    _this.$loadingHide();
    let resultCode = responseData.body.resultCode;
    let message = responseData.body.message;
    if (resultCode === _this.requestStatus().success) {
      _this.setSessionStorage('token', responseData.body.token);
      if (callback) {
        callback();
      }
    } else {
      _this.$alert(message);
    }
  }, function () {
    _this.$loadingHide();
    if (loadingCtrl && loadingCtrl === true) {
      _this.$toast('请求失败，请稍后再试');
    }
  });
};

// 静默请求
Vue.prototype.ajaxSilence = function (api, type, params) {
  let newData = Object.assign(this.paramBase(), params);
  Vue.http({
    method: 'POST',
    url: this.apiUrl().onlineServer + type + '?apiName=' + api,
    params: newData,
    emulateJSON: true,
    timeout: 30000 // 请求超时时间30s
  }).then(function () {
  });
};

// 上传头像
Vue.prototype.uploadPortrait = function (uploadKey, base64Data, success) {
  let file = this.dataURLtoBlob('data:image/png;base64,' + base64Data);
  let formData = new window.FormData();
  formData.append(uploadKey, file, 'image.png');
  let api = this.apiType().uploadIcon;
  let type = this.serviceType().api;
  this.ajaxWithAll(api, type, {}, formData, false, null, success, null);
};

// blob转base64
Vue.prototype.dataURLtoBlob = function (base64Data) {
  let arr = base64Data.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let input = arr[1].replace(/\s/g, '');
  let bstr = window.atob(input);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new window.Blob([u8arr], {
    type: mime
  })
};

// 下载图片
Vue.prototype.downloadPicture = function (apiUrl, success) {
  Vue.http({
    method: 'GET',
    url: apiUrl,
    timeout: 30000,
    responseType: 'blob',
    before: function (request) {
      console.log('before');
      request.method = 'GET';
    }
  }).then(function (responseData) {
    blobToDataURL(responseData.body, function (base64Data) {
      if (success) {
        success(base64Data);
      }
    });
  }, function () {
    console.log('图片下载失败');
  })
};

// blob 换 base64
function blobToDataURL(blob, callback) {
  try {
    let a = new FileReader();
    a.onload = function (e) {
      callback(e.target.result);
    };
    a.readAsDataURL(blob);
  } catch (e) {
  }
}

// app版本及服务器状态请求
let vm = new Vue();
Vue.prototype.serverVersion = function (apiUrl, params, success, failed) {
  let _this = Vue.prototype;
  let newData = Object.assign(_this.paramBase(), params);
  Vue.http({
    method: 'POST',
    url: apiUrl,
    params: newData,
    emulateJSON: true,
    timeout: 5000
  }).then(function (responseData) {
    if (success) {
      success(responseData.body);
    }
  }, function (error) {
    if (failed) {
      failed(error);
    }
  })
};

// 校验app版本
Vue.prototype.validateVersion = function () {
  if (Vue.prototype.isRunOnDevice()) {
    if (Vue.prototype.getSessionStorage('bhfae_isIgnore_appUpdate') === '1') return;
    let platForm = Vue.prototype.deviceInfo().devicePlatform;
    let _params = {
      'appClient': 1
    };
    if (platForm === "iOS") {
      _params = {
        'appClient': 1
      };
    } else if (platForm === "Android") {
      _params = {
        'appClient': 0
      };
    }
    let _this = Vue.prototype;
    let url = Vue.prototype.apiUrl().onlineServer + _this.serviceType().query + "?apiName=" + _this.apiType().queryAppVersion;
    _this.serverVersion(url, _params, function (responseData) {
      let resultCode = responseData.resultCode;
      if (resultCode === _this.requestStatus().success && responseData.body && responseData.body[0]) {
        let res = responseData.body[0];
        if (res.controlType === '1' || res.controlType === '2') {
          _this.showUpdateAlert(res);
        }
      }
    });
  }
};

Vue.prototype.showUpdateAlert = function (res) {
  let _this = Vue.prototype;
  let changeLog = res.changeLog;
  let showChangeLog = null;
  if (_this.isNotEmpty(changeLog)) {
    let changeLogShow = changeLog.replace(/\n|\v\n/g, "<br/>");
    showChangeLog = '<div style=\'text-align:left; min-height:0.3rem; max-height:2rem; overflow-y: auto;\'>' + changeLogShow + '</div>';
  }
  if (res.controlType === "2") { // 强制升级
    let msg = "<div style='text-align:left;'>立即更新，享受优质服务，旧版本将不再提供服务，你的信任让国金所更强大</div>";
    if (showChangeLog) {
      msg = showChangeLog;
    }
    let param = {
      'msg': msg,
      'isForceUpdate': true,
      'url': res.url
    };
    _this.$bus.emit('upgradePopupCtrl', param);
  } else if (res.controlType === "1") { // 推荐升级
    let msg = "<div style='text-align:left;'>立即更新，享受优质服务，你的信任让国金所更强大</div>";
    if (showChangeLog) {
      msg = showChangeLog;
    }

    let param = {
      'msg': msg,
      'isForceUpdate': false,
      'url': res.url
    };
    _this.$bus.emit('upgradePopupCtrl', param);
  }
};

Vue.prototype.getServiceState = function () {
  let _this = Vue.prototype;
  let url = Vue.prototype.apiUrl().onlineServer + _this.serviceType().alarm;
  let _params = {};
  _this.serverVersion(url, _params, function (responseData) {
    let resultCode = responseData.resultCode;
    if (resultCode === _this.requestStatus().success) {
      let msg = responseData.body;
      if (msg) {
        _this.setSessionStorage('bhfae_showAlert', '1'); // 系统升级公告,需显示弹框,不能隐藏
        setTimeout(function () {
          vm.$vux.alert.show({
            title: '',
            content: msg,
            buttonText: '确定并退出',
            onHide: function () {
              _this.setSessionStorage('bhfae_showAlert', '0');
              _this.terminateApp();
            }
          });
        }, 300);
      }
    }
  });
};

// 前端错误日志上传
Vue.prototype.reportError = function (msg) {
  let url = Vue.prototype.getCrashHost() + '?' + Vue.prototype.reportErrorBaseParameter() + '&message=' + msg;
  Vue.http({
    method: 'POST',
    url: url
  }).then(function () {
  });
};

// 错误日志上传公共参数
Vue.prototype.reportErrorBaseParameter = function () {
  let time = new Date().getTime() + '';
  return 'businessTime=' + time
    + '&apiVersion=' + Vue.prototype.paramBase().apiVersion
    + '&appVersion=' + Vue.prototype.paramBase().appVersion
    + '&saleSystem=' + Vue.prototype.paramBase().saleSystem
    + '&clientType=' + Vue.prototype.paramBase().clientType
    + '&clientIp=' + Vue.prototype.paramBase().clientIp
    + '&stationId=' + Vue.prototype.paramBase().stationId
    + '&tradeWay=' + '01'
    + '&url=' + Vue.prototype.getSessionStorage(Vue.prototype.appPageName)
    + '&visitorId=' + Vue.prototype.paramBase().visitorId
    + '&token=' + Vue.prototype.paramBase().token
    + '&appClientModel=' + Vue.prototype.getValidateString(Vue.prototype.deviceInfo().deviceModel)
    + '&appClientPlatform=' + Vue.prototype.getValidateString(Vue.prototype.deviceInfo().devicePlatform)
    + '&appClientUuid=' + Vue.prototype.getValidateString(Vue.prototype.deviceInfo().deviceUUID)
    + '&appSystemVersion=' + Vue.prototype.getValidateString(Vue.prototype.deviceInfo().deviceVersion)
    + '&appClientManufacturer=' + Vue.prototype.getValidateString(Vue.prototype.deviceInfo().deviceManufacturer)
    + '&agent=' + navigator.userAgent;
};

// 查询参数
Vue.prototype.queryParamConfig = function (paramId, callback) {
  let _this = this;
  let params = {
    paramId: paramId
  };
  this.ajax(this.apiType().queryParamValue, this.serviceType().query, params, function (responseData) {
    if (callback) {
      callback(responseData.body[0].value);
    }
  });
};

// 查询密码加密参数
Vue.prototype.queryPasswordSecret = function (callback) {
  let _this = this;
  let paramId = this.paramValueType.PASSWORD_SECRET;
  this.queryParamConfig(paramId, function (value) {
    _this.$store.getters.passWordSecret = _this.notEmpty(value, "");
    if (callback) {
      callback(value);
    }
  })
};

// 是否是加密API,若是则参数加密
Vue.prototype.checkEncrptAPI = function (api, params, callback) {
  let encryptApi = this.encryptPasswordApi.find(item => item.api === api);
  if (this.isNotEmpty(encryptApi)) {
    let passwordSecret = this.$store.getters.passWordSecret;
    if (this.isNotEmpty(passwordSecret)) {
      this.encryptParams(encryptApi, params, passwordSecret, callback);
    } else {
      let _this = this;
      this.queryPasswordSecret(function (secret) {
        _this.encryptParams(encryptApi, params, secret, callback);
      })
    }
  } else {
    callback(params);
  }
};

Vue.prototype.encryptParams = function (encryptApi, params, passwordSecret, callback) {
  encryptApi.names.forEach(item => {
    params[item] = this.encryptPassword(params[item], passwordSecret);
  });
  callback(params);
};

//密码加密
var CryptoJS = require("crypto-js");
Vue.prototype.encryptPassword = function (password, passwordSecret) {
  passwordSecret = passwordSecret.trim();
  if (!this.isNotEmpty(passwordSecret)) {
    return password;
  }
  let keyHex = CryptoJS.enc.Utf8.parse(passwordSecret);
  let encrypted = CryptoJS.DES.encrypt(password, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

// 密码加密参数配置列表
Vue.prototype.encryptPasswordApi = [
  { //登录
    api: 'login',
    names: ['loginPassword']
  },
  { //注册结果
    api: 'openVisitorAccount',
    names: ['newPassword', 'confirmPassword']
  },
  { //忘记密码
    api: 'findLoginPassword',
    names: ['newPassword', 'confirmPassword']
  },
  { //手势密码
    api: 'gestureLogin',
    names: ['password']
  },
  { //设置手势密码
    api: 'enableGesturePassword',
    names: ['loginPassword', 'newPassword', 'confirmPassword']
  },
  { //启用手势登录密码
    api: 'loginPasswordValidate',
    names: ['password']
  },
  { //新登录密码
    api: 'modifyLoginPassword',
    names: ['originalPassword', 'newPassword', 'confirmPassword']
  },
  { //开启指纹
    api: 'enableFingerPrint',
    names: ['loginPassword']
  }
];

