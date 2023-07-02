<template>
  <div>
  <el-row style="margin-bottom: 10px">
    <el-col :span="2">
      <getavatarbyname  :name="avatar"></getavatarbyname>
    </el-col>
    <el-col style="padding-left: 3%" :span="8">
      <el-row>
        <font size="3" style="position: absolute;top: 50%;transform: translate(-50%,0);">{{name}}</font>
      </el-row>
    </el-col>
  </el-row>
  </div>
</template>

<script>

import Getavatarbyname from "@/components/comment/commentVue/getavatarbyname.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "userinfotopshow",
  components: {Getavatarbyname},
  props:["avatar","name"],
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
