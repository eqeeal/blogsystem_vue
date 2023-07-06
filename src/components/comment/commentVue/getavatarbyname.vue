<template>
  <el-image
      :src="getImage(name)"
  ></el-image>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "getavatarbyname",
  props:["name"],
  mounted() {

  },
  methods:{
    getImage(name){
      return this.$requst.commentHttp.getImage(name)
    }
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
