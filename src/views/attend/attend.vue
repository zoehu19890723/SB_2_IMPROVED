<template>
  <v-content className="page-content">
    <div class="content-block">
      <h1>考勤打卡</h1>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content'

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');
    },
    destroyed:function(){ 

    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:'考勤打卡'
        }
      }},
    components: {
      VContent
    }
  }
</script>

<style>
</style>
