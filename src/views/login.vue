<template>
  <div class="login">
    <div class="login-wrapper">
      <img
        class="avator"
        src="../assets/logo.png"
        alt=""
      >
      <el-form
        :model="userInfo"
        ref="userInfo"
        :rules="rules"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="用户名"
            v-model="userInfo.username"
            class="input-with-select"
          >
            <template slot="prepend"><span class="fa fa-user"></span></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            v-model="userInfo.password"
            type="password"
            class="input-with-select"
          >
            <template slot="prepend"><span class="fa fa-key"></span></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitLoginForm('userInfo')"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api'
export default {
  data () {
    return {
      userInfo: {
        username: 'root',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入正确的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitLoginForm (formname) {
      this.$refs[formname].validate(valid => {
        console.log(valid)
        if (!valid) {
          this.$message({
            message: '错了呢，检查是否输入有空...',
            type: 'error'
          })
          return false
        } else {
          login(this.userInfo).then(res => {
            if (res.success) {
              this.$router.push({path: '/home'})
            }
          })
        }
      })
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: rgb(47, 64, 80);
  .login-wrapper {
    width: 400px;
    padding: 50px 50px 30px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    .avator {
      width: 80px;
      position: absolute;
      top: -40px;
      left: 50%;
      border: 1px solid #ccc;
      border-radius: 50%;
      transform: translateX(-50%);
    }
    // .el-form-item {
    //   margin-bottom: 0px;
    //   .el-form-item__content {
    //     margin-left: 0px;
    .el-input {
      // margin-bottom: 20px;
    }
    //   }
    // }
    .el-button {
      width: 100%;
    }
  }
}
</style>
