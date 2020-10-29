import Vue from 'vue';

Vue.prototype.pushInit = function () {
  document.addEventListener("jpush.receiveRegistrationId", onReceiveRegistrationId, false);
  try {
    window.JPush.init();
    let debugMode = !this.isProduction();
    window.JPush.setDebugMode(debugMode);
    window.setTimeout(getRegistrationID, 1000);

    if (isAndroid() === false) {
      window.JPush.setApplicationIconBadgeNumber(0);
    }

    document.addEventListener("jpush.openNotification", onOpenNotification, false);
    document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
    document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);

  } catch (exception) {
    console.log(exception);
  }
};

function getRegistrationID() {
  window.JPush.getRegistrationID(onGetRegistrationID);
}

function onGetRegistrationID(data) {
  try {
    console.log("JPushPlugin:registrationID is " + data);
    if (data.length === 0) {
      window.setTimeout(getRegistrationID, 1000);
    }else {
      storeRegistrationId(data);
    }
  } catch (exception) {
    console.log(exception);
  }
}

/***接收到 推送ID  iOS ***/
function onReceiveRegistrationId(event) {
  storeRegistrationId(event.registrationId);
}

/***接收到 推送消息***/
function onReceiveNotification(event) {
  try {
    console.log("接收到推送消息:" + JSON.stringify(event));
  } catch (exception) {
    console.log(exception)
  }
}
let isUploadPushId = false; // 是否已经上传了 registrationId (防止长传多次)
function storeRegistrationId(idStr) {
  Vue.prototype.setSessionStorage('registrationId', idStr);
  if (Vue.prototype.isLogin() && !Vue.prototype.isIOSDevice() && !isUploadPushId) { // 安卓平台,若用户登录,则上传pushId
    isUploadPushId = true;
    Vue.prototype.modifyVisitorAttach({});
  }
}

Vue.prototype.getPushId = function () {
  return Vue.prototype.getSessionStorage('registrationId');
};
/*
iOS:
event{
	isTrusted:false,
	extras:{
		url:xxx
		pushSendId:xxxx
	},
	_j_business:1,
	_j_uid:xxx,
	_j_msgid:xxx,
	aps:{
		alert:xxxxV3,
		badge:2,
		sound:xx
	},
	pushSendId:xxx,
	url:xxx
}

android:
event{
	isTrusted:false,
	titlle:滨海国金所,
	alert:xxxxV3,
	extras:{
		sdkType:JPUSH,
		cn.jpush.android.ALERT_TYPE:-1,
		cn.jpush.android.MSG_ID:xxx,
		cn.jpush.android.NOTIFICATION_ID:xxx,
		cn.jpush.android.NOTIFICATION_TYPE:0,
		app:com.bhfae.fae.dev,
		pushSendId:xxx,
		url:xxx,
		cn.jpush.android.EXTRA:{
			pushSendId:xxx,
			url:xxx
		},
		cn.jpush.android.ALERT:xxxxV3
	}
}
* */

/***打开 推送消息***/
function onOpenNotification(event) {
  try {
    console.log("打开推送消息:" + JSON.stringify(event));
    if (isAndroid() === false) {
      window.JPush.setApplicationIconBadgeNumber(0);
    }
    let _this = Vue.prototype;
    let pushInfo = event.extras;
    if (_this.isNotEmpty(pushInfo)) {
      if (_this.isNotEmpty(pushInfo.pushSendId)) {
        if (_this.getSessionStorage('bhfae_pushId') !== pushInfo.pushSendId) {
          _this.setSessionStorage('bhfae_pushId', pushInfo.pushSendId);
        }
      }

      if (_this.isNotEmpty(pushInfo.actionUrl)) {
        _this.entryHub(pushInfo.actionUrl);
      }

    }
  } catch (exception) {
    console.log(exception);
  }
}

/***接收到 自定义消息***/
function onReceiveMessage(event) {
  try {
    let message;
    if (isAndroid()) {
      message = event.message;
    } else {
      message = event.content;
    }
    console.log("接收到自定义消息:" + message);
  } catch (exception) {
    console.log("JPushPlugin:onReceiveMessage-->" + exception);
  }
}

function isAndroid() {
  return (Vue.prototype.deviceInfo().devicePlatform === 'Android');
}



