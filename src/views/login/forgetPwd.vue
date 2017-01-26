<template>
  <div class="page-with-headOnly">
    <div class="content-block login-box" style="margin: 0;padding: 0">
      <div class="weui_cells">
        <div class="codeInput">
          <InputText ref="phone" style="width:70%" :dataId="phoneItem.id" :dataPlaceholder="phoneItem.placeholder" ></InputText>
          <SubmitBtn :btnText="codebtn.text" :submitAction="sendValidcode" :clx="codebtn.clx"></SubmitBtn> 
        </div>
        <InputText ref="code" :dataId="codeItem.id" :dataPlaceholder="codeItem.placeholder" ></InputText>
      </div>
      <h2 class="ruleText font-color-with-imp">密码规则:8-50位,包含数字、大小写字母和特殊字符</h2>
      <div class="weui_cells">
        <InputText ref="newPwd" :isPwd="true" :dataId="newPwdItem.id" :dataPlaceholder="newPwdItem.placeholder" ></InputText>
        <InputText ref="confirmPwd" :isPwd="true" :dataId="newPwdConfirmItem.id" :dataPlaceholder="newPwdConfirmItem.placeholder" ></InputText>
      </div>  
      <SubmitBtn :btnText="btn.text" :submitAction="restPwd" :clx="btn.clx"></SubmitBtn>          
    </div>
  </div>
</template>
<style>
  .codeInput{
    display: -webkit-box;
  }
  .ruleText{
    margin:20px 20px 5px 15px;
    font-size:14px;
  }
</style>
<script>
  import {assetsPublicPath} from '../../config';
  import InputText from '../../components/InputText';
  import SubmitBtn from '../../components/SubmitBtn';
  export default {
    name: 'forgetPwd',

    created:function(){
      this.$store.commit('setHead',this.head);
      this.$store.commit('hideFooter');
    },

    data() {
      return {
        baseImgUrl:assetsPublicPath,
        baseUrl: assetsPublicPath + 'static/img/icons/',
        head:{
          backShow:true,
          rightShow:false,
          rightInfo:'',
          show:true,
          title:'找回密码'
        },
        phoneItem : {id : 'phone' , placeholder : '请输入手机号'},
        codeItem : {id : 'validateCode' , placeholder : '请输入验证码'},
        newPwdItem : {id : 'newPwd',placeholder : '请输入新密码'},
        newPwdConfirmItem : {id : 'confirmPwd',placeholder : '确认密码'},
        btn : {
          text : '确认',
          clx : 'weui_btn',
        },
        codebtn : {
          text : '发送验证码',
          clx : 'code_btn',
        }
      };
    },

    computed: {

    },

    methods: {
      sendValidcode(){
        let phone = this.$refs.phone.dataValue;
        let regPhone = /^1[3-8]+\d{9}$/;
        if(phone.trim() === ''){
          f7.alert('','请输入手机号');
          return;
        }

        if(!regPhone.test(phone)){
          f7.alert('','请输入正确的手机号');
          return;
        }

        this.$store.dispatch('sendMobileCode',{
          mobile: phone
        }).then((response)=>{
          if(response.body.status === 1){
            f7.alert('','验证码发送成功');
          }else{
            f7.alert('',response.body.message);
          }
        },(error)=>{
          f7.alert(error);
        });
      },

      restPwd(){
        let regPhone = /^1[3-8]+\d{9}$/;
        let regPWD = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[,.~!@#$%\^\+\*&\\\/\?\|:\.{}();=_\-\<\>\[\]].*).{4,50}$/;
        
        let phone = this.$refs.phone.dataValue;
        let code = this.$refs.code.dataValue;
        let newPwd = this.$refs.newPwd.dataValue;
        let confirmPwd = this.$refs.confirmPwd.dataValue;

        if(phone.trim() === ''){
          f7.alert('','请输入手机号');
          return;
        }
        if(!regPhone.test(phone)){
          f7.alert('','请输入有效的手机号');
          return;
        }
        if(code.trim() === ''){
          f7.alert('','请输入验证码');
          return;
        }
        if(newPwd.trim() === ''){
          f7.alert('','请输入新的密码');
          return;
        }
        if(confirmPwd.trim() === ''){
          f7.alert('','请再一次输入密码');
          return;
        }
        if(confirmPwd.trim() !== newPwd){
          f7.alert('','两次输入的密码不一致，请重新输入');
          return;
        }
        if (!regPWD.test(newPwd)) {
          app.f7.alert('', '请输入符合规则的密码');
          return;
        }

        this.$store.dispatch('restPwd',{
          mobile: phone,
          validation: code,
          pwd : newPwd
        }).then((response)=>{
          if(response.body.status === 1){
            f7.alert('','密码修改成功');
            this.$router.replace('login');
          }else{
            f7.alert('',response.body.message);
          }
        },(error)=>{
          f7.alert(error);
        });
      }

    },
    components: {
      InputText,
      SubmitBtn
    }

  };
</script>
