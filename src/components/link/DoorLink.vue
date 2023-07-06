<template>
    <div>
        <div class="header">
        <div class="container">
        <div>
            <div class="user">Personal blog</div>
            <div class="links">Links<br>友情链接</div>
            <div class="link">
            <router-link class="li" to="/">主页</router-link>
            <router-link class="li" to="/links">友链</router-link>
            <router-link class="li" to="/about">关于</router-link>
            <a href="https://github.com" target="_blank" class="li" to="/about">github</a>
            </div>
        </div>
        </div>
    </div>
    <div class="linkss">Links<br>链接</div>
    <div class="bottom-links">
        <el-link href="https://www.baidu.com/" type="primary">百度</el-link>-百度一下，你就知道<br>
        <el-link href="https://www.bilibili.com/" type="primary">bilibili</el-link>-哔哩哔哩 (゜-゜)つロ 干杯<br>
        <el-link href="https://www.qq.com/" type="primary">腾讯网</el-link>-Tencent<br>
        <el-link href="https://m.weibo.cn/" type="primary">微博</el-link>-点一下，发现新世界<br>
    </div>
    </div>
</template>

<script>
export default {
data(){
    return {
        linksList:[{'LinkUrl':'baidu.com','linkName':'百度'},{'LinkUrl':'baidu.com','linkName':'百度'}]
    }
},
mounted(){
    this.getAllLinks()
},
methods:{
    //获取所有链接信息
    getAllLinks(){

    }
}
}
</script>

<style scoped>
.header {
height: 400px;
  background-image: url(../../assets/imgs/12.jpg);
}
.container {
  color: rgb(240, 248, 255, 0.4);
  background-color: rgb(240, 248, 255, 0.3);
  height: 60px;
  line-height: 70px;
  font-size: 20px;
  /* display: inline-block; */
}
.li {
  display: inline-block;
  margin-left: 30px;
}
.li:hover{
  color: pink;
}
ul {
  position: absolute;
  right: 5vw;
  text-align: right;
}
.user,
.link {
    color: aqua;
  display: inline-block;
}
.link {
  position: absolute;
  right: 30px;
  cursor: pointer;
}
.desc{
 text-align: center;
 margin-top: 150px;
 font-size: 30px;
 color: rgba(240, 248, 255,0.7);
}
.links {
    position: absolute;
    top: 200px;
    left: 100px;
    color: aqua;
    font-size: 40px;
}
.bottom-links {
    position: absolute;
    top:550px;
    left:100px;
    line-height: 17px;
}
.linkss {
    position: absolute;
    top: 400px;
    left: 100px;
    color:black;
    font-size: 40px;
}
</style>