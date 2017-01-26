<template>
  <v-content className="page-with-headOnly">
    <div class="version-panel">
        <div class="app-icon">
            <img :src="imageUrl">
        </div>
        <div>当前版本 {{version}}</div>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import {appVersion,assetsPublicPath} from '../../config';

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'关于westar'
        },
        version : appVersion,
        imageUrl : assetsPublicPath + '/static/img/westar.png'
      }
    },
    components: {
      VContent
    }
  }
</script>
