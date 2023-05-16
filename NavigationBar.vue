<template>
  <div class="top"> <!--上方导航栏，里面的文字换成对应路由-->
    <div id="logo">
      <img alt="logo" src="../assets/logo.png">
    </div>
    <div id="main">主页</div>
    <div id="mine">我的</div>
    <div id="submit">上传音乐</div>
    <div id="manage">管理模式</div>
    <div id="img">头像</div>
  </div>
  <div class="left"> <!--左侧导航栏，里面的文字换成对应路由-->
    <div id="idv">个人界面</div>
    <div id="collect">收藏夹</div>
    <div id="songList">我的歌单</div>
    <div id="care">我的关注</div>
    <div id="message">我的消息</div>
    <div id="record">播放记录</div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar'
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
  border-bottom: 17px solid #7eec52;
  background-attachment: fixed;
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
  font-size: 20px;
  color: white;
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
  line-height: 48px;
  font-size: 20px;
  color: white;
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
  line-height: 48px;
  font-size: 20px;
  color: white;
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
  line-height: 48px;
  font-size: 20px;
  color: white;
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
  line-height: 48px;
  font-size: 20px;
  color: white;
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

.left{
  height: 640px;
  width: 120px;
  border-right: 17px solid #7eec52;
}

.left #idv{
  line-height: 48px;
  font-size: 20px;
  color: white;
  width: 118px;
  height: 48px;
  position: relative;
  top: 50px;
  left: -5px;
  background:#7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
}

.left #collect{
  line-height: 48px;
  font-size: 20px;
  color: white;
  width: 118px;
  height: 48px;
  position: relative;
  top: 100px;
  left: -5px;
  background:#7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
}

.left #songList{
  line-height: 48px;
  font-size: 20px;
  color: white;
  width: 118px;
  height: 48px;
  position: relative;
  top: 150px;
  left: -5px;
  background:#7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
}

.left #care{
  width: 118px;
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  color: white;
  position: relative;
  top: 200px;
  left: -5px;
  background:#7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
}

.left #message{
  line-height: 48px;
  font-size: 20px;
  color: white;
  width: 118px;
  height: 48px;
  position: relative;
  top: 250px;
  left: -5px;
  background:#7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
}

.left #record{
  line-height: 48px;
  font-size: 20px;
  color: white;
  width: 118px;
  height: 48px;
  position: relative;
  top: 300px;
  left: -5px;
  background:#7eec52;
  border: 1px solid #7eec52;
  border-radius: 5px;
}

</style>
