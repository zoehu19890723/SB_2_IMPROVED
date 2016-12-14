<template>
  <v-content className="page-content">
    <div class="content-block">
      <h1>我的页面</h1>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../components/Content'

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('setActiveItem',2);
    },
    destroyed:function(){ 

    },
    data() {
      return {
        head:{
          backShow:false,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'我的信息'
        }
      }},
    components: {
      VContent
    }
  }
</script>

<style>
</style>
