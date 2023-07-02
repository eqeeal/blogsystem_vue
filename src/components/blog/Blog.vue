<template>
  <div class="blog-mange">
    <span style="font-size: 20px">博客管理</span>
    <hr />
    <div class="blog-main">
      <el-button type="success" @click="page()">新增</el-button>
      <el-button type="primary">修改</el-button>
      <el-button type="danger">删除</el-button>
      <el-input
        placeholder="请输入关键字搜索"
        prefix-icon="el-icon-search"
        v-model="input2"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="blog-list">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border=""
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="标题" width="200">
          <template slot-scope="scope">{{ scope.row.userId }}</template>
        </el-table-column>
        <el-table-column prop="nickName" label="预览图" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gmail" label="浏览量" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{
              String(scope.row.status) === "0"
                ? "正常"
                : String(scope.row.status) === "1"
                ? "禁言"
                : "封号"
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="博客分类"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      @prev-click="pageCurrentChange"
      @next-click="pageCurrentChange"
      @jumper-click="pageCurrentChange"
      :current-page="pageInfo.currentPage"
      :page-sizes="pageInfo.pageSizes"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
    >
    </el-pagination>
  </div>
</template>

<script>

export default {
  data() {
    return {
      blogTable: [],
      keyWords: "",
      pageInfo: {
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 5,
        total: "",
        currentPage: 1,
      },
    };
  },
};
</script>

<style scoped>
.blog-mange {
  width: 95%;
  background-color: white;
  text-align: left;
  padding: 20px;
}
.blog-main {
  padding: 10px;
}

hr {
  border-top: 2px;
}
button {
  margin-bottom: 2vh;
}
.el-input {
  width: 250px;
  margin-left: 2vw;
  margin-right: 1vw;
}
</style>