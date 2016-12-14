<template>
  <div class="view">
    <div class="login-screen-content">
      <div class="navbar navbar-on-left login-navbar bg-white">
        <img class="img-response-height" :src="baseImgUrl+CDPLogoUrl">
      </div>
      <div class="content-block" id="login" v-if="isLogin">
        <div class="login-screen-title">
          <img :src="baseImgUrl+EPLogoUrl">
        </div>
        <form class="list-block" id="loginForm">
          <ul>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-input">
                    <input type="text" placeholder="Your name" name="name" v-model="name">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-input">
                    <input type="password" placeholder="Password" name="password" v-model="password">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </form>
        <div class="buttons-row">
          <button class="button button-fill bg-cdp-red" :disabled="disableLogin" @click="doLogin">Login</button>
          <button class="button color-cdp-red border-cdp-red" @click="goToForgetContent">Forget</button>
        </div>
      </div>
      <div class="content-block" id="forget" v-else>
        <h4>Forget your password?</h4>
        <p>Please contact your administrator to change your password.</p>
        <button class="button button-round button-fill bg-cdp-red color-cdp-red border-cdp-red" @click="goToLoginContent">Back</button>
      </div>
      <div class="content-block login-footer">
        <img class="img-response-half" :src="baseImgUrl+CopyrightUrl">
      </div>
    </div>
  </div>
</template>
<style>
    .img-response-half {
      width: 50%;
      height: auto;
    }
    .img-response-height {
      height: 100%;
      width: auto;
    }
    .login-footer {
      text-align: center;
      padding: 20px;
    }
    .login-navbar {
      padding: 5px;
      border-bottom: solid 2px rgb(202, 17, 50);
    }
    .bg-cdp-red,
    .bg-cdp-red.button-fill {
      background-color: rgb(202, 17, 50);
    }
    .color-cdp-red {
      color: rgb(202, 17, 50);
    }
    .border-cdp-red {
      border-color: rgb(202, 17, 50);
    }
</style>
<script>
  import {assetsPublicPath} from '../config'
  export default {
    name: 'login',

    /**
     * @description 初始化数据
     * @description 用户名，密码，当前内容ID（login或forget）
     */
    data() {
      return {
        baseImgUrl:assetsPublicPath,
        baseUrl: assetsPublicPath + 'static/img/icons/',
        name: '',
        password: '',
        currentContentId: 'login',
        CDPLogoUrl:'static/img/CDP-Brand.png',
        EPLogoUrl:'static/img/EP-Brand.png',
        CopyrightUrl:'static/img/Copyright.png'
      };
    },

    computed: {
      isLogin() {
        return this.currentContentId === 'login';
      },

      disableLogin() {
        return this.name === '' || this.password === '';
      },

    },

    methods: {
      goToForgetContent() {
        this.currentContentId = 'forget';
      },

      goToLoginContent() {
        this.currentContentId = 'login';
      },

      doLogin() {
        this.$store.commit('setName', {
          name: this.name,
        });
        this.$store.commit('setPassword', {
          password: this.password,
        });
        this.$router.replace('main');
      },

    },

  };
</script>
