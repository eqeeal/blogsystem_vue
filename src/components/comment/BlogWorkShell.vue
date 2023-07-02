<template>
<div>
  <el-pagination
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.blogListInfo.total">
  </el-pagination>
  <el-table
      @row-click="goToCom"
      :data="blogListInfo.records"
      style="width: 100%">
    <el-table-column
        prop="title"
        label="标题"
        width="180">
    </el-table-column>
    <el-table-column
        prop="updateTime"
        label="修改时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="nonCount"
        label="新增回复">
    </el-table-column>
    <el-table-column
        prop="totalCount"
        label="总回复">
    </el-table-column>
    <el-table-column
        label="管理">
      <el-button @click="goToCom" icon="el-icon-arrow-right"></el-button>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "BlogWorkShell",
  props:["blogListInfo"],
  data(){
    return{
      page:1,
      pageSize:5,
      total:0
    }
  },
  mounted() {
  },
  methods:{
    handleSizeChange(val) {
      this.pageSize=val;
      this.$emit("emit",this.page,this.pageSize)
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page=val;
      this.$emit("emit",this.page,this.pageSize)
      //console.log(`当前页: ${val}`);
    },
    goToCom(row, column, event){
      this.$emit("cli",row.id);
    }
  }
}
</script>

<style scoped>

</style>
