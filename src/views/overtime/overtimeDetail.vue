<template>
  <v-content className="page-with-headOnly page-background" style="background: transparent;">
    <InfoDetailCard :detailData="detailData"></InfoDetailCard> 
    <TextareaItem v-if="parseInt(permissionCode) === 1 " ref="reson" title="撤销原因" class="applyCard"></TextareaItem> 
    <TextareaItem v-if="parseInt(permissionCode) === 3 " ref="reson" title="审批备注" class="applyCard"></TextareaItem>
    <Toolbar v-if="parseInt(permissionCode) === 1" :btnArray="cancelBtn"></Toolbar>
    <Toolbar v-if="parseInt(permissionCode) === 3" :btnArray="approveBtn"></Toolbar>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import InfoDetailCard from '../../components/InfoDetailCard';
  import TextareaItem from '../../components/TextareaItem';
  import Toolbar from '../../components/Toolbar';
  import {dealImage} from '../../commonUtil';

  export default {
    created:function(){
      let me = this;
      me.$store.commit('setHead',this.head);
      me.$store.commit('hideFooter');

      let applyId = this.$route.query.id || null;
      this.permissionCode = this.$route.query.permissionCode;
      me.$store.dispatch('getOTDetailInfo',{id : applyId}).then(
        (response)=>{
          if(response.body.status === 1){
            let data = response.body;
            if (data.data.applyPerson !== undefined) {
              data.data.applyPerson = dealImage([data.data.applyPerson], true)[0];
              if (data.data.approvePerson !== undefined && data.data.approvePerson.length !== 0) {
                let last_person_arr = data.data.approvePerson[data.data.approvePerson.length - 1].data;
                last_person_arr.forEach((item) => {
                    let status = parseInt(item.status.step_status);
                    if (status === 1) {
                        this.generalId = item.id;
                        return;
                    }
                })
                data.data.approvePerson.forEach((item) =>{
                    item.data = dealImage(item.data,true);
                })
              }
            }
            me.detailData = data.data;
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
          title:'加班详情'
        },
        detailData : {},
        permissionCode : 1,
        cancelBtn : [{
          action : this.cancelApply
        }],
        approveBtn : [{
          action : this.refuseApply
        },{
          action : this.agreeApply
        }],
        generalId : ''
      }
    },
    methods : {
      cancelApply(){
        let me = this;
        let applyId = me.$route.query.id;
        let reson = me.$refs.reson.dataValue || '撤销申请';
        me.$store.dispatch('cancelLeaveApply',{id : applyId,reson : reson}).then(
          (response) =>{
            if(response.body.status === 1){
              f7.alert("","撤销申请成功",function(){
                me.$router.back();
              });
            }else{
              f7.alert("",response.body.message);
            }
          }
        )
      },
      refuseApply(){
        this.approveApply(0);
      },
      agreeApply(){
        this.approveApply(1);
      },

      approveApply(code){
        let me = this;
        let reson = me.$refs.reson.dataValue || (code === 0 ? '同意':'拒绝');
        me.$store.dispatch('approveOTApply',{
          id : me.generalId,
          reson : reson,
          code : code
        }).then(
        (response)=>{
          if(response.body.status === 1){
            f7.alert("","审批成功",function(){
              me.$router.back();
            });
          }else{
            f7.alert("",response.body.message);
          }
        })
      }
    },
    components: {
      VContent,
      InfoDetailCard,
      TextareaItem,
      Toolbar
    }
  }
</script>

<style>
  .applyCard textarea{
    background-color: white;
  }
</style>

