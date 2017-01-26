<template>
  <div>
    <div class="wx-item">
      <div class="wx-name">
        {{title}}
         <span class="font-red" v-if="!nullable">*</span>
      </div>
    </div>
    <textarea rows="3" class="weui-input form_edit_textarea" style="width:100%" :placeholder="dataPlaceholder" v-model="dataValue"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'TextareaItem',

    props: {
      defaultV : {
        type: String,
      },
      nullable:{
        type: Boolean,
        default: true
      },
      title : {
        type : String
      },
      dataPlaceholder : {
        type : String,
        default : '请输入'
      }
    },

    data(){
      return {
        dataValue : this.defaultV
      }
    },

    computed: {
    },

    methods: {

    }
  }
</script>

<style scoped>
 
</style>
