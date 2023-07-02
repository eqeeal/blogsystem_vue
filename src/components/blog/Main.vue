<template>
  <div>
    <div class="contain" v-for="(item, index) in tableData" :key="index">
      <div v-if="index % 2 == 0">
          <img class="half-left half-pickture"  :src="$host + '/common/download?name='+item.pickture " alt="">
        <div class="half-right half-blog">{{ index }}ssss</div>
      </div>
      <div v-else>
        <div class="half-left half-blog">{{ index }}asssss</div>
        <img class="half-right half-pickture" :src="$host + '/common/download?name='+item.pickture " alt="">
      </div>
    </div>
    <div class="page">
       <el-pagination background 
        layout="prev, pager, next" 
        :total=pageData.total
        :page-size=pageData.pageSize
        :current-page=currentPage
        hide-on-single-page
       >
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      pageData:{
        total:13,
        currentPage:'',
        pageSize:10
      }
    };
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
.page{
  text-align:center;
  margin-top: 10vh;
  margin-bottom: 10vh;
}
.half-left,.half-right{
  height: 300px;
  display: inline-block;
  /* background-color: pink; */
}
.half-right{
  float: right;
}
.half-pickture{
  width: 45%;
  border-radius: 15px;
}
.half-blog{
  width: 50%;
}
img {
  transition: transform 0.5s;
}
img:hover {
  transform: scale(1.1);
}
>>> button.btn-prev{
  height: 40px;
  width: 40px;
    background-color: #f6f8fa;
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
}
/deep/ button.btn-next{
  height: 40px;
  width: 40px;
  background-color: #f6f8fa;
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
}
>>> .el-pagination.is-background .el-pager li{
  height: 40px;
  width: 40px;
  font-size: 15px;
  text-align: center;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  background-color: #f6f8fa;
  box-shadow: 0 3px 8px 6px rgba(7,17,27,0.05);
}
</style>