<template>
  <div>
      <span class="wx-content upload edit-attatchment" @click="openImage">
          <img :src="photo" style='height:48px;width: 48px;' v-if="hasImage">
          <i class="WeStar_iconfont right-arrow font-color-with-imp noDataItem" v-else>&#xe614;</i>
      </span>
      <div class="wx-name">{{title}}
        <span class="font-red" v-if="!nullable">*</span>
      </div>
      <UploadPhoto ref="photoPanel" :photo = "photo"></UploadPhoto>
  </div>
</template>

<script>
  import UploadPhoto from './UploadPhoto' ;
  export default {
    name: 'ImageItem',

    props: {
      nullable:{
        type: Boolean,
        default: true
      },
      title : {
        type : String
      },
      photo : {
        type : String,
        default : null
      }
    },

    computed: {
      hasImage(){
        if(this.photo !== undefined && this.photo !== null && this.photo !== ''){
          return true;
        }else{
          return false;
        }
      }
    },

    methods: {
      openImage(){
        let me = this;
        me.$refs.photoPanel.openView();
        setTimeout(function(){
          me.$store.commit('hideHead');
        },300);
      }
    },
    components: {
      UploadPhoto
    }
  }
</script>

<style scoped>
 
</style>
