<template>
  <div class="first-cate">
    <el-card class="box-card">
      <el-button type="primary">添加分类</el-button>
      <template>
        <el-table
          :data="firstCateData"
          border
          style="width: 100%;margin-top:15px;"
        >
          <el-table-column
          type="selection"
          width="55"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="分类编号"
            width="auto"
          >
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="分类名称"
            width="auto"
          >
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>
<script>
import { getFirstCateData } from '@/api'
export default {
  data () {
    return {
      firstCateData: [],
      page: 1,
      pageSize: 10
    }
  },
  mounted () {
    // console.log({page: this.page, pageSize: this.pageSize})
    getFirstCateData({page: this.page, pageSize: this.pageSize}).then(res => {
      console.log(res)
      this.firstCateData = res.rows
    })
  }
}
</script>
<style lang="scss" scoped>
</style>
