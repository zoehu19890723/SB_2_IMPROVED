<template>
  <div class="view view-main">
    <div class="pages">
      <div class="page navbar-fixed" :class="footer.show ?'toolbar-fixed' : ''">
        <v-header></v-header>
        <v-bar v-if="footer.show">
          <bar-item v-for="(item,index) in items" :path="item.path" :label="item.label" :icon="item.icon" :active="index === activeItem">
          </bar-item>
        </v-bar>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
import VBar from '../components/Bar'
import BarItem from '../components/BarItem'
import VHeader from '../components/Header'
import $ from 'zepto'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  created:function(){
  },
  data(){
    return {
      transitionName: '',
      isIndex:true,
      items: [
        {path: '/home' ,label:'首页',icon:'&#xe607'},
        {path: '/contact' ,label:'动态',icon:'&#xe617'},
        {path: '/self' ,label:'我',icon:'&#xe61b'}
      ]
    }
  },
  computed:{
    ...mapGetters(['footer','activeItem'])
  },
  // dynamically set transition based on route change
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      toDepth > 2?this.$store.commit('hideFooter'):this.$store.commit('showFooter');
    }
  },
  components: {
    VBar,
    BarItem,
    VHeader
  }
}
</script>

<style scoped>
#app {
  font-family: 'Heiti SC', DroidSansFallback, '微软雅黑', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
