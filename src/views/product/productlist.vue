<template>
  <div class="product-list">
    <el-card class="box-card">
      <el-button
        type="primary"
        @click="showAddProductDialog"
      >添加商品</el-button>
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
          <el-table-column label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="showSoldOutDialog(scope.row)"
              >{{scope.row.statu===0?'上架':'下架'}}</el-button>
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
    </el-card>
  </div>
</template>
<script>
import { getProductData } from '@/api'
export default {
  data () {
    return {
      params: {
        page: 1,
        pageSize: 4
      },
      total: 10,
      productList: []
    }
  },
  methods: {
    init () {
      getProductData(this.params).then(res => {
        // console.log(res)
        this.productList = res.rows
        this.total = res.total
      })
    },
    showAddProductDialog () {},
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
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>

</style>
