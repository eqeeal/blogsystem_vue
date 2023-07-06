<template>
<div style="background-color: rgba(216,219,226,0.56)">
  <div v-if="admin">
    <div style="overflow: hidden">
      <div class="infinite-list-wrapper">
        <ul
            class="tableWrap scrollStyle" infinite-scroll-distance="0"
            v-infinite-scroll="load"
            :infinite-scroll-disabled="disabled">
          <div v-for="item in list" class="list-item">
            <re-comment-item :admin="admin" @post="init" :comment="comment" :item="item"></re-comment-item>
          </div>
        </ul>
        <div style="text-align: center">
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="admin===false" style="padding-left: 10px;padding-top: 10px">
    <div v-for="item in list">
      <re-comment-item @po="post" :admin="admin" @post="init" :comment="comment" :item="item"></re-comment-item>
    </div>
    <el-row>
      <el-col :span="4"><el-button @click="load" type="text">加载更多</el-button></el-col>
      <el-col :span="4"><el-button @click="closcli" type="text">关闭展开</el-button></el-col>
    </el-row>

<!--    <div class="infinite-list-wrapper">-->
<!--      <ul-->
<!--          class="tableWrap scrollStyle" infinite-scroll-distance="0"-->
<!--          v-infinite-scroll="load"-->
<!--          :infinite-scroll-disabled="disabled">-->
<!--        <div v-for="item in list" class="list-item">-->

<!--        </div>-->
<!--      </ul>-->
<!--      <div style="text-align: center">-->
<!--        <p v-if="loading">加载中...</p>-->
<!--        <p v-if="noMore">没有更多了</p>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</div>
</template>

<script>
import ReCommentItem from "@/components/comment/commentVue/reCommentItem.vue";

export default {
  name: "reCommentlist",
  components: {ReCommentItem},
  props:["comment","total","admin","f2","rc"],
  data(){
    return{
      loading: false,
      list:[],
      page:1,
      pageSize:5,
      cout:0
    }
  },
  mounted() {
    if(this.admin===false){
      this.load();
    }
  },
  watch:{
    total(){
      this.init();
    }
  },
  computed: {
    noMore () {
      return this.list.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods:{
    post(row){
      this.$emit("post",row);
    },
    closcli(){
      this.$emit("clo")
    },
    init(){
      this.list=[];
      this.page=1;
      this.load()
    },
    async load(){
        this.loading = true
        let res=await this.$requst.commentHttp.getRecommentPage({page:this.page,pageSize:this.pageSize,commentId:this.comment.id})
      if(res.data.data.records.length===0)this.$message.info("没有更多啦")
      let time=200;
        if(this.list.length===0){
          time=0;
        }
      setTimeout(() => {
            this.list=this.list.concat(res.data.data.records);
            this.total=res.data.data.total;
            this.page+=1;
          this.loading = false
        }, time)

    }
  }
}
</script>

<style scoped>

</style>
