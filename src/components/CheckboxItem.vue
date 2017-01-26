<template>
  <li class="wx-item" >
    <span class="wx-content">
      <label class="label-switch"> 
        <input type="checkbox" class="weui-input" v-if="!checked"/>
        <input type="checkbox" class="weui-input" checked v-else/>
        <div class="checkbox"></div>
      </label>
    </span>
    <div class="wx-name">
      {{title}}
       <span class="font-red" v-if="!nullable">*</span>
    </div>
</li>
</template>

<script>
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
      checkState:{
        type: [String,Number]
      }
    },

    data(){},

    computed: {
      checked(){
        let state  = parseInt(this.checkState) === 1 ? true : false;
        return state;
      }
    },

    methods: {
    }
  }
</script>

<style scoped>
</style>
