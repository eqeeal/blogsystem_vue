<template>
  <div>
    <div class="out-div">
      <!-- 顶部页面标题 -->
      <div class="title">分类管理</div><br>
      <!-- 页面主体内容 -->
      <div class="main-content">
        <div class="left-box">
          <!-- <el-form label-position="top" label-width="80px" :model="userInfo" :rules="rules" ref="ruleForm"> -->
          <b>热门分类前十</b>
          <el-table :data="cateList" stripe style="width: 100%">
            <el-table-column type="index" width="80" label="排行"></el-table-column>
            <el-table-column fixed prop="categoryName" label="分类名称" width="150"></el-table-column>
            <el-table-column fixed prop="hot" label="热度" width="170"> </el-table-column>
          </el-table>  
        </div>
        <div class="right-box">
          <div class="top-operate">
            <el-input v-model="searchInput" clearable placeholder="请输入分类名称" prefix-icon="el-icon-search" class="search-input"></el-input>
            <el-button type="primary" @click="addDialog=true">添加分类</el-button>
          </div>
          <el-table :data="cateList" stripe style="width: 100%" max-height="500">
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column fixed prop="categoryName" label="分类名称" width="130"></el-table-column>
          <el-table-column fixed prop="categoryAvatar" label="头像显示" width="150">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.categoryAvatar" v-if="scope.row.categoryAvatar"/>
              <el-avatar src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" v-if="!scope.row.categoryAvatar"/>
            </template>
          </el-table-column>
          <el-table-column fixed prop="categoryDetail" label="分类介绍" :show-overflow-tooltip="true"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="showUpdate(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="delCate(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="cateList.length">
          </el-pagination>
        </div>
        </div>
      </div>

      <el-dialog title="添加新分类" :visible.async="addDialog" width="30%"  :before-close="handleAddClose">
        <el-form :model="newCate" :rules="rules" ref="ruleForm">
          <el-form-item label="上传分类头像" prop="categoryAvatar">
            <el-upload
              action="http://124.70.54.24:3001/upload"
              :show-file-list="false"
              :on-success="handleAddSuccess"
              accept="image/*">
              <el-avatar :size="100" v-if="newCate.categoryAvatar" :src="newCate.categoryAvatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类名" class="user-item" prop="categoryName" label-suffix="111">
            <el-input v-model="newCate.categoryName" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类介绍" class="user-item" prop="categoryDetail">
            <el-input v-model="newCate.categoryDetail" clearable type="textarea" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addCate()">确 定</el-button>
        </span>
      </el-dialog>
      
      <el-dialog title="修改分类" :visible.async="updateDialog" width="30%"  :before-close="handleUpdateClose">
        <el-form :model="uptCate" :rules="rules" ref="ruleForm">
          <el-form-item label="上传分类头像" prop="categoryAvatar">
            <el-upload
              action="http://124.70.54.24:3001/upload"
              :show-file-list="false"
              :on-success="handleUpdateSuccess"
              accept="image/*">
              <el-avatar :size="100" v-if="uptCate.categoryAvatar" :src="uptCate.categoryAvatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="分类名" class="user-item" prop="categoryName" label-suffix="111">
            <el-input v-model="uptCate.categoryName" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类介绍" class="user-item" prop="categoryDetail">
            <el-input v-model="uptCate.categoryDetail" clearable type="textarea" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateCate()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
    name:'Category',
    data() {
        return {
          // 新增的分类信息
          newCate:{
            categoryName:'',
            categoryAvatar:'',
            categoryDetail:''
          },
          // 新增分类的表单验证对象
          rules:{
            categoryName:[{required:true,message:'请输入分类名称',trigger:'blur'}],
          },
          // 分类信息的列表
          cateList:[],
          //搜索框输入内容
          searchInput:'',
          //控制弹框
          addDialog:false,
          updateDialog:false,
          //编辑的分类对象
          uptCate:{}
        }
    },
    mounted(){
      this.getAllCate()
      // console.log(this.cateList)
    },
    methods:{
      //获取全部分类信息
      getAllCate(){
        this.$http.get('/api/category/getCate').then(res => {
          this.cateList = res.data.data
        })
      },
      // 新增分类
      addCate(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$http({url:'/api/category/addCate', method:'POST', data:this.newCate }).then(res => {
              if(res.data.data === '添加成功'){
                this.$message.success('添加成功')
              }else{
                this.$message.error('已存在该分类名，请重新添加')
              }
              this.addDialog = false // 隐藏弹窗 并重新获取分类列表
              this.newCate.categoryAvatar=''
              this.newCate.categoryName=''
              this.newCate.categoryDetail=''
              this.getAllCate()
            })
          } else {
            this.$message.error('添加失败')
            return false
          }
        })
      },
      // 删除分类
      delCate(id){
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/category/delCate/?id='+id).then(res => {
            if(res.data.data === '删除成功'){
              this.$message.success('删除成功')
            }else{
              this.$message.error('删除失败！')
            }
            this.getAllCate()
          })
        }).catch(() => {
          this.$message.info('已取消删除')    
        })
      },
      //修改分类弹框
      showUpdate(obj){
        this.updateDialog = true
        // 实现深拷贝，防止编辑中页面数据发送改变
        this.uptCate = JSON.parse(JSON.stringify(obj))
      },
      //修改分类
      async updateCate(){
        await this.$http.post('/api/category/updateCate', this.uptCate).then(res => {
          if(res.data.data === '修改成功'){
            this.$message.success('修改成功')
          }else{
            this.$message.error('修改失败')
          }
          this.updateDialog = false
          this.uptCate = {}
          this.getAllCate()
        })
      },
      // 修改分类中上传图片成功后的回调
      handleAddSuccess(res, file){
        this.uptCate.categoryAvatar = res.data
      },
      // 添加分类中上传图片成功后的回调
      handleUpdateSuccess(res, file){
        this.newCate.categoryAvatar = res.data
      },
      //重置表单内容
      resetForm(){
        this.newCate={
            categoryName:'',
            categoryAvatar:'',
            categoryDetail:''
          }
      },
      //新增分类弹框的关闭事件
      handleAddClose(){
        this.addDialog = false
        this.newCate={
            categoryName:'',
            categoryAvatar:'',
            categoryDetail:''
        }
      },
      //修改分类弹框的关闭事件
      handleUpdateClose(){
        this.updateDialog = false
      }
    }
}
</script>

<style scoped>
.title {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  font-size: 20px;
  font-style: italic;
  font-weight: bold;
  border-bottom: 2px solid #ccc;
}
.out-div {
  background-color: white;
  width: inherit;
  height: inherit;
  padding: 1px 10px 30px 10px;
  border: 1px solid white;
  border-radius: 5px;
}
.main-content {
  width: inherit;
  height: inherit;
  /* background-color: ; */
  display: flex;
  justify-content: space-around;
  align-items: stretch;
}
.left-box {
  width: 400px;
  padding: 10px;
  box-shadow: 0 0 10px #ccc;
  border-radius: 5px;
}
.right-box {
  width: 800px;
  padding: 10px;
  box-shadow: 0 0 10px #ccc;
  border-radius: 5px;
  margin-right: 30px;
}
.top-operate {
  float: left;
}
.page {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.search-input {
  width: 200px;
  margin-right: 5px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid #ccc;
}
</style>