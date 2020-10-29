/**
 * Created by admin on 2017/8/1.
 */
import Vue from 'vue';
import {AlertPlugin, ToastPlugin, ConfirmPlugin, LoadingPlugin} from 'vux';
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.prototype.$alert = function (msg, title, promot) {
  window.globalVue.$vux.alert.show({
    title: title,
    content: msg,
    onHide: promot
  });
};
Vue.prototype.$hideAlert = function () {
  window.globalVue.$vux.alert.hide();
};
Vue.prototype.$confirm = function (title, msg, promot) {
  window.globalVue.$vux.confirm.show({
    title: title,
    content: msg,
    onConfirm: promot
  });
};
Vue.prototype.$loading = function (title) {
  window.globalVue.$vux.loading.show({
    text: this.isNotEmpty(title) ? title : ' '
  });
};
Vue.prototype.$loadingHide = function () {
  window.globalVue.$vux.loading.hide();
};
Vue.prototype.$toast = function (msg, promot) {
  window.globalVue.$vux.toast.show({
    type: 'text',
    width: 'auto',
    time: 3500,
    text: msg,
    onHide: promot
  });
};
Vue.prototype.$confirmCtrl = function (title, msg, confirmText, cancelText, promotConfirm, promotCancel) {
  window.globalVue.$vux.confirm.show({
    title: title,
    content: msg,
    confirmText: confirmText,
    cancelText: cancelText,
    onConfirm: promotConfirm,
    onCancel: promotCancel
  });
};
Vue.prototype.$hideConfirm = function () {
  window.globalVue.$vux.confirm.hide();
};
