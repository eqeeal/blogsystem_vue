<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="博客预览" name="first">
        <BlogWorkShell :blogListInfo="blogListInfo" @cli="cli" @emit="blogS"></BlogWorkShell>
      </el-tab-pane>
      <el-tab-pane label="评论操作间" name="second"><CommentWorkShell :blogId="blog" :blogList="blogListInfo"></CommentWorkShell></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommentWorkShell from "@/components/comment/CommentWorkShell.vue";
import BlogWorkShell from "@/components/comment/BlogWorkShell.vue";
import {getBlog, getBlogNonCount} from "@/components/comment/api/comment";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Comment",
  components: {BlogWorkShell, CommentWorkShell},
  data(){
    return{
      activeName:"first",
      blog: null,
      blogListInfo: {
      },
      p:1,
      s:5
    }
  },
  watch:{
    activeName(){
      if(this.activeName==='first'){
        getBlog(this.p,this.s).then(re=>{
          this.blogListInfo=re.data.data;
        })
      }
    }
  },
  created() {
    getBlog(1,5).then(re=>{
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
      getBlog(page,pageSize).then(re=>{
        this.blogListInfo=re.data.data;
      })
    },
    cli(id){
      this.blog=id;
      this.activeName="second"
    }
  }
}
</script>

<style scoped>

</style>
