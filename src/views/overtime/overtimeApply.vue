<template>
  <v-content className="page-with-headOnly page-background">
    <div class="mobileframe">
      <div class="wx-group">
        <ul class="wx-settings">
          <li class="wx-item">
            <SelectorItem ref="otType" title="选择您的加班类型" :nullable="!nullable" :avaliableArray="leaveType" fieldCode="leaveType" placeholder="请选择休假类型"></SelectorItem>
          </li>
          <li class="wx-item">
            <TextareaItem ref="otReson" title="加班原因" :nullable="nullable" ></TextareaItem> 
          </li>
          <li class="wx-item"> 
            <DateSelectorItem ref="otDate" title="加班日期" :nullable="nullable" fieldCode="otDate" defaultValue="2017-01-23" format="YYYY-MM-dd"></DateSelectorItem>  
          </li>
          <li class="wx-item">
            <DateSelectorItem ref="otStartTime" title="开始时间" :nullable="nullable" fieldCode="otStartTime" defaultValue="09:00" format="hh:mm">
              <CheckBox :checkState = 'startNext'></CheckBox>
            </DateSelectorItem>  
          </li>
          <li class="wx-item">
            <DateSelectorItem ref="otEndTime" title="结束时间" :nullable="nullable" fieldCode="otEndTime" defaultValue="18:00" format="hh:mm">
              <CheckBox :checkState = 'endNext'></CheckBox>
            </DateSelectorItem>  
          </li>
        </ul>
      </div>
      <SubmitBtn :btnText="btn.text" :submitAction="doSubmit" :clx="btn.clx"></SubmitBtn>
    </div>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import TextareaItem from '../../components/TextareaItem';
  import SubmitBtn from '../../components/SubmitBtn';
  import SelectorItem from '../../components/SelectorItem';
  import DateSelectorItem from '../../components/DateSelectorItem';
  import CheckBox from '../../components/CheckBox';

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');

    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:'加班申请'
        },
        btn : {
          text : '提交',
          clx : 'weui_btn'
        },
        leaveType : [{value:'qqq',display:'工作日加班'},{value:'qqp',display:'正常加班'}],
        nullable : true,
        startNext : 0,
        endNext : 1,
      }
    },
    methods : {
      doSubmit(){
        console.log('success');
      }
    },
    components: {
      VContent,
      TextareaItem,
      SubmitBtn,
      SelectorItem,
      DateSelectorItem,
      CheckBox
    }
  }
</script>

<style>
</style>
