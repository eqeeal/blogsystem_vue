<template>
 <div>
    <div class="out-div">
      <!-- 顶部页面标题 -->
      <div class="title">链接管理</div><br>
      <!-- 页面主体内容 -->
      <div class="main-content">
        <div class="box">
          <div class="top-operate">
            <el-button type="primary" @click="addDialog=true">添加</el-button>
            <el-button type="primary" @click="updateDialog=true">修改</el-button>
            <el-button type="danger" @click="delDialog=true">删除</el-button>
          </div>
          <el-table :data="linkList" stripe style="width: 100%" max-height="500">
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column fixed prop="linkName" label="网站名称" width="300"></el-table-column>
          <el-table-column fixed prop="link" label="网站链接" width="300"></el-table-column>
          <el-table-column fixed prop="sort" label="排序值" width="150"> </el-table-column>
          <el-table-column fixed prop="createTime" label="添加时间" width="300"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="showUpdate(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="delLink(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="linkList.length">
          </el-pagination>
        </div>
        </div>
      </div>
      <el-dialog title="添加新链接" :visible="addDialog" width="30%"  :before-close="handleAddClose">
        <el-form :model="newLink" :rules="rules" ref="ruleForm">
          <el-form-item label="网站名称" class="user-item" prop="linkName" label-suffix="111">
            <el-input v-model="newLink.linkName" clearable></el-input>
          </el-form-item>
          <el-form-item label="网站链接" class="user-item" prop="link">
            <el-input v-model="newLink.link" clearable type="textarea" ></el-input>
          </el-form-item>
          <el-form-item label="排序值" class="user-item" prop="sort" label-suffix="111">
            <el-input v-model="newLink.sort" clearable></el-input>
          </el-form-item>
          <el-form-item label="添加时间" class="user-item" prop="create_time">
            <el-date-picker v-model="newLink.createTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addLink()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改链接" :visible="updateDialog" width="30%"  :before-close="handleUpdateClose">
        <el-form :model="uptLink" :rules="rules" ref="ruleForm">
          <el-form-item label="网站名称" class="user-item" prop="linkName" label-suffix="111">
            <el-input v-model="uptLink.linkName" clearable></el-input>
          </el-form-item>
          <el-form-item label="网站链接" class="user-item" prop="link">
            <el-input v-model="uptLink.link" clearable type="textarea" ></el-input>
          </el-form-item>
          <el-form-item label="排序值" class="user-item" prop="link">
            <el-input v-model="uptLink.sort" clearable type="textarea" ></el-input>
          </el-form-item>
          <el-form-item label="添加时间" class="user-item" prop="create_time">
            <el-date-picker v-model="uptLink.createTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateLink()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {
  name:'Link',
    data() {
        return {
          // 新增的链接信息
          newLink:{
            linkName:'',
            link:'',
            sort:'',
            createTime:''
          },
          // 新增链接的表单验证对象
          rules:{
            linkName:[{required:true,message:'请输入网站名称',trigger:'blur'}],
          },
          // 链接信息的列表
          linkList:[],
          //搜索框输入内容
          searchInput:'',
          //控制弹框
          addDialog:false,
          updateDialog:false,
          //编辑的链接对象
          uptLink:{}
        }
    },
    mounted(){
      this.getAllLink()
      // console.log(this.linkList)
    },
    methods:{
      //获取全部链接信息
      getAllLink(){
        this.$http.get('/api/link/findall').then(res => {
          console.log(res.data)
          this.linkList = res.data;
          console.log(this.linkList);
        })
      },
      // 新增链接
      addLink(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$http({url:'/api/link/add', method:'POST', data:this.newLink }).then(res => {
              if(res.data.data === '添加成功'){
                this.$message.success('添加成功')
              }else{
                this.$message.error('已存在该链接名，请重新添加')
              }
              this.addDialog = false // 隐藏弹窗 并重新获取链接列表
              this.newLink.linkName=''
              this.newLink.link=''
              this.newLink.sort=''
              this.newLink.createTime=''
              this.getAllLink()
            })
          } else {
            this.$message.error('添加失败')
            return false
          }
        })
      },
      // 删除链接
      delLink(id){
        this.$confirm('此操作将永久删除该链接, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/link/del/?id='+id).then(res => {
            if(res.data.data === '删除成功'){
              this.$message.success('删除成功')
            }else{
              this.$message.error('删除失败！')
            }
            this.getAllLink()
          })
        }).catch(() => {
          this.$message.info('已取消删除')    
        })
      },
      //修改链接弹框
      showUpdate(obj){
        this.updateDialog = true
        // 实现深拷贝，防止编辑中页面数据发送改变
        this.uptLink = JSON.parse(JSON.stringify(obj))
      },
      //修改链接
      async updateLink(){
        await this.$http.post('/api/link/update', this.uptLink).then(res => {
          if(res.data.data === '修改成功'){
            this.$message.success('修改成功')
          }else{
            this.$message.error('修改失败')
          }
          this.updateDialog = false
          this.uptLink = {}
          this.getAllLink()
        })
      },
      //重置表单内容
      resetForm(){
        this.newLink={
            linkName:'',
            link:'',
            sort:'',
            createTime:''
          }
      },
      //新增链接弹框的关闭事件
      handleAddClose(){
        this.addDialog = false
        this.newLink={
            linkName:'',
            link:'',
            sort:'',
            createTime:''
        }
      },
      //修改链接弹框的关闭事件
      handleUpdateClose(){
        this.updateDialog = false
      }
    }
  };

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