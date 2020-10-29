<template lang="html">
  <div class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
       @touchstart="touchStart($event)"
       @touchmove="touchMove($event)"
       @touchend="touchEnd($event)">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <header class="pull-refresh">
        <slot name="pull-refresh">
          <span class="down-tip SourceHanSansCN-Regular">下拉刷新</span>
          <span class="up-tip SourceHanSansCN-Regular">松开刷新</span>
          <span class="refresh-tip SourceHanSansCN-Regular">刷新中...</span>
        </slot>
      </header>
      <slot>
      </slot>
      <div v-if="dataList.isHideLoadMore === true">
        <div class="nullData SourceHanSansCN-Regular" v-if="dataList.isHideMessage === false">暂无更多数据</div>
      </div>
      <footer class="load-more" v-else>
        <slot name="load-more">
          <span v-show="downFlag === false" class="loadMore SourceHanSansCN-Regular">上拉加载更多</span>
          <span v-show="downFlag === true" class="more-tip SourceHanSansCN-Regular">加载中...</span>
        </slot>
      </footer>

    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      offset: {
        type: Number,
        default: 50 // 加载中默认高度
      },
      enableInfinite: {
        type: Boolean,
        default: true
      },
      enableRefresh: {
        type: Boolean,
        default: true
      },
      dataList: {
        default: false,
        required: false,
        isHideLoadMore: false,
        isHideMessage: false
      },
      onRefresh: {
        type: Function,
        default: undefined,
        required: false
      },
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      }
    },
    data() {
      return {
        top: 0,
        state: 0,
        startX: 0,
        startY: 0,
        touching: false,
        infiniteLoading: false,
        downFlag: false // 用来显示是否加载中
      }
    },
    mounted() {
    },
    methods: {
      touchStart(e) {
        if (!this.isNotEmpty(e.targetTouches)) return;
        this.startY = e.targetTouches[0].pageY;
        this.startX = e.targetTouches[0].pageX;
        this.startScroll = this.$el.scrollTop || 0;
        this.touching = true; // 留着有用，不能删除
      },
      touchMove(e) {
        if (!this.enableRefresh || !this.touching || !this.isNotEmpty(e.targetTouches)) {
          return
        }
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
        if (diff > 0) e.preventDefault()
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
        if (this.state === 2) { // in refreshing
          return
        }
        if (this.top >= this.offset) {
          this.state = 1
        } else {
          this.state = 0
        }
      },
      touchEnd(e) {
        if (!this.enableRefresh) {
          return;
        }
        this.touching = false
        if (this.state === 2) { // in refreshing
          this.state = 2;
          this.top = this.offset;
          return;
        }
        if (this.top >= this.offset) { // do refresh
          this.refresh();
        } else { // cancel refresh
          this.state = 0;
          this.top = 0;
        }

        // 用于判断滑动是否在原地 ----begin
        let endX = e.changedTouches[0].pageX;
        let endY = e.changedTouches[0].pageY;
        let dy = this.startY - endY;
        let dx = endX - this.startX;

        // 如果滑动距离太短
        if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
          return false;
        }

        // --------end--------

        if (!this.enableInfinite || this.infiniteLoading) {
          return;
        }

        let outerHeight = this.$el.clientHeight;
        let innerHeight = this.$el.querySelector('.inner').clientHeight;
        let scrollTop = this.$el.scrollTop;
        let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0;
        let bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

        if (bottom <= this.offset && this.state === 0 && this.dataList.isHideLoadMore === false) {
          this.downFlag = true;
          this.infinite();
        } else {
          // this.dataList.isHideLoadMore = true;
          this.downFlag = false;
        }
      },
      refresh() {
        this.state = 2;
        this.top = this.offset;
        setTimeout(() => {
          this.onRefresh(this.refreshDone);
        }, 1000);
      },
      refreshDone() {
        this.state = 0;
        this.top = 0;
      },

      infinite() {
        this.infiniteLoading = true;
        setTimeout(() => {
          this.onInfinite(this.infiniteDone);
        }, 2000);
      },

      infiniteDone() {
        this.infiniteLoading = false;
        this.downFlag = false;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./pull-refresh.styl";
</style>
