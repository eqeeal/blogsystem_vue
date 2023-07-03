<template>
  <div class="out-div">
    <b>修改密码</b><br>
    <div class="edit-form">
        <el-form label-position="left" label-width="100px" :model="userInfo" :rules="rules" ref="ruleForm" title="修改密码">
            <el-form-item label="手机号 :" class="user-item" prop="userphone">
                <el-input v-model="userInfo.userphone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码 :" class="user-item" prop="userpass">
                <el-input v-model="userInfo.userpass" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码 :" class="user-item" prop="confirmPass">
                <el-input v-model="confirmPass" placeholder="确认密码"></el-input>
            </el-form-item>
        </el-form>
    </div>
     <el-button type="primary" @click="">确定</el-button>
     <el-button @click="resetForm">重置</el-button>
  </div>
</template>

<script>
export default {
  name: 'updatePwd',
  data() {
    return {
      userInfo:{
        userpass:'',
        userphone:'',
      },
      confirmPass:'',
      //表单验证规则
      rules:{
        userphone:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {min:1,max:11,message:'手机号在1-11位之间',trigger:'blur'}
        ],
        userpass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        confirmPass: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    // 重置表单
    resetForm() {
      this.userInfo.userphone=''
      this.userInfo.userpass=''
      this.confirmPass=''
    }
  }
}
</script>

<style scoped>
.out-div {
  background-color: white;
  padding: 10px 10px 30px 10px;
  border: 1px solid white;
  border-radius: 5px;
}
.edit-form {
    box-shadow: 0 0 10px #ccc;
    background-color: white;
    width: 450px;
    height: 300px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    border-top: 5px solid rgb(71, 140, 220);
}
.el-form {
    float: left;
    padding-top: 30px;
}
</style>