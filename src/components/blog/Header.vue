<template>
  <div class="header">
    <div class="container">
      <div>
        <div class="user">十三</div>
        <div class="link">
          <li index="/">主页</li>
          <li index="/links">友链</li>
          <li index="/about">关于</li>
          <li index="/about">github</li>
        </div>
      </div>
    </div>
    <div class="desc">我不怕千万人阻挡，只怕自己投降</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setNavBarVisible: false,
    };
  },
};
</script>

<style scoped>
.header {
  background-image: url(../../assets/imgs/header.jpg);
}
.container {
  color: rgb(240, 248, 255, 0.4);
  background-color: rgb(240, 248, 255, 0.3);
  height: 60px;
  line-height: 70px;
  font-size: 20px;
  /* display: inline-block; */
}
li {
  display: inline-block;
  margin-left: 30px;
}
li:hover{
  color: pink;
}
ul {
  position: absolute;
  right: 5vw;
  text-align: right;
}
.user,
.link {
  display: inline-block;
}
.link {
  position: absolute;
  right: 30px;
    cursor: pointer;
}
.desc{
 text-align: center;
 margin-top: 150px;
 font-size: 30px;
 color: rgba(240, 248, 255,0.7);
}
</style>
