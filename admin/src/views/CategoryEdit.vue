<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <el-form ref="formRef" :model="model" :rules="rules" label-width="120px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" :disabled="id ? !model.parent : false" placeholder="（可选）默认创建一级分类">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      parents: [],
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在2-6个字符', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.fetchParents()
    this.id && this.fetchById()
  },
  methods: {
    async fetchById() {
      const res = await this.$http.get(`/rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents() {
      const res = await this.$http.get('/rest/categories')
      // 过滤出没有父级的分类
      this.parents = res.data.filter((item) => !item.parent)
    },
    async submit() {
      if (this.id) {
        await this.$http.put(`/rest/categories/${this.id}`, this.model)
      } else {
        await this.$http.post('/rest/categories', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功',
      })
      this.$router.push('/categories/list')
    },
  },
}
</script>
