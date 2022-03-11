const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }, //名称
  avatar: { type: String }, // 头像
  banner: { type: String }, // banner
  title: { type: String }, // 称号
  // 多个分类 Category
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {
    difficult: { type: Number }, // 难度
    skills: { type: Number }, // 技能
    attack: { type: Number }, // 攻击
    survive: { type: Number }, // 生存
  },
  skills: [
    {
      name: { type: String }, // 技能名称
      icon: { type: String }, // 技能图标
      delay: { type: String }, // 冷却值
      cost: { type: String }, // 消耗
      desc: { type: String }, // 技能描述
      tip: { type: String }, // 技能小提示
    },
  ],
  // 多个装备 Item
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 顺风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 逆风出装
  usageTips: { type: String }, // 使用技巧
  battleTips: { type: String }, // 对抗技巧
  teamTips: { type: String }, // 团战思路
  // 多个搭档 Hero
  partners: [
    {
      hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
      desc: { type: String },
    },
  ],
})

module.exports = mongoose.model('Hero', schema, 'heroes')
