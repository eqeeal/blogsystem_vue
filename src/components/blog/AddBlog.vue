<template>
  <div class="contain">
    <span style="font-size: 20px">发布文章</span>
    <hr />
    <div class="add-body">
      <div class="select">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input
              v-model="title"
              maxlength="50"
              minlength="1"
              placeholder="请输入标题"
            ></el-input
          ></el-col>
          <el-col :span="6">
            <el-select v-model="tagIds" multiple placeholder="请选择标签">
              <el-option
                v-for="item in tagOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="6">
            <el-select v-model="categoryId" placeholder="请选择分类">
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <span style="font-size: 18px; color: rgb(192, 201, 222)"
              >选择预览图片</span
            >
            <el-upload
              class="avatar-uploader"
              name="file"
              action="http://124.70.54.24:3001/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </div>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      >
      </quill-editor>

      <div class="but">
        <el-button type="success" @click="cancle()">取消</el-button>
        <el-button type="danger" @click="add()">发布</el-button>
      </div>
    </div>
  </div>
</template>
  
<script>
// 引入样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

import $api from "@/api";
import router from "@/router";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: `<p>请输入内容</p>`, //双向数据绑定数据
      editorOption: {}, //编辑器配置项
      tagOptions: [],
      categoryOptions: [],
      tagIds: [],
      categoryId: "",
      title: "",
      imageUrl: "", //回显图片地址
    };
  },
  created(){
    this.getTagOptions();
    this.getCategoryOptions();
  },
  methods: {
    onEditorBlur() {
      // alert(this.content)
    }, // 失去焦点触发事件
    onEditorFocus() {
      // alert(this.content)
    }, // 获得焦点触发事件
    onEditorChange() {
      // alert(this.content)
    }, // 内容改变触发事件
    getTagOptions(){
      $api.blog.getTagOptions().then(res=>{
        this.tagOptions = res.data.data;
        console.log(res.data.data)
      })
    },
    getCategoryOptions(){
      $api.blog.getCategoryOptions().then(res=>{
        this.categoryOptions = res.data.data;
      })
    },
    add() {
      if (this.title.length == 0) {
        this.$message.error("请输入标题");
        return;
      }
      if (this.title.length > 50) {
        this.$message.error("标题最多50个字");
        return;
      }
      if (this.tagIds.length == 0) {
        this.$message.error("请选择标签");
        return;
      }
      if (this.categoryId == "") {
        this.$message.error("请选择分类");
        return;
      }
      var data = {
        title: this.title,
        categoryId: this.categoryId,
        path: this.content,
        userId: localStorage.getItem("userId"),
        imgUrl: this.imageUrl,
      };
      console.log(this.content);
      $api.blog.add(data, this.tagIds).then((res) => {
        this.$message.success(res.data.data);
        this.$router.go(-1);
      });
    },
    cancle() {
      this.$router.go(-1);
    },
    handleAvatarSuccess(res) {
      console.log("上传请求返回的数据", res);
      if (res.code == 200) {
        //成功
        this.imageUrl = res.data;
      }
    },
    beforeAvatarUpload(file) {
      console.log("上传之前", file);
      //判断大小和类型是否符合条件,最多5m的大小限制，并且只能是png、jpg、jpeg、gif、webp等格式
      //使用正则表达式来判断数据是否符合指定条件
      if (!/(png|jpg|jpeg|gif|webp)$/.test(file.type)) {
        this.$message({
          message: "只能上传png、jpg、jpeg、gif、webp格式的图片",
          type: "error",
        });
        return false;
      }
      if (file.size > 1024 * 1024 * 2) {
        this.$message({
          message: "只能上传大小小于2mb的图片",
          type: "error",
        });
        return false;
      }
      return true; //允许上传
    },
  },
};
</script>
<style scoped>
.contain {
  width: 95%;
  background-color: white;
  text-align: left;
  padding: 20px;
}
hr {
  border-top: 2px;
}
.add-body {
  padding: 20px;
}
.el-select,
.el-input {
  width: 90%;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.but {
  text-align: center;
  margin-top: 20px;
}
.el-button {
  width: 100px;
  font-size: 15px;
}
.avatar-uploader {
  height: 180px;
  width: 180px;
  margin-top: 10px;
  background-color: rgb(192, 201, 222, 0.3);
  text-align: center;
  line-height: 180px;
}
.avatar {
  height: 180px;
  width: 180px;
}
.el-upload{
  height: 180px;
}
.select{
  margin-bottom: 20px;
}
</style>