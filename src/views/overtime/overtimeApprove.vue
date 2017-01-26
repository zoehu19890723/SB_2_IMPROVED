<template>
  <v-content className="page-with-headOnly page-background">
    <TabItem>
       <div class="content-block" slot="tab1">
          <applyInfoCard v-for="itemN in notApproveList" :item="itemN" :permissionCode="permissionCode1" v-if="hasNotApproveList"></applyInfoCard>
          <NoDataCard v-if="!hasNotApproveList"></NoDataCard>
       </div>
       <div class="content-block" slot="tab2">
          <applyInfoCard v-for="itemA in approvedList" :item="itemA" :permissionCode="permissionCode2"  v-if="hasApproveList"></applyInfoCard>
          <NoDataCard v-if="!hasApproveList"></NoDataCard>
       </div>
    </TabItem>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import TabItem from '../../components/TabItem';
  import applyInfoCard from '../../components/applyInfoCard';
  import NoDataCard from '../../components/NoDataCard';
  import _ from 'underscore';
  import {dealImage} from '../../commonUtil';

  export default {
    created:function(){
      let me = this;
      me.$store.commit('setHead',this.head);
      me.$store.commit('hideFooter');

      me.$store.dispatch('getMyOTApprove').then(
        (response) =>{
          if(response.body.status === 1){
            me.notApproveList = dealImage(response.body.data.notApproved);
            me.approvedList = dealImage(response.body.data.approved);
         }else{
          f7.alert('',response.body.message);
         }
      });
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:'我要审批的休假'
        },

        notApproveList : [],
        approvedList : [],
        permissionCode1 : 3,
        permissionCode2 : 4
      }
    },
    computed : {
      hasNotApproveList(){
        return this.notApproveList.length > 0 ? true : false
      },
      hasApproveList(){
        return this.approvedList.length > 0 ? true : false
      }
    },
    components: {
      VContent,
      TabItem,
      applyInfoCard,
      NoDataCard
    }
  }
</script>

<style>
</style>
