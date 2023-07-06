<template>
  <div class="contain">
    <el-row>
      <el-col type="flex" class="search">
        <span>搜索文章</span>
        <hr />
        <el-input
          @change="search()"
          placeholder="请输入关键字搜索"
          prefix-icon="el-icon-search"
          v-model="keyWords"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="head">
      <div style="width: 100%; text-align: center">
        <!-- <img class="avatar" v-if="userAvatar" :src="userAvatar"/>
        <img class="avatar" v-else :src="$host + '/common/download?name=read.jpg'" alt="头像" />
        <p>{{userName}}</p> -->
        <el-col :span="8">
          文章
          <p>{{count.blog}}</p>
        </el-col>
        <el-col :span="8">
          标签
          <p>{{count.tag}}</p>
        </el-col>
        <el-col :span="8"
          >分类
          <p>{{count.category}}</p>
        </el-col>
      </div>
      <div></div>
    </el-row>
    <el-row type="flex" class="tag">
       <el-col >
         <span> 热门标签 </span>
         <hr />
        <div v-for="(item,index) in tags" :key="index">
          <span class="tag-unit">{{item.name}}({{item.count}})</span>
       </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="category">
      <el-col >
         <span> 分类 </span>
         <hr />
        <div v-for="(item,index) in categorys" :key="index">
          <span class="category-unit">{{item.name}}({{item.count}})</span>
       </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="new">
       <el-col >
         <span> 最新 </span>
         <hr />
        <div v-for="(item,index) in blogData" :key="index" class="new-item" @click="blogDetail(item.id)">
          <img class="blog-pickture" v-if="item.imgUrl" :src="item.imgUrl"/>
        <img class="blog-pickture" v-else :src="$host + '/common/download?name=read.jpg'" alt="预览图" />
           <!-- <img class="blog-pickture"  :src="$host + '/common/download?name='+item.pickture " alt=""> -->
              <div class="blog-title">
              {{item.title}}
              <div style="color:rgb(204,204,204)">
                {{item.updateTime}}
              </div>
            </div>
       </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Bus from "@/api/Bus";
import $api from "@/api"

export default {
  data() {
    return {
      avatar: "38.jpg",
      userName:"userName",
      count:{
        blog:'',
        tag:'',
        category:''
      },
      tags: [],
      categorys:[],
      tagOptions:[],
      categoryOptions:[],
      blogData:{},
      keyWords:'',
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  created(){
    this.getNew();
    // this.getUserInfo();
    this.getBlogInfo();
    this.getHotTags();
    this.getHotCategory();
  },
  methods:{
    search(){
      Bus.$emit("keyWords",this.keyWords,"向main传递搜索条件")
    },
    getNew(){
      var data = {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.currentPage,
        userId: localStorage.getItem("userId"),
      };
      $api.blog.page(data).then(res=>{
        this.blogData = res.data.data.records;
        // alert(JSON.stringify(this.blogData))
      })
    },
    getBlogInfo(){
      $api.blog.getBlogInfo().then(res=>{
        this.count.blog = res.data.data.blogCount;
        this.count.category = res.data.data.categoryCount;
        this.count.tag = res.data.data.tagCount;
      })
    },
    getUserInfo(){
      $api.blog.getUserInfo().then(res=>{
         this.avatar=res.data.data.userAvatar
         this.userName=res.data.data.userName
         localStorage.setItem("userId",res.data.data.userId)
      })
    },
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
     blogDetail(id){
      this.$router.push({name:"Detail",query:{id:id}})
    },
    getHotTags(){
      $api.blog.getHotTags().then(res=>{
        this.tags = res.data.data
      })
    },
    getHotCategory(){
      $api.blog.getHotCategory().then(res=>{
        this.categorys = res.data.data
      })
    }
  }
};
</script>

<style scoped>
.contain {
  margin-left: 5vw;
}

.search {
  height: 15vh;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}
.search {
  margin-top: 20px;
  width: 20vw;
}
.head,
.tag,
.category,
.new {
  /* height: 40vh; */
  width: 20vw;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}
.title {
  font-size: 15px;
  margin-bottom: 5px;
}
hr {
  border-top: 2px;
}
.avatar {
  height: 180px;
  width: 180px;
  border-radius: 50%;
}
.avatar {
  transition: transform 0.5s;
}
.avatar:hover {
  transform: rotate(360deg);
}
.tag-unit,.category-unit{
  float: left;
  margin-left: 15px;
  margin-top: 3px;
  border-radius: 10%;
  font-size: 20px;
  color: rgba(153,153,153,0.5);
}
.tag-unit:hover{
  color: rgba(73,177,245, 0.6);
  cursor: pointer;
}
.category-unit:hover{
  color: rgb(255, 192, 203);
  cursor: pointer;
}
.blog-pickture{
  height: 60px;
  width: 5vw;
  display: inline-block;
}
.blog-title{
  height: 60px;
  width: 12vw;
  display: inline-block;
  /* text-align: center; */
  float:right;
}
.new-item{
  margin-bottom:10px;
  cursor:pointer;
}
</style>