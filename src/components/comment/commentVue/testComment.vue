<template>
<div>
  <comment-list :admin="false" :blog-id="blogId" :blog-user-id="userId"></comment-list>
</div>
</template>

<script>
import CommentList from "@/components/comment/commentVue/commentList.vue";

export default {
  name: "testComment",
  components: {CommentList},
  data(){
    return{
      blogId:13,
      userId:1
    }
  }
}
</script>

<style scoped>

</style>
