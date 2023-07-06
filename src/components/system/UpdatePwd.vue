<template>
  <div class="out-div">
    <b>修改密码</b><br>
    <div class="edit-form">
        <el-form label-position="left" label-width="100px" :model="userInfo" :rules="rules" ref="ruleForm" title="修改密码">
            <el-form-item label="手机号 :" class="user-item" prop="userPhone">
                <el-input v-model="userInfo.userPhone" placeholder="请输入手机号" clearable></el-input>
            </el-form-item>
            <el-form-item label="旧密码 :" class="user-item" prop="oldPass">
                <el-input v-model="userInfo.oldPass" placeholder="请输入旧密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="新密码 :" class="user-item" prop="userPass">
                <el-input v-model="userInfo.userPass" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认新密码 :" class="user-item" prop="confirmPass">
                <el-input v-model="userInfo.confirmPass" placeholder="确认密码" clearable></el-input>
            </el-form-item>
        </el-form>
    </div>
     <el-button type="primary" @click="updatePass">确定</el-button>
     <el-button @click="resetForm">重置</el-button>
  </div>
</template>

<script>
export default {
  name: 'updatePwd',
  data() {
    //自定义表单验证规则对象
    var validatePass1=(rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value === this.userInfo.oldPass) {
        callback(new Error('新密码不能与旧密码相同'));
      } else {
        callback();
      }
    }
    var validatePass2=(rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userInfo.userPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      userInfo:{
        userPass:'',
        userPhone:'',
        oldPass:'',
        confirmPass:'',
      },
      //表单验证规则
      rules:{
        userPhone:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {min:1,max:11,message:'手机号在1-11位之间',trigger:'blur'}
        ],
        oldPass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        userPass: [
          { required: true, validator: validatePass1, trigger: 'blur' }
        ],
        confirmPass: [
          { required: true,validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  mounted(){
    this.updatePass = this.debounce(this.updatePass,500)
  },
  methods:{
    // 简单的防抖
    debounce(func,wait){
      let timer
      return function(){
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this,arguments)
        }, wait)
      }
    },
    // 重置表单
    resetForm() {
      this.userInfo={
        userPass:'',
        userPhone:'',
        oldPass:'',
        confirmPass:''
      }
    },
    //修改密码
    updatePass(){
      console.log('0.5s后提交了修改密码')
      this.$refs['ruleForm'].validate(async (valid) => {
        if(valid){
          //修改之前判断旧密码是否正确
          await this.$http.get('/api/user/login/?userPhone='+ this.userInfo.userPhone + '&userPass=' + this.userInfo.oldPass).then(res => {
            //旧密码正确
            if(res.data.success){
              this.$http({url:'/api/user/updatePass',method:'POST',data:{'userPhone':this.userInfo.userPhone,'userPass':this.userInfo.userPass}}).then(res => {
              if(res.data.success){
                this.$message.success('修改密码成功')
                this.userInfo={
                  userPass:'',
                  userPhone:'',
                  oldPass:'',
                  confirmPass:''
                }
              }else{
                this.$message.error('修改密码失败，请检查手机号是否正确')
              }
            })
            }else{
              this.$message.error('密码或手机号错误，请重试')
            }
          })
        }else{
          return false
        }
      })
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
    border-bottom: 5px solid rgb(71, 140, 220);
}
.el-form {
    float: left;
    padding-top: 30px;
}
</style>