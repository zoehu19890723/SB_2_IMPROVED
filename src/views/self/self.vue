<template>
  <v-content className="page-with-both">
    <SelfCard></SelfCard>
    <div class="mobileframe" style="margin-top:0px">
      <div class="wx-group">
          <div class="wx-title"></div>
          <ul class="wx-settings">
              <router-link tag="li" class="wx-item" :to="{path:'/self/setting'}">
                  <span class="wx-content">
                      <i class="WeStar_iconfont ">&#xe624;</i>
                  </span>
                  <div class="wx-name">
                    <i class="WeStar_iconfont bigger-icon">&#xe606;</i>
                    <span>设置</span>
                  </div>
              </router-link>
          </ul>
      </div>
      <SubmitBtn :btnText="btn.text" :submitAction="doExit" :clx="btn.clx"></SubmitBtn>
  </v-content>
</template>

<script>
  import VContent from '../../components/Content';
  import SelfCard from '../../components/SelfCard';
  import SubmitBtn from '../../components/SubmitBtn';

  export default {
    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('setActiveItem',2);
      this.$store.commit('showFooter');
      this.$store.dispatch('getPersonCard',{id : null});
    },
    data() {
      return {
        head:{
          backShow:false,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'我'
        },
        btn : {
          text : '退出',
          clx : 'weui_btn'
        }
      }
    },
    methods: {
      doExit(){
        this.$store.dispatch('logout').then(
          (response) => {
            this.$router.replace('/login');
          }
        );
      }
    },
    components: {
      VContent,
      SelfCard,
      SubmitBtn
    }
  }
</script>

<style>
</style>
