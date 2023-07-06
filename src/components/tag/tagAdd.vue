<template>
<div>
<div class="out-div">
    <el-table :data="tableData" style="width: 750px">
      <el-table-column prop="create_time" label="创建日期" width="180"> </el-table-column>
      <el-table-column prop="tag_name" label="标签名" width="220"> </el-table-column>
      <el-table-column prop="id" label="标签热度" width="150"> </el-table-column>
        <el-table-column label="操作" width="180">
        <template slot-scope="">
          <el-button >删除</el-button>
          <el-button >更新</el-button>
        </template> 
      </el-table-column>
    </el-table>
</div>
</div>
 
</template>

<script>
import tagHttp from '../../http/modules/tagHttp.js'
export default {

    //打开页面就触发，一般获取页面初始数据--来自后端
    created(){
      alert();
        this.getAllTags();
    },
    data(){
        return{
        tableData:[]
    }
    },
    methods:{
        async getAllTags(){
            await this.$requst.tagHttp.getAllTags().then(res=>{
              console.log(res.data);
              this.tableData=res.data
            })

        }
    }    //返回页面显示的数据
}
</script>

<style>
.el-table{
  margin-top: 100px;
  margin-left: 150px;
} 
.el-row {
  margin-bottom: 20px;
 
} 
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

</style>