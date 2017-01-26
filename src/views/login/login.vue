<template>
  <div class="page-Only">
    <div class="login-box">
      <div class="login-logo"></div>
      <div class="weui_cells">
        <InputText ref="username" :dataId="userItem.id" :dataPlaceholder="userItem.placeholder"></InputText>
        <InputText ref="password" :dataId="pwdItem.id" :isPwd="true"  :dataPlaceholder="pwdItem.placeholder"></InputText>
      </div>
      <SubmitBtn :btnText="btn.text" :submitAction="doLogin" :clx="btn.clx"></SubmitBtn>
      <div class="text-center">
        <div class="forgetPwd-panel">
          <router-link class="font-color-with-imp" :to="{path:'/forgetPwd'}">
            <i class="WeStar_iconfont">&#xe615;</i>
            &nbsp忘记密码
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .login-logo {
    text-align: center;
    height: 180px;
    background: url(../../../static/img/logo_star.png) center no-repeat;
    background-size: 60%
  }

  .login-box{
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #efeff4;
  }

.forgetPwd-panel {
    padding-right: 12px;
    display: -webkit-box;
    -webkit-box-pack: end;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    font-family: 'Heiti SC', DroidSansFallback, '微软雅黑', serif;
}
</style>
<script>
  import {assetsPublicPath} from '../../config';
  import InputText from '../../components/InputText';
  import SubmitBtn from '../../components/SubmitBtn';
  
  export default {
    name: 'login',

    created:function(){
      this.$router.push('/login');
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');
    },

    /**
     * @description 初始化数据
     * @description 用户名，密码，当前内容ID（login或forget）
     */
    data() {
      return {
        baseImgUrl:assetsPublicPath,
        baseUrl: assetsPublicPath + 'static/img/icons/',
        head:{
            show:false
        },
        userItem : {
          id : 'username',
          placeholder : '请输入用户名'
        },
        pwdItem : {
          id : 'pwd',
          placeholder : '请输入密码'
        },
        btn : {
          text : '登录',
          clx : 'weui_btn'
        }
      }
    },

    computed: {

    },

    methods: {

      doLogin() {
        let username = this.$refs.username.dataValue;
        let password = this.$refs.password.dataValue;

        if(username.trim() === ''){
          f7.alert('','请输入用户名');
          return;
        }

        if(password.trim() === ''){
          f7.alert('','请输入密码');
          return;
        }

        this.$store.dispatch('loginByMobile',{
          username: username,
          password : password
        }).then((response)=>{
          if(response.status === true){
            this.$router.replace('home');
          }else{
            f7.alert('',response.message);
          }
        },(error)=>{
          f7.alert(error);
        });
      },

    },

    components: {
      InputText,
      SubmitBtn
    }

  };
</script>
