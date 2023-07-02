<template>
  <div class="main">
    <div><userinfotopshow :name="item.name" :avatar="item.photo"></userinfotopshow></div>
      <div style="padding-left: 10%" >{{item.content}}</div>
      <div style="padding-top: 10px"><font color="gray" size="3"> {{item.createTime}}&nbsp;&nbsp;&nbsp;&nbsp;</font></div>
  </div>
</template>

<script>
import Userinfotopshow from "@/components/comment/commentVue/userinfotopshow.vue";

export default {
  name: "commentItem",
  components: {Userinfotopshow},
  props:["item"]
}
</script>

<style scoped>
.main{
  padding-left: 10%;
}
</style>
