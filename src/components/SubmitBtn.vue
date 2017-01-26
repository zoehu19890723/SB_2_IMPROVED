<template>
  <div class="wx-form" @click="_submitAction">
    <button :class="[clx, 'back-color-imp']">{{btnText}}</button>
  </div>
</template>

<script>
  export default {
    name: 'SubmitBtn',

    props: ['btnText','submitAction','clx'],

    methods: {
      _submitAction(e){
        this.submitAction(e);
      }
    }
  }
</script>

<style scoped>
  .wx-form {
    display: -webkit-box;
    -webkit-box-align: center;
    margin: 0 12px;
  }
  .weui_btn {
    letter-spacing: 3px;
    width: 100%;
    border-width: 0;
    outline: 0;
    -webkit-appearance: none;
    position: relative;
    display: block;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    line-height: 42px;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: hidden;
    font: 600 1em/1.4 Tahoma,Arial,Roboto,"Droid Sans","Helvetica Neue","Droid Sans Fallback","Heiti SC","Microsoft YaHei",sans-self;
    margin:20px 0;
    font-size: 18px;
    font-weight: 600;
    padding: 8px 14px;
  }

  .weui_btn:after {
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid rgba(0,0,0,0.2);
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    -ms-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: 10px;
  }
  .code_btn{
    line-height: 32px;
  }
</style>
