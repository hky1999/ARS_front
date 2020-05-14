<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit1"></login-form>
          <p class="login-tip">请使用管理员账号登陆</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import qs from 'qs';
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { mylogin } from '@/api/user'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit1 ({ userName, password }){
      let status = qs.stringify({username: userName,password:password});
      mylogin(status).then(res => {
        console.log(res.data);
        if (res.data.flag) {
          let resData = res.data, userInfo = resData.userinfo;
          this.$store.commit("setToken",resData.username);
          // this.$store.commit("setAvatar",userInfo.avatar);
          this.$store.commit("setUserName",userInfo.username);
          this.$store.commit("setUserId",userInfo.uid);
          this.$store.commit("setAccess",userInfo.password);
          this.$store.commit("setHasGetInfo",true);
          this.$Notice.success({title: '登录成功'});
          this.$router.push({
            name: this.$config.homeName
          })
        } else {
          this.$Notice.error({title: '登陆失败,' + res.data.msg});
        }
        }
      )
    }
    // handleSubmit ({ userName, password }) {
    //   this.handleLogin({ userName, password }).then(res => {
    //     console.log(res);
    //     this.getUserInfo().then(res => {
    //       console.log(res);
    //       this.$router.push({
    //         name: this.$config.homeName
    //       })
    //     })
    //   })
    // }
  }
}
</script>

<style>

</style>
