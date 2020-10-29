<template>
  <div class="setGestureCipher container-fluid">
    <div class="setGestureContainer" :style="{'margin-top': marginTop}">
      <div class="passInformation">
        <div class="welcoming" id="gestureCipherShow">
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="massage" :class="{'errorMessage': errorMessage}">{{message}}</div>
      </div>
      <div id="myCanvas" class="canvasStyle">
        <canvas id="canvas"></canvas>
        <div class="ctrlBtn" v-if="setType==='second'">
          <div class="btn-container" :style="{'margin-top': btnMarginTop}">
        <span class="btn-link">
          <a href="javascript:void(0);" @click="redraw">重新绘制</a>
        </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        apiName: {
          enableGesturePassword: this.apiType().enableGesturePassword
        },
        pageConfig: {
          headerLeft: '',
          headerTitle: '设置手势密码',
          headerRight: this.headerBtn.skip
        },
        message: '请绘制解锁密码',
        errorMessage: false,
        pswFirst: '',
        setType: 'first',
        loginPassword: this.$route.params.loginPassword,
        sourcePage: this.$route.params.sourcePage,
        marginTop: '1.16rem',
        btnMarginTop: '0.945rem'
      };
    },
    created() {
      // 监听兄弟组件点击事件
      this.addObserve(this.getRouterBackKey(), this.headerListen);
    },
    mounted() {
      this.sendMsgToParent();
      this.gestureCipher();
      let _this = this;
      this.checkUserAgent(function () {
        _this.marginTop = '1.4rem';
      }, function () {
        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;
        if (clientWidth / clientHeight === 320 / 480) { // iphone4
          _this.marginTop = '1rem';
          _this.btnMarginTop = '0.5rem';
        } else {
          _this.marginTop = '1.16rem';
        }
      }, function () {
        _this.marginTop = '1.16rem';
      });
    },
    methods: {
      sendMsgToParent() {
        this.$emit('listenToChildEvent', this.pageConfig);
      },
      headerListen() {
        let _this = this;
        if (this.isNeedShowFingerAlert()) {
          _this.sureFingerPrint();
        } else {
          this.$confirm('', '您确定跳过设置手势密码？', function () {
            if (_this.sourcePage === 'login') {
              _this.jumpHomePage();
            } else {
              _this.$router.push({
                name: _this.getSourcePage(_this.sourcePage)
              });
            }
          });
        }
      },
      isInSetGestureCipher() {
        let pageName = this.getSessionStorage(this.appPageName);
        return pageName === 'setGestureCipher';
      },
      isNeedShowFingerAlert() {
        return this.sourcePage === 'login' && this.isUserSetFingerLogin() === false;
      },
      jumpHomePage() {
        this.$router.push({
          name: 'homePage'
        });
      },
      sureFingerPrint() {
        let _this = this;
        this.mtj_event('u_loginPage_fingerFaceSet', '指纹设置页开启指纹/面容');
        this.analysys.ma_btnClick('指纹设置页开启指纹/面容');
        this.openFingerPrint(true, this.loginPassword, function () {
          _this.jumpHomePage();
        }, function () {
          _this.jumpHomePage();
        });
      },
      getPsw(psw, confirmPsw) {
        let _this = this;
        _this.mtj_event('u_loginPage_gestureSet', '手势设置页开启手势');
        _this.analysys.ma_btnClick('指纹设置页开启指纹/面容');
        let param = {
          'loginPassword': this.loginPassword,
          'newPassword': psw,
          'confirmPassword': confirmPsw
        };
        this.ajax(this.apiName.enableGesturePassword, this.serviceType().api, param, function (responseData) {
          if (_this.isNeedShowFingerAlert()) {
            _this.sureFingerPrint();
          } else {
            _this.$toast('手势密码设置成功');
            _this.setUserStorage('isSetGesture', '1');
            if (_this.sourcePage === 'login') {
              _this.jumpHomePage();
            } else {
              _this.jumpPasswordSet();
            }
          }
        }, function (responseData) {
          if (_this.loginPassword === '') { // 免密设置超时会报错,需要跳转密码设置页面
            _this.jumpPasswordSet();
          }
        });
      },
      jumpPasswordSet() {
        this.$router.push({
          path: '/passwordSet'
        });
      },
      redraw() {
        this.analysys.ma_btnClick('点击了重新绘制按钮');
        this.message = '请绘制解锁密码';
        this.errorMessage = false;
        this.pswFirst = '';
        this.setType = 'first';
      },
      gestureCipher() {
        let vm = this;
        window.H5lock = function (obj) {
          this.height = obj.height;
          this.width = obj.width;
          this.chooseType = Number(window.localStorage.getItem('chooseType')) || obj.chooseType;
          this.devicePixelRatio = 2;
        };
        H5lock.prototype.drawCle = function (style, fillStyle) { // 初始化解锁密码面板 小圆圈
          for (var i = 0; i < this.lastPoint.length; i++) {
            this.ctx.strokeStyle = style;// 密码的点点默认的颜色
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
          this.ctx.fillStyle = '#e6e6e6';
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
//          this.r = 43;
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
          this.drawCle('#d7ab69', '#fffbef');// 每帧花轨迹--圆圈
          this.drawStatusPoint('#d7ab69');// 每帧花轨迹--圆点
          this.drawLine('#d7ab69', po, this.lastPoint);// 每帧花轨迹--轨迹
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
          if (vm.setType === 'first') {
            if (psw.length < 4) {
              this.drawStatusPoint('#F56F6E');
              this.drawCle('#F56F6E', 'rgba(245, 111, 110, 0.1)');
              this.drawLine('#F56F6E', this.lastPoint[this.lastPoint.length - 1], this.lastPoint);// 每帧画圆心
              vm.message = '密码至少连续四个点，请重新绘制';
              vm.errorMessage = true;
              this.gestureCipherShow(psw, 'error');
            } else if (psw.length >= 4 && !/^.*(\d).*\1.*$/.test(psw)) {
              vm.message = '请再次绘制解锁密码';
              vm.errorMessage = false;
              vm.pswFirst = psw;
              vm.setType = 'second';
              this.gestureCipherShow(psw, 'success');
            }
          } else if (vm.setType === 'second') {
            if (psw.length < 4) {
              this.drawCle('#F56F6E', 'rgba(245, 111, 110, 0.1)');
              this.drawStatusPoint('#F56F6E');
              this.drawLine('#F56F6E', this.lastPoint[this.lastPoint.length - 1], this.lastPoint);// 每帧画圆心
              vm.message = '密码至少连续四个点，请重新绘制';
              vm.errorMessage = true;
              this.gestureCipherShow(psw, 'error');
            } else if (psw.length >= 4 && !/^.*(\d).*\1.*$/.test(psw) && vm.pswFirst !== psw) {
              this.drawStatusPoint('#F56F6E');
              this.drawCle('#F56F6E', 'rgba(245, 111, 110, 0.1)');
              this.drawLine('#F56F6E', this.lastPoint[this.lastPoint.length - 1], this.lastPoint);// 每帧画圆心
              vm.message = '与上次绘制不同，请重新绘制';
              vm.errorMessage = true;
              this.gestureCipherShow(psw, 'error');
            } else if (psw.length >= 4 && !/^.*(\d).*\1.*$/.test(psw) && vm.pswFirst === psw) {
              vm.message = '解锁密码绘制成功';
              vm.errorMessage = false;
              vm.setType = 'first';
              this.gestureCipherShow(psw, 'success');
              // vm.getPsw(vm.pswFirst, psw);
              vm.$loading();
              setTimeout(function () {
                vm.getPsw(vm.pswFirst, psw);
              }, 1000);
            }
          }
        }
        // 手势回显
        H5lock.prototype.gestureCipherShow = function (psw, state) {
          if (vm.isInSetGestureCipher()) {
            let styleState = '';
            if (state === 'success') {
              styleState += 'successShow';
            } else if (state === 'error') {
              styleState += 'errorShow';
            }
            let pswArray = psw.split('');
            let allSpan = document.getElementById('gestureCipherShow').getElementsByTagName("span");
            for (let k = 0; k < pswArray.length; k++) {
              allSpan[pswArray[k] - 1].setAttribute('class', styleState);
            }
          }
        }
        // 手势回显清空
        H5lock.prototype.removeGestureCipherShow = function () {
          if (vm.isInSetGestureCipher()) {
            let allSpan = document.getElementById('gestureCipherShow').getElementsByTagName("span");
            for (let k = 0; k < allSpan.length; k++) {
              allSpan[k].removeAttribute('class', 'successShow');
              allSpan[k].removeAttribute('class', 'errorShow');
            }
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
              // self.extractPsw();
              self.storePass(self.extractPsw());
//              vm.getPsw(self.extractPsw());
              var theTimer = setTimeout(function () {
                self.canvas.addEventListener('touchstart', startFnc, false);
                self.canvas.addEventListener('touchmove', moveFnc, false);
                self.canvas.addEventListener('touchend', endFnc, false);
                self.reset();
                if (vm.errorMessage === true || vm.setType === 'second') {
                  self.removeGestureCipherShow();
                }
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
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "set-gesture-cipher.styl"
</style>
