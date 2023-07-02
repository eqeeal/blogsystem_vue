<template>
    <div class="contain">
       <div class="blog-body">
         <div class="baseInfo">
            <div class="author">我是十三</div>
            <div class="count">
                <span><i class="el-icon-date"></i>2023-10-11</span>/
                <span><i class="el-icon-chat-dot-round"></i>10086条评论</span>/
                <span><i class="el-icon-view"></i>1001011浏览</span>
            </div>
            <hr>
        </div>
        <div class="content">
            内容
        </div>
        <div class="commont">

        </div>
       </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:"",
        }
    },
    methods:{
       
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.contain{
    background-image:  url(@/assets/imgs/read.jpg);
    height: 100vh;
    border: 0px solid;
}
.blog-body{
    background-color: white;
    height: 100vh;
    width: 96vw;
    margin: auto;
}
.baseInfo{
    height: 20vh;
    margin: auto;
    padding: 20px;
}
.author{
    font-size: 40px;
    font-weight: 200;
}
.content{
    padding: 20px;
}
.count{
    margin-top: 2vh;
}
span{
    margin-left: 10px;
    margin-right: 3px;
}
hr{
    margin-top: 5vh;
    border-top: 2px;
}
/deep/ .el-icon-view:before {
    margin-right: 5px;
}
/deep/ .el-icon-date:before {
    margin-right: 5px;
}
/deep/ .el-icon-chat-dot-round:before {
    margin-right: 5px;
}
</style>