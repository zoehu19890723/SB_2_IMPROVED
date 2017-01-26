<template>
  <v-content className="page-content page-Only">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content'
  export default {
    data() {
      return {
        transitionName: 'slide-left'
      }
    },

    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;

        if(from.path.indexOf('subordinate') > -1){
          this.transitionName = 'slide-right';
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
