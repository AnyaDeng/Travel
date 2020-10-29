<template>
  <img :src="imgSrc" class="verifica_img" id="changeCode" @click="getCode()" :onerror="defaultImg">
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        imgSrc: '',
        defaultImg: 'this.src="' + require('../../../../static/img/clickRetry.png') + '"'
      };
    },
    props: {
      sendValidateData: {
        type: Object
      }
    },
    mounted(){
//      this.getCode();
    },
    methods: {
      getCodeRequest() {
        let token = this.getSessionStorage('token');
        let getCodeurl = this.apiUrl().onlineServer + this.apiType().getGraphCode + '?token=' + token + '&d=' + Math.random() + '&graphCodeType=' + this.sendValidateData.graphCodeType + '&appVersion=' + this.paramBase().appVersion;
        this.imgSrc = getCodeurl;
      },
      getCode(){
        let _this = this;
        let token = this.getSessionStorage('token');
        if (token !== '') {
          this.getCodeRequest();
        } else {
          this.fetchToken(function () {
            _this.getCodeRequest();
          });
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "graphCode.styl"
</style>
