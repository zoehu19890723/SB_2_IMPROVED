<template>
  <div class="bottom-bar">
    <div class="bottom-bar-inner">
    <slot></slot>
      </div>
  </div>
</template>
<style scoped>
  .bottom-bar{
    width: 100%;
  	box-sizing: border-box;
    font-size: 17px;
    margin: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: #f7f7f8;
    left: 0;
    bottom: 0;
    color: #929292;
    z-index: 5001;
    position: absolute;
    height: 53px;
  }
  .bottom-bar:before{
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
    height: 1px;
    width: 100%;
    background-color: #c4c4c4;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 0;
    transform-origin: 50% 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
  }
  .bottom-bar-inner{
  	position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>