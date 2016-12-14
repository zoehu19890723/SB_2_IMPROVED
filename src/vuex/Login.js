/**
 * @author She.L
 * @version 2016/12/7
 * @description 登录页 {用户名，密码}
 */
const moduleLogin = {
  state: {
    name: '',
    password: '',
  },

  /* eslint-disable no-param-reassign*/
  mutations: {
    setName(state, { name }) {
      state.name = name;
    },

    setPassword(state, { password }) {
      state.password = password;
    },

  },

};

export default moduleLogin;
