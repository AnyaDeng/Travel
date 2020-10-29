import Vue from 'vue';

/******************************* 微信分享 **************************************************/
// 分享至 会话 | 朋友圈
Vue.prototype.WXShareScene = {
  WX_TIME_SESSION: 0, // 聊天,会话
  WX_TIME_LINE: 1 // 朋友圈
};
// 微信小程序 类型
Vue.prototype.WXShareMPType = {
  RELEASE: 0, // 小程序-正式版
  TEST: 1, // 小程序-测试版
  PREVIEW: 2  // 小程序-体验版
};

// ① 微信是否安装
Vue.prototype.WXInstalled = function (success, errorBack) {
  if (this.isRunOnDevice() === false) {
    success(false);
    return;
  }
  Wechat.isInstalled(function (installed) {
    success(installed);
  }, function (reason) {
    errorBack(reason);
  });
};

// ② 跳转微信
Vue.prototype.WXOpenWX = function (success, errorBack) {
  if (this.isRunOnDevice() === false) {
    return;
  }
  Wechat.openWX(success, errorBack);
};
/*
* ③ 分享链接
*
* params {
*   title : '',
*   description : '',
*   webPageUrl : '',
*   scene : ''
* }
* */
Vue.prototype.WXShareLink = function (params, success, errorBack, isNotCheck) {
  if (this.isRunOnDevice() === false) {
    return;
  }
  let options = {
    message: {
      title: params.title,
      description: params.description,
      thumb: params.thumb,
      media: {
        type: Wechat.Type.WEBPAGE,
        webpageUrl: params.webPageUrl
      }
    },
    scene: Wechat.Scene.SESSION
  };
  if (params.scene === this.WXShareScene.WX_TIME_LINE) {
    options.scene = Wechat.Scene.TIMELINE;
  }
  this.wechatShare(options, success, errorBack, isNotCheck);
};

/*
* ④ 分享图片
*
* params {
*   scene : ''
*   title : '',
*   description : '',
*   image : 'http://xxx.xxx/xxx/xxx.jpeg',
* }
* */
Vue.prototype.WXShareImage = function (params, success, errorBack, isNotCheck) {
  if (this.isRunOnDevice() === false) {
    return;
  }
  let options = {
    message: {
      title: params.title,
      description: params.description,
      thumb: '',
      media: {
        type: Wechat.Type.IMAGE,
        image: params.image
      }
    },
    scene: Wechat.Scene.SESSION
  };
  if (params.scene === this.WXShareScene.WX_TIME_LINE) {
    options.scene = Wechat.Scene.TIMELINE;
  }
  this.wechatShare(options, success, errorBack, isNotCheck);
};

/*
* ⑤ 分享小程序
*
* params {
*   title : '',
*   description : '',
*   webpageUrl: '', // 对应的连接(兼容微信旧版本打不卡小程序的状况,自动改为分享链接)
*   userName: '', //小程序的userName(小程序原始ID获取方法：登录小程序管理后台-设置-基本设置-帐号信息)(滨海国金所:gh_1c52eb5197e1)
*   image : 'http://xxx.xxx/xxx/xxx.jpeg', // 小程序卡片上的图片
*   path: '/pages/xxx/xxx?xxx=xxx', 小程序分享的页面路径(可以用query)
*   type: 类型 // 0:正式版  1:开发版  2:体验版
* }
* */
Vue.prototype.WXShareMiniProgram = function (params, success, errorBack, isNotCheck) {
  if (this.isRunOnDevice() === false) {
    return;
  }
  let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  let thumb = (isiOS) ? '' : params.image; // 安卓卡片图使用 thumb,ios使用image
  let options = {
    message: {
      title: params.title,
      description: params.description,
      thumb: thumb,
      media: {
        type: Wechat.Type.MINI_PROGRAM,
        webpageUrl: params.webPageUrl,
        userName: params.userName,
        path: params.path,
        image: params.image,
        miniProgramType: params.type
      }
    },
    scene: Wechat.Scene.SESSION
  };
  this.wechatShare(options, success, errorBack, isNotCheck);
};

// 分享调用
Vue.prototype.wechatShare = function (options, success, errorBack, isNotCheck) {
  if (isNotCheck || this.isIOSDevice()) {
    Wechat.share(options, success, errorBack);
  } else {
    // 检查权限
    let permissions = [this.permissionCode.READ_EXTERNAL_STORAGE.code, this.permissionCode.WRITE_EXTERNAL_STORAGE.code];
    const permissionCode = permissions.join();
    this.checkDevicePermissionForce(permissionCode, () => {
      Wechat.share(options, success, errorBack);
    }, errorBack);
  }
};

/*
* ⑥ 跳转小程序
*
* params {
*   userName: '', //小程序的userName(小程序原始ID获取方法：登录小程序管理后台-设置-基本设置-帐号信息)(滨海国金所:gh_1c52eb5197e1,滨海国金所开发:gh_10693fbd6387)
*   path: '/pages/xxx/xxx?xxx=xxx', 小程序分享的页面路径(可以用query)(/src/views/run/stepCount)
*   miniProgramType: 类型 // 0:正式版  1:开发版  2:体验版
* }
* */
Vue.prototype.WXLaunchMiniProgram = function (params, success, errorBack) {
  if (this.isRunOnDevice() === false) {
    return;
  }
  Wechat.launchMiniProgram(params, success, errorBack);
};
