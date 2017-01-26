<template>
  <div v-if="head.show" class="navbar">
    <div class="navbar-inner">
      <div class="left">
        <a href="#" class="link" v-if="head.backShow" @click="routerBack">
          <i class="icon icon-back"></i>
        </a>
      </div>
    <div class="center">{{ head.title }}</div>
      <div class="right">
        <router-link class="link icon-only" v-if="head.rightShow" to="/config">
          <i class="icon iconfont icon-chuzhenbiaoshezhi"></i>
          <span>{{ head.rightInfo }}</span>
        </router-link>
      </div>
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
      if(this.head.backToPoint !== undefined && this.head.backToPoint !== null){
        this.$router.replace(this.head.backToPoint);
      }else{
        this.$router.back();
      }
    }
  }
  }
</script>

<style scoped>
.navbar .navbar-inner .left{
  width: 20%;
}
.navbar .navbar-inner .right{
  width: 20%;
  display: flex;
  justify-content: flex-end;
}
</style>
