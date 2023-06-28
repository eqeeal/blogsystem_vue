<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :class="iSCollapse ? 'isCollapse' : 'notCollapse' ">
    <!-- 侧边栏菜单区域 -->
    <!-- 站点信息 -->
    <div class="head-left" :width="iSCollapse ? '68px' : '189px'">
      <img src="../assets/logo.png" width="50px" height="50px">&nbsp&nbsp
      <span v-show="!iSCollapse">my bolg</span>
    </div>
    <!-- 博主名称 -->
    <div class="head-left">
      <img src="../assets/logo.png" width="40px" height="40px">&nbsp&nbsp
      <span v-show="!iSCollapse">张三</span>
    </div>
    <el-menu text-color="#000000" active-text-color="#3F9FFE" :unique-opened = "true" default-active='1' :collapse="iSCollapse">
      <!-- 一级菜单 -->
      <div class="menu-title" v-show="!iSCollapse">Dashborder</div>
      <el-menu-item class="item" index="1">
        <i class="el-icon-menu" ></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item class="item" index="2"> 
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item class="item" index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item class="item" index="4">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div @click="iSCollapse=!iSCollapse" class="dashbord">
          <i class="el-icon-s-fold" style="font-size:30px" v-show="!iSCollapse"></i>
          <i class="el-icon-s-unfold" style="font-size:30px" v-show="iSCollapse"></i>
        </div>
        <span class="dashbord">Dashboard</span>
        <div class="head-right">
          <i class="el-icon-s-promotion dashbord" style="font-size:25px"></i>博客首页
          <i class="el-icon-user-solid dashbord" style="font-size:25px"></i>作者
        </div>
      </el-header>
      <!-- 右侧内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data(){
        return {
          // 是否折叠菜单
          iSCollapse: false,
        }
    },
}
</script>

<style scoped>
.el-menu {
  border: 0;
  background-color: #343a40;
}
.el-header {
  padding: 0 0 !important;
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: flex-start;
}
.el-aside {
  background-color: #343a40;
  color: #333;
  text-align: center;
  height: 100vh;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 92vh;
}
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #343a40 !important;
  color: #c3c8d1 !important;
  font-size: 17px;
}
.item:focus {
  color:white !important;
  background-color: #007bff !important;
  border-radius: 10px;
  width: 179px;
  margin: 10px;
}
.head-left {
  padding: 10px 0;
  margin: 0;
  color: white;
  display: flex;  
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(99, 99, 99);
}
.isCollapse {
  width: 68px !important;
  transition: 0.5s;
} 
.notCollapse {
  width: 200px !important;
  transition: 0.5s;
} 
.dashbord {
  margin-left: 30px;
  color:#a8a8a6;
  display: flex;
  align-items: center;
}
.head-right {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
.menu-title {
  background-color: #343a40;
  display: flex;
  justify-content: flex-start;
  color: #a8a8a6;
  padding-top: 25px;
  padding-left: 5px;
  font-size: 15px;
}
</style>