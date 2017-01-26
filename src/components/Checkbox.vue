<template>
  <label class="label-switch"> 
    <input type="checkbox" class="weui-input" v-if="!checked"/>
    <input type="checkbox" class="weui-input" checked v-else/>
    <div class="checkbox"></div>
  </label>
</template>

<script>
  export default {
    name: 'Checkbox',

    props: {
      checkState:{
        type: [String,Number]
      }
    },
    computed: {
      checked(){
        let state  = parseInt(this.checkState) === 1 ? true : false;
        return state;
      }
    }
  }
</script>
