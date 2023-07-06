<template>
  <div>
    <el-row class="header">
      <el-col>
        <DoorHeader></DoorHeader>
      </el-col>
    </el-row>
    <el-row class="main">
      <el-col :span="17"> 
        <DoorMain></DoorMain>
        </el-col>
      <el-col :span="6">
        <DoorSide></DoorSide>
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
import DoorHeader from "@/components/door/DoorHeader";
import DoorSide from "@/components/door/DoorSide";
import DoorMain from "@/components/door/DoorMain"

export default {
  components: {
    DoorHeader,
    DoorSide,
    DoorMain
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