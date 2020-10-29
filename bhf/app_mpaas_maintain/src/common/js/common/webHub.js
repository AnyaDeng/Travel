import Vue from 'vue';

Vue.prototype.outerEvent = {
  WX_INSTALLED: 'wxInstalled', //是否安装微信
  WX_OPEN: 'wxOpen', //打开微信
  SHARE: 'share', // 分享
  SHARE_IMAGE_BASE64: 'shareImageBase64', // 分享图片 base64
  SHARE_IMAGE_LINK: 'shareImageLink', // 分享图片 link
  SHARE_MINI_PROGRAM: 'shareMiniProgram', // 分享小程序
  LAUNCH_MINI_PROGRAM: 'launchMiniProgram', // 跳转小程序
  START_OCR: 'startOCR', // OCR 识别
  START_FACE_VERIFY: 'startFaceVerify', // 人脸核身
  GET_PICTURE: 'getPicture', // 得到一张图片的路径(相机/相册)
  SHOW_PAGE: 'showPage', // 跳转APP页面
  THIRD_APP_CAN_OPEN: 'thirdAppCanOpen', // 是否能打开第三方APP
  THIRD_APP_OPEN: 'thirdAppOpen', // 打开第三方APP
  APP_RATE: 'appRate', // App内评分(iOS)
  GET_LOCATION: 'getLocation', // 获取经纬度
  OPEN_SETTING: 'openSetting', // 打开系统设置
  GET_PHONE_STATE: 'getPhoneState', // 获取电话状态(IMEI/IMSI)
  GET_STEP_COUNT: 'getStepCount', // 获取运动步数
  REQUEST_DEVICE_AUTH: 'checkDeviceAuth', // 请求（多个）权限
  REQUEST_PERMISSION: 'requestPermission', // 请求（多个）权限
  CHECK_PERMISSION: 'checkPermission', // 检查（多个）权限
  RECORD_AUDIO: 'recordAudio', // 语音识别
  // SHOW_AI_BANK: 'showAIBank', // 加载百信信托H5容器
  PAGE_ERROR: 'pageError', // 页面加载错误,更新时间戳
  BHFAE_EVENT_BUS: 'bhfaeEventBus', // 自定义事件传递
  MTJ_EVENT: 'mtj_event', // 百度统计--页面事件
  MTJ_IN: 'mtj_in', // 百度统计--进入页面
  MTJ_OUT: 'mtj_out', // 百度统计--离开页面
  DOWNLOAD_APP: 'downloadApp', // 下载App
  CLOSE_PAGE: 'closePage', // 关闭页面
  TIME_OUT: 'timeOut' // 登录超时
};

var outerBrowser;

let BHFAE_WEBHUB_INFO = 'bhfae_webhub_info';

Vue.prototype.initWebHub = function () {
  Vue.prototype.webhub_refreshStartTime();
  this.addObserve(this.loginTimeOutKey, function () {
    Vue.prototype.webhub_closeBrowser();
  });
  this.addObserve('refresh_userInfo', this.refreshUserInfo)
  Vue.prototype.removeSessionStorage(BHFAE_WEBHUB_INFO);
  Vue.prototype.webhub_closeBrowser();
};

Vue.prototype.webhub_closeBrowser = function (){
  if (outerBrowser) {
    outerBrowser.close();
    Vue.prototype.removeSessionStorage(BHFAE_WEBHUB_INFO);
  }
};

// ① 打开系统浏览器
Vue.prototype.showSystemBrowser = function (urlStr) {
  if (Vue.prototype.isRunOnDevice()) {
    // cordova.InAppBrowser.open(encodeURI(urlStr), '_system');
    cordova.ThemeableBrowser.open(encodeURI(urlStr), '_system', {});
  } else {
    window.open(urlStr);
  }
};

Vue.prototype.h5UrlFilter = function (origin, pathname) {
  let config = require("../../../../h5_filter/h5.json");
  let result = {
    origin: origin,
    pathname: pathname
  };
  if (process.env.ENV_CONFIG === 'release') { // 生产环境
    return result;
  }

  if (origin === config.filter_origin_appH5) {
    result.origin = config.target_origin_appH5;
  }
  if (this.isNotEmpty(pathname) && pathname === config.filter_pathname_appH5) {
    result.pathname = config.target_pathname_appH5;
  }

  if (origin === config.filter_origin_platform) {
    result.origin = config.target_origin_platform;
  }
  if (this.isNotEmpty(pathname) && pathname === config.filter_pathname_platform) {
    result.pathname = config.target_pathname_platform;
  }

  if (origin === config.filter_origin_saler) {
    result.origin = config.target_origin_saler;
  }
  if (this.isNotEmpty(pathname) && pathname === config.filter_pathname_saler) {
    result.pathname = config.target_pathname_saler;
  }
  return result;
};

Vue.prototype.checkBrowserUrl = function (url) {
  if (url.indexOf('http') === -1) {
    url = 'https://' + url;
  }
  try{
    const urlParams = new URL(url);
    let urlFilterResult = this.h5UrlFilter(urlParams.origin, urlParams.pathname);
    const origin = urlFilterResult.origin;
    const pathname = urlFilterResult.pathname;
    let search = urlParams.search;
    const hash = urlParams.hash;
    let time = 't=' + this.webhub_getStartTime();

    let isProductionUrl = origin.indexOf("bhfae.com") !== -1; // 是否是生产环境域名
    let isH5Url = origin.indexOf(window.globalVue.$store.getters.h5Url) !== -1; // 是否加载H5项目
    let isChangedOrigin = (origin !== urlParams.origin); // 是否替换了url的origin (例如71内网换成了71公网)

    if(isProductionUrl || isH5Url || isChangedOrigin){ // 说明:生产或者加载H5项目拼接时间戳参数方式
      search = Vue.prototype.urlJoinQuery(search, time);
      url = origin + pathname + search + hash;
      // 例如url:https://h5-cdn.bhfae.com/common/app/appH5/index.html?t=12345678#?action=bank_wallet
    } else { // 说明:其他则默认在query最后面追加时间参数
      url = Vue.prototype.urlJoinQuery(url, time);
    }
  }catch (e) {
    console.log(e);
  }
  return url;
};

Vue.prototype.getBrowserOptions = function (title) {

  let option = {
    statusbar: {
      color: '#263147'
    },
    toolbar: {
      height: 44,
      color: '#263147'
    },
    title: {
      color: '#ffffff',
      showPageTitle: true
    }
  };

  if (Vue.prototype.isNotEmpty(title)) {
    option.title.staticText = title;
  }
  return option;
};

let isOpening = false;
// 判断逻辑,同时只能打开一个浏览器(自动忽略第二个)
Vue.prototype.webHub_isCanOpen = function () {
  if (isOpening) return false;
  isOpening = true;
  setTimeout(() => {
    isOpening = false;
  }, 1000);
  return true;
};
// ② 普通外部浏览器 加载 HTML 例如协议等
Vue.prototype.showBrowser = function (url, title) {
  if (this.webHub_isCanOpen() === false) return;
  url = this.checkBrowserUrl(url);
  let option = this.getBrowserOptions(title);
  cordova.ThemeableBrowser.open(url, '_blank', option);
};
// ③ 活动,广告等外部浏览器 加载 HTML 有浏览器和APP交互功能
/* 测试地址:let path = 'http://10.20.200.101:99/common/app/test/a.html'; */
Vue.prototype.showBhfaeBrowser = function (url, title) {
  if (this.webHub_isCanOpen() === false) return;
  let option = this.getBrowserOptions(title);
  url = this.checkBrowserUrl(url);
  console.log('url:' + url);
  let _this = Vue.prototype;
  outerBrowser = cordova.ThemeableBrowser.open(url, '_blank', option).addEventListener('bhfaeEvent', function (e) {
    if (!Vue.prototype.isProduction()) {
      console.log('bhfaeEvent:' + JSON.stringify(e));
    }
    let eventStr = e.eventString;
    let arr = eventStr.split('?');
    let eventKey = arr[0];
    let param = {};
    if (arr.length === 2) {
      param = _this.query2Dict(eventStr);
    }
    _this.handleEvent_web(eventKey, param);
  });
};

let events = [];
Vue.prototype.handleEvent_web = function (eventKey, param) {
  if (events.indexOf(eventKey) !== -1) return;
  events.push(eventKey);
  setTimeout(function () { // 说明:1秒内,同一个事件只能执行一次!
    events = [];
  }, 1000);
  switch (eventKey) {
    case this.outerEvent.WX_INSTALLED: // 是否安装微信
      Vue.prototype.action_wxInstalled(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.WX_OPEN: // 打开微信
      Vue.prototype.action_wxOpen(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.SHARE: // 分享
      Vue.prototype.action_share(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.SHARE_IMAGE_BASE64: // 分享图片 base64
      Vue.prototype.action_share_image(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.SHARE_IMAGE_LINK: // 分享图片 base64
      Vue.prototype.action_share_image(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.SHARE_MINI_PROGRAM: // 分享小程序
      Vue.prototype.action_share_miniProgram(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.LAUNCH_MINI_PROGRAM: // 跳转小程序
      Vue.prototype.action_launch_miniProgram(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.START_OCR: // OCR
      Vue.prototype.action_start_OCR(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.START_FACE_VERIFY: // 人脸核身
      Vue.prototype.action_start_face_verify(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.GET_PICTURE: // 得到一张图片
      Vue.prototype.action_get_picture(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.SHOW_PAGE: // 跳转APP页面
      Vue.prototype.action_show_page(eventKey, param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.THIRD_APP_CAN_OPEN: // 是否能打开第三方APP
      Vue.prototype.thirdApp_canOpen(param, function (isCan) {
        let result = Vue.prototype.createResult_web('0000', 'success', {'canOpen': isCan ? '1': '0'});
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.APP_RATE: // App内评分(iOS)
      Vue.prototype.webhub_appRate(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.THIRD_APP_OPEN: // 打开第三方APP
      Vue.prototype.thirdApp_open(param);
      break;
    case this.outerEvent.PAGE_ERROR: // 页面加载错误,更新时间戳
      Vue.prototype.webhub_refreshStartTime();
      break;
    case this.outerEvent.BHFAE_EVENT_BUS: // 自定义bus事件
      Vue.prototype.webhub_bhfae_event_bus(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.GET_LOCATION: // 获取地理位置
      Vue.prototype.webhub_bhfae_location(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.OPEN_SETTING: // 跳转系统设置
      Vue.prototype.openAppSetting();
      break;
    case this.outerEvent.GET_PHONE_STATE: // 获取电话状态
      Vue.prototype.webhub_phone_state(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.GET_STEP_COUNT: // 获取运动步数
      let mp_userName = 'gh_758e72994e21'; // 庄园小程序(智能展业)
      let mp_type = (Vue.prototype.isProduction()) ? '0' : '2'; // 0:正式版  1:开发版  2:体验版
      param = {
        userName: mp_userName,
        path: '/src/views/run/stepCount',
        miniProgramType: mp_type
      };
      Vue.prototype.action_launch_miniProgram(param, function (result) {
        if (Vue.prototype.isNotEmpty(result.eventInfo)) {
          result.eventInfo.stepCount = result.eventInfo.extMsg;
        }
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.CHECK_PERMISSION: // 检查（多个）权限
      Vue.prototype.webhub_check_permission(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.REQUEST_PERMISSION: // 请求（多个）权限
    case this.outerEvent.REQUEST_DEVICE_AUTH: // 请求（多个）权限 (兼容旧版本)
      Vue.prototype.webhub_request_permission(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    case this.outerEvent.RECORD_AUDIO: // 语音实时识别
      Vue.prototype.webhub_record_audio(param, function (result) {
        Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
      });
      break;
    // case this.outerEvent.SHOW_AI_BANK: // 加载百信信托H5容器
    //   Vue.prototype.webhub_show_AIBank(param, function (result) {
    //     Vue.prototype.afterAction_web(result, eventKey, param.eventTag);
    //   });
    //   break;
    case this.outerEvent.MTJ_EVENT: // 百度统计--页面事件
      this.mtj_event(param.eventId, param.eventLabel);
      break;
    case this.outerEvent.MTJ_IN: // 百度统计--页面进入
      this.mtj_in(param.name);
      break;
    case this.outerEvent.MTJ_OUT: // 百度统计--页面离开
      this.mtj_out(param.name);
      break;
    case this.outerEvent.DOWNLOAD_APP: // 跳转App下载
      let downloadUrl = this.downloadAppUrl() + '?action=download_app&t=' + Date.now();
      this.showSystemBrowser(downloadUrl);
      break;
    case this.outerEvent.CLOSE_PAGE: // 关闭 webView
      Vue.prototype.webhub_closeBrowser();
      break;
    case this.outerEvent.TIME_OUT: // 登录token超时
      Vue.prototype.webhub_closeBrowser();
      if (this.isLogin()) {
        this.handleLoginTimeOut();
      }
      break;
    default :
      let resultErr = Vue.prototype.createResult_web('-1000', '当前版本不支持该功能');
      Vue.prototype.afterAction_web(resultErr, eventKey, param.eventTag);
      break;
  }
};

// 处理 H5支付(微信完成支付以后浏览器以scheme方式打开APP(sms.js))
Vue.prototype.handleEvent_h5Pay = function (queryStr) {
  let info = {};
  if (this.isNotEmpty(queryStr)) {
     info = this.query2Dict(queryStr);
  }
  let result = Vue.prototype.success_web();
  let eventTag = info.tag;
  Vue.prototype.afterAction_web(result, 'h5Pay', eventTag);
};

// 事件处理完毕 通知 webView 结果
Vue.prototype.afterAction_web = function (result, eventKey, eventTag) {
  result.eventKey = eventKey;
  result.eventTag = eventTag;
  let resultStr = JSON.stringify(result);
  //console.log('resultStr:' + resultStr);
  let codeStr = "handleResult(" + resultStr + ")";
  let obj = {
    code: codeStr
  };
  outerBrowser.executeScript(obj, function (e) {
  });
};

Vue.prototype.action_wxInstalled = function (param, callBack) {
  Vue.prototype.WXInstalled(function (result) {
    if (result.body.isInstalled === '1') {
      callBack(Vue.prototype.success_web());
    } else {
      callBack(Vue.prototype.failed_web('not install'));
    }
  }, function () {
    callBack(Vue.prototype.failed_web('execute failed'));
  });
};

Vue.prototype.action_wxOpen = function (param, callBack) {
  Vue.prototype.WXOpenWX(function () {
    callBack(Vue.prototype.success_web());
  }, function (error) {
    callBack(Vue.prototype.failed_web(error.msg));
  });
};

Vue.prototype.webhub_handle_jsonResult = function (result, callBack) {
  callBack(Vue.prototype.createResult_web(result.code, result.msg, result.body));
};

Vue.prototype.action_share = function (param, callBack) {
  let option = {
    scene: Vue.prototype.WXShareScene.WX_TIME_LINE,
    title: param.title,
    description: param.description,
    webPageUrl: param.webPageUrl,
    thumb: param.thumb
  };
  if (param.scene === '0') {
    option.scene = Vue.prototype.WXShareScene.WX_TIME_SESSION;
  }
  Vue.prototype.WXShareLink(option, function () {
    callBack(Vue.prototype.success_web());
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  }, true);
};

Vue.prototype.action_share_image = function (param, callBack) {

  let option = {
    title: '',
    description: '',
    scene: Vue.prototype.WXShareScene.WX_TIME_LINE,
    image: param.image
  };
  if (param.scene === '0') {
    option.scene = Vue.prototype.WXShareScene.WX_TIME_SESSION;
  }
  // console.log('option:' + JSON.stringify(option));
  Vue.prototype.WXShareImage(option, function () {
    callBack(Vue.prototype.success_web());
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  }, true);
};

Vue.prototype.action_share_miniProgram = function (param, callBack) {

  let option = {
    title: param.title,
    description: param.description,
    webPageUrl: param.webPageUrl,
    userName: param.userName,
    image: param.image,
    path: param.path,
    type: param.type
  };
  // console.log('option:' + JSON.stringify(option));

  Vue.prototype.WXShareMiniProgram(option, function () {
    callBack(Vue.prototype.success_web());
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  }, true);
};

Vue.prototype.action_launch_miniProgram = function (param, callBack) {
  Vue.prototype.WXLaunchMiniProgram(param, function (result) {
    Vue.prototype.webhub_handle_jsonResult(result, callBack);
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  });
};

Vue.prototype.action_start_OCR = function (param, callBack) {
  let options = {
    'type': Number(param.type), // 0:正反面, 1:正面, 2:反面, 3:银行卡
    'userId': Vue.prototype.getUserStorage('visitorId'),
    'appId': param.appId,
    'nonce': param.nonce,
    'orderNo': param.channelOrderNo,
    'sign': param.sign
  };
  Vue.prototype.bhfaeOCR(options, function (ocrResult) {
    // console.log(JSON.stringify(ocrResult));
    callBack(Vue.prototype.createResult_web('0000', 'success', ocrResult));
  }, function (error) {
    if (error.code === '-1000') {
      callBack(Vue.prototype.createResult_web('-1000', '用户取消操作'));
    } else {
      callBack(Vue.prototype.failed_web(error.msg));
    }
  }, true);
};

Vue.prototype.action_start_face_verify = function (param, callBack) {
  // console.log('param:' + JSON.stringify(param));
  let options = {
    'type': '2',
    'userId': Vue.prototype.getUserStorage('visitorId'),
    'appId': param.appId,
    'nonce': param.nonce,
    'orderNo': param.channelOrderNo,
    'sign': param.sign,
    'userName': param.name,
    'idNumber': param.certificateNo,
    'licence': param.licence
  };

  // console.log('options:' + JSON.stringify(options));

  Vue.prototype.bhfaeFaceRecognition(options, function (result) {
    // console.log('face success:' + JSON.stringify(result));
    callBack(Vue.prototype.success_web());
  }, function (error) {
    if (error.code === '-1000') {
      callBack(Vue.prototype.createResult_web('-1000', '用户取消操作'));
    } else {
      callBack(Vue.prototype.failed_web(error.msg));
    }
  }, true);
};

Vue.prototype.action_get_picture = function (param, callBack) {
  /*
    * type: 相机/相册  0->相机(默认),1->相册
    * width: 宽度  例如:640
    * height: 高度  例如:480
    * quality: 存储图像的质量，范围是[0,100],默认50
    * allowEdit: 图像是否允许编辑 1:允许 默认不允许
    * encodingType: JPEG/PNG 1:PNG 默认JPEG
    * correctOrientation: 拍摄后是否自动旋转照片,保证方向正确 0:不旋转 默认旋转
    * cameraDirection: 前置/后置摄像头 1:前置 默认后置
    * */

  // console.log('param:' + JSON.stringify(param));

  let options = {
    sourceType: Camera.PictureSourceType.CAMERA,
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    allowEdit: false,
    encodingType: Camera.EncodingType.JPEG,
    correctOrientation: true, // 默认true:保证方向正确
    cameraDirection: Camera.Direction.BACK
  };
  if (param.type === '1') { // 使用相册
    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    options.mediaType = Camera.MediaType.PICTURE;
  }

  if (this.isNotEmpty(param.quality)) { // 存储图像的质量，范围是[0,100]
    options.quality = param.quality;
  }

  if (param.allowEdit === '1') { // 图像是否允许编辑
    options.allowEdit = true;
  }

  // 如果传入了targetWidth和targetHeight则插件会忽略quality参数.
  // 如果删除targetWidth和targetHeight参数,则quality生效.
  if (this.isNotEmpty(param.width)) {
    options.targetWidth = Number(param.width);
  }

  if (this.isNotEmpty(param.height)) {
    options.targetHeight = Number(param.height);
  }

  if (param.encodingType === '1') { // PNG
    options.encodingType = Camera.EncodingType.PNG;
  }

  if (param.correctOrientation === '0') { // 拍摄后是否自动旋转照片。
    options.correctOrientation = false;
  }

  if (param.cameraDirection === '1') { // 前置摄像头
    options.cameraDirection = Camera.Direction.FRONT;
  }

  Vue.prototype.getPictureShow(options, function (path) {
    Vue.prototype.getBase64WithPath(path, function (base64Data) {
      callBack(Vue.prototype.createResult_web('0000', 'success', {img: base64Data}));
    })

  }, function (message) {
    let errorMsg = '获取图像失败';
    if (message === 20) {
      errorMsg = '权限不足,此功能无法使用';
    }
    callBack(Vue.prototype.failed_web(errorMsg));
  }, true);
};

// 说明:跳转页面配置!!
Vue.prototype.webhubPageConfig = {
  home: 'homePage', //首页 homePage
  investment: 'investmentFrontPage', //财富页
  assets: 'assets', //资产页面 assets
  user_center: 'personalCenter' // 个人中心页面 personalCenter
};

// 说明:一些开放性页面,不能回退到浏览器(会引起session存储中BHFAE_WEBHUB_INFO不能清除问题)
Vue.prototype.webhubIgnoreCallBackPages = [
  'home',
  'investment',
  'assets',
  'user_center'
];

// pages=[{"name":"real_name","param":{"id":"123","value":"456"}},{"name":"bind_card","param":{"id":"112233","value":"3445566"}}]&eventTag=bank_buy&cb=1
// pages,eventTag,cb


Vue.prototype.action_show_page = function (eventKey, param, callBack) {

  // 说明: ① pages不能为空
  if (!this.isNotEmpty(param.pages)) {
    console.log('page must not be empty');
    callBack(this.failed_web('page must not be empty'));
    return;
  }
  let pages = JSON.parse(param.pages);

  // 说明: ② 校验 cb,eventTag
  console.log('param eventTag:' + param.eventTag); // eventTag:bank_buy
  console.log('param cb:' + param.cb); // cb:1
  /* 说明: cb=1代表隐藏浏览器*/
  if (param.cb === '1') {
    /* 警告:当前浏览器插件只支持隐藏一次(其实也可以支持多次,但是后续考虑情况非常非常麻烦,不建议做) */
    if (this.isNotEmpty(this.getSessionDictionary(BHFAE_WEBHUB_INFO))) {
      let webInfo = this.getSessionDictionary(BHFAE_WEBHUB_INFO);
      console.log('BHFAE_WEBHUB_INFO:' + JSON.stringify(webInfo));
      console.log('current browser only support one time');
      callBack(this.failed_web('current browser only support one time'));
      return;
    }
    /* 说明:若隐藏,则eventTag不能为空 */
    if (!this.isNotEmpty(param.eventTag)) {
      console.log('eventTag must not be empty');
      console.log('eventTag:' + param.eventTag);
      callBack(this.failed_web('eventTag must not be empty'));
      return;
    }
  }
  // 说明: ③ 校验pages中的页面名称必须在配置表中
  let pageNames = Object.keys(this.webhubPageConfig);
  let errorNames = [];
  pages.forEach(dict => {
    // let name = dict.name;
    // console.log('name:' + name);
    if (pageNames.indexOf(dict.name) === -1) {
      errorNames.push(dict.name);
    }
    // let p = dict.param;
    // console.log('p:' + JSON.stringify(p));
  });
  if (this.notEmpty(errorNames)) {
    let errorInfo = {errorNames: errorNames};
    console.log('config error,page not exist in config list');
    // -2000 配置错误
    callBack(this.createResult_web('-2000', 'config error,page not exist in config list', errorInfo));
    return;
  }

  // 说明: ④存储数据,关闭(隐藏)页面
  this.removeSessionStorage(BHFAE_WEBHUB_INFO);
  if (param.cb === '1') { // 隐藏浏览器,执行完毕再显示
    param.eventKey = eventKey;
    //说明:追加页面是否处理完毕参数
    pages.forEach(page => {
      page.isFinished = '0'; // 0:目标页面操作未完成, 1:目标页面操作完成
    });
    param.pages = JSON.stringify(pages);
    this.setSessionDictionary(BHFAE_WEBHUB_INFO, param);
  }
  // 说明: ⑤ 处理页面跳转
  this.webhub_pushPage(pages[0]);
};

// 目标页面操作完成,调用此方法,继续跳转下一个页面
Vue.prototype.webhub_handlePage = function (from, resultInfo) {

  let param = this.getSessionDictionary(BHFAE_WEBHUB_INFO);

  if (!this.isNotEmpty(param)) { // 没有跳转数据则返回首页
    this.webhub_BackHome();
    return;
  }

  // 无来源 或者 不在配置表中 回退浏览器
  if (!this.isNotEmpty(from) || Object.values(this.webhubPageConfig).indexOf(from) === -1) {
    this.webhub_backBrowser(); // 回退到浏览器
    return;
  }

  /*
  * 0.只处理需要回退到浏览器的情况
  * 1.通过key在pages中查找同名称的index
  * 2.index != -1,对象存在,目标动作完成,isFinished标记为1,寻找下一个跳转页面
  * 3.index == -1,对象不存在,目标动作未完成,寻找下一个跳转页面
  * 4.寻找下一个页面:遍历数组,找到第一个isFinished为0的对象的index_next,
  * 5.index_next != -1,对象存在,执行跳转页面方法
  * 6.index_next == -1,对象不存在,回退到浏览器
  * */

  let key = Object.keys(this.webhubPageConfig).find(key => this.webhubPageConfig[key] === from);
  let pages = JSON.parse(param.pages);
  let index = pages.findIndex(el => el.name === key);

  if (index !== -1) {
    let page = pages[index];
    page.isFinished = '1'; // 0:目标页面操作未完成, 1:目标页面操作完成
    param.pages = JSON.stringify(pages);
    this.setSessionDictionary(BHFAE_WEBHUB_INFO, param);
  }

  //跳转下一个页面

  let index_next = pages.findIndex(page => page.isFinished === '0');
  if (index_next !== -1) { // 对象存在
    this.webhub_pushPage(pages[index_next]);
  } else {
    this.webhub_backBrowser(resultInfo);
  }
};

Vue.prototype.WEB_HUB = 'webhub';

// 处理页面跳转
Vue.prototype.webhub_pushPage = function (page) {
  console.log('开始跳转页面');
  if(this.webhubIgnoreCallBackPages.indexOf(page.name) !== -1) { // 如果是开放性页面(如首页,投资页等),需删除session中的BHFAE_WEBHUB_INFO,并通知浏览器关闭所有页面
    Vue.prototype.webhub_closeBrowser();
  }
  let param = this.notEmpty(page.param, {});
  param.sourcePage = this.WEB_HUB;
  let pageName = this.webhubPageConfig[page.name];
  console.log('pageName:' + pageName);
  if (this.getAppPageName() !== pageName) {
    setTimeout(() => {
      window.globalVue.$router.push({
        name: this.getSourcePage(pageName),
        params: param
      });
    }, 100);
  }
};

Vue.prototype.webhub_BackHome = function () {
  window.globalVue.$router.push({
    name: 'homePage'
  });
};

// 说明: 返回浏览器,①APP返回首页 ②show浏览器 ③注入脚本,通知结果 ④删除本地session数据
Vue.prototype.webhub_backBrowser = function (resultInfo) {

  this.webhub_BackHome();

  let param = this.getSessionDictionary(BHFAE_WEBHUB_INFO);
  if (this.notEmpty(param)) {
    outerBrowser.show();

    let result = Vue.prototype.createResult_web('0000', 'success', this.notEmpty(resultInfo, null));
    Vue.prototype.afterAction_web(result, param.eventKey, param.eventTag);
    Vue.prototype.removeSessionStorage(BHFAE_WEBHUB_INFO);
  }
};

Vue.prototype.webhub_exit = function () {
  Vue.prototype.webhub_closeBrowser();
  Vue.prototype.removeSessionStorage(BHFAE_WEBHUB_INFO);
};

Vue.prototype.webhub_bhfae_event_bus = function (param, callBack) {
  // console.log('bhfae_event_bus:' + JSON.stringify(param));
  if(this.isNotEmpty(param.busKey)) {
    let info = {};
    if (this.isNotEmpty(param.param)) {
      info = JSON.parse(param.param);
    }
    this.$bus.emit(param.busKey, info);
    callBack(Vue.prototype.success_web());
  } else {
    callBack(Vue.prototype.failed_web('event key can not be empty'));
  }
};

// iOS App内评分
Vue.prototype.webhub_appRate = function (param, callBack) {
  Vue.prototype.appReview(function (result) {
    Vue.prototype.webhub_handle_jsonResult(result, callBack);
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  });
};

Vue.prototype.webhub_bhfae_location = function (param, callBack) {
  Vue.prototype.getBHLocation(function (result) {
    Vue.prototype.webhub_handle_jsonResult(result, callBack);
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  }, true);
};

Vue.prototype.webhub_phone_state = function (param, callBack) {
  Vue.prototype.getPhoneState(function (result) {
    Vue.prototype.webhub_handle_jsonResult(result, callBack);
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  }, true);
};

Vue.prototype.webhub_step_count = function (param, callBack) {
  Vue.prototype.getHealthInfo(function (result) {
    Vue.prototype.webhub_handle_jsonResult(result, callBack);
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  });
};

Vue.prototype.webhub_check_permission = function (param, callBack) {
  Vue.prototype.checkDevicePermission(param, function (result) {
    Vue.prototype.webhub_handle_jsonResult(result, callBack);
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  });
};

Vue.prototype.webhub_request_permission = function (param, callBack) {
  Vue.prototype.requestDeviceAuth(param, function (result) {
    Vue.prototype.webhub_handle_jsonResult(result, callBack);
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  });
};

Vue.prototype.webhub_record_audio = function (param, callBack) {
  Vue.prototype.audioRecognize(param, function (result) {
    Vue.prototype.webhub_handle_jsonResult(result, callBack);
  }, function (error) {
    Vue.prototype.webhub_handle_jsonResult(error, callBack);
  });
};

// Vue.prototype.webhub_show_AIBank = function (param, callBack) {
//   Vue.prototype.showAIBank(param, function (result) {
//     Vue.prototype.webhub_handle_jsonResult(result, callBack);
//   }, function (error) {
//     Vue.prototype.webhub_handle_jsonResult(error, callBack);
//   });
// };

// 生成结果
Vue.prototype.success_web = function (msg) {
  msg = Vue.prototype.isNotEmpty(msg) ? msg : 'success';
  return Vue.prototype.createResult_web('0000', msg, null);
};

// 失败结果
Vue.prototype.failed_web = function (msg) {
  return Vue.prototype.createResult_web('-9999', msg, null);
};
// 生成结果
Vue.prototype.createResult_web = function (code, msg, eventInfo) {
  let result = {
    code: code,
    msg: msg
  };
  if (Vue.prototype.isNotEmpty(eventInfo)) {
    result.eventInfo = eventInfo;
  }
  return result;
};

// query 转 对象
Vue.prototype.query2Dict = function (param) {
  let pattern = /([^?&=]+)=([^&#]*)/g;
  let dict = {};
  let search = null;
  if (typeof param === "object" && param instanceof Location) {
    search = param.search;
  }
  else if (typeof param === "string") {
    search = param;
  }
  else {
    throw new Error("参数类型非法！请传入window.loaction对象或者url字符串。");
  }
  search.replace(pattern, function (rs, $1, $2) {
    let key = decodeURIComponent($1);
    let value = decodeURIComponent($2);
    dict[key] = value;
    return rs;
  });
  return dict;
};

// 对象 转 query (不包含'?')
Vue.prototype.object2Query = function (obj) {
  if (!Vue.prototype.isNotEmpty(obj)) {
    return '';
  }
  return Object.keys(obj).reduce(function (str, key, i) {
    let delimiter, val;
    delimiter = (i === 0) ? '' : '&';
    key = encodeURIComponent(key);
    val = encodeURIComponent(obj[key]);
    return [str, delimiter, key, '=', val].join('');
  }, '');
};
// url + query
Vue.prototype.urlJoinQuery = function (url, queryStr) {
  let delimiter = '?'; // 定界符
  if (url.indexOf('?') !== -1) {
    delimiter = '&';
  }
  return url + delimiter + queryStr;
};

// url 拼接公共参数
Vue.prototype.urlJoinCommonParam = function (url) {
  let deviceObj = Vue.prototype.getLocalDictionary(Vue.prototype.bhfaeDeviceKey);
  let queryObj = {
    visitorId: Vue.prototype.getUserStorage('visitorId'),
    token: Vue.prototype.getSessionStorage('token'),
    appVersion: Vue.prototype.getAppVersion(),
    appClientType: this.handelClientType(), // app操作系统 Android:'0'  iOS:'1'
    appMachineBrand: this.getValidateString(Vue.prototype.deviceInfo().deviceManufacturer), // app设备品牌
    appMachineModel: this.getValidateString(Vue.prototype.deviceInfo().deviceModel), // app设备型号
    appSystemVersion: this.getValidateString(Vue.prototype.deviceInfo().deviceVersion), // app操作系统版本
    pushId: this.getValidateString(Vue.prototype.getPushId()), // 推送ID
    uuid: this.getValidateString(Vue.prototype.deviceInfo().deviceUUID), // 通用唯一标识符
    longitude: this.getValidateString(deviceObj.longitude), // 经度
    latitude: this.getValidateString(deviceObj.latitude), // 纬度
    imei: this.getValidateString(deviceObj.imei), // 国际移动设备身份码
    imsi: this.getValidateString(deviceObj.imsi) // 国际移动用户识别码(需SIM卡)
  };
  if (this.getSessionStorage('bhfae_dragon') === '1') {
    queryObj.bhfae_dragon = '1'; // 开启 v_console
  }

  let queryString = Vue.prototype.object2Query(queryObj);
  url = Vue.prototype.urlJoinQuery(url, queryString);
  return url;
};

Vue.prototype.webhub_refreshStartTime = function () {
  Vue.prototype.setSessionStorage('bhfae_start_time', Date.now());
};

Vue.prototype.webhub_getStartTime = function () {
  return Vue.prototype.getSessionStorage('bhfae_start_time');
};
