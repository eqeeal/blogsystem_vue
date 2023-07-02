<template>
  <div class="main">
    <el-card>
      <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <div style="color: gray;font-size: 16px;padding-left: 20%;margin: 0 auto;font-weight: bold">查询条件</div>
        </template>
        <el-form :inline="true"  label-position="left" ref="form" :model="pageQuary" label-width="90px">
          <el-row>
            <el-form-item label="用户查询">
              <el-input placeholder="用户名称" v-model="pageQuary.userId"></el-input>
            </el-form-item>
            <el-form-item label="评论日期">
              <el-date-picker
                  v-model="pageQuary.time"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row>

          </el-row>
          <el-row>
            <el-form-item>
              <el-radio-group v-model="pageQuary.status">
                <el-radio :label=null>查询全部</el-radio>
                <el-radio :label=1>查询解禁</el-radio>
                <el-radio :label=0>查询封禁</el-radio>
                <el-radio :label=2>查询未读</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-form-item  label="评论内容">
            <el-input type="textarea" style="width:  850px"  v-model="pageQuary.input"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-form-item>
              <el-button ref="qu" type="primary" @keydown.enter="query" @click="query">查询</el-button>
              <el-button @click="cleanQuery()">取消</el-button>
              <el-button  @click="toggleSelection()">取消选择</el-button>
              <el-button type="primary" plain @click="bannedBetch(1)">批量解禁</el-button>
              <el-button type="danger" plain @click="bannedBetch(0)">批量封禁</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-collapse-item>
        </el-collapse>
    </el-card>
    <el-card>
      <div v-show="activeName!=='1'" style="  text-align:right;margin-right: 10%">
        <el-button type="primary" plain @click="toggleSelection()">取消选择</el-button>
        <el-button type="primary" plain @click="bannedBetch(1)">批量解禁</el-button>
        <el-button type="primary" plain @click="bannedBetch(2)">批量已读</el-button>
        <el-button type="danger" plain @click="bannedBetch(0)">批量封禁</el-button></div>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageQuary.page"
        :page-sizes="[5, 10,20,40]"
        :page-size="pageQuary.pageSize"
        layout="total, sizes, prev,pager,next"
        :total="total">
    </el-pagination>
    <el-table
        max-height="10%"
        ref="commentTab"
        :data="recommentList"
        style="width: 100%"
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        @selection-change="handleSelectionChange">
    >
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="日期"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="用户名"
          sortable
          width="120">
      </el-table-column>
      <el-table-column
          prop="content"
          width="240"
          label="评论内容">
      </el-table-column>
      <el-table-column
          prop="status"
          label="评论状态">
        <template slot-scope="scope">
          <div v-if="scope.row.status===0">
            <font color="red">封禁</font>
          </div>
          <div v-if="scope.row.status===1">
            <font color="green">已读</font>
          </div>
          <div v-if="scope.row.status===2">
            <font color="#6495ed">未读</font>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          prop="recommentCount"
          label="子评论数">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.status!==0">
            <el-button
                size="mini"
                @click="handleBanned(scope.$index, scope.row)">封禁</el-button>
          </div>
          <div v-else>
            <el-button
                size="mini"
                @click="handleReleaseBanned(scope.$index, scope.row)">解禁</el-button>
          </div>
          <br>
          <div>
            <el-button
                size="mini"
                @click="handlePostRecomment(scope.$index, scope.row)">回复</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    </el-card>
  </div>
</template>

<script>
import {updateComment} from "@/components/comment/api/comment";
import CommentItem from "@/components/comment/commentVue/commentItem.vue";
import {cleanPageData, setPageData} from "@/components/comment/js/commentJs";


export default {
  name:"CommentWorkShell",
  // eslint-disable-next-line vue/no-unused-components
  components: {CommentItem},
  props:["blogId","blogList"],
  data(){
    return{
      showBeBanned:false,
      pageQuary:{},
      recommentList:[],
      multipleSelection: [],
      activeName:"1",
      total:0
    }
  },
  watch:{
    blogId(){
      this.pageQuary.blogId=this.blogId
    },
    recommentList(){
      if(this.recommentList.length===0){
        this.activeName='1';
      }
      else {
        this.activeName='2';
      }

    }
  },
  mounted() {
    this.init();
  },
  methods:{
    clickMultiSelect(){
      this.multipleSelection=this.$refs.commentTab.selection;
    },
    bannedBetch(i){
      if(i===2){
        this.multipleSelection.forEach(row=> {
          if (row.status === 2) {
            row.status = 1
            updateComment(row.id, 1);
          }
        });
        setTimeout(()=>{
          this.pageQuary.page=1
          setPageData(this)
        },300)

      }
      else {
        this.multipleSelection.forEach(row=>{
            row.status=i;
            updateComment(row.id,i);
        })
      }

    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.commentTab.toggleRowSelection(row);
        });
      } else {
        this.$refs.commentTab.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleBanned(index, row) {
      row.status=0;
      updateComment(row.id,0);
    },
    handleReleaseBanned(index, row) {
      row.status=1;
      updateComment(row.id,1);
    },
    query(){
      setPageData(this);
    },
    cleanQuery(){
      cleanPageData(this);
    },
    handleSizeChange(val) {
      this.pageQuary.pageSize=val;
      setPageData(this);
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageQuary.page=val
      setPageData(this)
      //console.log(`当前页: ${val}`);
    },
    init(){
      cleanPageData(this);
    }
  }
}
</script>

<style scoped>
.el-card{
  margin: 5px;
}
.el-table{
  margin: 5px;
}
.main{
  height: 200%;
}
</style>
