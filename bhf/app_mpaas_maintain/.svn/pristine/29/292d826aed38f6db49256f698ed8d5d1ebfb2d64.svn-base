<template>
  <div class="gestureCipher container-fluid">
    <div class="photo"></div>
    <div class="gestureContainer" :style="{'margin-top': marginTop}">
      <div class="passInformation">
        <div class="welcoming">{{admin}}<span v-if="admin"></span>欢迎回来</div>
        <div class="massage" :class="{'errorMessage': errorMessage}">{{message}}</div>
      </div>
      <div id="myCanvas" class="canvasStyle">
        <canvas id="canvas"></canvas>
        <div class="ctrlBtn">
          <div class="btn-container" :style="{'margin-top': btnMarginTop}">
        <span class="btn-link" v-if="fingerState" @click="u_loginPage_fingerFace">
        <router-link to="/fingerprintLogin">{{fingerPrintTxt}}</router-link>
        </span>
            <span class="btn-link" @click="u_loginPage_other">
          <router-link to="login">使用账号登录</router-link>
				</span>
          </div>
        </div>
      </div>
      <div class="loginAgreement">登录即视为已阅读并同意
        <span @click="rechargeFrame(framePath_sever)">《滨海国金所服务协议（个人会员版）》（所有用户）</span>
        <span @click="rechargeFrame(privacy_sever)">《隐私政策》</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        apiName: {
          gestureLogin: this.apiType().gestureLogin
        },
        pageConfig: {
          headerLeft: this.headerBtn.cancel,
          headerTitle: '',
          headerRight: '',
          headerBg: this.headerColor.transparent,
          underHeader: true
        },
        admin: this.getUserDisplayName(),
        errorMessage: false,
        message: '请绘制手势密码',
        fingerState: false,
        fingerPrintTxt: '指纹密码解锁',
        marginTop: '1.095rem',
        btnMarginTop: '0.945rem',
        framePath_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/bhfaePersonalMembershipServiceProtocol.html?bhfae_titleText=服务协议',
        privacy_sever: this.$store.getters.h5Url + this.fileRelativePath() + '/register/privacyPolicy.html?bhfae_titleText=隐私政策'
      };
    },
    created() {
      this.checkLoginType();
    },
    mounted() {
      this.sendMsgToParent();
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
      this.gestureCipher();
      let _this = this;
      this.checkUserAgent(function () {
        _this.marginTop = '1.335rem';
      }, function () {
        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;
        if (clientWidth / clientHeight === 320 / 480) { // iphone4
          _this.marginTop = '0.9rem';
          _this.btnMarginTop = '0.5rem';
        } else {
          _this.marginTop = '1.095rem';
        }
      }, function () {
        _this.marginTop = '1.095rem';
      });
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      // 监听头部组件事件
      headerListen() {
        // 点击取消按钮
        this.mtj_event("u_loginPage_cancel", "手势登录页点击取消按钮");
//        this.removeLocalStorage('bhfae_userInfo');
        this.$router.push({
          name: 'unloginHomePage'
        });
      },
      checkLoginType() {
        let _this = this;
        _this.fingerTouchAvailable(function (type) {
          if (_this.isUserSetFingerLogin()) {
            _this.fingerState = true;
            if (type === 'touch') {
              _this.fingerPrintTxt = '指纹密码解锁';
            } else if (type === 'face') {
              _this.fingerPrintTxt = '面容解锁';
            }
          } else {
            _this.fingerState = false;
          }
        }, function () {
        });
      },
      getPsw(psw, callback) {
        this.mtj_event('u_loginPage_gestureLogin', '手势登录页使用手势登录');
        this.analysys.ma_btnClick('手势登录页使用手势登录');
        let param = {
          'password': psw
        };
        let _this = this;
        this.ajax(this.apiName.gestureLogin, this.serviceType().api, param, function (responseData) {
          _this.doLoginSuccess(responseData, function () {
            _this.analysys.ma_track('login_in', {'is_success': 'maBool_1', 'login_method': '手势密码登陆'});
            _this.$router.push({
              name: 'homePage'
            });
          });
        }, function (responseData) {
          _this.errorMessage = true;
          _this.message = responseData.message;
          if (callback) {
            callback();
          }
          if (responseData.resultCode === 'AC_PASSWORD_NOT_SET') {
            _this.setUserStorage('isSetGesture', '0');
            _this.$router.push({
              name: 'login'
            });
          }
          _this.analysys.ma_track('login_in', {'is_success': 'maBool_0', 'login_method': '手势密码登陆', 'fail_reason': responseData.message});
        });
      },
      gestureCipher() {
        let vm = this;
        window.H5lock = function (obj) {
          this.height = obj.height;
          this.width = obj.width;
          this.chooseType = Number(window.localStorage.getItem('chooseType')) || obj.chooseType;
//          this.devicePixelRatio = window.devicePixelRatio || 1;
          this.devicePixelRatio = 2;
        };
        H5lock.prototype.drawCle = function (style, fillStyle) { // 初始化解锁密码面板 小圆圈
          for (var i = 0; i < this.lastPoint.length; i++) {
            this.ctx.strokeStyle = style;// 密码的点点默认的颜色'#87888a'
            this.ctx.fillStyle = fillStyle;// 填充颜色
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.stroke();
          }
        }
        H5lock.prototype.drawPoint = function (x, y) { // 初始化圆心
          this.ctx.fillStyle = '#7D8497';
          this.ctx.beginPath();
          this.ctx.arc(x, y, this.r / 3.3, 0, Math.PI * 2, true);
          this.ctx.closePath();
          this.ctx.fill();
        }
        H5lock.prototype.drawStatusPoint = function (type) { // 初始化状态线条
          for (var i = 0; i < this.lastPoint.length; i++) {
            this.ctx.fillStyle = type;
            this.ctx.beginPath();
            this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 3.3, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();
          }
        }
        H5lock.prototype.drawLine = function (style, po, lastPoint) { // style:颜色 解锁轨迹
          this.ctx.beginPath();
          this.ctx.strokeStyle = style;
          this.ctx.lineWidth = 3;
          this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
          for (var i = 1; i < this.lastPoint.length; i++) {
            this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
          }
          this.ctx.lineTo(po.x, po.y);
          this.ctx.stroke();
          this.ctx.closePath();
        }
        H5lock.prototype.createCircle = function () { // 创建解锁点的坐标，根据canvas的大小来平均分配半径
          var n = this.chooseType;
          var count = 0;
//          this.r = this.ctx.canvas.width / (1 + 4 * n);// 公式计算
          this.r = 43;
          this.lastPoint = [];
          this.arr = [];
          this.restPoint = [];
          let clientWidth = document.body.clientWidth;
          var i = 0;
          var j = 0;
          var obj = {};
          if (clientWidth < '375') {
            this.r = 36;
            for (i = 0; i < n; i++) {
              for (j = 0; j < n; j++) {
                count++;
                obj = {
                  x: j * 169 + this.r + 1,
                  y: i * 169 + this.r + 1,
                  index: count
                };
                this.arr.push(obj);
                this.restPoint.push(obj);
              }
            }
          } else {
            this.r = 43;
            for (i = 0; i < n; i++) {
              for (j = 0; j < n; j++) {
                count++;
                obj = {
                  x: j * 199 + this.r + 1,
                  y: i * 199 + this.r + 1,
                  index: count
                };
                this.arr.push(obj);
                this.restPoint.push(obj);
              }
            }
          }
          this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
          for (i = 0; i < this.arr.length; i++) {
            this.drawPoint(this.arr[i].x, this.arr[i].y);
          }
          // return arr;
        }
        H5lock.prototype.getPosition = function (e) { // 获取touch点相对于canvas的坐标
          var rect = e.currentTarget.getBoundingClientRect();
          var po = {
            x: (e.touches[0].clientX - rect.left) * this.devicePixelRatio,
            y: (e.touches[0].clientY - rect.top) * this.devicePixelRatio
          };
          return po;
        }
        H5lock.prototype.update = function (po) { // 核心变换方法在touchmove时候调用
          this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
          for (i = 0; i < this.arr.length; i++) { // 每帧先把面板画出来
            this.drawPoint(this.arr[i].x, this.arr[i].y);
          }
          this.drawCle('#fff', 'rgba(255, 255, 255, 0)');// 每帧花轨迹--圆圈
          this.drawStatusPoint('#fff');// 每帧花轨迹--圆点
          this.drawLine('#fff', po, this.lastPoint);// 每帧花轨迹--轨迹
          for (var i = 0; i < this.restPoint.length; i++) {
            if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
//              this.drawCle(this.restPoint[i].x, this.restPoint[i].y);
              this.lastPoint.push(this.restPoint[i]);
              this.restPoint.splice(i, 1);
              break;
            }
          }
        }
        H5lock.prototype.checkPass = function (psw1, psw2) { // 检测密码
          var p1 = '';
          var p2 = '';
          for (var i = 0; i < psw1.length; i++) {
            p1 += psw1[i].index + psw1[i].index;
          }
          for (i = 0; i < psw2.length; i++) {
            p2 += psw2[i].index + psw2[i].index;
          }
          return p1 === p2;
        }
        H5lock.prototype.storePass = function (psw) { // touchend结束之后对密码和状态的处理
          if (psw.length < 4) {
            this.drawCle('#F56F6E', '#263147');
            this.drawStatusPoint('#F56F6E');
            this.drawLine('#F56F6E', this.lastPoint[this.lastPoint.length - 1], this.lastPoint);// 每帧画圆心
            vm.message = '密码至少连续四个点，请重新绘制';
            vm.errorMessage = true;
          } else if (psw.length >= 4 && !/^.*(\d).*\1.*$/.test(psw)) {
//            vm.message = '解锁密码绘制成功';
//            vm.errorMessage = false;
            let that = this;
            vm.getPsw(psw, function () {
              that.drawCle('#F56F6E', 'rgba(245, 111, 110, 0.1)');
              that.drawStatusPoint('#F56F6E');
              that.drawLine('#F56F6E', that.lastPoint[that.lastPoint.length - 1], that.lastPoint);// 每帧画圆心
            });
          }
        }
        H5lock.prototype.setChooseType = function (type) {
          chooseType = type;
          init();
        }
        H5lock.prototype.initDom = function () {
//          var wrap = document.getElementById("myCanvas");
//          var canvas = document.createElement('canvas');
          var canvas = document.getElementById('canvas');
//          canvas.setAttribute('id', 'canvas');
          canvas.style.cssText = 'background-color: transparent;display: inline-block;';
//          wrap.appendChild(canvas);
          let clientWidth = document.body.clientWidth;
          var width = '';
          var height = '';
          if (clientWidth < '375') {
            width = this.width || 207;
            height = this.height || 207;
          } else {
            width = this.width || 243;
            height = this.height || 243;
          }
          // 高清屏锁放
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          canvas.height = height * this.devicePixelRatio;
          canvas.width = width * this.devicePixelRatio;
        }
        H5lock.prototype.init = function () {
          this.initDom();
          this.pswObj = window.localStorage.getItem('passwordxx') ? {
            step: 2,
            spassword: JSON.parse(window.localStorage.getItem('passwordxx'))
          } : {};
          this.lastPoint = [];
          this.touchFlag = false;
          this.canvas = document.getElementById('canvas');
          this.ctx = this.canvas.getContext('2d');
          this.createCircle();
          this.bindEvent();
        }
        H5lock.prototype.reset = function () {
          this.createCircle();
        }
        let passWord = '';
        H5lock.prototype.extractPsw = function () {
          passWord = '';
          for (let j = 0; j < this.lastPoint.length; j++) {
            passWord += this.lastPoint[j].index;
          }
          return passWord;
        }
        H5lock.prototype.bindEvent = function () {
          var self = this;
          this.canvas.addEventListener("touchstart", startFnc, false);
          this.canvas.addEventListener("touchmove", moveFnc, false);
          this.canvas.addEventListener("touchend", endFnc, false);

          function startFnc(e) {
            e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
            var po = self.getPosition(e);
            for (var i = 0; i < self.arr.length; i++) {
              if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
                self.touchFlag = true;
//                self.drawCle(self.arr[i].x, self.arr[i].y);
                self.lastPoint.push(self.arr[i]);
                self.restPoint.splice(i, 1);
                break;
              }
            }
          }

          function moveFnc(e) {
            if (self.touchFlag) {
              self.update(self.getPosition(e));
            }
          }

          function endFnc(e) {
            if (self.touchFlag) {
              self.touchFlag = false;
              self.storePass(self.extractPsw());
//              vm.getPsw(self.lastPoint);
              var theTimer = setTimeout(function () {
                self.canvas.addEventListener('touchstart', startFnc, false);
                self.canvas.addEventListener('touchmove', moveFnc, false);
                self.canvas.addEventListener('touchend', endFnc, false);
                self.reset();
              }, 1000);
              if (theTimer) {
                self.canvas.removeEventListener('touchstart', startFnc, false);
                self.canvas.removeEventListener('touchmove', moveFnc, false);
                self.canvas.removeEventListener('touchend', endFnc, false);
              }
            }
          }
        }
        new H5lock({
          chooseType: 3
        }).init();
      },
      u_loginPage_fingerFace() {
        this.mtj_event("u_loginPage_fingerFace", "手势登录页点击指纹(面容)解锁按钮");
        this.analysys.ma_btnClick('手势登录页点击指纹(面容)解锁按钮');
      },
      u_loginPage_other() {
        this.mtj_event("u_loginPage_other", "手势登录页点击其他登录方式按钮");
        this.analysys.ma_btnClick('手势登录页点击其他登录方式按钮');
      },
      rechargeFrame(framePath) {
        this.thirdLinks(framePath);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "gesture-cipher.styl"
</style>
