<template>
  <v-content className="page-with-headOnly page-background">
    <SelfCard></SelfCard>
    <EditableList :propList="profileList" :groupID="groupID"></EditableList>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import SelfCard from '../../components/SelfCard';
  import EditableList from '../../components/EditableList';

  export default {
    created:function(){
      let id = this.$route.query.id || null;
      this.groupID = this.$route.query.groupId || null;
      this.head.title = this.$route.query.title || '我的信息';

      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');
      this.$store.dispatch('getProfileDetail',{id : id, groupID : this.groupID});
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:''
        },
         groupID : ''
      }
    },
    computed:{
      profileList() {
        return  this.$store.state.moduleHome.profileDetailData;
      },
    },
    components: {
      VContent,
      SelfCard,
      EditableList
    }
  }
</script>

<style>
</style>
