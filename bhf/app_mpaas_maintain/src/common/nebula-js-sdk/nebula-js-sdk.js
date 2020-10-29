import Vue from 'vue';

Vue.prototype.callNebula = function (param, success, error) {
  param = {
    eventKey: 'chooseImage',
    type: '1'
  }
  console.log('来到了这里');
  window.AlipayJSBridge && AlipayJSBridge.call('bhfaeApp', param, function (data) {
    alert('jsapi_call 调用结果' + JSON.stringify(data) + JSON.stringify(param))
    success(data);
  })
}
