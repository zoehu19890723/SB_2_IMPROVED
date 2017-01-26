<template>
  <v-content className="page-content page-Only">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content'
  export default {
    created(){
      this.$router.push('/home');
      this.$store.commit('setActiveItem',0);
    },
    data() {
      return {
        transitionName: 'slide-left'
      }
    },

    watch: {
      '$route' (to, from) {
        const toLeval = parseInt(to.path.substr(to.path.length-1,1));
        const fromLeval = parseInt(from.path.charAt(from.path.length-1));
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;

        if(isNaN(toLeval) === false && isNaN(fromLeval) === false){
          this.transitionName = toLeval < fromLeval ? 'slide-right' : 'slide-left';
        }else if(isNaN(toLeval) === true && isNaN(fromLeval) === false){
          this.transitionName = 'slide-right';
        }else if(isNaN(toLeval) === false && isNaN(fromLeval) === true){
          this.transitionName = 'slide-left';
        }else{
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        }
      }
    },

    methods:{

    },
    components: {
      VContent
    }
  }
</script>

<style scoped>
  .parent{
    padding-bottom: 53px;
  }
</style>
