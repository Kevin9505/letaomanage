<template>
  <div class="home">
    <el-container>
      <el-aside
        class="aside"
        width="auto"
      >
        <div class="user-info">
          <img
            src="../assets/images/my_logo.jpg"
            alt=""
          >
          <span class="username">大叔</span>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#2f4050"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :router="true"
        >
          <el-menu-item index="user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-submenu index="">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item index="firstcate">
              <i class="el-icon-menu"></i>
              <span slot="title">一级分类管理</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span slot="title">二级分类管理</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button v-model="isCollapse" @click="isCollapse=!isCollapse" icon="fa fa-align-justify"></el-button>
          <el-button icon="" @click="handleLogout">退出</el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { logout } from '@/api'
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleLogout () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout().then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '成功退出!'
            })
            this.$router.push({path: '/login'})
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
            return false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-menu:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
    .aside {
      // width: 200px;
      background-color: #2f4050;
      .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        padding-bottom: 20px;
        background-color: #243443;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 2px solid #a9b0c2;
        }
        .username {
          color: #a9b0c2;
          padding-top: 20px;
        }
      }
    }
    .el-menu{
      padding: 20px 0;
    }
    .el-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 1px 0px 0px 1px #dcdfe6;
    }
  }
}
</style>
