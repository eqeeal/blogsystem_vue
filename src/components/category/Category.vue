<template>
  <div>
    <div class="out-div">
      <!-- 顶部页面标题 -->
      <div class="title">分类管理</div><br>
      <!-- 页面主体内容 -->
      <div class="main-content">
        <!-- 热度排行榜 -->
        <div class="left-box">
          <!-- <el-form label-position="top" label-width="80px" :model="userInfo" :rules="rules" ref="ruleForm"> -->
          <b>热门分类前十</b>
          <el-table :data="hotCateList" stripe style="width: 100%" class="talbe" :cell-style="setRowStyle">
            <el-table-column type="index" width="80" label="排行"></el-table-column>
            <el-table-column fixed prop="category_name" label="分类名称" width="150"></el-table-column>
            <el-table-column fixed prop="count" label="热度" width="170"> </el-table-column>
          </el-table>  
        </div>
        <!-- 右侧数据展示 -->
        <div class="right-box">
          <div class="choose-all"> 
            <el-checkbox v-model="isChooseAll" @change="chooseAllChange" style="margin-right:10px">全选</el-checkbox>
            <el-button type="text" @click="delBatch">批量删除</el-button>
          </div>
          <div class="top-operate">
            <el-input v-model="searchInput" clearable placeholder="请输入分类名称" class="search-input" @clear="clearInput()">
              <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
            <el-button type="primary" @click="addDialog=true">添加分类</el-button>
          </div>
          <el-table :data="cateList" stripe style="width: 100%" max-height="500">
            <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column fixed label="选择" width="50">
            <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isChoose"></el-checkbox>
            </template>
          </el-table-column>
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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

      <el-dialog title="添加新分类" :visible.async="addDialog" width="30%"  :before-close="handleAddClose">
        <el-form :model="newCate" :rules="rules" ref="ruleForm">
          <el-form-item label="上传分类头像" prop="categoryAvatar">
            <el-upload
              action="http://124.70.54.24:3001/upload"
              :show-file-list="false"
              :on-success="handleAddSuccess"
              accept="image/*">
              <el-avatar v-if="newCate.categoryAvatar" :src="newCate.categoryAvatar" class="avatar-uploader-icon"/>
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
          <el-button @click="cancellAdd">取 消</el-button>
          <el-button type="primary" @click="addCate()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改分类弹框 -->
      
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
          //热门分类列表
          hotCateList:[],
          // 分类信息的列表
          cateList:[],
          //总数据条数
          totalCount:0,
          //搜索框输入内容
          searchInput:'',
          //控制弹框
          addDialog:false,
          updateDialog:false,
          //需要修改的分类对象
          uptCate:{},
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
      cateList:{
        deep:true,
        handler(){
          this.isChooseAll = this.cateList.every(item => item.isChoose)
          // console.log(this.isChooseAll)
        }
      }
    },
    mounted(){
      this.getAllCate()
      this.getHotCate()
      this.search = this.debounce(this.search,500)
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
      //热度排行榜前三列设为红色
      setRowStyle(row){
        if(row.rowIndex == 0 || row.rowIndex == 1 || row.rowIndex ==2){
            return "color:#f5541d;font-size:18px;font-weight:bold;font-style:italic" 
        }else{
            return '' 
        }
      },
      //全选变化
      chooseAllChange(){
        this.cateList.forEach(item => item.isChoose = this.isChooseAll)
        // console.log(this.cateList)
      },
      //获取热门分类信息
      getHotCate(){
        this.$http.get('/category/hotCate').then(res=>{
          //让分类下的博客数量乘以88的形式来代替热度
          res.data.data.forEach(item=>{
            item.count = item.count*88
          })
          this.hotCateList = res.data.data
        })
      },
      //获取全部分类信息
      getAllCate(){
        this.$http.get('/category/getCate').then(res => {
          // 给每个数据项添加一个是否选中的属性 默认为false
          res.data.data.list.forEach(cate => {
            cate.isChoose = false          
          })
          this.cateList = res.data.data.list
          this.totalCount = res.data.data.count
        })
      },
      // 批量删除
      delBatch(){
        let delList = this.cateList.filter(item=>item.isChoose==true)
        let ids = delList.map(item => item.id)
        if(delList.length == 0){
          this.$message.warning('请选择需要删除的数据')
        }else{
          this.$confirm('此操作将永久删除分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http({url:'/category/delBatch',method:'POST',data:{'ids':ids}}).then(res=>{
               if(res.data.success){
                this.$message.success('删除成功')
              }else if(res.data.msg == '选择的分类存在关联的博客，删除失败'){
                this.$message.error('选择的分类中存在关联的博客，删除失败')
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
      // 新增分类
      addCate(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$http({url:'/category/addCate', method:'POST', data:this.newCate }).then(res => {
              if(res.data.success){
                this.$message.success('添加成功')
                this.addDialog = false // 隐藏弹窗 并重新获取分类列表
                this.newCate.categoryAvatar=''
                this.newCate.categoryName=''
                this.newCate.categoryDetail=''
                //添加时，如果最后一页数据满了，就跳到下一页显示
                let tmp = this.totalCount/this.pageSize
                let num = tmp%1 == 0 ? tmp+1 : Math.ceil(tmp)
                this.handleCurrentChange(num)
              }else{
                this.$message.error('已存在该分类名，请重新添加')
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
        this.newCate.categoryAvatar=''
        this.newCate.categoryName=''
        this.newCate.categoryDetail=''
      },
      // 删除分类
      delCate(id){
        console.log(id)
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/category/delCate/?id='+id).then(res => {
            if(res.data.success){
              this.$message.success('删除成功')
            }else if(res.data.msg == '该分类存在关联的博客，删除失败'){
              this.$message.error('该分类存在关联的博客，删除失败')
            }else{
              this.$message.error('删除失败!')
            }
            //删除时，如果页面没有数据了，就跳转到上一页
            // let tmp = this.totalCount/this.pageSize
            // let num = tmp%1 == 0 ? Math.ceil(tmp)-1 : Math.ceil(tmp)
            this.handleCurrentChange(this.pageNum)
          })
        }).catch(() => {
          this.$message.info('已取消删除')    
        })
      },
      //修改分类 操作的弹框
      showUpdate(obj){
        this.updateDialog = true
        // 实现深拷贝，防止编辑中页面数据发送改变
        this.uptCate = JSON.parse(JSON.stringify(obj))
      },
      //修改分类
      async updateCate(){
        await this.$http.post('/category/updateCate', this.uptCate).then(res => {
          if(res.data.success){
            this.$message.success('修改成功')
            this.updateDialog = false
            this.uptCate = {}
            this.handleCurrentChange(this.pageNum)
          }else{
            this.$message.error('修改失败:已存在该分类名。')
          }
        })
      },
      // 修改分类中上传图片成功后的回调
      handleUpdateSuccess(res, file){
        this.uptCate.categoryAvatar = res.data
      },
      // 添加分类中上传图片成功后的回调
      handleAddSuccess(res, file){
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
      },
      // 每页多少条变化的回调函数
      handleSizeChange(pageSize){
        this.isChooseAll = false
        this.pageSize = pageSize
        this.$http({url:'/category/pagin',method:'POST',params:{'categoryName':this.searchInput,'pageNum':this.pageNum,'pageSize':this.pageSize}})
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
        this.$http({url:'/category/pagin',method:'POST',params:{'categoryName':this.searchInput,'pageNum':this.pageNum,'pageSize':this.pageSize}})
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
        this.$http({url:'/category/pagin',method:'POST',params:{'categoryName':this.searchInput,'pageNum':this.pageNum,'pageSize':this.pageSize}})
        .then(res=>{
          this.cateList = res.data.data.list
          this.totalCount = res.data.data.count
        })
      },
      //输入框清空的回调
      clearInput(){
        //清空输入框，重新获取数据
        this.getAllCate()
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
  float: right;
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