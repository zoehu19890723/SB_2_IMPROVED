<template>
  <div class="popup">
    <div class="view view-popup navbar-fixed">
      <div class="navbar">
        <div class="navbar-inner">
          <div class="left">
            <a href="javascript:void(0)" class="link close-popup" @click="closePanel">关闭</a>
          </div>
          <div class="center">修改图片</div>
          <div class="right" style="justify-content:flex-end">
            <a href="javascript:void(0)" class="link" @click="savePhoto">保存</a>
          </div>
        </div>
      </div>
      <div class="page-content page-background">
        <section class="holder">
          <div>
            <div class="picture-holder" id="picture-holder" style="text-align:center">
              <img :src="photo" width="200" height="200" v-if="hasPhoto"/>
              <img src="../../static/img/default.jpg" width="120" height="120" v-else/>
            </div>
          </div>
          <SubmitBtn :btnText="takebtn.text" :submitAction="photograph" :clx="takebtn.clx"></SubmitBtn>
          <SubmitBtn :btnText="chosebtn.text" :submitAction="accesstoPhone" :clx="chosebtn.clx"></SubmitBtn>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import SubmitBtn from './SubmitBtn';
  export default {
    props: {
      photo : {
        type : String,
        default : null
      }
    },
    data() {
      return {
        takebtn :{
          text : '拍照',
          clx : 'weui_btn',
        },
        chosebtn :{
          text : '从手机中获取',
          clx : 'weui_btn',
        },
      }
    },
    computed : {
      hasPhoto(){
        if(this.photo !== undefined && this.photo !== null && this.photo !== ''){
          return true;
        }else{
          return false;
        }
      }
    },
    methods : {
      savePhoto(){
        console.log('savePhoto');
      },
      photograph(){
        navigator.camera.getPicture(
          onPhotoUrlSuccess,
          onUrlFail, {
            quality: 100,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 150, //生成的图片大小 单位像素
            targetHeight: 150,
            correctOrientation: true
          });
      },
      accesstoPhone(){
        navigator.camera.getPicture(
          onPhotoUrlSuccess,
          onUrlFail, {
              quality: 100,
              destinationType: Camera.DestinationType.FILE_URI, //设置返回值的格式   DATA_URL:base64  FILE_URI:路径格式
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY, //PHOTOLIBRARY或SAVEDPHOTOALBUM 系统弹出照片选择对话框，用户可以从相集中选择照片
              allowEdit: false,
              targetWidth: 150,
              targetHeight: 150,
              mediaType: Camera.MediaType.PICTURE
          })
      },
      openView(){
        let me = this;
        f7.popup('.popup');
        setTimeout(function(){
          me.$store.commit('hideHead');
        },300);
      },
      closePanel(){
        let me = this;
        f7.closeModal();
        setTimeout(function(){
          me.$store.commit('showHead');
        },0);
      }
    },
    components: {
      SubmitBtn
    }
  }
</script>
<style>
  .popup{
    position: fixed;
  }
  .popup-overlay.modal-overlay-visible{
    visibility: hidden;
  }
</style>
