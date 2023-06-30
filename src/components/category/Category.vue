<template>
  <div>
    <div class="out-div">
      <!-- 顶部页面标题 -->
      <h1>分类管理</h1><br>
      <!-- 页面主体内容 -->
      <div class="main-content">
        <div>左边添加分类</div>
        <div>右边显示分类信息</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Category',
    data() {
        return {}
    }
}
</script>

<style scoped>
h1 {
    display: flex;
    justify-content: flex-start;
}
.out-div {
  background-color: white;
  width: inherit;
  height: inherit;
  padding: 1px 10px 10px 10px;
  border: 1px solid white;
  border-radius: 5px;
}
.main-content {
  width: inherit;
  height: inherit;
  /* background-color: ; */
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
</style>