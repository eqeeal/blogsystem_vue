<template>
  <div id="chartPage" >
    <!-- <button @click="getServiceData">改变数据</button> -->
    <!-- 上半部分 -->
    <div id="main">
      <el-row>
        <el-col :span="12">
          <el-card style="background-color: #d4d7da">
            <div style="width: 90%; height: 60vh" id="main-left"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="background-color: #ffccbc">
            <div style="width: 90%; height: 60vh" id="main-center"></div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card style="background-color: #c9c3e6">
            <div style="width: 90%; height: 60vh" id="main-right"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="background-color: #d0e6da">
            <div style="width:70%;background-color: white;  border-radius: 20px;">
              <el-select v-model="blogId" filterable placeholder="请选择">
                <el-option
                  v-for="item in list"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <i
                style="scale: 2.1; margin-left: 10px"
                @click="blogId = null"
                class="el-icon-circle-close"
              ></i>
            </div>
            <div style="width: 90%; height: 60vh" id="other-center"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 下半部分 -->
    <div id="other">
      <!-- <div class="other-left"></div> -->

      <!-- <div class="other-right"></div> -->
    </div>
  </div>
</template>
<script>
import $UserHttp from "@/http/index";
import * as echarts from "echarts";
let mycharts;
let mycharts1;
let mycharts2;
let mycharts3;
export default {
  data() {
    return {
      list: [],
      blogId: '',
      tags: [],
      blogCount: [],
      option: {
        title: {
          text: "每个标签对应的博客数",
        },
        tooltip: {},
        xAxis: {
          // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          data: [],
        },
        yAxis: {},
        series: [
          {
            name: "数量",
            type: "bar",
            // data: [5, 20, 36, 10, 10, 20],
            data: [],
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ["#5851db", "#833ab4", "#c13584", "#e1306c","#405de6","#f56040"];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      },
      option1: {
        title: {
          text: "发布博客最多的五个人",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "博客数量",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              // {  name: '每页${this.test}',value: 1048 },
              // {  name: 'Direct' ,value: 735,},
              // {  name: 'Email',value: 580, },
              // { name: 'Union Ads',value: 484, },
              // {  name: 'Video Ads',value: 300, }
            ],
          },
        ],
      },
      option2: {
        title: {
          text: "每个分类对应的博客数量",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "line",
          },
        ],
      },
      option3: {
          title: {
          text: "发布博客最多的五个人",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "line",
          },
        ],
      },
    };
  },
  watch: {
    async blogId() {
      let res = await $UserHttp.userHttp.getEchartsData(this.blogId);
      this.option3.xAxis.data = res.data.data.dateData;
      this.option3.series[0].data = res.data.data.dataData;
      console.log(this.option3.xAxis.data);
      mycharts3.setOption(this.option3);
    },
  },
  created() {
    this.getALL();
    this.getBlogCount();
    this.getCategory();
    this.getBlogByUserId();
  },
  mounted() {
    mycharts = echarts.init(document.getElementById("main-center"));
    mycharts.setOption(this.option);
    mycharts1 = echarts.init(document.getElementById("main-right"));
    mycharts1.setOption(this.option1);
    mycharts2 = echarts.init(document.getElementById("main-left"));
    mycharts2.setOption(this.option2);
    mycharts3 = echarts.init(document.getElementById("other-center"));
    mycharts3.setOption(this.option3);
  },
  methods: {
    //每个标签对应的博客数
    async getALL() {
      let res = await $UserHttp.reltagblogHttp.getTagName();
      this.option.xAxis.data = res.data;
      // console.log(this.option.xAxis.data);
      let re = await $UserHttp.reltagblogHttp.getblogcountbytag();
      this.option.series[0].data = re.data;
      // console.log(this.option.series[0].data)
      mycharts.setOption(this.option);
    },
    //用户发布博客数量最多的五个人
    async getBlogCount() {
      let res = await $UserHttp.reltagblogHttp.getBlogCount();
      // this.option1.series[0].data=res.data.data
      // console.log(this.option1.series[0].data)
      // console.log(res.data.data[1].c)
      //字符串拼接在for循环外定义一个空数组，在for循环里定义一个对象即:{name: xX, value:xx}之后将对象循环push到定义的arry数组内
      var shuzu = [];
      for (let i = 0; i < res.data.data.length; i++) {
        var items = {
          name: res.data.data[i].user_name,
          value: res.data.data[i].c,
        };
        shuzu.push(items);
      }
      // console.log(shuzu)
      this.option1.series[0].data = shuzu;
      mycharts1.setOption(this.option1);
    },
    //每个分类对应的博客数量
    async getCategory() {
      let res = await $UserHttp.reltagblogHttp.getCategoryCount();
      var name = [];
      var count = [];
      // console.log(res.data.data.length);
      for (let i = 0; i < res.data.data.length; i++) {
        name[i] = res.data.data[i].category_name;
        count[i] = res.data.data[i].c;
      }
      // console.log(name);
      // console.log(count);
      this.option2.xAxis.data = name;
      this.option2.series[0].data = count;
      // console.log(this.option2.xAxis.data);
      // console.log(this.option2.series[0].data)
      mycharts2.setOption(this.option2);
    },
    //获取当前用户某个博客对应的评论数
    async getBlogByUserId() {
      let id = localStorage.getItem("userId");
      let res = await $UserHttp.userHttp.getBlogByUserId(id);
          this.blogId = null;
      this.list = res.data.data;
      console.log(this.list);
    },
  },
};
</script>

<style scoped>
.el-card {
  margin: 5px;

}
.el-select{
  border-radius: 20px;
}
</style>