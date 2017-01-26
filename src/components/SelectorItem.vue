<template>
  <div>
    <span class="wx-content">
      <input type="text" :id="fieldCode" class="weui-input"  value="" sourceValue="" readonly v-model="dataValue" :placeholder="placeholder"/>
      <i class="WeStar_iconfont right-arrow">&#xe624;</i>
    </span>
    <div class="wx-name">
      {{title}}
      <span class="font-red" v-if="!nullable">*</span>
    </div>
  <div>
</template>

<script>
  import _ from 'underscore';
  export default {
    name: 'CheckboxItem',

    props: {
      title : {
        type: String,
      },
      nullable:{
        type: Boolean,
        default: true
      },
      fieldCode:{
        type: String
      },
      defaultValue : '',
      avaliableArray : {
        type: Array
      },
      placeholder : ''
    },

    mounted : function(){
      let me = this;
      setTimeout(me.initPicker(),100);
    },

    data(){
      return {
        picker : null,
        dataValue : ''
      }
    },

    methods: {
      initPicker(){
        let avaliableArray = this.avaliableArray;
        let defaultValue = this.defaultValue;
        let deval = [];
        let value = null;
        if(defaultValue !== undefined && defaultValue !== '' ){
          value = _.find(avaliableArray,{
            display : defaultValue
          }).value;
          deval = [value];
        }else if(avaliableArray.length > 0){
          value = avaliableArray[0].value;
          deval = [value];
        }
        
        this.picker = f7.picker({
          input: '#'+this.fieldCode,
          toolbarTemplate: '<div class="toolbar">' +
              '<div class="toolbar-inner">' +
              '<div class="left">' +
              '<a href="#" class="link toolbar-randomize-link"></a>' +
              '</div>' +
              '<div class="right">' +
              '<a href="#" class="link close-picker">'+'确认'+'</a>' +
              '</div>' +
              '</div>' +
              '</div>',
          value : deval,
          cols: [{
              values: (function() {
                  var arr = [];
                  avaliableArray.forEach(function(value,index) {
                      if(typeof value === "object" && value.value !== undefined){
                          arr.push(value.value);
                      }else{
                          arr.push(value);
                      }
                  });
                  return arr;
              })(),
              displayValues: (function() {
                  var disArr = [];
                  avaliableArray.forEach(function(value,index) {
                      if(typeof value === "object" && value.display !== undefined){
                          disArr.push(value.display);
                      }else{
                          disArr.push(value);
                      }
                  });
                  return disArr;
              })()
          }],
          formatValue: function(p, values, displayValues) {
            return displayValues;
          }
        });
        if(defaultValue !== undefined && defaultValue !== ''){
          this.dataValue = this.defaultValue;
        }
      }
    }
  }
</script>

<style scoped>
</style>
