<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :class="iSCollapse ? 'isCollapse' : 'notCollapse' ">
    <!-- 侧边栏菜单区域 -->
    <!-- 站点信息 -->
    <div class="head-left" :width="iSCollapse ? '68px' : '189px'">
      <img src="../assets/imgs/user1.png" class="avatar">&nbsp&nbsp
      <span v-show="!iSCollapse">my bolg</span>
    </div>
    <!-- 博主名 -->
    <div class="head-left">
      <img src="../assets/imgs/user1.png" class="avatar">&nbsp&nbsp
      <span v-show="!iSCollapse">张三</span>
    </div>
    <!-- 菜单 -->
    <el-menu active-text-color="#3F9FFE" default-active='1-1' :collapse="iSCollapse">
      <div class="menu-title" v-show="!iSCollapse">Dashborder</div>
      <el-menu-item class="item" index="1-1">
        <i class="el-icon-s-platform" ></i>
        <span slot="title">
          <router-link to="/dashbord">Dashbord</router-link>
        </span>
      </el-menu-item>
      <el-menu-item class="item" index="1-2"> 
        <i class="el-icon-edit-outline"></i>
        <span slot="title">
          <router-link to="/addBlog">发布博客</router-link>
        </span>
      </el-menu-item>
      <div class="menu-title" v-show="!iSCollapse">管理模块</div>
      <el-menu-item class="item" index="2-1">
        <i class="el-icon-s-order" ></i>  
        <span slot="title">
          <router-link to="/blog">博客管理</router-link>
        </span>
      </el-menu-item>
      <el-menu-item class="item" index="2-2"> 
        <i class="el-icon-chat-dot-square"></i>
        <span slot="title">
          <router-link to="/comment">评论管理</router-link>
        </span>
      </el-menu-item>
      <el-menu-item class="item" index="2-3"> 
        <i class="el-icon-s-management"></i>
        <span slot="title" route>
          <router-link to="/category">分类管理</router-link>
        </span>
      </el-menu-item>
      <el-menu-item class="item" index="2-4"> 
        <i class="el-icon-discount"></i>
        <span slot="title">
          <router-link to="/tag">标签管理</router-link>
        </span>
      </el-menu-item>
      <el-menu-item class="item" index="2-5"> 
        <i class="el-icon-s-promotion"></i>
        <span slot="title">
          <router-link to="/link">友情链接</router-link>
        </span>
      </el-menu-item>
      <div class="menu-title" v-show="!iSCollapse">系统管理</div>
      <el-menu-item class="item" index="3-1">
        <i class="el-icon-s-tools" ></i>
        <span slot="title">
          <router-link to="/system">系统配置</router-link>
        </span>
      </el-menu-item>
      <el-menu-item class="item" index="3-2"> 
        <i class="el-icon-key"></i>
        <span slot="title">
          <router-link to="/updatePwd">修改密码</router-link>
        </span>
      </el-menu-item>
      <el-menu-item class="item" index="3-3"> 
        <i class="el-icon-right"></i>
        <span slot="title" @click="logOut()">安全退出</span>
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
          <i class="el-icon-s-promotion dashbord" style="font-size:25px"></i><div @click="goToDoor()">博客首页</div>
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
import $api from '@/api'
export default {
    data(){
        return {
          // 是否折叠菜单
          iSCollapse: false,
          
        }
    },
    methods:{
      goToDoor(){
         $api.blog.getUserId().then(res=>{
         localStorage.setItem("userId",res.data.data)
         this.$router.push("Door");
      }),
      //退出登录
      logOut()
      {
        this.$confirm('此操作将删除本地登录用户信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.localStorage.removeItem('LoginUser')
            this.$router.push('/login')
            this.$message.success('退出登录成功！')
          }).catch(()=>{
            this.$message.info('已取消')
          })
      }
    }
    }
}
</script>

<style scoped>
/* 取消router-link的默认样式 */
.router-link-active {
  text-decoration: none;
  color: white;
}
a {
  text-decoration: none;
  color: #c3c8d1;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 30px;
}
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
  padding: 10px;
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
  height: 40px;
}
.el-menu-item.is-active {
  color:white !important;
  background-color: #007bff !important;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
}
.head-left {
  padding: 10px 0;
  margin: 5px 0;
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
  margin-right: 30px;
}
.menu-title {
  background-color: #343a40;
  display: flex;
  justify-content: flex-start;
  color: #a8a8a6;
  padding-top: 25px;
  padding-left: 5px;
  font-size: 15px;
  padding-bottom: 10px;
}
</style>