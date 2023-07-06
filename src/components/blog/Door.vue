<template>
  <div>
    <el-row class="header">
      <el-col>
        <Header></Header>
      </el-col>
    </el-row>
    <el-row class="main">
      <el-col :span="17"> 
        <Main></Main>
        </el-col>
      <el-col :span="6">
        <Side></Side>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-row>
        @Cppy Right: 2023-2024 十三
      </el-row>
      <el-row> 
        <a href="http://github.com" target="_blank">Powered By http://github.com</a>
      </el-row>
      <el-row>
        备案号
      </el-row>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/blog/Header";
import Side from "@/components/blog/Side";
import Main from "@/components/blog/Main.vue"

export default {
  components: {
    Header,
    Side,
    Main
  },
  data(){
    return{

    }
  },
  created(){
  },
  methods:{
  }
};
</script>

<style scoped>
.header {
  height: 600px;
}
.footer {
  height: 100px;
  width: 100vw;
  background-color: rgb(197, 212, 221,0.8);
  text-align: center;
  line-height: 30px;
  /* position: fixed;
  bottom: 0; */
}
</style>