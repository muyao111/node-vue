<template>
  <el-table :data="tableData">
    <el-table-column prop="_id" label="ID" width="230" />
    <el-table-column prop="name" label="物品名称" />
    <el-table-column prop="icon" label="物品图标">
      <template slot-scope="scope">
        <img :src="scope.row.icon" style="height: 3rem" />
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/items/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('/rest/items')
      this.tableData = res.data
    },
    handleDelete(row) {
      this.$confirm(`确认删除 "${row.name}" 物品?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await this.$http.delete(`/rest/items/${row._id}`)
        console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.fetch()
      })
    },
  },
}
</script>

<style></style>
