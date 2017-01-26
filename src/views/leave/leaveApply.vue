<template>
  <v-content className="page-with-headOnly page-background">
    <div class="mobileframe">
      <div class="wx-group">
        <ul class="wx-settings">
          <li class="wx-item">
            <SelectorItem ref="leaveType" title="休假类型" :nullable="!nullable" :avaliableArray="vacationType" fieldCode="leaveType" placeholder="请选择休假类型"></SelectorItem>
          </li>
          <li class="wx-item">
            <TextareaItem ref="leaveReson" title="休假原因" :nullable="nullable" ></TextareaItem>  
          </li>
          <li class="wx-item">
            <ImageItem ref="imagePhoto" title="附件图片" :nullable="nullable"></ImageItem>  
          </li>
          <li class="wx-item">
            <DateSelectorItem ref="leaveStartTime" title="开始时间" :nullable="nullable" fieldCode="leaveStartTime" defaultValue="2017-01-23 12:00"></DateSelectorItem>  
          </li>
          <li class="wx-item">
            <DateSelectorItem ref="leaveEndTime" title="结束时间" :nullable="nullable" fieldCode="leaveEndTime" defaultValue="2017-01-23 18:00"></DateSelectorItem>  
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
  import ImageItem from '../../components/ImageItem';
  import { mapGetters } from 'vuex';

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');

      this.$store.dispatch('getLeaveTypes');

    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:'休假申请'
        },
        btn : {
          text : '提交',
          clx : 'weui_btn'
        },
        nullable : true
      }
    },
    computed:{
      ...mapGetters(['vacationType','attendanceTime'])
    },
    methods : {
      doSubmit(){
        let type = this.$refs.leaveType
        console.log('success');
      }
    },
    components: {
      VContent,
      TextareaItem,
      SubmitBtn,
      SelectorItem,
      DateSelectorItem,
      ImageItem
    }
  }
</script>

<style>
</style>
