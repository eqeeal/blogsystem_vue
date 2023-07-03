<template>
  <div class="contain">
    <span style="font-size: 20px">发布文章</span>
    <hr />
    <div class="add-body">
      <div class="select">
        <el-input v-model="title" maxlength=50 minlength=1 placeholder="请输入标题"></el-input>
         <el-select v-model="tagIds" multiple placeholder="请选择标签">
          <el-option
            v-for="item in tagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

         <el-select v-model="categoryId" placeholder="请选择分类">
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

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

import $api from '@/api'
import router from '@/router';

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      content: `<p>请输入内容</p>`, //双向数据绑定数据
      editorOption: {}, //编辑器配置项
      tagOptions: [
        {
          value: "1",
          label: "黄金糕",
        },
        {
          value: "2",
          label: "双皮奶",
        },
        {
          value: "3",
          label: "蚵仔煎",
        },
      ],
      categoryOptions: [
        {
          value: "1",
          label: "黄金糕",
        },
        {
          value: "2",
          label: "双皮奶",
        },
      ],
      tagIds: [],
      categoryId:'',
      title:"",
    };
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
    add(){
        if(this.title.length == 0){
            this.$message.error("请输入标题")
            return;
        }
        if(this.title.length >50){
            this.$message.error("标题最多50个字")
            return;
        }
        if(this.tagIds.length == 0){
            this.$message.error("请选择标签")
            return;
        }
         if(this.categoryId == ''){
            this.$message.error("请选择分类")
            return;
        }
        var data = {
            "title":this.title,
            "categoryId":this.categoryId,
            "path":this.content,
            "userId":1,
        }
        console.log(this.content)
        $api.blog.add(data,this.tagIds).then(res=>{
            this.$message.success(res.data.data)
            this.$router.go(-1)
        })
    },
    cancle(){
        this.$router.go(-1)
    }
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
.el-select{
    width: 40%;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 10%;
}
.but{
    text-align: center;
    margin-top: 20px;
}
.el-button{
    width: 100px;
    font-size: 15px;
}
</style>