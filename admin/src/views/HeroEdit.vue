<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <!-- 表单 -->
    <el-form :model="model" label-width="120px">
      <!-- tabs -->
      <el-tabs type="border-card" value="basic">
        <!-- tab1 -->
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name" />
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title" />
          </el-form-item>
          <el-form-item label="头像">
            <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="true" :before-upload="beforeUpload" :on-success="(res) => $set(model, 'avatar', res.url)">
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :on-success="(res) => $set(model, 'banner', res.url)">
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id" />
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.difficult" />
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.skills" />
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.attack" />
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.survive" />
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- tab2 -->
        <el-tab-pane label="技能管理" name="skills">
          <el-button type="primary" size="small" @click="model.skills.push({})">
            <i class="el-icon-plus" />
            添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name" />
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false" :before-upload="beforeUpload" :on-success="(res) => $set(item, 'icon', res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.desc" />
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tip" />
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- tab3 -->
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button type="primary" size="small" @click="model.partners.push({})">
            <i class="el-icon-plus" />
            添加搭档
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(partner, i) in model.partners" :key="i">
              <el-form-item label="搭档名称">
                <el-select v-model="partner.hero" filterable>
                  <el-option v-for="item in heroes" :key="item._id" :label="item.name" :value="item._id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="partner.desc" />
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.partners.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>
      </el-tabs>
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
      categories: [], // 分类
      items: [], // 物品
      heroes: [], // 英雄搭档
      model: {
        name: '', //名称
        avatar: '', // 头像
        title: '', // 称号
        scores: {}, // 分数
        skills: [], // 技能
        items1: [], // 顺风出装
        items2: [], // 逆风出装
        usageTips: '', // 使用技巧
        battleTips: '', // 对抗技巧
        teamTips: '', // 团战思路
        partners: [], // 搭档
      },
    }
  },
  created() {
    this.id && this.fetchById() // 如果有id为编辑页面，数据回显
    this.fetchCategories() // 获取分类
    this.fetchItems() // 获取物品
    this.fetchHeroes() // 获取英雄
  },
  methods: {
    async fetchById() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      // this.model = Object.assign({}, this.model, res.data)
      this.model = { ...this.model, ...res.data }
    },
    async fetchCategories() {
      const res = await this.$http.get('/rest/categories')
      // 过滤出英雄分类
      this.categories = res.data.filter((item) => item.parent && item.parent._id === '622605e950f15a52561cf315')
    },
    async fetchItems() {
      const res = await this.$http.get('/rest/items')
      this.items = res.data
    },
    async fetchHeroes() {
      const res = await this.$http.get('/rest/heroes')
      this.heroes = res.data
    },
    async submit() {
      if (this.id) {
        await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      } else {
        await this.$http.post('/rest/heroes', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功',
      })
      // this.$router.push('/heroes/list')
    },
    // 图片上传
    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M
    },
  },
}
</script>
