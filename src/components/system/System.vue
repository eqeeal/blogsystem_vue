<template>
  <div style="display:flex">
    <div class="edit-form">
      <h3>站点信息</h3>
      <el-form 
        :label-position="labelPosition"
        label-width="10px"
        :model="formzhandian">
        <el-form-item label="站点名称" class="item">
          <el-input v-model="formzhandian.sitename"  style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="站点描述" class="item">
          <el-input v-model="formzhandian.themeColor " style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="站点logo" class="item">
          <el-input v-model="formzhandian.icourl" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="favicon.ico" class="item">
          <el-input v-model="formzhandian.logourl"  style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <el-button  @click="updateZhandian()" type="danger" round  style=" margin-left: 180px">确认修改</el-button>
    </div>



    <div class="edit-form" >
      <h3>个人信息</h3>
      <el-form 
        :label-position="labelPosition"
        label-width="10px"
        :model="formgeren">
        <el-form-item label="个人头像" class="item">
          <el-input v-model="formgeren.userAvatar" style="width:300px" ></el-input>
        </el-form-item>
        <el-form-item label="个人名称" class="item">
          <el-input v-model="formgeren.userName" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="个人邮箱" class="item">
          <el-input v-model="formgeren.userEmail" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="updateUser()" type="danger" round  style=" margin-left: 180px">确认修改</el-button>
    </div>




    <div class="edit-form">
      <h3>底部设置</h3>
      <el-form 
        :label-position="labelPosition"
        label-width="10px"
        :model="formdibu">
        <el-form-item label="底部About" class="item">
          <el-input v-model="formdibu.about" style="width:270px" ></el-input>
        </el-form-item>
        <el-form-item label="底部备案号" class="item">
          <el-input v-model="formdibu.beian" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="底部Copy Right" class="item">
          <el-input v-model="formdibu.right" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="底部Powered By" class="item">
          <el-input v-model="formdibu.powerby" style="width:270px"></el-input>
        </el-form-item>
        <el-form-item label="底部Powered By URL" class="item">
          <el-input v-model="formdibu.powerbyurl" style="width:270px"></el-input>
        </el-form-item>
      </el-form>
      <!-- <el-button type="danger" round style=" margin-left: 150px">确认修改</el-button> -->
    </div>
  </div>
</template>

<script>
import $UserHttp from "@/http/index";

// import axios from 'axios';
export default {
    data() {
    return {
      labelPosition: "top",
      formzhandian: {},
      formgeren: {},
      formdibu: {
        about:"your personal blog. have fun.",
        beian:"浙ICP备17008806号-3",
        right:"2019十三",
        powerby:"https://github.com/ZHENFENG13",
        powerbyurl:"https://github.com/ZHENFENG13"
      },
      id:1,
    };
  },
  created(){
    this.getSystemById()
    this.getUserByPhone()
  },
  methods:{
    async getSystemById(){
        let userId=localStorage.getItem("userId");//获取会话里面存储的
      // console.log(userId)
     let res = await $UserHttp.systemHttp.getSystemById(userId);
      console.log(res)
      this.formzhandian=res.data.data[0]
      
      // var th=this;
      // axios({
      //     url:"http://localhost:8081/system/byId",
      //     method:"POST",
      //     params:{
      //       id:this.id
      //     }
      // }).then(function(res){
      //     console.log(res.data.data)
      //     th.formzhandian=res.data.data[0]
      // })
   },
   async getUserByPhone(){
    let phone=localStorage.getItem("LoginUser");//获取会话里面存储的手机号码
     let res = await $UserHttp.userHttp.getUserByPhone(phone);
      console.log(res)
      this.formgeren=res.data.data[0]
   },
   async updateZhandian(){
    let res = await $UserHttp.systemHttp.updateSystem(this.formzhandian);
     console.log(res)
     if (res.data.message == "更新成功") {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        this.showUpdateBox = false;
        //修改成功，重置form对象，方便其他用户进行更新
        this.form = {};
        this.imageUrl = ""; //重置上传组件显示的图片
      } else {
        this.$message({
          message: res.data.message,
          type: "error",
        });
      }
   },

  async updateUser(){
     let res = await $UserHttp.userHttp.updateUser(this.formgeren);
     console.log(res)
     if (res.data.message == "更新成功") {
        this.$message({
          message: res.data.message,
          type: "success",
        });
        this.showUpdateBox = false;
        //修改成功，重置form对象，方便其他用户进行更新
        this.form = {};
        this.imageUrl = ""; //重置上传组件显示的图片
      } else {
        this.$message({
          message: res.data.message,
          type: "error",
        });
      }
  }
  },

};
</script>

<style>
.item .el-form-item__label{
    width: 200px;
    float: left;
    margin-left: 0px;
}
.edit-form {
  box-shadow: 0 0 30px #ccc;
  border-top: 5px solid rgb(71, 140, 220);
  border: 5px solid rgb(red, green, blue);
  width: 350px;
}

</style>