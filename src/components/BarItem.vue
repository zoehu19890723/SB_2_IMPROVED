<template>
  <router-link class="tab-link" :class="active ?'active' : ''"  :to="path">
      <i class="WeStar_iconfont bigger-icon" v-html="icon"></i>
      <span class="tabbar-label" v-text="label"></span>
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
</style>
