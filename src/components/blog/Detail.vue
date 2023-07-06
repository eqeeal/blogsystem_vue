<template>
  <div class="contain">
    <div class="blog-body">
      <div class="baseInfo">
        <div class="author">{{author}}</div>
        <div class="count">
          <span><i class="el-icon-date"></i>{{blog.createTime}}</span>/
          <span><i class="el-icon-chat-dot-round"></i>{{ cout }}条评论</span>/
          <span><i class="el-icon-view"></i>{{blog.view}}浏览</span>
        </div>
        <div class="word">
            <span class="word1">世界上有一个大帅比啊</span>
            <span class="word2">现在这个人就在看这句话</span>
        </div>
        <hr />
      </div>
      <div v-html="blog.path" class="content"></div>
      <comment-list @tota="tota" :admin="false" :blog-id="blog.id" :blog-user-id="blog.userId"></comment-list>
    </div>
  </div>
</template>

<script>
import $api from '@/api'
import CommentList from "@/components/comment/commentVue/commentList.vue";

export default {
  components: {CommentList},
  data() {
    return {
      blog: "",
      author:"author",
      cout:0,
    };
  },
  created() {
    this.blogDetail();
  },
  methods: {
    tota(tota){
      this.cout=tota;
    },
    blogDetail() {
      let id = this.$route.query.id
     $api.blog.getById(id).then(res =>{
        this.blog = res.data.data
     })
     $api.blog.getAuthor(id).then(res => {
        this.author = res.data.data
     })
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.contain {
  background-image: url(@/assets/imgs/read.jpg);
  border: 0px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.blog-body {
  background-color: white;
  height: 90%;
  width: 96%;
  padding: 3%;
  margin-bottom: 200px;
  margin-top: 100px;
  margin-left: 10%;
  margin-right: 10%;
}
.baseInfo {
  height: 20vh;
  margin: auto;
  padding: 20px;
}
.author {
  font-size: 40px;
  font-weight: 200;
}
.content {
  padding: 20px;
}
.count {
  margin-top: 2vh;
}
span {
  margin-left: 10px;
  margin-right: 3px;
}
hr {
  margin-top: 2vh;
  border-top: 2px;
}
.word1,.word2{
    width:100px;
    border-radius: 15px;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 5px;
    padding-bottom: 5px;
    color: aliceblue;
    font-size: 12px;
}
.word1{
    background-color: rgb(111,163,239);
}
.word2{
    background-color: rgb(255,152,0);
}
.word{
    margin-top: 30px;
}
/deep/ .el-icon-view:before {
  margin-right: 5px;
}
/deep/ .el-icon-date:before {
  margin-right: 5px;
}
/deep/ .el-icon-chat-dot-round:before {
  margin-right: 5px;
}
</style>
