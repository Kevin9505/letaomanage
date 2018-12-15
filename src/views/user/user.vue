<template>
  <div class="user">
    <el-card class="box-card">
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
            label="状态"
          >
          <template slot-scope="scope">
            <span>{{ scope.row.isDelete | changeStatus() }}</span>
          </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :type="scope.row.isDelete===0?'success':'danger'"
                @click="handleChangeStatus(scope.row)"
              >{{scope.row.isDelete===0?'启用':'禁用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页功能 -->
      <el-pagination
        style="margin-top:25px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[4, 8, 12, 16]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import { userListData, changeUserStatus } from '@/api'
export default {
  data () {
    return {
      userList: [],
      params: {
        page: 1,
        pageSize: 5
      },
      total: 1
    }
  },
  methods: {
    // 启用和禁用用户状态
    handleChangeStatus (row) {
      // console.log(row)
      if (row.isDelete === 0) {
        row.isDelete = 1
        changeUserStatus({id: row.id, isDelete: row.isDelete}).then(res => {
          console.log(res)
          if (res.success) {
            this.$message({
              message: '启用成功...',
              type: 'success'
            })
            this.init()
          }
        })
      } else if (row.isDelete === 1) {
        row.isDelete = 0
        changeUserStatus({id: row.id, isDelete: row.isDelete}).then(res => {
          if (res.success) {
            this.$message({
              message: '禁用成功...',
              type: 'error'
            })
            this.init()
          }
        })
      }
    },
    // 数据渲染
    init () {
      userListData(this.params).then(res => {
        this.userList = res.rows
        this.total = res.total
      })
    },
    // 一页显示条数
    handleSizeChange (val) {
      this.params.pageSize = val
      this.init()
    },
    // 下一页
    handleCurrentChange (val) {
      this.params.pageSize = val
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  filters: {
    changeStatus (isDelete) {
      if (isDelete === 1) {
        return '已启用'
      } else if (isDelete === 0) {
        return '未启用'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
