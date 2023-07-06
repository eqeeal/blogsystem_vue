<template>
  <div class="main">
    <el-row>
      <div v-if="item.status!==0">
      <el-col :span="3"><getavatarby-user-id :user-id="item.userId"></getavatarby-user-id></el-col>
      <el-col :span="21">
        <div>{{item.name}}</div>
        <div style="margin-top: 40px">{{item.content}}</div>
        <el-image style="width: 50%" v-if="item.photo" :src="getImg(item.photo)"></el-image>
        <el-row>
          <el-col :span="5"><div><font color="gray" size="2" style="margin-top: 10px"> {{item.createTime}}&nbsp;&nbsp;&nbsp;&nbsp;</font></div></el-col>
          <el-col :span="19">
            <div v-if="admin">
              <i @click="dialogVisible1=true" style="scale: 1.25" class="el-icon-message">{{count}}</i>
            </div>
            <div v-else>
              <i @click="post" style="scale: 1.25" class="el-icon-message">{{count}}</i>
            </div>
          </el-col>
        </el-row>
        <div v-if="count>0">
          <div v-if="showMore">
            <el-button @click="showMore=false" type="text">关闭展开</el-button>
            <reCommentlist  :f2="f2" @post="post1" @clo="showMore=false" :admin="admin" :comment="info" :total="count"></reCommentlist>
          </div>
          <div v-else>
            <el-button @click="showMore=true" type="text">展开更多</el-button>
          </div>
        </div>
      </el-col>
      </div>
    </el-row>
    <div v-if="admin">
      <div style="position: fixed;bottom: 0;width: 30%;background-color: white;border-radius: 5px">
        <el-row :gutter="20">
          <el-col :span="14">
            <div style="margin-top: 20px;margin-left: 10px">
              <el-input v-model="input"   maxlength="80" show-word-limit :placeholder="'回复给楼主:'+item.name"  prefix-icon="el-icon-search"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="margin-top: 20px;margin-left: 10px">
              <el-button type="primary" @click="handlePostRecomment" icon="el-icon-edit" round>发送</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div  style="margin-top: 29px;margin-left: 5px">
              <i @click="input=''" style="scale: 2.1" class="el-icon-circle-close"></i>
            </div>
          </el-col>
        </el-row>
      </div>
<!--      <el-dialog-->
<!--          title="提示"-->
<!--          :visible.sync="dialogVisible1"-->
<!--          width="30%"-->
<!--          append-to-body>-->
<!--        <el-row>-->
<!--          <el-col :span="20">-->
<!--            <el-input placeholder="输入内容" v-model="input" style="width: 90%"></el-input>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="cleanOpst">取 消</el-button>-->
<!--    <el-button type="primary" @click="handlePostRecomment">确 定</el-button>-->
<!--  </span>-->
<!--      </el-dialog>-->
    </div>
<!--    <div><userinfotopshow :name="item.name" :userId="item.userId"></userinfotopshow></div>-->
  </div>
</template>

<script>
import ReCommentlist from "@/components/comment/commentVue/reCommentlist.vue";
import GetavatarbyUserId from "@/components/comment/commentVue/getavatarbyUserId.vue";

export default {
  name: "commentItem",
  components: {GetavatarbyUserId, ReCommentlist},
  props:["item","admin","f1","f2","c"],
  data(){
    return{
      dialogVisible1: false,
      input:'',
      showMore:false,
      info:{},
      count:0,
    }
  },
  watch:{
    f1(){
      if(this.item.id===this.c.id){
        this.count++;
      }
    },
    f2(){
      if(this.item.id===this.c.id){
        this.count++;
      }
    }
  },
  mounted() {
    this.info=this.item;
    this.count=this.info.recommentCount;
    if(this.admin!==null){
      this.showMore=this.admin;
    }
  },
  methods:{
    post(){
      this.$emit("post",this.info);
    },
    post1(row){
      this.$emit("post1",this.info,row);
    },
    cleanOpst(){
      this.input='';
      this.dialogVisible1= false;
    },
    async handlePostRecomment(){
      let userId=localStorage.getItem("LoginUserId");
      let s=2;
      if(this.item.userId===userId){
        s=1;
      }
      let data={commentId:this.item.id,status:s,content:this.input,userId:userId};
      await this.$requst.commentHttp.handlePostRecomment(data);
      let res=await this.$requst.commentHttp.getById(this.item.id);
      this.info=res.data.data;
      this.count+=1;
      this.cleanOpst();
    },
    getImg(photo){
      return this.$requst.commentHttp.getImage1(photo)
    },
    // postre(){
    //   this.$emit("postre",this.item)
    // }
  }
}
</script>

<style scoped>
.main{
  padding-left: 10%;
  margin-top: 20px;
}
</style>
