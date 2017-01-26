<template>
  <v-content className="page-with-headOnly page-background">
    <div class="mobileframe">
      <div class="wx-group" style="margin-top:8px">
        <ul class="wx-settings">
          <li class="wx-item" v-for="item in group.groupData">
            <SelectorItem :ref="item.field_code" v-if="item.type.input === 'selector'" :title="item.title" :nullable="item.nullable" :fieldCode="item.field_code" :defaultValue="item.value" :avaliableArray="item.type.avaliableValue"></SelectorItem>
            <CheckboxItem :ref="item.field_code" v-if="item.type.input === 'checkbox'" :title="item.title" :nullable="item.nullable" :checkState="item.value"></CheckboxItem>
            <TextItem :ref="item.field_code" v-if="item.type.input === 'text'" :title="item.title" :nullable="item.nullable" :defaultV="item.value" :dataPlaceholder = "item.placeholder"></TextItem>
            <TextareaItem :ref="item.field_code" v-if="item.type.input === 'textarea'" :title="item.title" :nullable="item.nullable" :defaultV="item.value" :dataPlaceholder = "item.placeholder"></TextareaItem>  
          </li>
        </ul>
      </div>
      <div>
        <SubmitBtn :btnText="updatebtn.text" :submitAction="doSubmit" :clx="updatebtn.clx" class="SubmitBtn"></SubmitBtn>
        <SubmitBtn :btnText="deletebtn.text" :submitAction="doDelete" :clx="deletebtn.clx" class="SubmitBtn" v-if="group.permission_code>3"></SubmitBtn>
      </div>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import InputText from '../../components/InputText';
  import SubmitBtn from '../../components/SubmitBtn';
  import SelectorItem from '../../components/SelectorItem';
  import CheckboxItem from '../../components/CheckboxItem';
  import TextItem from '../../components/TextItem';
  import TextareaItem from '../../components/TextareaItem';

  export default {
    created:function(){
      this.group =  this.$route.query.data;
      this.groupId = this.$route.query.groupId;

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
        updatebtn :{
          text : '提交',
          clx : 'weui_btn'
        },
        deletebtn :{
          text : '删除',
          clx : 'weui_btn'
        },
        group : {},
        groupId : ''
      }
    },
    computed:{
    
    },
    methods:{

      doSubmit(){
        let resultMap = [];
        let me = this;
        for(let index in this.group.groupData){
          let item = this.group.groupData[index];
          let itemType = item.type.input;
          let resultValue = '';
          let cmp = me.$refs[item.field_code][0];
          let resObj = {
            field_code : item.field_code
          }
          switch(itemType){
            case 'selector' : {
              resObj.value = cmp.picker.value[0];
              break;
            }
            case 'text' : 
            case 'textarea' : {
              resObj.value = cmp.dataValue;
              break;
            }
          }
          if(item.nullable === false && (resObj.value === null || resObj.value === '')){
            f7.alert('',item.title+'不能为空');
            break;
          }else{
            resultMap.push(resObj);
          }
        };

        this.$store.dispatch('updateForm',{
          groupId : this.groupId,
          value : resultMap,
          dataId : this.group.groupId
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
      },
      doDelete(){
        this.$store.dispatch('deleteForm',{
          groupId : this.groupId,
          dataId : this.group.groupId
        }).then((response)=>{
          if(response.body.status === 1){
            let me = this;
            f7.alert('','删除成功',function(){
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
      SelectorItem,
      CheckboxItem,
      TextItem,
      TextareaItem
    }
  }
</script>

<style scoped>
  .SubmitBtn{
    margin: 20px; 
    color: white;
    -webkit-box-flex: 1;
  }

</style>
