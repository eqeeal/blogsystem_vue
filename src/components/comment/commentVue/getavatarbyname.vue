<template>
  <el-image
      :src="getImage(name)"
  ></el-image>
</template>

<script>

import {getImage} from "@/components/comment/js/commentJs";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "getavatarbyname",
  props:["name"],
  mounted() {

  },
  methods:{
    getImage,
    func(){
      console.log("ok");
    },

  }

}
</script>

<style scoped>
.el-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #000000;
  margin-right: 20px;
}
</style>
