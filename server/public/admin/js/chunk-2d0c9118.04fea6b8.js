(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c9118"],{5821:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",[e._v(e._s(e.id?"编辑":"新建")+"分类")]),r("el-form",{ref:"formRef",attrs:{model:e.model,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"上级分类"}},[r("el-select",{attrs:{disabled:!!e.id&&!e.model.parent,placeholder:"（可选）默认创建一级分类"},model:{value:e.model.parent,callback:function(t){e.$set(e.model,"parent",t)},expression:"model.parent"}},e._l(e.parents,(function(e){return r("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),r("el-form-item",{attrs:{label:"分类名称",prop:"name"}},[r("el-input",{model:{value:e.model.name,callback:function(t){e.$set(e.model,"name",t)},expression:"model.name"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("保存")])],1)],1)],1)},a=[],s=r("1da1"),i=(r("4de4"),r("d3b7"),r("96cf"),{props:{id:{}},data:function(){return{model:{},parents:[],rules:{name:[{required:!0,message:"请输入分类名称",trigger:"blur"},{min:2,max:6,message:"长度在2-6个字符",trigger:"blur"}]}}},created:function(){this.fetchParents(),this.id&&this.fetchById()},methods:{fetchById:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/rest/categories/".concat(e.id));case 2:r=t.sent,e.model=r.data;case 4:case"end":return t.stop()}}),t)})))()},fetchParents:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/rest/categories");case 2:r=t.sent,e.parents=r.data.filter((function(e){return!e.parent}));case 4:case"end":return t.stop()}}),t)})))()},submit:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=5;break}return t.next=3,e.$http.put("/rest/categories/".concat(e.id),e.model);case 3:t.next=7;break;case 5:return t.next=7,e.$http.post("/rest/categories",e.model);case 7:e.$message({type:"success",message:"保存成功"}),e.$router.push("/categories/list");case 9:case"end":return t.stop()}}),t)})))()}}}),c=i,o=r("2877"),u=Object(o["a"])(c,n,a,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0c9118.04fea6b8.js.map