<template>
  <div class="user">
    <template>
      <el-table
        :data="userList"
        border
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="isDelete"
          label="状态"
        >
        <span>{{ userList.isDelete | changeStatus() }}</span>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleChangeStatus(scope.row)"
            >禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { userListData, changeUserStatus } from '@/api'
export default {
  data () {
    return {
      userList: [],
      page: 1,
      pageSize: 5
    }
  },
  methods: {
    handleChangeStatus (row) {
      // console.log(row)
      // if (row.isDelete === 1) {
      //   console.log(11)
      //   this.isDelete = 0
      // }
      changeUserStatus({id: row.id, isDelete: this.isDelete}).then(res => {
      })
    },
    init () {
      userListData({ page: this.page, pageSize: this.pageSize }).then(res => {
        this.userList = res.rows
      })
    }
  },
  mounted () {
    this.init()
  },
  filters: {
    changeStatus (isDelete) {
      if (isDelete === '0') {
        return '已启用'
      } else if (isDelete === '1') {
        return '未启用'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
