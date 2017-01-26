<template>
  <v-content className="page-with-headOnly page-background">
    <SelfCard></SelfCard>
    <Linklist :propList="profileList"  style="margin: 5px 0;"></Linklist>
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

      this.userId = this.$route.query.id || null;
      this.$store.dispatch('getPersonCard',{id : this.userId});
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'我的人事档案'
        },
        userId : ''
      }
    },
    computed:{
      profileList() {
        let originList = this.$store.state.moduleHome.profileList;
        for(let item in originList){
          originList[item].path = '/home/profile1';
          originList[item].query = {
            id:this.userId,
            groupId:item,
            title:originList[item].title
          }
        }
        return originList;
      },
    },
    components: {
      VContent,
      SelfCard,
      Linklist
    }
  }
</script>

<style>
</style>
