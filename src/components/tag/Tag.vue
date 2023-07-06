<template>
  <div class="out-big-div">
    <el-card>
      <div class="top-operate">
        <el-input
          v-model="input"
          @input="getAllTags()"
          clearable
          placeholder="请输入查询标签"
          prefix-icon="el-icon-search"
          style="width: 25%; margin-right: 10px"
        ></el-input>
        <br /><br />
        <el-button type="primary" @click="addDialog = true" style=""
          >添加标签</el-button>
        <el-button type="danger" @click="deleteSelectedRows">删除选定行</el-button>
      </div>

      <div class="out-div">
        <el-table :data="tableData" :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }" ref="multipleTable" style="width: 750px">
          <el-table-column type="selection" width="55px"></el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="180px">
          </el-table-column>
          <el-table-column prop="tagName" label="标签名" width="120px">
          </el-table-column>
          <el-table-column prop="hot" label="标签热度" width="120px">
          </el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-button @click="deltag1(scope.row.id)">删除</el-button>
              <el-button @click="showUpdate(scope.row)">更新</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block" style="margin-left: -30px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
            <!-- total等所有tag数 -->
          </el-pagination>
        </div>
      </div>
    </el-card>

    <div class="right-box">
      <el-card class="box-card" style="width:400px">
        <div
          style=""
          class="selecter"
        >
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              Top10/Top20<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="10">Top10</el-dropdown-item>
              <el-dropdown-item command="20">Top20</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <el-table :data="tableData1"  :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }" style="width: 400px">
          <el-table-column type="index" label="排名" width="120px">
            <template slot-scope="scope">Top{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="hot" label="标签热度" width="120px">
          </el-table-column>
          <el-table-column prop="tagName" label="标签名" width="120px">
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <div class="update-add">
      <el-dialog
        title="修改标签"
        :visible.async="updateDialog"
        width="30%"
        :before-close="handleUpdateClose"
      >
        <el-form :model="updatetag" :rules="rules" ref="ruleForm">
          <el-form-item
            label="标签名"
            class="user-item"
            prop="tagName"
            label-suffix="111"
          >
            <el-input v-model="updatetag.tagName" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateDialog = false">取 消</el-button>
          <el-button type="primary" @click="UpdateTag()">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="添加新标签"
        :visible.async="addDialog"
        width="30%"
        :before-close="handleAddClose"
      >
        <el-form :model="newTag" :rules="rules" ref="ruleForm">
          <el-form-item
            label="标签"
            class="user-item"
            prop="tagName"
            label-suffix="111"
          >
            <el-input v-model="newTag.tagName" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button @click="addTag()" type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  //打开页面就触发，一般获取页面初始数据--来自后端
  mounted() {
    this.getAllTags();
    this.showHot(this);
  },
  data() {
    return {
      tableData: [],
      tableData1: [],
      page: 1,
      pageSize: 5,
      total: 0,
      input: "",
      //控制弹框
      addDialog: false,
      updateDialog: false,
      //编辑标签的对象
      updatetag: {},
      newTag: {
        id: "",
        tagName: "",
        createTime: "",
      },
      rules: {},
      command:'10',
      // 存储选中的行的ID
      selectedRows: [],
      ids:[]

    

    };
  },
  methods: {
    deltag1(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$requst.tagHttp.deltag(this, id);
        })
        .catch(() => {
          this.$message.info("取消删除");
        });
    },
    async showHot(e) {
      this.$requst.tagHttp.showHot(e);
    },
    async getAllTags() {
      if (this.input === "") {
        this.input === null;
      }
      // let res= await this.$requst.tagHttp.getAllTags();
      this.$requst.tagHttp.getPage(this);
    },
    handleSizeChange(val) {
      //当页面大小发生改变，改变的值就会变成val
      this.pageSize = val;
      this.$requst.tagHttp.getPage(this);
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //当当前页面发生改变，改变的值就会变成val
      this.page = val;
      this.$requst.tagHttp.getPage(this);
      //console.log(`当前页: ${val}`);
    },
    //更新标签弹框
    showUpdate(obj) {
      //点击更新，弹出此框
      this.updateDialog = true;
      // 实现深拷贝，防止编辑中页面数据发送改变
      this.updatetag = JSON.parse(JSON.stringify(obj));
    },
    //更新操作函数
    UpdateTag() {
      console.log(this.updatetag);
      this.$requst.tagHttp.updateTag(this, this.updatetag);
    },
    //重置表单内容
    resetForm() {
      this.newCate = {
        categoryName: "",
        categoryAvatar: "",
        categoryDetail: "",
      };
    },
    //修改分类弹框的关闭事件
    handleUpdateClose() {
      this.updateDialog = false;
    },
    handleAddClose() {
      this.addDialog = false;
    },
    //添加标签
    addTag() {
      //传入添加的数据newTag
      this.$requst.tagHttp.addTag(this, this.newTag);
    },
    //热门标签下拉框
    handleCommand(command) {
      this.$message("前" + command+"个热门标签");
      this.command=command
      this.showHot(this)
    },
    // handleCommand(this){
    //   alert(JSON.parse(this))
    // }
      showUpdate(row) {
      // 实现更新的代码
    },
    deleteSelectedRows() {
      var selecttags = this.$refs.multipleTable.selection; // 获取选中行的ID,row => row.id
      // console.log(selecttags);
      if (selecttags.length==0) {
        this.$message.warning('请选择要删除的行');
        return;
      }else{
        this.ids=selecttags;
        console.log(selecttags);
        this.$requst.tagHttp.deletetags(this,selecttags);
      }

}

  },
};
</script>

<style>
.top-operate {
  display: flex;
}
.out-big-div {
  display: flex;
  justify-content: space-between;
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.selecter {
  width: 80px;
  height: 40px;
  /* border: 0.1px solid rgb(0, 0, 0); */
  background-color: #ffffff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>