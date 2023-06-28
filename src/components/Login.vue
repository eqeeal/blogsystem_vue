<template>
  <div class="out-div">
    <h1 class="title">personal blog</h1>
        <div class="content-box">
            <div class="login">Login</div>
            <div class="user-item">
                手机号：<br>
                <el-input placeholder="请输入手机号"  v-model="userInfo.userphone"></el-input>
            </div>
            <div class="user-item">
                密码：<br>
                <el-input placeholder="请输入密码"  v-model="userInfo.userpass"></el-input>
            </div>
            <div class="user-item">
                验证码：<br>
                <el-input placeholder="请输入验证码" class="code" v-model="inputcode"></el-input>
                <canvas id="canvas1" width="100" height="40"></canvas>
            </div>
            <button class="btn" @click="login">登录</button>
            <button class="btn" @click="regist">注册</button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      codeText: '',
      inputcode:'',
      userInfo:{
        username:'NewUser',
        userpass:'',
        userphone:'',
      }
      
    }
  },
  mounted() {
    this.codeText = this.randomCode("canvas1", 4)
    console.log(this.codeText)
    document.getElementById('canvas1').onclick = () => {
      this.codeText = this.randomCode("canvas1", 4)
      console.log(this.codeText)
    }
  },
  methods: {
    // 用户登录函数
    login(){
      if(this.inputcode.toUpperCase()===this.codeText.toUpperCase()){
        this.$http.get('/api/login/?userphone='+ this.userInfo.userphone + '&userpass=' + this.userInfo.userpass).then(res=>{
          this.$message({
              message: '登录成功',
              type: 'success'
          })
          //登录成功，页面跳转到首页
          this.$router.push('/home')
        })
      } else {
        this.$message({
              message: '验证码错误',
              type: 'error'
          })
        this.codeText = this.randomCode("canvas1", 4)
        this.inputcode = ''
      }
    },
    // 用户注册函数
    regist() {
      if(this.inputcode.toUpperCase()===this.codeText.toUpperCase()){
        this.$http({method:'post',url:'/api/user/add',data:this.userInfo}).then(res=>{
          console.log(res)
          this.$message({
              message: '注册成功',
              type: 'success'
          })
          this.codeText = this.randomCode("canvas1", 4)
          this.userphone = ''
          this.userpass = ''
          this.inputcode = ''
        })
      } else {
        this.$message({
              message: '验证码错误',
              type: 'error'
          })
      }
    },
    randomCode(canvasId, letterLength) {
      //1. 获取画布
      var canvas = document.getElementById(canvasId)
      //2. 获取画笔
      var ctx = canvas.getContext('2d')
      //文本
      var text = this.randomLetter(letterLength)
      // ctx.fillStyle = randomColor();
      ctx.fillStyle = '#FFFFFF'
      //填充背景色
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.textBaseline = "top"
      //随机效果：每个字符都是随机的位置和随机的旋转角度
      for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i)//获取对应下标的字符
        ctx.fillStyle = this.randomColor()
        ctx.font = "20px 微软雅黑"
        ctx.save()//保存画笔的状态
        var randomAngle = Math.random() * 20 - 10//随机-10 ~ 10度
        ctx.rotate(Math.PI / 180 * randomAngle)
        //位置：高度有个-5~15的范围
        ctx.fillText(char, i * 25, Math.random() * 20 - 5)
        ctx.restore()
      }
      return text
    },
    //随机字母或数字
    randomLetter(num) {
      var arr = "QWERTYUIOASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890".split("")
      var str = ""
      for (var i = 0; i < num; i++) {
        var index = parseInt(Math.random() * arr.length)
        str += arr[index]
      }
      return str
    },
    //随机rgb颜色
    randomColor() {
      var red = parseInt(Math.random() * 256)
      var green = parseInt(Math.random() * 256)
      var blue = parseInt(Math.random() * 256)
      return `rgb(${red},${green},${blue})`
    }
  }
}
</script>

<style scoped>
.el-input {
  margin-top: 15px;
}
.out-div {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: rgba(0, 174, 255, 0.5);
}
.title {
  color: rgb(0, 132, 255);
  display: flex;
  justify-content: center;
}
.content-box {
  width: 400px;
  height: 550px;
  background-color: rgb(255, 255, 255, 0.5);
  background-attachment: fixed;
  margin: 0 auto;
  border-radius: 10px;
  border-color: white;
  padding-top: 1px;
  box-shadow: 3px 3px 10px grey;
}
.login {
  font-size: 25px;
  color: rgb(0, 132, 255);
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.user-item {
  margin: 20px 55px;
}
.code {
  width: 150px !important;
}
#canvas1 {
  position: relative;
  top: 15px;
  float: right;
}
.btn {
  background-color: rgb(0, 136, 255);
  color: white;
  border-style: solid;
  border-color: rgb(0, 136, 255);
  width: 115px;
  height: 50px;
  font-size: 16px;
  border-radius: 4px;
  margin-left: 55px;
}
input {
  border: 0;
  outline: none;
}
input:focus {
  border: 2px solid rgb(0, 132, 255);
}
.btn:hover,.btn:visited {
  border-style: none;
  background-color: rgb(94, 180, 255);
}
</style>