<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form ref="formRef" :model="model" label-width="120px">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章名称">
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: {
    id: {},
  },
  components: { VueEditor },
  data() {
    return {
      categories: [],
      model: {},
    }
  },
  created() {
    this.id && this.fetchById()
    this.fetchCategories()
  },
  methods: {
    async fetchById() {
      const res = await this.$http.get(`/rest/ariticles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get('/rest/categories')
      // 过滤出新闻分类
      this.categories = res.data.filter((item) => item.parent && item.parent._id === '622605e250f15a52561cf312')
    },
    // 富文本编辑器的图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    async submit() {
      if (this.id) {
        await this.$http.put(`/rest/ariticles/${this.id}`, this.model)
      } else {
        await this.$http.post('/rest/ariticles', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功',
      })
      this.$router.push('/ariticles/list')
    },
  },
}
</script>
