<template>
  <div v-if="userInfo!=null" style="margin-top: 20px;margin-bottom: 20px">
    <el-row>
      <el-col :span="3"><getavatarbyname :name="this.userInfo.userAvatar"></getavatarbyname></el-col>
      <el-col :span="21">
        <el-row>
          <el-col :span="5">
            {{userInfo.userName}}
          </el-col>
          <el-col :span="19">
            <div v-if="pUserInfo!=null">
              <el-row>
                <el-col :span="10">
                  回复：
                  <getavatarbyname :name="this.pUserInfo.userAvatar"></getavatarbyname>
                </el-col>
                <el-col :span="14">
                  {{this.pUserInfo.userName}}
                </el-col>
              </el-row>
            </div>

          </el-col>
        </el-row>
        <div style="margin-top: 40px">{{item.content}}</div>
        <el-row>
          <el-col :span="11"><div><font color="gray" size="2" style="margin-top: 10px"> {{item.createTime}}&nbsp;&nbsp;&nbsp;&nbsp;</font></div></el-col>
          <el-col :span="13">
            <div v-if="admin">
              <i @click="dialogVisible=true;show=!show" style="scale: 1.25" class="el-icon-message">{{cout}}</i>
            </div>
            <div v-else>
              <i @click="post" style="scale: 1.25" class="el-icon-message">{{cout}}</i>
            </div>

          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div v-if="admin">
<!--      <el-dialog-->
<!--        title="提示"-->
<!--        :visible.sync="dialogVisible"-->
<!--        width="30%"-->
<!--        append-to-body>-->
<!--      <el-row>-->
<!--        <el-col :span="20">-->
<!--          <el-input placeholder="输入内容" v-model="input" style="width: 90%"></el-input>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="cleanOpst">取 消</el-button>-->
<!--    <el-button type="primary" @click="handlePostRecomment">确 定</el-button>-->
<!--  </span>-->
<!--    </el-dialog>-->
      <div v-if="show" style="transform: translate(-110px);position: fixed;z-index: 200;bottom: 0;width: 30%;background-color: white;border-radius: 5px">
        <el-row :gutter="20">
          <el-col :span="14">
            <div style="margin-top: 20px;margin-left: 10px">
              <el-input v-model="input"   maxlength="80" show-word-limit :placeholder="'回复给:'+userInfo.userName"  prefix-icon="el-icon-search"></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="margin-top: 20px;margin-left: 10px">
              <el-button type="primary" @click="handlePostRecomment" icon="el-icon-edit" round>发送</el-button>
            </div>
          </el-col>
          <el-col :span="4">
            <div  style="margin-top: 29px;margin-left: 5px">
              <i @click="input='';show=false" style="scale: 2.1" class="el-icon-circle-close"></i>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Getavatarbyname from "@/components/comment/commentVue/getavatarbyname.vue";

export default {
  components: {Getavatarbyname},
  name: "reCommentItem",
  props:["item","comment","admin"],
  data(){
    return{
      show:false,
      dialogVisible: false,
      userInfo:null,
      pUserInfo:null,
      cout:0,
      input:''
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    post(){
      this.item.name=this.userInfo.userName;
      this.$emit("po",this.item);
    },
    cleanOpst(){
      this.input='';
      this.dialogVisible= false;
    },
    handlePostRecomment(){
      let userId=localStorage.getItem("LoginUserId");
      let s=2;
      if(this.userInfo.id===userId){
        s=1;
      }
      let data={commentId:this.comment.id,status:s,content:this.input,userId:userId,pid:this.item.id};
      this.$requst.commentHttp.handlePostRecomment(data);
      this.cout+=1;
      this.$emit("post");
      this.cleanOpst();
    },
    async init(){
      let res1=await this.$requst.commentHttp.getUserInfoById(this.item.userId);
      this.userInfo=res1.data.data;
      if(this.item.pid===null){
        let res=await this.$requst.commentHttp.getUserInfoById(this.comment.userId);
        this.pUserInfo=res.data.data;
      }
      else {
        let res=await this.$requst.commentHttp.getUserInfoByPid(this.item.pid);
        this.pUserInfo=res.data.data;
      }
      let res2=await this.$requst.commentHttp.getRecomentReCount(this.item.id);
      this.cout=res2.data.data;
    }
  }
}
</script>

<style scoped>

</style>
