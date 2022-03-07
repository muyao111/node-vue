<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <el-form ref="formRef" :model="model" :rules="rules" label-width="120px">
      <el-form-item label="物品名称" prop="name">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="物品图标">
        <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :before-upload="beforeUpload" :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
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
      model: {
        icon: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入物品名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在2-6个字符', trigger: 'blur' },
        ],
      },
      // 图片上传地址
      uploadUrl: this.$http.defaults.baseURL + '/upload',
    }
  },
  created() {
    this.id && this.fetchById()
  },
  methods: {
    async fetchById() {
      const res = await this.$http.get(`/rest/items/${this.id}`)
      this.model = res.data
    },
    async submit() {
      if (this.id) {
        await this.$http.put(`/rest/items/${this.id}`, this.model)
        this.$message({
          type: 'success',
          message: '修改成功',
        })
      } else {
        await this.$http.post('/rest/items', this.model)
        this.$message({
          type: 'success',
          message: '创建成功',
        })
      }
      this.$router.push('/items/list')
    },
    // 图片上传
    getAuthHeaders() {},
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    afterUpload(res) {
      this.$set(this.model, 'icon', res.url) // 显式赋值
      // this.model.icon = res.url
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
