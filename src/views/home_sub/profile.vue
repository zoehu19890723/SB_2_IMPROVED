<template>
  <v-content className="page-content">
    <div class="content-block">
      <h1>我的人事档案</h1>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../components/Content'

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('setActiveItem',2);
      this.$store.commit('hideFooter');
    },
    destroyed:function(){ 

    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'我的人事档案'
        }
      }},
    components: {
      VContent
    }
  }
</script>

<style>
</style>
