<template>
  <button class="obtainButtonS"
          :class="{ButtonSpanGray: !isOK, ButtonSpan: isOK, 'disabled': !isOK}"
          @click="onClick" v-cloak>{{title}}
  </button>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        title: '获取验证码',
        count: 0,
        isOK: true,
        timer: '',
        eventType: {
          onClick: 'onClick',
          timeStop: 'timeStop'
        }
      };
    },
    methods: {
      onClick() {
        this.analysys.ma_btnClick("点击获取验证码");
        this.$emit('smsEvent', {'eventType': this.eventType.onClick});
      },
      // 开始倒计时
      countStart(time) {
        clearInterval(this.timer);
        this.count = Number(time);
        this.startTimer();
        let _this = this;
        this.timer = setInterval(function () {
          _this.startTimer();
        }, 1000);
      },
      // 执行定时器
      startTimer() {
        if (this.count > 0) {
          this.counting();
        } else {
          this.countEnd();
        }
      },
      // 倒计时中..
      counting() {
        this.title = this.count + '秒';
        this.isOK = false;
        this.count--;
      },
      // 倒计时结束
      countEnd() {
        this.title = '获取验证码';
        this.isOK = true;
        clearInterval(this.timer);
        this.$emit('smsEvent', {'eventType': this.eventType.timeStop});
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .verifica_img {
    width: 1rem;
    height: 0.42rem;
    line-height: 0.42rem;
    -moz-border-radius: 0.06rem;
    -webkit-border-radius: 0.06rem;
    border-radius: 0.06rem;
  }
</style>
