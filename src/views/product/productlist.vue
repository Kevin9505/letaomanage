<template>
  <div class="product-list">
    <el-card class="box-card">
      <el-button
        type="primary"
        @click="showAddProductDialog"
      >添加商品</el-button>
      <!-- 商品列表 -->
      <template>
        <el-table
          :data="productList"
          border
          style="width: 100%;margin-top:15px;"
        >
          <el-table-column
            type="selection"
            width="40"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="商品编号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="proName"
            label="商品名称"
            width="auto"
          >
          </el-table-column>
          <el-table-column
            prop="proDesc"
            label="商品描述"
            width="auto"
          >
          </el-table-column>
          <el-table-column
            prop="num"
            label="商品库存"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="size"
            label="商品尺寸"
            width="80"
          >
          </el-table-column>
          <el-table-column
            label="是否下架"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{scope.row.statu===0?'已下架':'已上架商品'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="showSoldOutDialog(scope.row)"
              >{{scope.row.statu===0?'上架':'下架'}}</el-button>
              <el-button
                size="mini"
                @click="showUpdateProduct(scope.row)"
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
        :visible.sync="addProductialogFormVisible"
      >
        <el-form
          :model="addProduct"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="addProduct"
        >
          <el-form-item label="品牌名称">
            <template>
              <el-select
                placeholder="请选择"
                v-model="addProduct.brandId"
              >
                <el-option
                  v-for="item in secondCateData"
                  :key="item.id"
                  :label="item.brandName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item
            label="产品名称"
            prop="proName"
          >
            <el-input
              :clearable="true"
              placeholder="请输入产品名称"
              v-model="addProduct.proName"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="产品描述"
            prop="proDesc"
          >
            <el-input
              :clearable="true"
              placeholder="请输入产品描述"
              v-model="addProduct.proDesc"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="产品数量"
            prop="num"
          >
            <el-input
              :clearable="true"
              placeholder="请输入产品数量"
              v-model="addProduct.num"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="产品尺码"
            prop="size"
          >
            <el-input
              :clearable="true"
              placeholder="请输入产品尺码,如20-39"
              v-model="addProduct.size"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品原价"
            prop="oldPrice"
          >
            <el-input
              :clearable="true"
              placeholder="请输入商品原价"
              v-model="addProduct.oldPrice"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品折扣价"
            prop="price"
          >
            <el-input
              :clearable="true"
              placeholder="请输入商品折扣价"
              v-model="addProduct.price"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="上传图片"
            prop="name"
          >
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3000/product/addProductPic"
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
          <el-button @click="handleCanceAdd('addProduct')">取 消</el-button>
          <el-button
            type="primary"
            @click="addProductSubmit('addProduct')"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 图片预览弹框 -->
      <el-dialog
        title="图片预览"
        :visible.sync="showPicDialogFormVisible"
      >
        <img v-if="showPicUrl" :src="'http://127.0.0.1:3000'+showPicUrl" alt="">
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="showPicDialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="showPicDialogFormVisible = false"
          >确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加品牌弹窗 -->
      <el-dialog
        title="编辑更新商品"
        :visible.sync="showUpdateProductDialogFormVisible"
      >
        <el-form
          :model="updateProduct"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="updateProduct"
        >
          <el-form-item label="品牌名称">
            <template>
              <el-select
                placeholder="请选择"
                v-model="updateProduct.brandId"
              >
                <el-option
                  v-for="item in secondCateData"
                  :key="item.id"
                  :label="item.brandName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item
            label="产品名称"
            prop="proName"
          >
            <el-input
              :clearable="true"
              placeholder="请输入产品名称"
              v-model="updateProduct.proName"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="产品描述"
            prop="proDesc"
          >
            <el-input
              :clearable="true"
              placeholder="请输入产品描述"
              v-model="updateProduct.proDesc"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="产品数量"
            prop="num"
          >
            <el-input
              :clearable="true"
              placeholder="请输入产品数量"
              v-model="updateProduct.num"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="产品尺码"
            prop="size"
          >
            <el-input
              :clearable="true"
              placeholder="请输入产品尺码,如20-39"
              v-model="updateProduct.size"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品原价"
            prop="oldPrice"
          >
            <el-input
              :clearable="true"
              placeholder="请输入商品原价"
              v-model="updateProduct.oldPrice"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="商品折扣价"
            prop="price"
          >
            <el-input
              :clearable="true"
              placeholder="请输入商品折扣价"
              v-model="updateProduct.price"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item
            label="上传图片"
            prop="name"
          >
            <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3000/product/addProductPic"
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
          </el-form-item> -->
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="handleCanceUpdate('updateProduct')">取 消</el-button>
          <el-button
            type="primary"
            @click="UpdateProductSubmit('updateProduct')"
          >确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { getProductData, getSecondCateData, addProductList, updateProduct } from '@/api'
export default {
  data () {
    return {
      // 获取商品数据的参数
      params: {
        page: 1,
        pageSize: 4
      },
      total: 10,
      // 商品列表数据
      productList: [],
      fileList: [],
      // 控制弹框是否显示
      addProductialogFormVisible: false,
      // 控制图片预览弹框是否显示
      showPicDialogFormVisible: false,
      // 控制编辑商品的弹框是否显示
      showUpdateProductDialogFormVisible: false,
      formLabelWidth: '120px',
      // 图片预览路径
      showPicUrl: '',
      // 添加商品的数据
      addProduct: {
        proName: '',
        oldPrice: '',
        price: '',
        proDesc: '',
        size: '',
        statu: 1,
        num: '',
        brandId: '',
        pic: []
      },
      // 编辑更新商品的数据
      updateProduct: {},
      // 品牌的数据
      secondCateData: [],
      // 验证规则
      rules: {
        proName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        oldPrice: [
          { required: true, message: '请输入商品原价', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品折扣价', trigger: 'blur' }
        ],
        proDesc: [
          { required: true, message: '请输入产品描述', trigger: 'blur' }
        ],
        size: [
          { required: true, message: '请输入产品尺码,如20-39', trigger: 'blur' }
        ],
        statu: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        num: [{ required: true, message: '请输入产品数量', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 渲染数据
    init () {
      getProductData(this.params).then(res => {
        // console.log(res)
        this.productList = res.rows
        this.total = res.total
      })
    },
    // 下架功能
    showSoldOutDialog () {},
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
    // 图片预览
    handlePreview (file) {
      this.showPicDialogFormVisible = true
      this.showPicUrl = file.response.picAddr
    },
    // 移除图片
    handleRemove (file, fileList) {
      // console.log(file)
      // console.log(fileList)
      // console.log(this.addProduct.pic)
      if (!file.response) {
        return false
      }
      const index = this.addProduct.pic.findIndex(value => {
        // console.log(value)
        return value.picAddr.indexOf(file.response.picAddr) !== -1
      })
      // console.log(index)
      this.addProduct.pic.splice(index, 1)
    },
    // 图片上传成功
    handleSuccess (response, file, fileList) {
      // console.log(response)
      response['productId'] = 6
      // console.log(response)
      this.addProduct.pic.push(response)
      // console.log(this.addProduct.pic)
    },
    // 上传图片之前
    handleUploadBefore (file) {
      if (file.size > 500 * 1024) {
        this.$message({
          message: '乖乖!!!图片不能大于500kb呢...',
          type: 'error'
        })
        return false
      }
    },
    // 添加商品按钮
    showAddProductDialog () {
      this.addProductialogFormVisible = true
      getSecondCateData({ page: 1, pageSize: 30 }).then(res => {
        // console.log(res)
        this.secondCateData = res.rows
      })
    },
    // 确认添加商品
    addProductSubmit (formname) {
      this.$refs[formname].validate(valid => {
        if (!valid) {
          this.$message({
            message: '乖乖!!!输入不能为空呢...',
            type: 'error'
          })
          return false
        } else {
          addProductList(this.addProduct).then(res => {
            if (res.success) {
              this.addProductialogFormVisible = false
              this.$refs[formname].resetFields()
              this.$message({
                message: '真棒!!!成功添加商品啦,开心....',
                type: 'success'
              })
              this.init()
            } else {
              this.$message({
                message: '哎呀!!!出错了,快检查下啦....',
                type: 'error'
              })
            }
          })
        }
      })
    },
    // 取消添加商品
    handleCanceAdd (formname) {
      this.addProductialogFormVisible = false
      this.$refs[formname].resetFields()
    },
    // 点击编辑按钮
    showUpdateProduct (row) {
      this.showUpdateProductDialogFormVisible = true
      // console.log(row)
      getSecondCateData({ page: 1, pageSize: 30 }).then(res => {
        // console.log(res)
        this.secondCateData = res.rows
      })
      this.updateProduct = row
    },
    // 取消编辑更新
    handleCanceUpdate (formname) {
      this.showUpdateProductDialogFormVisible = false
      this.$refs[formname].resetFields()
    },
    UpdateProductSubmit (formname) {
      this.$refs[formname].validate(valid => {
        if (!valid) {
          this.$message({
            message: '哎呀!!!出错了,快去检查啦...',
            type: 'error'
          })
          return false
        } else {
          updateProduct(this.updateProduct).then(res => {
            if (res.success) {
              this.showUpdateProductDialogFormVisible = false
              this.$refs[formname].resetFields()
              this.$message({
                message: '真棒!!!更新成功啦....',
                type: 'success'
              })
              this.init()
            } else {
              this.$message({
                message: '哎呀!!!出错了...',
                type: 'error'
              })
            }
          })
        }
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.product-list {
  .box-card {
    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
