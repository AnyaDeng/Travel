import Vue from 'vue';

Vue.prototype.isRunOnDevice = function () {
  return isDevice();
}

function isDevice() {
  try {
    if (Vue.prototype.getDeviceInfo()) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

/******************************* 设备信息 **************************************************/
Vue.prototype.deviceInfo = function () {
  try {
    let info = Vue.prototype.getSessionDictionary('bhfae_deviceInfo');
    if (!Vue.prototype.isNotEmpty(info)) {
      info = Vue.prototype.getDeviceInfo();
      if (Vue.prototype.isNotEmpty(info)) {
        Vue.prototype.setSessionDictionary('bhfae_deviceInfo', info);
      }
    }
    return info;
  } catch (e) {
    return {};
  }
};

Vue.prototype.getDeviceInfo = function () {
  return {
    deviceModel: device.model, // 型号 e.g (iOS: iPhone9,1 Android: FRD-AL10)
    devicePlatform: device.platform, // 平台 e.g (iOS, Android)
    deviceUUID: device.uuid, // 设备的唯一编码 e.g (iOS:XXXX-XXXX  Android: b4ad6a2e7fe)
    deviceVersion: device.version, // 操作系统版本 e.g (iOS: 11.1.2 Android: 7.0)
    deviceManufacturer: device.manufacturer, // 厂商 e.g (Apple,HUAWEI)
    deviceSerial: device.serial // 硬件序列号(只有安卓) e.g (GSL0217A16000577)
  }
}

/******************************* 相机/相册 **************************************************/
Vue.prototype.getPictureShow = function (options, success, errorBack, isNotCheck) {
  if (isNotCheck) {
    this.doGetPictureShow(options, success, errorBack);
  } else {
    // 检查权限 默认 拍照
    let permissions = [];
    if (options.type === '1') { // 从相册获取
      if (this.isIOSDevice()) { //  iOS 直接执行
        this.doGetPictureShow(options, success, errorBack);
      } else {
        permissions = [this.permissionCode.READ_EXTERNAL_STORAGE.code];
      }
    } else { // 从相机获取
      if (this.isIOSDevice()) {
        //ceshi
        this.callNebula(options, success, errorBack);
        return;
        permissions = [this.permissionCode.CAMERA.code];
      } else {
        permissions = [this.permissionCode.CAMERA.code, this.permissionCode.WRITE_EXTERNAL_STORAGE.code, this.permissionCode.READ_EXTERNAL_STORAGE.code];
      }
    }
    const permissionCode = permissions.join();
    this.checkDevicePermissionForce(permissionCode, () => {
      this.doGetPictureShow(options, success, errorBack);
    }, errorBack);
  }
};


Vue.prototype.doGetPictureShow = function (options, success, errorBack) {
  // navigator.camera.getPicture(data => {
  //   success(data);
  // }, message => {
  //   errorBack(message);
  // }, options);

  window.bhfaeOpen.chooseImage(options, success, errorBack);
};

Vue.prototype.getPicForPortrait = function (params, success, errorBack) {
  // if (isDevice() === false) {
  //   errorBack();
  //   return;
  // }
  // let options = {
  //   sourceType: Camera.PictureSourceType.CAMERA,
  //   quality: 50,
  //   destinationType: Camera.DestinationType.FILE_URI,
  //   allowEdit: params.allowEdit,
  //   encodingType: Camera.EncodingType.PNG,
  //   targetWidth: params.width ? params.width : 320,
  //   targetHeight: params.height ? params.height : 320,
  //   correctOrientation: true,
  //   cameraDirection: Camera.Direction.FRONT
  // };
  // if (params.isAlbum) {
  //   options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
  //   options.mediaType = Camera.MediaType.PICTURE;
  // }
  let options = {
    type: params.isAlbum === true ? '1' : '0',
    allowEdit: params.allowEdit,
    maxLength: 1024,
    width: params.width ? params.width : 320,
    height: params.width ? params.height : 320,
    correctOrientation: true
  }
  Vue.prototype.getPictureShow(options, (res) => {
    console.log(res.body.localId);
    success(res.body.localId);
  }, () => {
    errorBack();
  });
};
Vue.prototype.getPicForOCR = function (params, success, errorBack) {
  if (isDevice() === false) {
    errorBack();
    return;
  }
  let options = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,
    allowEdit: false,
    encodingType: Camera.EncodingType.PNG,
    targetWidth: params.width,
    targetHeight: params.height,
    mediaType: Camera.MediaType.PICTURE
  };
  Vue.prototype.getPictureShow(options, success, errorBack);
};
//意见反馈
Vue.prototype.getPicForFeedback = function (params, success, errorBack) {
  if (isDevice() === false) {
    errorBack();
    return;
  }
  let options = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,
    allowEdit: false,
    encodingType: Camera.EncodingType.PNG,
    targetWidth: params.width,
    targetHeight: params.height,
    mediaType: Camera.MediaType.PICTURE
  };
  Vue.prototype.getPictureShow(options, success, errorBack);
};

/******************************* iOS touch ID / face ID **************************************************/
// 查看设备指纹是否可用
function touchIdAvailable(success, error) {
  window.plugins.touchid.isAvailable(function (type) {
    window.plugins.touchid.didFingerprintDatabaseChange(function (changed) {
      if (changed) {
        error('FingerprintDatabaseChange');
      } else {
        success(type);//iPhone X 返回 'face',其他的返回 'touch'
      }
    });
  }, function (msg) {
    // console('指纹不OK,因为:' + JSON.stringify(msg));
    error(msg);
  });
}

// 验证指纹
function touchIdVerify(title, success, errorCallBack) {
  touchIdAvailable(function (type) {
    let tip = (type === 'face') ? '    ' : '轻触Home键验证已有手机指纹';
    window.plugins.touchid.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
      tip, // this will be shown in the native scanner popup
      title, // this will become the 'Enter password' button label
      function (msg) {
        success();// 指纹验证成功
      }, // success handler: fingerprint accepted
      function (msg) {
        let jsonMsg = JSON.stringify(msg);
        try {
          let obj = eval('(' + jsonMsg + ')');
          switch (obj.code) {
            case -1 :
              console.log('连续错误3次');// 连续错误3次
              errorCallBack(-1);
              break;
            case -2:
              console.log('点击取消按钮');// 点击取消按钮
              errorCallBack(-2);
              break;
            case -3:
              console.log('其它登录方式');// 点击取消按钮
              errorCallBack(-3);
              break;
            case -6:
              console.log('用户拒绝授权指纹/面容');// 用户拒绝授权
              errorCallBack(-6);
              break;
            case -8:
              console.log('指纹锁定');// 错误次数过多,指纹锁定
              errorCallBack(-8);
              break;
            default :
              console.log('指纹验证错误: ' + jsonMsg);// 指纹验证错误和其他错误
              errorCallBack(-9999);
          }
        } catch (e) {
          console.log(e);
          errorCallBack(-9999);// 其他错误
        }
      }
    );
  }, function (e) {
    console.log(e);
    errorCallBack(-9999);// 其他错误
  });
}

/******************************* Android fingerprint **************************************************/

/*
 * 设备指纹是否可用
 * success: 成功回调
 * errorCallBack: 失败回调
 * */
function fingerPrintAvailable(success, error) {
  FingerprintAuth.isAvailable(function (result) {
    if (result.isAvailable) {
      success('touch');
    } else {
      error('fingerPrint not available');
    }
  }, function (message) {
    error(message);
  });
}

/*
 * 开启指纹
 * userId: 当前登录用户的id
 * authorizationCode: 开启指纹后,服务端返回的授权码
 * success: 成功回调
 * errorCallBack: 失败回调
 * */
function fingerPrintOpen(userId, authorizationCode, success, errorCallBack) {
  if (userId === null || authorizationCode === null) return;
  let encryptConfig = {
    clientId: getClientId(),
    username: userId,
    password: authorizationCode,
    encryptNoAuth: true
  };
  FingerprintAuth.encrypt(encryptConfig, function (result) {
    success(result.token);
  }, function (error) {
    errorCallBack("开启失败: " + error);
  });
}

/*
 * 关闭指纹
 * userId: 当前登录用户的id
 * */
function fingerPrintClose(userId, success, errorCallBack) {
  if (userId === null) return;
  let deleteConfig = {
    clientId: getClientId(),
    username: userId
  };
  FingerprintAuth.delete(deleteConfig, function (result) {
    success();
  }, function (error) {
    errorCallBack(error);
  });
}

/*
 * 验证指纹
 * userId: 当前登录用户的id
 * token: 分配的指纹token
 * */
function fingerPrintVerify(userId, token, success, errorCallBack) {
  if (userId === null || token === null) return;
  let decryptConfig = {
    clientId: getClientId(),
    username: userId,
    token: token,
    disableBackup: true,
    maxAttempts: 3,
    locale: "zh_CN",
    encryptNoAuth: false,
    dialogTitle: "指纹验证",
    dialogMessage: "滨海国金所指纹登录验证",
    dialogHint: "指纹解锁"
  };
  FingerprintAuth.decrypt(decryptConfig, function (result) {
    if (result.withFingerprint && result.password) {
      success(result.password);
    } else {
      errorCallBack("验证失败: 非指纹验证 或者 本地获取授权码失败");
    }
  }, function (error) {
    errorCallBack("验证失败: " + error);
  });
}

function getClientId() {
  return "bhgjsapk.keystore";
}

/******************************* iOS keyChain **************************************************/
// keyChain存入
function keyChainSet(key, value, success, errorBack) {
  Keychain.set(function () {
    success(key);
  }, function (error) {
    errorBack(error);
  }, key, value, false);
}

// keyChain获取
function keyChainGet(key, success, errorBack) {
  Keychain.get(function (value) {
    success(value);
  }, function (error) {
    errorBack(error);
  }, key, null);
}

// keyChain删除
function keyChainRemove(key, success, errorBack) {
  Keychain.remove(function () {
    success();
  }, function (error) {
    errorBack(error);
  }, key);
}

/******************************* 指纹 统一方法 调用 **************************************************/
function isApple() {
  let deviceInfo = Vue.prototype.getDeviceInfo();
  return deviceInfo.devicePlatform === 'iOS';
}

// 设备指纹是否可用(可用返回'touch'或者'face')
Vue.prototype.fingerTouchAvailable = function (success, errorBack) {
  if (isDevice() === false) {
    errorBack();
    return;
  }
  if (isApple()) {
    touchIdAvailable(success, errorBack);
  } else {
    fingerPrintAvailable(success, errorBack)
  }
};
// 开启指纹 (成功返回 fingerPrintToken)
Vue.prototype.fingerTouchOpen = function (userId, authCode, success, errorBack) {
  if (isDevice() === false) {
    errorBack();
    return;
  }
  if (userId === null || authCode === null) return;
  if (isApple()) {
    keyChainSet(userId, authCode, success, errorBack);
  } else {
    fingerPrintOpen(userId, authCode, success, errorBack);
  }
};
// 仅仅验证指纹,不返回数据 (点击跳过返回失败-3);
Vue.prototype.fingerTouchVerify_iOS = function (success, errorBack) {
  touchIdVerify('跳过', success, errorBack);
};
// 验证指纹 (成功返回authCode,点击其他登录方式返回失败-3);
Vue.prototype.fingerTouchVerify = function (userId, fingerPrintToken, success, errorBack) {
  if (isDevice() === false) {
    errorBack();
    return;
  }
  if (userId === null || fingerPrintToken === null) return;
  if (isApple()) {
    touchIdVerify('其它登录方式', function () {
      keyChainGet(userId, function (value) {
        success(value);
      }, errorBack);
    }, errorBack);
  } else {
    fingerPrintVerify(userId, fingerPrintToken, success, errorBack);
  }
};
// 关闭指纹
Vue.prototype.fingerTouchClose = function (userId, success, errorBack) {
  if (isDevice() === false) {
    errorBack();
    return;
  }
  if (userId === null) return;
  if (isApple()) {
    keyChainRemove(userId, success, errorBack);
  } else {
    fingerPrintClose(userId, success, errorBack);
  }
};
/* 下面是指纹调用 demo
 onClicked(){ // ① 指纹是否可用
 this.fingerTouchAvailable(function (type) {
 alert(type);
 }, function (error) {
 console.log(error);
 });
 },
 onClicked1(){ // ② 开启指纹
 let userId = "dave";
 let authCode = "123456";
 let _this = this;
 this.fingerTouchOpen(userId, authCode, function (fingerPrintToken) {
 alert(fingerPrintToken);
 _this.setLocalStorage(userId, fingerPrintToken);
 }, function (error) {
 console.log(error);
 });
 },
 onClicked2(){ // ③ 验证指纹
 let userId = "dave";
 let fingerPrintToken = this.getLocalStorage(userId);
 this.fingerTouchVerify(userId, fingerPrintToken, function (authCode) {
 alert(authCode);
 }, function (error) {
 if (error === -3){
 alert("点击其他登录方式");
 }else {
 console.log(error);
 }
 });
 },
 onClicked3(){ // ④ 关闭指纹
 let userId = "dave";
 this.fingerTouchClose(userId, function () {
 alert("指纹加密信息authCode已删除");
 }, function (error) {
 console.log(error);
 });
 }
 * */

/******************************* 检查网络连接状况 **************************************************/
/*
 返回网络连接状况
 1000: 蜂窝网络连接
 2000: 2G 网络
 3000: 3G 网络
 4000: 4G 网络
 5000: WiFi 网络
 6000: 以太网连接
 7000: 未知连接
 -1000: 无网络连接
 * */
Vue.prototype.checkConnection = function () {
  if (isDevice() === false) {
    return 5000;
  }
  return checkConnection();
};

function checkConnection() {
  let networkState = navigator.connection.type;
  let states = {};
  states[Connection.CELL] = 1000;// 'Cell generic connection';
  states[Connection.CELL_2G] = 2000;// 'Cell 2G connection';
  states[Connection.CELL_3G] = 3000;// 'Cell 3G connection';
  states[Connection.CELL_4G] = 4000;// 'Cell 4G connection';
  states[Connection.WIFI] = 5000;// 'WiFi connection';
  states[Connection.ETHERNET] = 6000;// 'Ethernet connection';
  states[Connection.UNKNOWN] = 7000;// 'Unknown connection';
  states[Connection.NONE] = -1000;// 'No network connection';

  return states[networkState];
}

Vue.prototype.thirdLinks = function (urlStr, paramTitle) {
  if (isDevice()) {
    if (urlStr.indexOf('.pdf') !== -1) {
      const params = {
        'action': 'doc_pdf',
        'pdfUrl': urlStr
      };
      this.showAppH5(params);
    } else {
      this.showBrowser(urlStr, paramTitle)
    }
  } else {
    window.open(urlStr);
  }
};

// 清除缓存
Vue.prototype.deviceClearCache = function () {
  if (isDevice()) {
    BHCacheClear.clearCache(function (res) {
      console.log('success');
    }, function (error) {
      console.log('Error: ' + error);
    });
  }
};

/************* ---- 终止APP运行 ---- (滨海金融cordova插件) *************/
Vue.prototype.terminateApp = function () {
  if (isDevice()) {
    if (Vue.prototype.getDeviceInfo().devicePlatform === 'Android') {
      navigator.app.exitApp();
    } else {
      Bhfae.terminateApp();
    }
  }
};

/************* ---- OCR 身份证&银行卡识别 ---- (滨海金融cordova插件) *************/
Vue.prototype.OCRType = {
  IDCardNormal: 0,
  IDCardFrontSide: 1,
  IDCardBackSide: 2,
  BankCard: 3
};

/*
// TODO: 移除,替换为wms服务
        let _this = this;
        let url = 'http://10.10.200.109:8080/img-discern/getSign?userId=50000005498';
        let _params = {};
        this.serverVersion(url, _params, function (responseData) {
          let resultCode = responseData.body.resultCode;
          let message = responseData.body.message;
          if (resultCode === '0000') {
            let resultData = responseData.body.body;
            _this.doocr(resultData);
          }else {
            alert(message);
          }
        });

        doocr(resultData) {
        let params = {};
        params.type = this.OCRType.BankCard;
        params.userId = '50000005498'; // TODO: 用户的visitId
        params.appId = 'TIDAaNH9'; // TODO: 生产/测试 需要区分
        params.nonce = resultData.nonce;
        params.sign = resultData.sign;
        params.orderNo = resultData.orderNo;
        let _this = this;
        this.bhfaeOCR(params, function (result) {
          _this.$toast(result.bankcardNo);
        }, function (message) {
          _this.$toast(message);
        });
      }
*/

/*
* type:OCR识别类型,0:身份证正反面. 1:身份证正面 2:身份证反面 3:银行卡
* params:需要传递的参数,object类型,包括:
*   {
*   type: OCR 类型
*   userId: 当前用户的唯一ID.
*   appId:腾讯分配的appId (注意测试环境和生产环境区分)
*   nonce:唯一字符串.
*   sign:签名.
*   orderNo:订单号
*   }
*   success:识别结果,object类型
*   银行卡:
    body:{
        bankcardNo:银行卡号
    }
身份证:
    body:{
        idcard: 身份证号码
        name:姓名
        sex:性别
        nation:民族
        address:地址
        birth:生日
        authority:发证机关
        validDate:有效期
    }
* */
Vue.prototype.bhfaeOCR = function (params, success, failed, isNotCheck) {
  if (isDevice() === false) return;
  if (isNotCheck) {
    this.doBhfaeOCR(params, success, failed);
  } else {
    // 检查权限
    let permissions = [this.permissionCode.CAMERA.code, this.permissionCode.WRITE_EXTERNAL_STORAGE.code, this.permissionCode.READ_EXTERNAL_STORAGE.code];
    if (this.isIOSDevice()) {
      permissions = [this.permissionCode.CAMERA.code];
    }
    this.checkDevicePermissionForce(permissions, () => {
      this.doBhfaeOCR(params, success, failed);
    }, failed);
  }
};

Vue.prototype.doBhfaeOCR = function (params, success, failed) {
  window.globalVue.$loading();
  Bhfae.startOCR(params, function (result) {
    window.globalVue.$loadingHide();
    if (result.code === '0000') {
      success(result.body);
    }

  }, function (error) {
    window.globalVue.$loadingHide();
    failed(error);
  });
};

/************* ---- 人脸识别(动作) ---- (滨海金融cordova插件) *************/

/*
let _this = this;
        let url = 'http://10.10.200.109:8080/img-discern/getSign?userId=50000005498';
        let _params = {};
        this.serverVersion(url, _params, function (responseData) {
          let resultCode = responseData.body.resultCode;
          let message = responseData.body.message;
          if (resultCode === '0000') {
            let resultData = responseData.body.body;
            _this.doFaceVerify(resultData);
          }else {
            alert(message);
          }
        });

doFaceVerify (resultData) {
        let params = {};
        params.userId = '50000005498'; // TODO: 用户的visitId
        params.appId = 'TIDAaNH9'; // TODO: 生产/测试 需要区分
        params.nonce = resultData.nonce;
        params.sign = resultData.sign;
        params.orderNo = resultData.orderNo;
        params.userName = '张靖乐';
        params.idNumber = '130682198907146335';
        // TODO: licence 生产/测试 需要区分
        params.licence = 'lr57BrMfF8EynCWiHaVE3bwjroQQaTBkEgEr5ifYLLKwvVuIKEytmvkVRCxCgDS1LKPP2lBE7yWOgM/dPYi+tqPVO6w/AKJu1UygkM9RNWporn+1m03sO6ouYwdL0O2JpAhV0Aldou/9u5nywVxf4SkQeJmBRZktgrGpGk1zDJUcJdLZViP+n4lCKGyPRJHhBxzABZvnUEEO1WuxoU900wzV6n3TBtZFtyDnLbu1J2yoM9YzB1OmwXbfa+4bQQpeIikCw+62qSHjfVxyp5m+lfvRwMdZGSAHCiC9FW0Z3Yw88z76RJHoTPeZvSxHEMl8EzVgwz4GO0BiscT2bOo3Iw==';

        let _this = this;
        this.bhfaeFaceRecognition(params, function () {
          _this.$toast('识别成功');
        }, function (message) {
          _this.$toast(message);
        });
      }

* */

/*
*params:{
*   userId:用户id(当前登录用户唯一id);
*   appId:分配的appId;
*   nonce:唯一字符串;
*   orderNo:订单号;
*   sign:签名;
*   userName:姓名;
*   idNumber:身份证号码;
*   licence:licence;
* }
* */
Vue.prototype.bhfaeFaceRecognition = function (params, success, failed, isNotCheck) {
  if (isDevice() === false) return;
  if (isNotCheck) {
    this.doBhfaeFaceRecognition(params, success, failed);
  } else {
    // 检查权限
    let permissions = [this.permissionCode.CAMERA.code, this.permissionCode.WRITE_EXTERNAL_STORAGE.code, this.permissionCode.READ_EXTERNAL_STORAGE.code];
    if (this.isIOSDevice()) {
      permissions =[this.permissionCode.CAMERA.code];
    }
    this.checkDevicePermissionForce(permissions, () => {
      this.doBhfaeFaceRecognition(params, success, failed);
    }, failed);
  }
};

Vue.prototype.doBhfaeFaceRecognition = function (params, success, failed) {
  this.$loading();
  Bhfae.startFaceRecognition(params, (result) => {
    this.$loadingHide();
    if (result.code === '0000') {
      success();
    }
  }, (error) => {
    this.$loadingHide();
    failed(error);
  });
};


// 拨打电话
Vue.prototype.callPhone = function (number, isNotCheck) {
  if (isDevice() === false) return;
  if (isNotCheck || this.isIOSDevice()) {
    this.doCallPhone(number);
  } else {
    // 检查权限
    this.checkDevicePermissionForce(this.permissionCode.CALL_PHONE.code, () => {
      this.doCallPhone(number);
    }, () => {
    });
  }
};

Vue.prototype.doCallPhone = function (number) {
  if (Vue.prototype.isNotEmpty(number) === false) {
    window.globalVue.$toast('电话号码不能为空');
    return;
  }
  Assist.isCallSupported(function () {
    let params = {'tel': number};
    Assist.callTel(params, function (data) {
      console.log(JSON.stringify(data));
    }, function (error) {
      if (error.code === "-3000") {
        Vue.prototype.$confirmCtrl("", "为提供当前服务，滨海国金所需要获取您的拨打电话权限，请到手机“设置-应用-滨海国金所-权限”打开拨打电话权限。", "去授权", "取消", function () {
          Vue.prototype.openAppSetting();
        });
      } else {
        window.globalVue.$toast(error.msg);
      }
    });
  }, function (error) {
    window.globalVue.$toast(error.msg);
  });
};

// 复制内容到剪贴板
Vue.prototype.copyTextToClipboard = function (text, success, failed) {
  if (isDevice() === false) {
    this.copyPolicyOnWeb(text, success, failed);
  } else {
    if (this.isNotEmpty(text) === false) {
      return;
    }
    let param = {'msg': text};
    Assist.copyText(param, success, failed);
  }
};

// 跳转应用商店
Vue.prototype.openAppStore = function () {
  if (isDevice() === false) return;
  let param = {'appId': this.getAppPackageName()};
  if (this.isIOSDevice()) {
    param.appId = this.getAppIdInAppStore();
  }
  Assist.appRate(param);
};

// iOS 能否使用苹果评分弹框
Vue.prototype.checkAppReview = function (success, error) {
  if (isDevice() === false) return;
  Assist.checkRequestReview(success, error);
};

// iOS 使用苹果评分弹框
Vue.prototype.appReview = function (success, error) {
  if (isDevice() === false) return;
  Assist.appRequestReview(success, error);
};

// 能否打开 第三方APP
Vue.prototype.thirdApp_canOpen = function (bankInfo, callback) {
  if (isDevice() === false) return;
  let param = {
    openValue: this.isIOSDevice() ? bankInfo.iosScheme : bankInfo.androidPackage
  };
  Assist.canOpenThirdApp(param, function (result) {
    callback(result.body.canOpen === '1');
  }, function (error) {
    console.log(JSON.stringify(error));
  });
};

// 打开 第三方APP
Vue.prototype.thirdApp_open = function (bankInfo) {
  if (isDevice() === false) return;
  let param = {
    openValue: this.isIOSDevice() ? bankInfo.iosScheme : bankInfo.androidPackage
  };
  Assist.openThirdApp(param, function (result) {
    console.log(JSON.stringify(result));
  }, function (error) {
    console.log(JSON.stringify(error));
  });
};

// 第三方APP 下载url
Vue.prototype.thirdApp_downloadUrl = function (bankInfo) {
  // 安卓
  let url = 'http://a.app.qq.com/o/simple.jsp?pkgname=' + bankInfo.androidPackage;
  if (this.isIOSDevice()) { // ios
    url = 'itms-apps://itunes.apple.com/cn/app/id' + bankInfo.iosAppStoreId + '?mt=8';
  }
  return url;
};

// 说明:隐私-获取定位(iOS:定位; Android:定位)
Vue.prototype.getBHLocation = function (success, error, isNotCheck) {
  if (isDevice() === false) return;
  if (isNotCheck) {
    BHLocation.getLocation(success, error);
  } else {
    // 检查权限
    this.checkDevicePermissionForce(this.permissionCode.ACCESS_LOCATION.code, () => {
      BHLocation.getLocation(success, error);
    }, error);
  }
};

// 用户同意权限后再继续执行,否则不执行
Vue.prototype.checkDevicePermissionForce = function (permissionCode, success, error, isRequestPermission) {
  this.checkDevicePermissionWithTip(permissionCode, (denyPermissions) => {
    if (this.isNotEmpty(denyPermissions)) {
      console.log('用户拒绝授权,停止操作! denyPermissions:' + JSON.stringify(denyPermissions));
    } else {
      success();
    }
  }, error, true);
};

// 检查权限,并请求(可选)权限
Vue.prototype.checkDevicePermissionWithTip = function (permissionCode, success, error, isRequestPermission) {
  let denyPermissions = [];
  this.addObserve('authorityPopupConfirm', () => {
    if (isRequestPermission) {
      this.requestDevicePermissionAfterTip(denyPermissions, success);
    } else {
      success(denyPermissions);
    }
  });
  const param = {
    target: permissionCode
  };
  const permissionKeys = permissionCode.split(',');
  this.checkDevicePermission(param, (res) => {
    if (res.code === '0000' && this.isNotEmpty(res.body)) {
      denyPermissions = permissionKeys.filter(key => res.body[key] !== '1');
      if (this.isNotEmpty(denyPermissions)) {
        this.$bus.emit('showAuthorityPopup', denyPermissions);
      } else {
        success(denyPermissions);
      }
    } else if (error) {
      error();
    }
  }, error);
};
// 请求被拒绝的权限
Vue.prototype.requestDevicePermissionAfterTip = function (denyPermissions, success) {
  if (this.isNotEmpty(denyPermissions)) {
    const param = {
      target: denyPermissions.join()
    };
    this.requestDeviceAuth(param, (res) => {
      if (res.code === '0000' && this.isNotEmpty(res.body)) {
        let allowCodes = denyPermissions.filter(code => res.body[code] === '1'); // 授权 (全部)
        if (allowCodes.length === denyPermissions.length) { // 全部授权 (继续执行)
          success();
        } else {
          let denyCodes = denyPermissions.filter(code => res.body[code] !== '1'); // 未授权
          let alwaysDenyCodes = []; // 拒绝后不再提示 (部分)
          if (this.isIOSDevice()) {
            alwaysDenyCodes = denyPermissions.filter(code => res.body[code] === '0'); // 拒绝后不再提示 (部分) iOS
          } else {
            alwaysDenyCodes = denyPermissions.filter(code => res.body[code] === '-3000'); // 拒绝后不再提示 (部分) Android
          }
          if (this.isNotEmpty(alwaysDenyCodes)) {
            let denyNames = alwaysDenyCodes.map(code => {
              let item = Object.values(this.permissionCode).find(el => el.code === code);
              if (this.isNotEmpty(item)) {
                return item.name;
              }
            });
            if (this.isNotEmpty(denyNames)) {
              const msg = '您已设置拒绝滨海国金所获取' + denyNames.join() + '权限。您可在“设置-应用-权限管理”下修改对应的权限设置，以获得更加优质的服务。';
              window.globalVue.$confirmCtrl("", msg, "去授权", "取消", function () {
                Vue.prototype.openAppSetting();
              });
            } else {
              success(denyCodes); // 转换异常 (继续执行)
              console.log('[数据匹配异常]-权限结果:' + JSON.stringify(res));
            }
          } else {
            success(denyCodes); // 拒绝 (继续执行)
            console.log('[用户拒绝权限]-权限结果:' + JSON.stringify(res));
          }
        }
      } else {
        console.log('permission_error:' + JSON.stringify(res));
      }
    }, (permission_error) => {
      console.log('permission_error:' + JSON.stringify(permission_error));
    });
  } else {
    success();
  }
};

// 说明:跳转系统app设置界面(权限->iOS:无; Android:无)
Vue.prototype.openAppSetting = function () {
  if (isDevice() === false) return;
  Assist.openSetting();
};

// 说明:隐私-获取电话状态(权限->iOS:无; Android:电话状态)
Vue.prototype.getPhoneState = function (success, error, isNotCheck) {
  if (isDevice() === false || this.isIOSDevice()) return;
  if (isNotCheck) {
    Assist.getPhoneState(success, error);
  } else {
    // 检查权限
    this.checkDevicePermissionForce(this.permissionCode.READ_PHONE_STATE.code, () => {
      Assist.getPhoneState(success, error);
    }, error);
  }
};

// 说明:隐私-获取存储的读取权限(权限->iOS:无; Android:存储读取)
Vue.prototype.getPermisson_storage = function (success, error, isNotCheck) {
  if (isDevice() === false || this.isIOSDevice()) return;
  let permissions = [this.permissionCode.WRITE_EXTERNAL_STORAGE.code, this.permissionCode.READ_EXTERNAL_STORAGE.code];
  const param = {
    target: permissions.join()
  };
  if (isNotCheck) {
    Vue.prototype.requestDeviceAuth(param, success, error);
  } else {
    // 检查权限
    this.checkDevicePermissionForce(permissions.join(), () => {
      Vue.prototype.requestDeviceAuth(param, success, error);
    }, error);
  }
};

// 说明:隐私-获取所有权限(权限->iOS:定位; Android:定位,电话状态,存储)
Vue.prototype.checkAllPermissions = function (success, error) {
  if (isDevice() === false) {
    error();
    return;
  }
  let permissions = [this.permissionCode.ACCESS_LOCATION.code, this.permissionCode.READ_PHONE_STATE.code, this.permissionCode.WRITE_EXTERNAL_STORAGE.code, this.permissionCode.READ_EXTERNAL_STORAGE.code];
  if (this.isIOSDevice()) {
    permissions = [this.permissionCode.ACCESS_LOCATION.code];
  }
  this.checkDevicePermissionWithTip(permissions.join(), success, error);
};

// 说明:获取运动步数(iOS,运动健康)
Vue.prototype.getHealthInfo = function (success, error) {
  if (isDevice() === false) return;
  Health.getStepCount(success, error);
};

/**
 // 权限-检查
 let param = {
    target:"CAMERA,RECORD_AUDIO,READ_EXTERNAL_STORAGE,WRITE_EXTERNAL_STORAGE,READ_PHONE_STATE,ACCESS_LOCATION,CALL_PHONE"
  }

 BHPermissions.checkPermission(param,success,error); //检查
 */
// 说明:进行检查(多个)权限
Vue.prototype.checkDevicePermission = function (param, success, error) {
  if (isDevice() === false) return;
  // BHPermissions.checkPermission(param, success, error);
  window.bhfaeOpen.checkPermission(param, success, error);
};
/**
 // 权限-请求
 let param = {
    target:"CAMERA,RECORD_AUDIO,READ_EXTERNAL_STORAGE,WRITE_EXTERNAL_STORAGE,READ_PHONE_STATE,ACCESS_LOCATION,CALL_PHONE"
  }

 BHPermissions.requestPermission(param,success,error); //请求
 */
// 说明:进行请求(多个)权限
Vue.prototype.requestDeviceAuth = function (param, success, error) {
  if (isDevice() === false) return;
  // BHPermissions.requestPermission(param, success, error);
  window.bhfaeOpen.requestPermission(param, success, error);
};

// 说明:语音实时识别
Vue.prototype.audioRecognize = function (param, success, error) {
  if (isDevice() === false) return;
  BHRecordAudio.audioAction(param, success, error);
};

// // 说明:展示百信信托容器页面
// Vue.prototype.showAIBank = function (param, success, error) {
//   if (isDevice() === false) return;
//   BHAIBankContainer.openAIBankContainer(param, success, error);
// };
