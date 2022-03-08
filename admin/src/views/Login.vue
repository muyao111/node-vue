<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form ref="formRef" :model="model" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="model.username" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="model.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
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
  methods: {
    async submit() {
      const res = await this.$http.post('/login', this.model)
      localStorage.token = res.data.token
      this.$message({
        type: 'success',
        message: '登录成功！',
      })
      this.$router.push('/')
    },
  },
}
</script>

<style>
.login-card {
  width: 25rem;
  margin: 6rem auto;
}
</style>
