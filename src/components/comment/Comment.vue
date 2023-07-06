<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="博客预览" name="first">
        <BlogWorkShell :blogListInfo="blogListInfo" @cli="cli" @emit="blogS"></BlogWorkShell>
      </el-tab-pane>
      <el-tab-pane label="评论操作间" name="second"><CommentWorkShell :blogId="blog" :blogUserId="blogUser" :blogList="blogListInfo"></CommentWorkShell></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommentWorkShell from "@/components/comment/CommentWorkShell.vue";
import BlogWorkShell from "@/components/comment/BlogWorkShell.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Comment",
  components: {BlogWorkShell, CommentWorkShell},
  data(){
    return{
      activeName:"first",
      blog: null,
      blogUser: 0,
      blogListInfo: {
      },
      p:1,
      s:5
    }
  },
  watch:{
    activeName(){
      if(this.activeName==='first'){
        this.$requst.commentHttp.getBlog(this.p,this.s).then(re=>{
          this.blogListInfo=re.data.data;
        })
      }
    }
  },
  created() {
    this.$requst.commentHttp.getBlog(1,5).then(re=>{
      this.blogListInfo=re.data.data;
    })
  },
  methods:{
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    blogS(page,pageSize){
      this.p=page;
      this.s=pageSize;
      this.$requst.commentHttp.getBlog(page,pageSize).then(re=>{
        this.blogListInfo=re.data.data;
      })
    },
    cli(row){
      this.blog=row.id;
      this.blogUser=row.userId
      this.activeName="second"
    }
  }
}
</script>

<style scoped>

</style>
