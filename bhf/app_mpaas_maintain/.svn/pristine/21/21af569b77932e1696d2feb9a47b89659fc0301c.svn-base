import Vue from 'vue';

Vue.prototype.smsInit = function () {
  document.addEventListener("bhfae.app", onOpenSmsURL, false);
};

function onOpenSmsURL(event) {
  let url = event.urlStr;
  if (Vue.prototype.isNotEmpty(url)) {
    if (url.indexOf(Vue.prototype.URL_SCHEME.BHFAE_APP) !== -1) {
      // url = bhfaeapp://action=show_page&target=product_term%3fid%3d20181224155826102259
      // 将来可以根据URL的参数来判断跳转什么页面(推送同理)
      // alert('通过浏览器打开APP,URL:' + url);
      let queryStr = url.substring(Vue.prototype.URL_SCHEME.BHFAE_APP.length);
      Vue.prototype.entryHub(queryStr);
    } else if (url.indexOf(Vue.prototype.URL_SCHEME.BHFAE_H5) !== -1 || url.indexOf(Vue.prototype.URL_SCHEME.BHFAE_H5_NPAY) !== -1) { // 目前该scheme仅支持H5支付(微信完点击完成,会跳转该scheme)
      // url = h5.bhfae.com://
      let queryStr = url.substring(Vue.prototype.URL_SCHEME.BHFAE_H5.length);
      Vue.prototype.handleEvent_h5Pay(queryStr);
    }
  }
}
