<template>
  <v-content className="page-with-headOnly">
    <div class="mobileframe">
      <div class="wx-group">
        <div class="wx-title"></div>
        <ul class="wx-settings">
          <router-link tag="li" class="wx-item" :to="{path:'/self/resetPwd'}">
            <span class="wx-content">
              <i class="WeStar_iconfont ">&#xe624;</i>
            </span>
            <div class="wx-name"><span>账号设置</span></div>
          </router-link>
          <li class="wx-item" @click="changeLanguage">
            <span class="wx-content">
              <i class="WeStar_iconfont ">&#xe624;</i>
            </span>
            <div class="wx-name">
              <span>语言设置</span>
            </div>
          </li>
          <router-link tag="li" class="wx-item" :to="{path:'/self/themeSetting'}">
            <span class="wx-content">
              <i class="WeStar_iconfont ">&#xe624;</i>
            </span>
            <div class="wx-name">
              <span>主题设置</span>
            </div>
          </router-link>
        </ul>
      </div>
      <div class="wx-group">
        <div class="wx-title"></div>
        <ul class="wx-settings">
          <router-link tag="li" class="wx-item" :to="{path:'/self/about'}">
            <span class="wx-content">
              <i class="WeStar_iconfont ">&#xe624;</i>
            </span>
            <div class="wx-name">
              <span>关于westar</span>
            </div>
          </router-link>
        </ul>
      </div>
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
    destroyed:function(){ 

    },
    data() {
      return {
        head:{
          backShow:true,
          rightShow:true,
          rightInfo:'',
          show:true,
          title:'我的信息'
        }
      }
    },
    methods : {
      changeLanguage(){
        let setLanguage = (language)=>{
          console.log('-------------',language);
        }
        let btn_active_index = 0;
        let buttons = [{
            text: '简体中文',
            onClick: function() {
              setLanguage('zh_cn');
            }
        }, {
            text: '繁体中文',
            onClick: function() {
              setLanguage('zh_tw');
            }

        }, {
            text: 'English',
            onClick: function() {
              setLanguage('en_us');
            }
        }];

        buttons[btn_active_index].bold = true;
        buttons[btn_active_index].color = 'red';
        buttons[btn_active_index].onClick = function() {};

        f7.actions(buttons);
      }
    },
    components: {
      VContent
    }
  }
</script>

<style>
</style>
