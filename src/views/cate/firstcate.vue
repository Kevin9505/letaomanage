<template>
  <div class="first-cate">
    <el-card class="box-card">
      <el-button
        type="primary"
        @click="addCateDialogFormVisible=!addCateDialogFormVisible"
      >添加分类</el-button>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="showEditFirstCateDialog(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top:25px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.page"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </template>
      <!-- 添加分类弹窗 -->
      <el-dialog
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
      </el-dialog>
      <!-- 编辑分类弹窗 -->
      <el-dialog
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
            label="启用/禁用"
          >
            <el-select
              v-model="editFirstCate.isDelete"
              placeholder="1 启用 - 0 禁用"
            >
              <el-option
                label="启用"
                :value="1"
              ></el-option>
              <el-option
                label="禁用"
                :value="0"
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
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getFirstCateData, addFirstCate, editFirstCate } from '@/api'
export default {
  data () {
    return {
      // 渲染分类数据
      firstCateData: [],
      params: {
        page: 1,
        pageSize: 2
      },
      total: 1,
      formLabelWidth: '80px',
      // 控制添加弹框是否显示
      addCateDialogFormVisible: false,
      editCateDialogFormVisible: false,
      // 添加分类的数据
      addFirstCate: {
        categoryName: ''
      },
      editFirstCate: {
        id: '',
        isDelete: '',
        categoryName: ''
      },
      // 验证规则
      rules: {
        categoryName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 拿数据渲染页面
    init () {
      getFirstCateData(this.params).then(
        res => {
          this.firstCateData = res.rows
          this.total = res.total
        }
      )
    },
    // 每页条数
    handleSizeChange (val) {
      // console.log(val)
      this.params.pageSize = val
      this.init()
    },
    // 下一页
    handleCurrentChange (val) {
      // console.log(val)
      this.params.page = val
      this.init()
    },
    // 确认添加分类
    addFirstCateSubmit (formname) {
      this.$refs[formname].validate(valid => {
        if (!valid) {
          this.$message({
            message: '错了呢,输入不能为空哦...',
            type: 'error'
          })
        } else {
          addFirstCate(this.addFirstCate).then(res => {
            console.log(res)
            if (res.success) {
              this.$message({
                message: '真棒!!!添加成功...',
                type: 'success'
              })
              this.addCateDialogFormVisible = false
              // 重置表单
              this.$refs[formname].resetFields()
              this.init()
            } else {
              this.$message({
                message: res.message,
                type: 'error'
              })
            }
          })
        }
      })
    },
    // 取消添加分类
    handleCanceAdd (formname) {
      this.$message({
        message: '注意!!!您取消了添加呢...',
        type: 'message'
      })
      this.addCateDialogFormVisible = false
      this.$refs[formname].resetFields()
    },
    // 编辑一级分类
    handleEditFirstCate (formname) {
      this.$refs[formname].validate(valid => {
        if (!valid) {
          this.$message({
            message: '错了呢,不能输入空值哦...',
            type: 'error'
          })
          return false
        } else {
          editFirstCate(this.editFirstCate).then(res => {
            console.log(this.editFirstCate)
            console.log(res)
            this.editCateDialogFormVisible = false
            this.$refs[formname].resetFields()
            this.init()
          })
        }
      })
    },
    // 显示编辑一级分类弹框
    showEditFirstCateDialog (row) {
      // this.editFirstCate.id = row.id
      this.editFirstCate = row
      this.editCateDialogFormVisible = true
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
</style>
