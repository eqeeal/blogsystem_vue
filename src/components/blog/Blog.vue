<template>
  <div class="blog-mange">
    <span style="font-size: 20px">博客管理</span>
    <hr />
    <div class="blog-main">
      <el-button type="success" @click="addBlog()">新增</el-button>
      <el-button type="primary" @click="editBlog()">修改</el-button>
      <el-button type="danger" @click="deleteBlog()">删除</el-button>
      <el-input
        placeholder="请输入关键字搜索"
        prefix-icon="el-icon-search"
        v-model="keyWords"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchList()"
        >搜索</el-button
      >
    </div>
    <div class="blog-list">
      <el-table
        ref="multipleTable"
        :data="blogTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        border=""
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="标题">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column prop="imgUrl" label="预览图">
          <!-- <img :src="$host + '/common/download?name=read.jpg'" alt="预览图" /> -->
          <template slot-scope="scope">
            <img v-if="scope.row.imgUrl" :src="scope.row.imgUrl"/>
            <img v-else :src="$host + '/common/download?name=read.jpg'" alt="预览图" />
          </template>
          
        </el-table-column>
        <el-table-column prop="view" label="浏览量"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ String(scope.row.status) === "0" ? "正常" : "不正常" }}
          </template>
        </el-table-column>
        <el-table-column prop="categoryName" label="博客分类">
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间"> </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        @prev-click="pageCurrentChange"
        @next-click="pageCurrentChange"
        @jumper-click="pageCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="pageInfo.pageSizes"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="修改文章"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div class="add-body">
        <!-- <div class="select">
          <el-input
            class="dia-input"
            v-model="selectContain.title"
            maxlength="50"
            minlength="1"
            placeholder="请输入标题"
          ></el-input>
          <el-select
            v-model="tagIds"
            multiple
            placeholder="请选择标签"
          >
            <el-option
              v-for="item in tagOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <el-select
            v-model="selectContain.categoryName"
            placeholder="请选择分类"
          >
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div> -->
        <div class="select">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-input
                class="dia-input"
                v-model="selectContain.title"
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
              <el-select v-model="selectContain.categoryId" placeholder="请选择分类">
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
                <img v-if="selectContain.imgUrl" :src=selectContain.imgUrl class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
        </div>
        <quill-editor
          v-model="selectContain.path"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        >
        </quill-editor>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle()">取 消</el-button>
          <el-button type="primary" @click="updataBlog()">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $api from "../../api/index.js";

// 引入样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      editorOption: {}, //编辑器配置项
      blogTable: {},
      keyWords: "",
      pageInfo: {
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 5,
        total: "",
        currentPage: 1,
      },
      tagOptions: [],
      categoryOptions: [],
      tagIds: [],
      dialogVisible: false,
      selectContain: "",
      imageUrl: "", //回显图片地址
    };
  },
  created() {
    this.createPage();
    this.getTagOptions();
    this.getCategoryOptions();
  },
  methods: {
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
    getData() {
      var data = {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.currentPage,
        title: this.keyWords,
      };
      return data;
    },
    createPage() {
      var data = this.getData();
      $api.blog.page(data).then((res) => {
        this.blogTable = res.data.data.records;
        // console.log(res.data.data)
        this.pageInfo.total = res.data.data.total;
        // console.log(this.blogTable)
      });
    },
    pageSizeChange(newSize) {
      this.pageInfo.pageSize = newSize;
      this.pageInfo.currentPage = 1;
      this.createPage();
    },
    pageCurrentChange(newPage) {
      this.pageInfo.currentPage = newPage;
      this.createPage();
    },
    searchList() {
      this.createPage();
    },
    addBlog() {
      this.$router.push("AddBlog");
    },
    editBlog() {
      const arr = this.$refs.multipleTable.selection;
      if (arr.length > 1) {
        this.$message("一次只能选择一条数据");
        return;
      }
      if (arr.length == 0) {
        this.$message("请选择数据");
        return;
      }
      this.selectContain = arr[0];
      // alert(JSON.stringify(this.selectContain.imgUrl))
      $api.blog.getTagIds(this.selectContain.id).then((res) => {
        this.tagIds = res.data.data;
      });

      this.dialogVisible = !this.dialogVisible;

      // console.log(this.selectContain);
    },
    deleteBlog() {
      const arr = this.$refs.multipleTable.selection;
      if (arr.length == 0) {
        this.$message("请选择数据");
        return;
      }
      this.$confirm("此操作将永久删除，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          //获取id
          var arr1 = arr.map((a) => a.id);
          $api.blog.deleteBlog(arr1).then((res) => {
            if (res.data.success === false) {
              this.$message.error(res.data.errorMsg);
              return;
            }
            this.pageCurrentChange(this.pageInfo.currentPage);
            this.$message.success(res.data.data);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    updataBlog() {
      var blog = this.selectContain;

      if (blog.categoryId.length == 0) {
        this.$message.error("请选择分类");
        return;
      }
      if (blog.title.length == 0) {
        this.$message.error("请输入标题");
        return;
      }
      if (blog.title.length > 50) {
        this.$message.error("标题长度不能超过50个字");
        return;
      }
      if (this.tagIds.length == 0) {
        this.$message.error("请选择标签");
        return;
      }
      $api.blog.updateBlog(blog, this.tagIds).then((res) => {
        this.dialogVisible = !this.dialogVisible;
        this.createPage();
        this.$message.success(res.data.data);
      });
      dialogVisible = false;
    },
    cancle() {
      this.dialogVisible = !this.dialogVisible;
      this.createPage();
    },
    handleAvatarSuccess(res) {
      console.log("上传请求返回的数据", res);
      if (res.code == 200) {
        //成功
        this.selectContain.imgUrl = res.data;
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
.blog-mange {
  width: 100%;
  background-color: white;
  text-align: left;
  padding: 20px;
}
.blog-main {
  padding: 10px;
}
.el-input {
  width: 200px;
  margin-left: 30px;
  margin-right: 5px;
}
hr {
  border-top: 2px;
}
button {
  margin-bottom: 2vh;
}

.dia-input {
  width: 100%;
  margin-left: 0;
  margin-right: 1vw;
}
.add-body {
  padding: 2px;
}
.block {
  margin-top: 2%;
  margin-left: 20%;
  width: 50%;
}
img {
  height: 120px;
  width: 120px;
}
.dialog-footer {
  text-align: center;
  margin-top: 30px;
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
.el-upload {
  height: 160px;
}
.select {
  margin-bottom: 20px;
}
.el-select,
.dia-input {
  width: 90%;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>