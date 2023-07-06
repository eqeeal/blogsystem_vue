<template>
  <div>
    <div class="c">
      <el-checkbox
        v-model="chooseAll"
        style="margin-left: 40px"
        @change="chooseAllChange"
        >全选</el-checkbox
      >
      <el-button style="margin-right: 630px" @click="delUsers"
        >批量删除</el-button
      >
    </div>
    <div class="b">
      <el-input
        style="width: 200px"
        placeholder="请输入关键字搜索"
        prefix-icon="el-icon-search"
        v-model="keyWords"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchList()"
        >搜索</el-button
      >
      <el-button type="primary" @click="addDialog = true">添加</el-button>
    </div>
    <el-table :data="pageData" border style="width: 100%">
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
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 对话框 -->
    <el-dialog title="修改用户" :visible.sync="showUpdateBox">
      <el-form :model="form">
        <el-form-item label="上传分类头像" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          name="file"
          action="http://124.70.54.24:3001/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.userAvatar" :src="form.userAvatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称" :label-width="200">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="200">
          <el-input v-model="form.userEmail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancellAdd1()">取 消</el-button>
        <el-button type="primary" @click="sendUpdate">确认修改</el-button>
      </div>
    </el-dialog>

    <!-- 添加新分类弹框 -->
    <el-dialog title="添加用户" :visible.sync="addDialog">
      <el-form :model="newUser">
        <el-upload
          class="avatar-uploader"
          name="file"
          action="http://124.70.54.24:3001/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="newUser.userAvatar" :src="newUser.userAvatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="用户昵称" :label-width="200">
          <el-input v-model="newUser.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户号码" :label-width="200">
          <el-input v-model="newUser.userPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="200">
          <el-input v-model="newUser.userPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancellAdd">取消</el-button>
        <el-button type="primary" @click="addCate()">确认添加</el-button>
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
    pageData: {
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
        this.chooseAll = this.pageData.every((user) => user.isChoose == true);
        // console.log(this.chooseAll);
      },
      deep: true,
    },
  },
  methods: {
    // 取消新增按钮
    cancellAdd() {
      this.addDialog = false;
      this.newUser.userAvatar = "";
      this.newUser.userName = "";
      this.newUser.userPass = "";
      this.newUser.userPhone = "";
    },
        cancellAdd1() {
      this.showUpdateBox = false;
      this.form={}
    },
    //添加用户
    async addCate() {
      let res = await $UserHttp.userHttp.add(this.newUser);
      console.log(res.data.data)
      console.log(res.data.success)
      if (res.data.data !=null) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
        this.addDialog = false;
        //修改成功，重置form对象，方便其他用户进行更新
        this.newUser = {};
        this.getALLUsers;
      } else {
        this.$message({
          message: "号码已被注册",
          type: "error",
        });
      }
    },
    //模糊查询
    async searchList() {
      let res = await $UserHttp.userHttp.page(
        this.keyWords,
        this.currentpage,
        this.pagesize
      );
      console.log(res.data.message);
      this.pageData = res.data.data.list;
      if (res.data.message === "查询成功") {
        this.$message({
          message: "查询成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "查询失败",
          type: "error",
        });
      }
    },
    async getpageInfo() {
      let res = await $UserHttp.userHttp.page1(this.currentpage, this.pagesize);
      // console.log(res.data.data.records)

      console.log(this.pageData);
      res.data.data.records.forEach((user) => {
        //添加属性
        user.isChoose = false;
      });
      this.pageData = res.data.data.records;
    },
    handleSizeChange(size) {
      //修改当前每页的数据行数
      this.pagesize = size;
      //数据重新分页
      this.getALLUsers();
    },
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.getALLUsers();
    },
    //全选改变
    chooseAllChange() {
      //将每个数据的isChoose改变
      this.pageData.forEach((user) => {
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
      console.log(res.data);
      // res.data.data.forEach((user) => {
      //   //添加属性
      //   user.isChoose = false;
      // });
      this.tableData = res.data.data;
      this.total = res.data.data.length;
      this.getpageInfo();
      // console.log(this.tableData);
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
      let toDelUsers = this.pageData.filter((user) => user.isChoose == true);
      //获取由被勾选用户数据构成的id的数组
      let ids = toDelUsers.map((user) => user.id);
      console.log(ids);
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
        this.getAllUsers();
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
        console.log()
      }
    },
        //添加图片成功时执行的函数
    handleAvatarSuccess1(res) {
      console.log("上传请求返回的数据", res);
      if (res.code == 200) {
        //成功
        this.imageUrl = res.data;
        //赋给添加用户
        this.newUser.userAvatar = res.data;
        console.log(this.newUser.userAvatar)
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
      newUser: {}, //新增的对象
      imageUrl: "",
      showUpdateBox: false,
      tableData: [], //所有数据
      pageData: [], //分页数据
      chooseAll: false, //表示是否全选
      form: {}, //表示修改的对象
      total: 0, //总数据条数
      currentpage: 1, //当前所在页默认是第一页
      pagesize: 5, //每页显示多少行数据 默认设置为5
      keyWords: "",
      addDialog: false,
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
.block {
  margin-top: 2%;
  margin-left: 20%;
  width: 50%;
}
.b {
  height: 10px;
  margin-bottom: 5%;
  margin-left: 50%;
}
.c {
  height: 2px;
  margin-right: 250px;
}
</style>