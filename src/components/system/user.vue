<template>
  <div>
    <el-checkbox v-model="chooseAll" @change="chooseAllChange"
      >全选</el-checkbox
    >
    <el-button style="margin-left: 40px" @click="delUsers">批量删除</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="选择" width="150">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isChoose"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column fixed prop="id" label="编号" width="150">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="userPhone" label="手机号" width="120">
      </el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="120">
      </el-table-column>
      <el-table-column prop="userAvatar" label="头像" width="300">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <img :src="scope.row.userAvatar" min-width="70" height="70" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="update(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button @click="delUser(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog title="修改用户" :visible.sync="showUpdateBox">
      <el-form :model="form">
        <el-upload
          class="avatar-uploader"
          name="file"
          action="http://124.70.54.24:3001/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="用户昵称" :label-width="200">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="200">
          <el-input v-model="form.userEmail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showUpdateBox = false">取 消</el-button>
        <el-button type="primary" @click="sendUpdate">确认修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import $UserHttp from "@/http/index";

export default {
  created() {
    this.getALLUsers();
    // console.log(this.tableData);
  },
  watch: {
    // //普通监听
    // tableData(){
    //     //当tableData对象发生变化时就会执行这里的代码
    // },
    //深度监听（当监听的对象里面的属性发生变化）
    tableData: {
      handler() {
        //必须每个数据isChoose都为true，那么全选才会true
        //  let result = true;//假设是全选
        //  this.tableData.forEach(user=>{
        //   if(user.isChoose==false){
        //     result = false;
        //   }
        //  })
        //  this.chooseAll = result;
        //  console.log(this.chooseAll);
        this.chooseAll = this.tableData.every((user) => user.isChoose == true);
        console.log(this.chooseAll);
      },
      deep: true,
    },
  },
  methods: {
    //全选改变
    chooseAllChange() {
      //将每个数据的isChoose改变
      this.tableData.forEach((user) => {
        user.isChoose = this.chooseAll;
      });
    },
    delUsers() {
      let toDelUsers = this.tableData.filter((user) => user.isChoose == true);
      console.log(toDelUsers);
    },
    handleClick(row) {
      console.log(row);
    },
    async delUser(obj) {
      //   console.log('删除',obj);
      let res = await $UserHttp.userHttp.delUser(obj);
      //   console.log('删除结果',res);
      if (res.data.message == "删除成功") {
        //element提供的弹窗api
        this.$message({
          message: "删除成功",
          type: "success",
        });
        //重新获取数据
        this.getALLUsers();
      }
    },
    async getALLUsers() {
      let res = await $UserHttp.userHttp.getall();
      // this.tableData = res.data.data;
      console.log(res.data)
      res.data.data.forEach((user) => {
        //添加属性
        user.isChoose = false;
      });
      this.tableData = res.data.data;
      //    axios({
      //     url:"http://localhost:8081/user/findAll",
      //     method:"Get",
      //     success:function(res){
      //         console.log(res)
      //         this.tableData=res.data;
      //         alert(JSON.stringify(tableData))
      //     }
      // })
    },
    async delUsers() {
      //筛选被勾选的数据
      let toDelUsers = this.tableData.filter((user) => user.isChoose == true);
      //获取由被勾选用户数据构成的id的数组
      let ids = toDelUsers.map((user) => user.id);
      //批量删除
      let result = await $UserHttp.userHttp.delUsers({
        // ids:ids
        ids,
      });
      console.log(result);
      if (result.data.data > 0) {
        this.$message({
          message: "批量删除成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "批量删除失败",
          type: "error",
        });
      }
      //重新获取数据并渲染
      this.getAllUsers();
    },
    //点击修改按钮，弹出修改框，并显示函数
    update(user) {
      console.log(user);
      this.showUpdateBox = true;
      this.form = user;
    },
    async sendUpdate() {
      //确认修改
      let res = await $UserHttp.userHttp.updateUser(this.form);
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
    //上传图片成功时执行的函数
    handleAvatarSuccess(res) {
      console.log("上传请求返回的数据", res);
      if (res.code == 200) {
        //成功
        this.imageUrl = res.data;
        //赋给修改用户
        this.form.userAvatar = res.data;
      }
    },
    beforeAvatarUpload(file) {
      console.log("上传之前", file);
      //判断大小和类型是否符合条件,最多5m的大小限制，并且只能是png、jpg、jpeg、gif、webp等格式
      //使用正则表达式来判断数据是否符合指定条件
      if (!/(png|jpg|jpeg|gif|webp)$/.test(file.type)) {
        this.$message({
          message: "只能上传png、jpg、jpeg、gif、webp格式的图片",
          type: "error",
        });
        return false;
      }
      if (file.size > 1024 * 1024 * 2) {
        this.$message({
          message: "只能上传大小小于2mb的图片",
          type: "error",
        });
        return false;
      }
      return true; //允许上传
    },
  },

  data() {
    return {
      imageUrl: "",
      showUpdateBox: false,
      tableData: [],
      chooseAll: false, //表示是否全选
      form: {}, //表示修改的对象
    };
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>