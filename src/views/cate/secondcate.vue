<template>
  <div class="secondcate">
    <el-card class="box-card">
      <el-button
        type="primary"
        @click="showAddSecondCateDialog"
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
            <template slot-scope="scope">
              <img
                v-show="scope.row.brandLogo"
                :src="'http://127.0.0.1:3000/' + scope.row.brandLogo"
                alt=""
              >
            </template>
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
      <!-- 添加品牌弹窗 -->
      <el-dialog
        title="添加品牌"
        :visible.sync="addBrandDialogFormVisible"
      >
        <el-form
          :model="addSecondCate"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="addSecondCate"
        >
          <el-form-item label="分类名称">
            <template>
              <el-select
                placeholder="请选择"
                v-model="addSecondCate.categoryId"
              >
                <el-option
                  v-for="item in firstCateData"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item
            label="品牌名称"
            prop="brandName"
          >
            <el-input
              :clearable="true"
              placeholder="请输入品牌名称"
              v-model="addSecondCate.brandName"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="上传图片"
            prop="name"
          >
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3000/category/addSecondCategoryPic"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="handleUploadBefore"
              :file-list="fileList"
              list-type="picture"
              :with-credentials='true'
              name='pic1'
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="handleCanceAdd('addSecondCate')">取 消</el-button>
          <el-button
            type="primary"
            @click="addSecondCateSubmit('addSecondCate')"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 预览图片弹框 -->
      <el-dialog
        title="图片预览"
        :visible.sync="showPicDialogFormVisible"
      >
        <img
          :src="'http://127.0.0.1:3000'+showPicUrl"
          alt=""
        >
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="showPicDialogFormVisible=!showPicDialogFormVisible">取 消</el-button>
          <el-button
            type="primary"
            @click="showPicDialogFormVisible=!showPicDialogFormVisible"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑品牌弹窗 -->
      <el-dialog
        title="添加品牌"
        :visible.sync="editBrandDialogFormVisible"
      >
        <el-form
          :model="editSecondCate"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="editSecondCate"
        >
          <el-form-item label="分类名称">
            <template>
              <el-select
                placeholder="请选择"
                v-model="editSecondCate.categoryId"
              >
                <el-option
                  v-for="item in firstCateData"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item
            label="品牌名称"
            prop="brandName"
          >
            <el-input
              :clearable="true"
              placeholder="请输入品牌名称"
              v-model="editSecondCate.brandName"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="上传图片"
            prop="name"
          >
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3000/category/addSecondCategoryPic"
              :on-preview="handleEditPreview"
              :on-remove="handleEditRemove"
              :on-success="handleEditSuccess"
              :before-upload="handleEditUploadBefore"
              :file-list="fileList"
              list-type="picture"
              :with-credentials='true'
              name='pic1'
            >
              <el-button
                size="small"
                type="primary"
              >点击上传</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="handleCanceEditCate('editSecondCate')">取 消</el-button>
          <el-button
            type="primary"
            @click="editSecondCateSubmit('editSecondCate')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getSecondCateData, getFirstCateData, addSecondBrandCate } from '@/api'
export default {
  data () {
    return {
      isok: true,
      // 二级分类获取
      secondCateData: [],
      // 一级分类
      firstCateData: [],
      // 预览图片展示路径
      showPicUrl: '',
      // 添加品牌数据
      addSecondCate: {
        categoryId: '',
        brandName: '',
        brandLogo: '',
        hot: 1
      },
      fileList: [],
      formLabelWidth: '100px',
      // 控制添加品牌弹框是否显示
      addBrandDialogFormVisible: false,
      // 控制预览图片弹框是否显示
      showPicDialogFormVisible: false,
      // 控制编辑更新品牌弹框是否显示
      editBrandDialogFormVisible: false,
      // 获取二级分类数据
      params: {
        page: 1,
        pageSize: 4
      },
      total: 1,
      // 编辑更新品牌数据
      editSecondCate: {},
      // 验证规则
      rules: {
        brandName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ]
      }
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
    showEditScondCateDialog (row) {
      console.log(row)
      this.editSecondCate = row
      getFirstCateData({ page: 1, pageSize: 30 }).then(res => {
        // console.log(res)
        this.firstCateData = res.rows
      })
      this.editBrandDialogFormVisible = true
    },
    // 每页显示条数
    handleSizeChange (val) {
      this.params.pageSize = val
      this.init()
    },
    // 下一页
    handleCurrentChange (val) {
      this.params.page = val
      this.init()
    },
    // 显示添加品牌弹框
    showAddSecondCateDialog () {
      this.addBrandDialogFormVisible = true
      getFirstCateData({ page: 1, pageSize: 30 }).then(res => {
        // console.log(res)
        this.firstCateData = res.rows
      })
    },
    // 图片预览
    handlePreview (file) {
      this.showPicDialogFormVisible = true
      this.showPicUrl = file.response.picAddr
    },
    // 移除图片
    handleRemove (file, fileList) {
      if (!file.response) {
        return false
      }
      this.addSecondCate.brandLogo = ''
    },
    // 上传成功
    handleSuccess (response, file, fileList) {
      this.addSecondCate.brandLogo = response.picAddr
    },
    // 上传之前
    handleUploadBefore (file) {
      if (file.size > 512000) {
        this.$message({
          message: '乖乖!!!图片不能大于500kb呢...',
          type: 'error'
        })
        return false
      }
    },
    // 取消添加品牌
    handleCanceAdd (formname) {
      this.$refs[formname].resetFields()
      this.addBrandDialogFormVisible = false
    },
    // 确认添加品牌
    addSecondCateSubmit (formname) {
      this.$refs[formname].validate(valid => {
        if (!valid) {
          this.$message({
            message: '乖乖!!!输入不许为空哦...',
            type: 'error'
          })
          return false
        } else {
          addSecondBrandCate(this.addSecondCate).then(res => {
            // console.log(this.addSecondCate)
            // console.log(res)
            if (res.success) {
              this.addBrandDialogFormVisible = false
              this.$refs[formname].resetFields()
              this.init()
            }
          })
        }
      })
    },
    // 编辑更新
    editSecondCateSubmit (formname) {},
    // 取消编辑更新
    handleCanceEditCate (formname) {},
    // 编辑品牌图片显示
    handleEditPreview () {},
    // 编辑品牌移除图片
    handleEditRemove () {},
    // 编辑品牌图片上传成功
    handleEditSuccess (response) {
      console.log(response)
    },
    // 编辑图片上传之前
    handleEditUploadBefore () {}
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
</style>
