<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}管理员</h1>
    <el-form ref="formRef" :model="model" :rules="rules" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="model.password" type="password"></el-input>
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
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6-12个字符', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.id && this.fetchById()
  },
  methods: {
    async fetchById() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`)
      this.model = res.data
    },
    async submit() {
      if (this.id) {
        await this.$http.put(`/rest/admin_users/${this.id}`, this.model)
      } else {
        await this.$http.post('/rest/admin_users', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功',
      })
      this.$router.push('/admin_users/list')
    },
  },
}
</script>
