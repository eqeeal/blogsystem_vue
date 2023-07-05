import request from "../request"

//获取所有的标签
async function getAllTags(){
    return await request({
        url:'/tag/findAllTags',
        
    })
}
async function getPage(e){
    return await request({
        url:"/tag/findAll",
        method:"get",
        params:    {
            page:e.page,
            pageSize:e.pageSize,
            input:e.input
            }
    }).then(res=>{
        e.tableData= res.data.data.records;//获取到的数据需要处理，看网络请求，选择自己需要的数据
        e.total=res.data.data.total;
    })
}

// then(() => {
//     this.$http.post('/api/category/delCate/?id='+id).then(res => {
//       if(res.data.data === '删除成功'){
//         this.$message.success('删除成功')
//       }else{
//         this.$message.error('删除失败！')
//       }
//       this.getAllCate()
//     })
//   }).catch(() => {
//     this.$message.info('已取消删除')    
//   })

async function deltag(e,id){
    return await request({
        url:'/tag/delete',
        method:"post",
        params:{
            id:id
        }
    }).then(res=>{
        if(res.data.success==true){
            e.$message.success('删除成功')
            e.getAllTags()
        }else{
            e.$message.error('删除失败')
            e.getAllTags()
        }

    })
}
    //修改分类
    async function updateTag(e,data){
        return await request({
            url:'/tag/update',
            method:"post",
            data:data
        }).then(res=>{
            e.$message.success('修改成功')
            e.updateDialog= false
            
            e.getAllTags()
        }).catch(()=>{
            e.$message.error("修改失败")
        })
}

    //添加标签
    async function addTag(e,data){
        return await request({
            url:'/tag/addTag',
            method:'post',
            //添加的对象数据
            data
        }).then(res=>{
            console.log(res.success)
            
            if(res.data.success == false ){
                e.$message.error("标签已经存在，请勿重复添加")
            }else{
            console.log(res)
            e.$message.success("添加成功")
            e.addDialog=false
            //添加成功后清空newTag对象里面的数据，防止影响后续操作
            e.newTag = { tagName: '' };
            e.getAllTags()
            }

        }).catch(()=>{
            e.$message.error("系统错误")

        })

}

    //热门标签
    async function showHot(e){
        return await request({
            url:'/tag/showHot',
            method:"get",
            params:{
                "command":e.command
            }
            
        }).then(res=>{
            if(res.data.success===true){
                e.tableData1=res.data.data;
                e.$message.success("热门标签显示")
            }else(
                e.$message.error("啥都没有，显示空气")
            )
        })
    }


    async function deletetags(e,data) {
          // 发送删除请求，并根据响应更新表格数据
         return await request({
            url: '/tag/deleteTags',
            method: 'post',
            data
          }).then(res => {
            console.log(data);
            if (res.data.msg==='全部标签删除成功') {
              e.$message.success('删除成功');
            //   e.tableData = e.tableData.filter(row => !ids.includes(row.id));
            //   e.selectedRows = [];
            e.getAllTags();
            } else {
              e.$message.error('部分标签无法删除');
              e.getAllTags();
            }
          }).catch(err => {
            console.error(err);
            e.$message.error('请求失败');
          });
        }

export default{
    //调用这个函数
    getAllTags,
    getPage,
    deltag,
    updateTag,
    addTag,
    showHot,
    deletetags
}