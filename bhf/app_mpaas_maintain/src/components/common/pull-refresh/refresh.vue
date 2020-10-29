<template lang="html">
    <div ref="viewBox" class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)" :style="{'top': positionTop}">
        <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' , 'padding-bottom': paddingBottom}">
            <header class="pull-refresh">
                <slot name="pull-refresh">
                    <span class="down-tip">下拉刷新</span>
                    <span class="up-tip">松开刷新</span>
                    <span class="refresh-tip">刷新中...</span>
                </slot>
            </header>
            <slot>
            </slot>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
//            offset: {
//                type: Number,
//                default: 64 // 加载中默认高度
//            },
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
                noFlag: false
            },
            onRefresh: {
                type: Function,
                default: undefined,
                required: false
            },
            pageConfig: {}
        },
        data() {
            return {
              top: 0,
              state: 0,
              startX: 0,
              startY: 0,
              touching: false,
              infiniteLoading: false,
              downFlag: false, // 用来显示是否加载中
              offset: 64, // 加载中默认高度
              paddingBottom: '0rem',
              positionTop: '0rem'
            }
        },
        mounted() {
          let _this = this;
          this.checkUserAgent(function () {
            if(_this.pageConfig.headerBg === _this.headerColor.transparent){
              _this.offset = 88;
              _this.positionTop = '0rem';
            } else {
              _this.offset = 35;
              _this.positionTop = '0.88rem';
            }
            if(_this.pageConfig.navigation){
              _this.paddingBottom = '0.85rem';
            }
          }, function () {
            if(_this.pageConfig.headerBg === _this.headerColor.transparent){
              _this.offset = 64;
              _this.positionTop = '0rem';
            } else {
              _this.offset = 35;
              _this.positionTop = '0.64rem';
            }
            if(_this.pageConfig.navigation){
              _this.paddingBottom = '0.5rem';
            }
          }, function () {
            if(_this.pageConfig.headerBg === _this.headerColor.transparent){
              _this.offset = 44;
              _this.positionTop = '0rem';
            } else {
              _this.offset = 35;
              _this.positionTop = '0.44rem';
            }
            if(_this.pageConfig.navigation){
              _this.paddingBottom = '0.5rem';
            }
          });
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
                if(!this.enableRefresh || this.dataList.noFlag || !this.touching || !this.isNotEmpty(e.targetTouches)) {
                    return
                }
                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
                if(diff > 0) e.preventDefault()
                this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
                if(this.state === 2) { // in refreshing
                    return
                }
                if(this.top >= this.offset) {
                    this.state = 1
                } else {
                    this.state = 0
                }
            },
            touchEnd(e) {
                if(!this.enableRefresh) {
                    return;
                }
                this.touching = false
                if(this.state === 2) { // in refreshing
                    this.state = 2;
                    this.top = this.offset;
                    return;
                }
                if(this.top >= this.offset) { // do refresh
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
                if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return;
                }

                // --------end--------

                if(!this.enableInfinite || this.infiniteLoading) {
                    return;
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
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./refresh.styl";
</style>
