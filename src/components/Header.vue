<template>
  <div class="navbar">
    <div class="navbar-inner">
      <div class="left">
        <a href="#" class="link" v-if="head.backShow" @click="routerBack">
          <i class="icon icon-back"></i>
          <span>后退</span>
        </a>
      </div>
    <div class="center">{{ head.title }}</div>
      <div class="right"></div>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        baseURL:''
      }
    },
    computed:{
      ...mapGetters(['head'])
  },
  methods:{
    routerBack(){
      window.history.back()
    }
  }
  }
</script>

<style scoped>
  .left{
    width:20%
  }
  .right{
    width:20%
  }

</style>
