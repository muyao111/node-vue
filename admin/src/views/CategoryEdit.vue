<template>
  <div>
    <h1>新建分类</h1>
    <el-form ref="formRef" :model="model" :rules="rules" label-width="120px">
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
  data() {
    return {
      model: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在2-4个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('/categories', this.model)
          alert(res)
          // this.$router.push('/categorirs/list')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style></style>
