<template>
  <el-image v-if="photo!=null"
      :src="getImage()"
  ></el-image>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "getavatarbyUserId",
  props:["userId"],
  data(){
    return{
      photo:null
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    getImage(){
      return this.$requst.commentHttp.getImage(this.photo);
    },
    async init(){
      let res=await this.$requst.commentHttp.getUserInfoById(this.userId)
      this.photo=res.data.data.userAvatar;
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
