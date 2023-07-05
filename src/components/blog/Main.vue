<template>
  <div ref="scrollRef">
    <div class="contain" v-for="(item, index) in blogTable" :key="index">
      <div v-if="index % 2 == 0" @click="blogDetail(item.id)">
        <img class="half-left half-pickture" v-if="item.imgUrl" :src="item.imgUrl"/>
        <img class="half-left half-pickture" v-else :src="$host + '/common/download?name=read.jpg'" alt="预览图" />
        <!-- <img
          class="half-left half-pickture"
          :src="$host + '/common/download?name=' + 'read.jpg'"
          alt=""
        /> -->
        <div class="half-right half-blog">
          <div class="blog-view1">
            <div class="blog-title">{{ item.title }}</div>
            <div class="blog-createTime">
              <i class="el-icon-date"></i>发表于{{ item.createTime
              }}<span>&nbsp&nbsp|&nbsp<i class="el-icon-receiving"></i>{{ item.categoryName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else @click="blogDetail(item.id)">
        <div class="half-left half-blog">
          <div class="blog-view">
            <div class="blog-title">{{ item.title }}</div>
            <div class="blog-createTime">
              <i class="el-icon-date"></i>发表于{{ item.createTime
              }}<span>&nbsp&nbsp|&nbsp<i class="el-icon-receiving"></i>{{ item.categoryName }}</span>
            </div>
          </div>
        </div>
        <img
          class="half-right half-pickture"
          :src="$host + '/common/download?name=' + 'read.jpg'"
          alt=""
        />
      </div>
    </div>
    <div class="page">
      <el-pagination
        background
        @current-change="pageCurrentChange"
        @prev-click="pageCurrentChange"
        @next-click="pageCurrentChange"
        :total="pageInfo.total"
        :page-size="pageInfo.pageSize"
        :current-page="pageInfo.currentPage"
        hide-on-single-page
        layout="prev, pager, next"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Bus from "@/api/Bus";
import $api from "@/api";
import router from '@/router';
export default {
  data() {
    return {
      pageInfo: {
        pageSizes: [5, 10, 20, 50, 100],
        pageSize: 10,
        total: 15,
        currentPage: 1,
      },
      tableData: [
        {
          pickture: "read.jpg",
          title: "title",
          updateTime: "updateTime",
          category: "category",
        },
        {
          pickture: "read.jpg",
          title: "title",
          updateTime: "updateTime",
          category: "category",
        },
        {
          pickture: "read.jpg",
          title: "title",
          updateTime: "updateTime",
          category: "category",
        },
        {
          pickture: "read.jpg",
          title: "title",
          updateTime: "updateTime",
          category: "category",
        },
        {
          pickture: "read.jpg",
          title: "title",
          updateTime: "updateTime",
          category: "category",
        },
        {
          pickture: "read.jpg",
          title: "title",
          updateTime: "updateTime",
          category: "category",
        },
      ],
      blogTable: {},
      keyWords: "",
      userId:'',
    };
  },
  mounted() {
    Bus.$on("keyWords", (val) => {
      this.keyWords = val;
      this.createPage();
    });
  },
  created() {
    this.createPage();
  },
  methods: {
    getData() {
      var data = {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.currentPage,
        title: this.keyWords,
        userId: localStorage.getItem("userId"),
      };
      return data;
    },
    createPage() {
      var data = this.getData();
      $api.blog.page(data).then((res) => {
        this.blogTable = res.data.data.records;
        // console.log(res.data.data)
        this.pageInfo.total = res.data.data.total;
        // console.log(this.blogTable)
        // this.$refs.scrollRef.scrollTo=0
        window.scrollTo(0,0);
        window.scrollTo({
          top:0,
          behavior:"smooth"
        })
      });
    },
    pageSizeChange(newSize) {
      this.pageInfo.pageSize = newSize;
      this.pageInfo.currentPage = 1;
      this.createPage();
    },
    pageCurrentChange(newPage) {
      this.pageInfo.currentPage = newPage;
      this.createPage();
    },
    searchList() {
      this.createPage();
    },
    blogDetail(id){
      this.$router.push({name:"Detail",query:{id:id}})
    }
  },
};
</script>

<style scoped>
.contain {
  margin-top: 20px;
  margin-left: 5vw;
  padding: auto;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
}
.page {
  text-align: center;
  margin-top: 15vh;
  margin-bottom: 20vh;
}
.half-left,
.half-right {
  height: 300px;
  display: inline-block;
  /* background-color: pink; */
}
.half-right {
  float: right;
}
.half-pickture {
  width: 45%;
  border-radius: 15px;
}
.blog-view{
  margin-top: 80px;
  margin-left: 30px;
}
.blog-view1{
  margin-top: 80px;
}
.half-blog {
  width: 50%;
}
.blog-title{
  font-size: 30px;
  margin-bottom: 5px;
  cursor: pointer;
}
.blog-title:hover{
  color: rgb(73,177,245);
}
.blog-createTime{
  font-size: 17px;
  color: rgb(133,133,133);
}
i{
  margin-right: 5px;
}
img {
  transition: transform 0.5s;
}
img:hover {
  transform: scale(1.1);
}
>>> button.btn-prev {
  height: 40px;
  width: 40px;
  background-color: #f6f8fa;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}
/deep/ button.btn-next {
  height: 40px;
  width: 40px;
  background-color: #f6f8fa;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}
>>> .el-pagination.is-background .el-pager li {
  height: 40px;
  width: 40px;
  font-size: 15px;
  text-align: center;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  background-color: #f6f8fa;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
}
</style>