<template>
  <div class="login">
    <div class="login-wrapper">
      <img class="avator" src="../assets/logo.png" alt="">
      <el-form ref="form" :model="userInfo" label-width="80px">
        <el-input placeholder="用户名" v-model="userInfo.username">
          <template slot="prepend"><span class="fa fa-user"></span></template>
        </el-input>
        <el-input placeholder="密码" v-model="userInfo.password">
          <template slot="prepend"><span class="fa fa-key"></span></template>
        </el-input>
        <el-button type="primary">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userInfo: {
        username: '',
        password: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  background-color: rgb(47, 64, 80);
  .login-wrapper{
    width: 400px;
    padding: 50px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    .avator{
      width: 80px;
      position: absolute;
      top: -40px;
      left: 50%;
      border: 1px solid #ccc;
      border-radius: 50%;
      transform: translateX(-50%);
    }
    .el-input{
      margin-bottom: 20px;
    }
    .el-button{
      width: 100%;
    }
  }
}
</style>
