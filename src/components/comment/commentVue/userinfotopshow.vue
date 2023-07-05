<template>
  <div>
  <el-row style="margin-bottom: 10px">
    <el-col :span="5">
      <getavatarbyUserId :userId="userId"></getavatarbyUserId>
    </el-col>
    <el-col style="padding-left: 3%" :span="8">
      <el-row>
        <font size="3" >{{name}}</font>
      </el-row>
    </el-col>
  </el-row>
  </div>
</template>

<script>



import GetavatarbyUserId from "@/components/comment/commentVue/getavatarbyUserId.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "userinfotopshow",
  components: {GetavatarbyUserId},
  props:["userId","name"],
  mounted() {
  }
}
</script>

<style scoped>
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #000000;
  margin-right: 20px;
}
</style>
