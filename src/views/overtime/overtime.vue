<template>
  <v-content className="page-with-headOnly page-background">
    <SelfCard></SelfCard>
    <Linklist :propList="profileList_group1"></Linklist>
    <Linklist :propList="profileList_group2" style="margin-top:10px"></Linklist>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import SelfCard from '../../components/SelfCard';
  import Linklist from '../../components/Linklist';

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');

      this.$store.dispatch('getPersonCard',{id : null});
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:'我的加班'
        },
        profileList_group1 : [
          {
            title : '加班信息查看',
            path : '/home/overtime1'
          }
        ],
        profileList_group2 : [
          {
            title : '加班申请',
            path : '/home/overtime2'
          },{
            title : '加班审批',
            path : '/home/overtime3'
          }
        ],
      }},
    components: {
      VContent,
      SelfCard,
      Linklist
    }
  }
</script>

<style>
</style>
