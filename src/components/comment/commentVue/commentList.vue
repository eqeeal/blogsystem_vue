<template>
<div style="margin: 0;padding: 0;height: 100%;">
  <div style="margin: 0;padding: 0;height: 100%;">
<!--    <div v-for="item in recommentList">-->
<!--      <comment-item :admin="admin" :item="item"></comment-item>-->
<!--    </div>-->
    <div class="infinite-list-wrapper" style="overflow:auto;width:100%;height: 89vh">
      <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
        <div v-for="item in recommentList" class="list-item">
          <comment-item :f1="f1" :c="commentInfo" :f2="f2" @post="postRe" @post1="postRe1" :admin="admin" :item="item"></comment-item>
        </div>
      </ul>
      <div style="text-align: center">
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>

    </div>
    <div style="height: 80px">
      &nbsp;
    </div>
  </div>
  <div v-if="showaddphoto" style="position: fixed;bottom: 80px;right: 0;width: 15%;height: 80px;">
    <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/common/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
      <div v-if="imageUrl" style="position: fixed;bottom: 100px;right: 50px;">
            <img :src="imageUrl" style="width: auto;height: 120px;">
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
  <div style="position: fixed;bottom: 0;width: 100%;height: 80px;background-color: white">
    <el-row :gutter="20">
      <el-col :span="20">
        <div style="margin-top: 20px;margin-left: 10px">
          <el-input v-model="input"   maxlength="80" show-word-limit placeholder="过完12生肖需要13.5年"  prefix-icon="el-icon-search"></el-input>
        </div>

      </el-col>
      <el-col :span="2">
        <div style="margin-top: 20px;margin-left: 10px">
        <el-button type="primary" @click="post" icon="el-icon-edit" round>发送</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div  style="margin-top: 29px;margin-left: 5px">
          <i @click="showaddphoto=!showaddphoto;photo='';imageUrl=''" style="scale: 2.1" class="el-icon-circle-plus-outline"></i>
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-if="showComInput" style="z-index: 200;position: fixed;bottom: 0;width: 100%;height: 80px;background-color: white">
    <el-row :gutter="20">
      <el-col :span="20">
        <div style="margin-top: 20px;margin-left: 10px">
          <el-input v-model="input"   maxlength="80" show-word-limit :placeholder="'回复给:'+commentInfo.name"  prefix-icon="el-icon-search"></el-input>
        </div>

      </el-col>
      <el-col :span="2">
        <div style="margin-top: 20px;margin-left: 10px">
          <el-button type="primary" @click="postC" icon="el-icon-edit" round>发送</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div  style="margin-top: 29px;margin-left: 5px">
          <i @click="showComInput=false" style="scale: 2.1" class="el-icon-circle-close"></i>
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-if="showRecomInput" style="z-index: 200;position: fixed;bottom: 0;width: 100%;height: 80px;background-color: white">
    <el-row :gutter="20">
      <el-col :span="20">
        <div style="margin-top: 20px;margin-left: 10px">
          <el-input v-model="input"   maxlength="80" show-word-limit :placeholder="'回复给:'+recommentInfo.name"  prefix-icon="el-icon-search"></el-input>
        </div>
      </el-col>
      <el-col :span="2">
        <div style="margin-top: 20px;margin-left: 10px">
          <el-button type="primary" @click="postRec" icon="el-icon-edit" round>发送</el-button>
        </div>
      </el-col>
      <el-col :span="2">
        <div  style="margin-top: 29px;margin-left: 5px">
          <i @click="showRecomInput=false" style="scale: 2.1" class="el-icon-circle-close"></i>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import CommentItem from "@/components/comment/commentVue/commentItem.vue";

export default {
  name: "commentList",
  components: {CommentItem},
  props:["admin","blogId","blogUserId"],
  data(){
    return{
      f1:false,
      f2:false,
      imageUrl: '',
      count: 10,
      loading: false,
      pageQuary:{},
      recommentList:[],
      input:'',
      total:0,
      h:0,
      photo:'',
      showaddphoto:false,
      commentInfo:'',
      recommentInfo:'',
      showComInput:false,
      showRecomInput:true
    }
  },
  computed: {
    noMore () {
      return this.recommentList.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  watch:{
    total(){
      this.input=null;
      this.pageQuary.page=1;
      this.recommentList=[];
      this.photo='';
      this.imageUrl='';
      this.showaddphoto=false;
      this.load();
    }
  },
  mounted() {
    this.init();
    this.query();
    this.pageQuary.blogId=this.blogId;
  },
  methods:{
    async postRec(){
      let userId=localStorage.getItem("LoginUserId");
      let s=2;
      if(Number(userId)===this.blogUserId){
        s=1;
      }
      let data={commentId:this.commentInfo.id,status:s,content:this.input,userId:userId,pid:this.recommentInfo.id};
      await this.$requst.commentHttp.handlePostRecomment(data);
      this.f2=!this.f2;
      this.$message.success("评论成功");
    },
    async postC(){
      let userId=localStorage.getItem("LoginUserId");
      let s=2;
      if(Number(userId)===this.blogUserId){
        s=1;
      }
      let data={commentId:this.commentInfo.id,status:s,content:this.input,userId:userId,pid:null};
      await this.$requst.commentHttp.handlePostRecomment(data);
      this.f1=!this.f1;
      this.$message.success("评论成功");
    },
    postRe(comment){
      this.commentInfo=comment;
      this.showRecomInput=false;
      this.showComInput=true;
      // console.log(comment);
    },
    postRe1(comment,recomment){
      // console.log(comment);
      // console.log(recomment)
      this.commentInfo=comment;
      this.recommentInfo=recomment;
      this.showComInput=false;
      this.showRecomInput=true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.photo=res.data;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isLt2M;
    },
    async post(){
      let userId=localStorage.getItem("LoginUserId");
      let s=2;
      if(Number(userId)===this.blogUserId){
        s=1;
      }
      let data={blogId:this.blogId,status:s,content:this.input,userId:userId,photo:this.photo};
      await this.$requst.commentHttp.handlePostComment(data);
      this.total+=1;
      this.$message.success("评论成功");
    },
    async load () {
      this.loading = true
       let res=await this.$requst.commentHttp.getCommentPage(this.pageQuary);
      let time=400;
      if(this.recommentList.length===0)time=0;
       setTimeout(() => {
        this.recommentList=this.recommentList.concat(res.data.data.records);
        this.pageQuary.page+=1;
        this.total=res.data.data.total;
        this.loading = false
      }, time)
    },
    init(){
      this.$requst.commentHttp.cleanPageData(this);
    },
    query(){
      this.$requst.commentHttp.setPageData(this);
    },
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
</style>
