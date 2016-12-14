<template>
  <v-content className="page-content">
    <div class="content-block">
      <h1>联系人页面</h1>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../components/Content'

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('setActiveItem',1);
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
          title:'联系人'
        }
      }},
    components: {
      VContent
    }
  }

</script>
