<template>
  <router-link class="link_tab_custom" :class="active ?'active' : ''"  :to="path">
      <i class="WeStar_iconfont bigger-icon" v-html="icon"></i>
      <span v-text="label"></span>
  </router-link>
</template>

<script>
  export default {
    props: {
      path: '',
      icon: '',
      label: '',
      active : {
        type: Boolean,
        default : false
      }
    }
  }
</script>
<style scoped>
  .bigger-icon{
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
  }

  .link_tab_custom{
    flex-shrink: 1;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #929292;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    overflow: visible;
    flex: 1;
    flex-direction: column;
    padding-top: 4px;
    padding-bottom: 4px;
    height: 100%;
    justify-content: space-between;
  }

  .link_tab_custom span{
    line-height: 1;
    display: block;
    margin: 0;
    letter-spacing: .01em;
    font-size: 10px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .link_tab_custom.active{
    color: rgb(1,124,192)!important;
  }
</style>
