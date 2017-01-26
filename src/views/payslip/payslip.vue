<template>
  <v-content className="page-with-headOnly page-background">
    <div class="card">
      <div class="wx-group">
        <ul class="wx-settings" style="padding:12px">
          <li class="wx-item" style="display: flex;justify-content: space-between;align-items: center;font-size: 16px;">
            <div>
              <span>发薪日:</span>
              <span style="font-weight: bold;">{{salaryData.date}}</span>
            </div>
            <span>
              <i id="mySalary-calender" class="icon WeStar_iconfont">&#xe621</i>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="list-block" style="margin: 5px 0;" v-for="item in salaryData.monthData">
      <div class="wx-group">
        <div class="wx-title group-split-block border-color">{{item.groupTitle}}</div>
        <ul class="wx-settings">
          <li v-for="it in item.groupData">
            <div class="item-content">
              <div class="item-inner">
                <div class="item-title">
                  <span>{{it.title}}</span>
                </div>
                <span class="ess-item-value">{{it.value}}</span>
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

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');
    },
    mounted:function(){
      this.$store.dispatch('getMyPayList').then(
        (result) =>{
          if(result.status === true){
            this.salaryData = result.data;
            this.monthArray = result.monthArray;
            this.initPicker();
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
          title:'我的薪资单'
        },
        salaryData:{},
        monthArray:[],
      }
    },
    methods:{
      initPicker() {
        let me = this;
        let myPicker = f7.picker({
            input: '#mySalary-calender',
            toolbarTemplate: '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                '<div class="left">' +
                '<a href="#" class="link toolbar-randomize-link"></a>' +
                '</div>' +
                '<div class="right">' +
                '<a href="#" class="link close-picker" id="mySalary-picker-month-sure">'+'确认'+'</a>' +
                '</div>' +
                '</div>' +
                '</div>',
            value: [me.salaryData.date],
            cols: [{
                displayValues: (() => {
                  let arr = [];
                  me.monthArray.forEach((value) =>{
                    let tempIndex = value.lastIndexOf('-');
                    let result = value.substring(0, tempIndex);
                    arr.push(result);
                  });
                  return arr;
                })(),
                values: (() => {
                    return me.monthArray;
                })()
            }],
            onClose: function() {
              if (myPicker.value[0] !== me.salaryData.date) {
                me.$store.dispatch('setNewDate',{
                  newDate : myPicker.value[0]
                }).then(
                  (result)=>{
                    me.salaryData = result;
                });
              }
            }
        });
      }
    },
    components: {
      VContent
    }
  }
</script>

<style>
</style>
