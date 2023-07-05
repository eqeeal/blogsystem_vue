<template>
  <div>
    友情链接
    <el-container>
    <el-header style="text-align: left; font-size: 12px">
      <el-button type="primary" plain>新增</el-button>
      <el-button type="primary" plain>修改</el-button>
      <el-button type="danger" plain>删除</el-button>
    </el-header>
    
    <el-main>
      <el-table :data="tableData">
        <el-checkbox v-model="chooseAll" @change="chooseAllChange">全选</el-checkbox>
        <el-button @click="delUsers">批量删除</el-button> 
        data() {
        return {
        tableData: [],
        chooseAll:false,//表示是否全选
        };
        }
        <el-table-column fixed prop="id" label="选择" width="150">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.isChoose"></el-checkbox>
        </template>
      </el-table-column>
        <el-table-column prop="link_name" label="网站名称" width="300">
        </el-table-column>
        <el-table-column prop="link" label="网站链接" width="300">
        </el-table-column>
        <el-table-column prop="sort" label="排序值" width="120">
        </el-table-column>
        <el-table-column prop="create_time" label="添加时间" >
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  </div>

</template>

<script>
export default {
  async created() {
   let res = await this.$http.linkHttp.getAllLinks();
   console.log(res);
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods:{
  async   delLink(obj){
      // console.log('删除',obj);
      let res = await  this.$http.linkHttp.delLink(obj);
      console.log('删除结果',res);
      if(res.data.message=="删除成功"){
        //element提供的弹窗api
        this.$message({
          message:"删除成功",
          type:"success"
        });
        //重新获取数据
        this.getAllLinks();
      }
    },
    async getAllLinks(){
      let res = await this.$http.userHttp.getAllUsers();
      //给每个用户对象添加是否被选中的状态，用于控制该用户在页面上的选中状态
      res.data.forEach((user) => {
      //添加属性
      user.isChoose = false;
      });
this.tableData = res.data;

    },
    watch:{
        //普通监听
        tableData(){
            //当tableData发生变化时就会执行这里的代码
        },
        //深度监听
        tableData:{
            handler(){
                //当tableData发生变化时就会执行这里的代码
            },
            deep:true
        }
    }
  }
 
  };

</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>