<template>
  <div class="top"> <!--上方导航栏，里面的文字换成对应路由-->
    <div id="logo">
      <img alt="logo" src="../assets/logo.png">
    </div>
    <div id="main"></div>
    <div id="mine"></div>
    <div id="submit"></div>
    <div id="manage"></div>
    <div id="img">头像</div>
  </div>
</template>

<script>
export default {
  name: 'NavNoLeft'
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.top{
  width: 1417px;
  height: 100px;
  position: relative;
  border-bottom: 17px solid #7eec52;
}

.top #logo{
  width: 78px;
  height: 78px;
  position: absolute;
  top: 10px;
  left: 30px;
  bottom: 10px;
  border: 1px solid #7eec52;
  border-radius: 40px;
  float: left;
}

.top #main{
  line-height: 48px;
  width: 118px;
  height: 48px;
  position: relative;
  top: 25px;
  left: 210px;
  background: #7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
  float: left;
}

.top #mine{
  width: 118px;
  height: 48px;
  position: relative;
  top: 25px;
  left: 330px;
  background: #7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
  float: left;
}

.top #submit{
  width: 118px;
  height: 48px;
  position: relative;
  top: 25px;
  left: 450px;
  background: #7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
  float: left;
}

.top #manage{
  width: 118px;
  height: 48px;
  position: relative;
  top: 25px;
  left: 570px;
  background: #7eec52;
  border: 1px solid#7eec52;
  border-radius: 5px;
  float: left;
}

.top #img{
  width: 78px;
  height: 78px;
  position: relative;
  top: 10px;
  left: 700px;
  background: #7eec52;
  border: 1px solid #7eec52;
  border-radius: 40px;
  float: left;
}
</style>
