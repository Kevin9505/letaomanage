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
          @open="handleOpen"
          @close="handleClose"
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
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>分类管理</span>
            </template>
            <el-menu-item index="2-1">
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
          <el-button icon="">退出</el-button>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose () {}
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
