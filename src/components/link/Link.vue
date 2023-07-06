<template>
 <div>
    <div class="out-div">
      <!-- 顶部页面标题 -->
      <div class="title">链接管理</div><br>
      <!-- 页面主体内容 -->
      <div class="main-content">
        <div class="box">
          <div class="choose-all"> 
            <el-checkbox v-model="isChooseAll" @change="chooseAllChange" style="margin-right:10px">全选</el-checkbox>
            <el-button type="text" @click="delBatch">批量删除</el-button>
          </div>
          <div class="top-operate">
            <el-button type="primary" @click="addDialog=true">添加</el-button>
            <el-button type="primary" @click="updateDialog=true">修改</el-button>
            <el-button type="danger" @click="delDialog=true">删除</el-button>
            <!-- <el-input v-model="searchInput" clearable placeholder="请输入链接名称" class="search-input" @clear="clearInput()"> -->
              <!-- <el-button slot="append" icon="el-icon-search" @click="search()"></el-button> -->
            <!-- </el-input> -->
          </div>
          <el-table :data="linkList" stripe style="width: 100%" max-height="500">
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column fixed prop="linkName" label="网站名称" width="300"></el-table-column>
          <el-table-column fixed prop="link" label="网站链接" width="300"></el-table-column>
          <el-table-column fixed prop="sort" label="排序值" width="150"> </el-table-column>
          <el-table-column fixed prop="createTime" label="添加时间" width="500"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click="showUpdate(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="delLink(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
          
            :page-sizes="[2, 5, 10, 15]"
            :page-size="pageSize"
            :current-page="pageNum"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
        </div>
        </div>
      </div>
      <!-- 添加新分类弹框 -->
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
          <el-button @click="cancelAdd = false">取 消</el-button>
          <el-button type="primary" @click="addLink()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改分类弹框 -->
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
          //总数据条数
          totalCount:0,
          //搜索框输入内容
          searchInput:'',
          //控制弹框
          addDialog:false,
          updateDialog:false,
          //需要修改的链接对象
          uptLink:{},
          //是否全选
          isChooseAll: false,
          //页面数据数量,默认为5
          pageSize:5,
          //页面起始位置，默认为1
          pageNum:1
        }
    },
    watch:{
      //监听数据列表的选中状态变化
      linkList:{
        deep:true,
        handler(){
          this.isChooseAll = this.linkList.every(item => item.isChoose)
          // console.log(this.isChooseAll)
        }
      }
    },
    mounted(){
      this.getAllLink()
      this.search = this.debounce(this.search,500)
      // console.log(this.linkList)
    },
    methods:{
      //简单的防抖
      debounce(func,wait){
        let timer
        return function(){
          clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,arguments)
          }, wait)
        }
      },
      //全选变化
      chooseAllChange(){
        this.linkList.forEach(item => item.isChoose = this.isChooseAll)
        // console.log(this.cateList)
      },
      //获取全部链接信息
      getAllLink(){
        this.$http.get('/link/findall').then(res => {
          // 给每个数据项添加一个是否选中的属性 默认为false
          console.log(res.data)
          this.linkList = res.data
          // this.totalCount = res.data.data.count
        })
      },
       // 批量删除
       delBatch(){
        let delList = this.linkList.filter(item=>item.isChoose==true)
        let ids = delList.map(item => item.id)
        if(delList.length == 0){
          this.$message.warning('请选择需要删除的数据')
        }else{
          this.$confirm('此操作将永久删除分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http({url:'/api/link/delLinks',method:'POST',data:{'ids':ids}}).then(res=>{
               if(res.data.success){
                this.$message.success('删除成功')
              }else if(res.data.msg == '删除失败'){
                this.$message.error('删除失败')
              }else{
                this.$message.error('删除失败!')
              }
              this.handleCurrentChange(this.pageNum)
            })
          }).catch(() => {
            this.$message.info('已取消删除')    
          })
        }
      },
      // 新增链接
      addLink(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$http({url:'/link/add', method:'POST', data:this.newLink }).then(res => {
              if(res.data.success){
                this.$message.success('添加成功')
              this.addDialog = false // 隐藏弹窗 并重新获取链接列表
              this.newLink.linkName=''
              this.newLink.link=''
              this.newLink.sort=''
              this.newLink.createTime=''
              //添加时，如果最后一页数据满了，就跳到下一页显示
              let tmp = this.totalCount/this.pageSize
                let num = tmp%1 == 0 ? tmp+1 : Math.ceil(tmp)
                this.handleCurrentChange(num)
              }else{
                this.$message.error('已存在该链接，请重新添加')
              }
            })
          } else {
            this.$message.error('添加失败')
            return false
          }
        })
      },
       // 取消新增按钮
       cancellAdd(){
        this.addDialog = false
        this.newLink.linkName=''
        this.newLink.link=''
        this.newLink.sort=''
        this.newLink.createTime=''
      },
      // 删除链接
      delLink(id){
        this.$confirm('此操作将永久删除该链接, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/link/del/?id='+id).then(res => {
            if(res.data.success){
              this.$message.success('删除成功')
            }else{
              this.$message.error('删除失败！')
            }
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
        await this.$http.post('/link/update', this.uptLink).then(res => {
          if(res.data.success){
            this.$message.success('修改成功')
            this.updateDialog = false
            this.uptLink = {}
            this.handleCurrentChange(this.pageNum)
          }else{
            this.$message.error('修改失败:已存在该链接')
          }
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
      },
      //修改分类弹框的关闭事件
      handleUpdateClose(){
        this.updateDialog = false
      },
     /* // 每页多少条变化的回调函数
      handleSizeChange(pageSize){
        this.isChooseAll = false
        this.pageSize = pageSize
        this.$http({url:'/api/link/pagin',method:'POST',params:{'categoryName':this.searchInput,'pageNum':this.pageNum,'pageSize':this.pageSize}})
        .then(res=>{
          // 给每个数据项添加一个是否选中的属性 默认为false
          res.data.data.list.forEach(cate => {
            cate.isChoose = false          
          })
          this.cateList = res.data.data.list
          this.totalCount = res.data.data.count
        })
      },
       // 当前页变化的回调函数
       handleCurrentChange(pageNum){
        this.isChooseAll = false
        this.pageNum = pageNum
        this.$http({url:'/api/category/pagin',method:'POST',params:{'categoryName':this.searchInput,'pageNum':this.pageNum,'pageSize':this.pageSize}})
        .then(res=>{
          // 给每个数据项添加一个是否选中的属性 默认为false
          res.data.data.list.forEach(cate => {
            cate.isChoose = false       
          })
          this.cateList = res.data.data.list
          this.totalCount = res.data.data.count
        })
      },
      //搜索(带页码和页内数量)
      search(){
        console.log("0.5s后调用了search")
        this.$http({url:'/api/category/pagin',method:'POST',params:{'categoryName':this.searchInput,'pageNum':this.pageNum,'pageSize':this.pageSize}})
        .then(res=>{
          this.cateList = res.data.data.list
          this.totalCount = res.data.data.count
        })
      },*/
      //输入框清空的回调
      clearInput(){
        //清空输入框，重新获取数据
        this.getAllCate()
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
.choose-all {
  float: left;
}
</style>