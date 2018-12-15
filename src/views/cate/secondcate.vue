<template>
  <div class="secondcate">
    <el-card class="box-card">
      <el-button
        type="primary"
        @click="addBrandDialogFormVisible=!addBrandDialogFormVisible"
      >添加品牌</el-button>
      <template>
        <el-table
          :data="secondCateData"
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
            label="品牌编号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌名称"
            width="auto"
          >
          </el-table-column>
          <el-table-column
            prop="brandLogo"
            label="品牌logo"
            width="auto"
          >
          <!-- <template><img :src="'http://127.0.0.1:3000/'+secondCateData.brandLogo" alt=""></template> -->
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="所属分类"
            width="auto"
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="showEditScondCateDialog(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </template>
      <!-- 添加分类弹窗 -->
      <!-- <el-dialog
        title="添加分类"
        :visible.sync="addCateDialogFormVisible"
      >
        <el-form
          :model="addFirstCate"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="addFirstCate"
        >
          <el-form-item
            label="分类名称"
            prop="categoryName"
          >
            <el-input
              v-model="addFirstCate.categoryName"
              autocomplete="off"
              placeholder="请输入分类名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="handleCanceAdd('addFirstCate')">取 消</el-button>
          <el-button
            type="primary"
            @click="addFirstCateSubmit('addFirstCate')"
          >确 定</el-button>
        </div>
      </el-dialog> -->
      <!-- 编辑分类弹窗 -->
      <!-- <el-dialog
        title="编辑分类"
        :visible.sync="editCateDialogFormVisible"
      >
        <el-form
          :model="editFirstCate"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="editFirstCate"
        >
          <el-form-item
            label="分类名称"
            prop="categoryName"
          >
            <el-input
              v-model="editFirstCate.categoryName"
              autocomplete="off"
              placeholder="请输入分类名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否启动"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="editFirstCate.isDelete"
              placeholder="0 启用 - 1 禁用"
            >
              <el-option
                label="启用"
                value="0"
              ></el-option>
              <el-option
                label="禁用"
                value="1"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="editCateDialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="handleEditFirstCate('editFirstCate')"
          >更 新</el-button>
        </div>
      </el-dialog> -->
    </el-card>
  </div>
</template>
<script>
import { getSecondCateData } from '@/api'
export default {
  data () {
    return {
      // 二级分类获取
      secondCateData: [],
      addBrandDialogFormVisible: false,
      // 获取二级分类数据
      params: {
        page: 1,
        pageSize: 4
      },
      total: 1
    }
  },
  methods: {
    // 获取二级数据
    init () {
      getSecondCateData(this.params).then(res => {
        console.log(res)
        this.secondCateData = res.rows
        this.total = res.total
      })
    },
    // 显示编辑品牌的弹框
    showEditScondCateDialog () {},
    // 每页显示条数
    handleSizeChange (val) {
      this.params.pageSize = val
      this.init()
    },
    // 下一页
    handleCurrentChange (val) {
      this.params.page = val
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
</style>
