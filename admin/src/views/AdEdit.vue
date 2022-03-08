<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <el-form ref="formRef" :model="model" label-width="120px">
      <el-form-item label="广告位名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item label="广告">
        <el-button type="primary" size="small" @click="model.items.push({})">
          <i class="el-icon-plus" />
          添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="图片">
              <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :headers="getAuthHeaders()" :on-success="(res) => $set(item, 'image', res.url)">
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接">
              <el-input v-model="item.url" />
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        items: [],
      },
    }
  },
  created() {
    this.id && this.fetchById()
  },
  methods: {
    async fetchById() {
      const res = await this.$http.get(`/rest/ads/${this.id}`)
      this.model = res.data
    },
    getAuthHeaders() {},
    async submit() {
      if (this.id) {
        await this.$http.put(`/rest/ads/${this.id}`, this.model)
      } else {
        await this.$http.post('/rest/ads', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功',
      })
      this.$router.push('/ads/list')
    },
  },
}
</script>

<style></style>
