<template>
  <el-table :data="tableData">
    <el-table-column prop="_id" label="ID" width="230" />
    <el-table-column prop="categories" label="所属分类" />
    <el-table-column prop="title" label="文章标题" />
    <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="$router.push(`/ariticles/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
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
      const res = await this.$http.get('/rest/ariticles')
      this.tableData = res.data
    },
    handleDelete(row) {
      this.$confirm(`确认删除 "${row.title}" 文章?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await this.$http.delete(`/rest/ariticles/${row._id}`)
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
