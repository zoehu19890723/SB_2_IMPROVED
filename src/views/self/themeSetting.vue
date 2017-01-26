<template>
  <v-content className="page-with-headOnly">
    <div v-for="(item,index) in themes" :class="['theme-panel',(selectedIndex === index)? 'selected':'']" :id="item.color" @click="changeTheme(index)">
      <div class="img-panel">
          <div :class="item.color"></div>
        </div>
        <div class="theme-name">{{item.name}}</div>
      </div>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content'

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');
    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'我的信息'
        },
        themes : [
        {
            name : '樱花粉',
            color : 'pink'
        },{
            name : '魅惑紫',
            color : 'purple'
        },{
            name : '炫目黄',
            color : 'yellow'
        },{
            name : '深邃蓝',
            color : 'blue'
        },{
            name : '清新绿',
            color : 'green'
        },{
            name : '经典黑',
            color : 'dark'
        },{
            name : '中国红',
            color : 'cdp'
        }],
        selectedIndex : 0
      }},
    components: {
      VContent
    },
    methods : {
      changeTheme(index){
        this.selectedIndex = index;
      }
    }
  }
</script>

<style>
</style>
