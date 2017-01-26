<template>
  <v-content className="page-with-headOnly page-background">
    <InputText ref="newText" :isPwd="false" :dataId="field_code" :dataPlaceholder="placeholder" :defaultV="defaultV" class="specInputTxt border-color"></InputText>
    <SubmitBtn :btnText="btn.text" :submitAction="updateField" :clx="btn.clx"></SubmitBtn>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import InputText from '../../components/InputText';
  import SubmitBtn from '../../components/SubmitBtn';

  export default {
    created:function(){
      
      this.head.title = '编辑' + this.$route.query.title || '';

      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');
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
        btn :{
          text : '提交',
          clx : 'weui_btn',
        }
      }
    },
    computed:{
      field_code(){
        return this.$route.query.field_code;
      },
      groupId(){
        return this.$route.query.groupId || null;
      },
      placeholder(){
        return '请输入' + this.$route.query.title || '';
      },
      defaultV(){
        return this.$route.query.value;
      },
      nullable(){
        return this.$route.query.nullable;
      }
    },
    methods:{
      updateField(){
        let value = this.$refs.newText.dataValue;
        if(this.nullable === false && (value === null || value.trim().length === 0)){
          f7.alert('','该字段不能为空');
          return;
        }

        this.$store.dispatch('updateField',{
          field_code: this.field_code,
          groupId : this.groupId,
          value : value
        }).then((response)=>{
          if(response.body.status === 1){
            let me = this;
            f7.alert('','修改成功',function(){
              me.$router.back();
            });
            
          }else{
            f7.alert('',response.body.message);
          }
        },(error)=>{
          f7.alert(error);
        });
      }
    },

    components: {
      InputText,
      SubmitBtn,
      VContent,
    }
  }
</script>

<style scoped>

</style>
