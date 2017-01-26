<template>
  <v-content className="page-with-headOnly page-background">
    <SelfCard></SelfCard>
    <div class="list-block" style="margin: 5px 0;">
      <div class="wx-group">
        <ul class="wx-settings">
          <li v-for="item in items">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">{{item.title}}</div>
                <span class="ess-item-value">{{item.value}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import SelfCard from '../../components/SelfCard';

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');

      this.$store.dispatch('getMyLeaveQuota').then(
        (response) => {
          if(response.body.status === 1){
            this.items = response.body.data.leaveData;
          }else{
            f7.alert('',response.body.message)
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
          title:'我的年假配额'
        },
        items : [],
      }},
    components: {
      VContent,
      SelfCard
    }
  }
</script>

<style>
</style>
