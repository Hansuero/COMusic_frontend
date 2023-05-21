<template>
  <NavigationBar />
  <div class="outer_box">
    <!--头像,名字,最近歌曲最多数量-->
    <div style="display: flex; align-items: center; width: 100%; height: 20%;">
      <img src="../assets/profile.png" class="left_profile" style="margin-left: 60px;" />
      <div class="rectangle_container" style="width: 16%; margin-left: 30px;">
        <p class="theme_font">{{ username }}</p>
      </div>
    </div>
    <!--消息栏-->
    <div style="display: flex; width: 100%; height: 80%;">
      <div style="display: flex; width: 65%; margin-left: 50px;">
        <div style="display: flex; align-items: center; height: 100%; width: 100%;">
          <el-scrollbar style="display: flex; width: 100%" max-height="100%">
            <div v-for="(message, index) in message_list" :key="index" class="box_message_list" >
              <div style="width: 80%; margin-left: 10px; margin-right: 400px;">
                <p class="theme_font" style="color: black;">{{ message.sender }}</p>
              </div>
              <div style="width: 80%; margin-left: 50px; ">
                <p class="theme_font" style="color: black; word-wrap: break-word;" >{{ message.content }}</p>
              </div>
              <div style="width: 80%; margin-left: 10px; margin-right: 400px;">
                <p class="theme_font" style="color: black;" >{{ message.time }}</p>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
export default {
  name: 'RecordView',
  components: {
    NavigationBar
  },
  data() {
    return {
      username: 'Tadaoni',
      message_list: [
        {
          message_id: '00',
          sender: "原神高手_A",
          time: '2023-6-1',
          content: "长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试长句测试"
        }, {
          message_id: '01',
          sender: "原神高手_B",
          time: '2023-6-1',
          content: "This is a test_message"
        }, {
          message_id: '02',
          sender: "原神高手_C",
          time: '2023-6-1',
          content: "This is a test_message"
        }, {
          message_id: '03',
          sender: "原神高手_D",
          time: '2023-6-1',
          content: "This is a test_message"
        }, {
          message_id: '04',
          sender: "原神高手_E",
          time: '2023-6-1',
          content: "This is a test_message"
        }, {
          message_id: '05',
          sender: "原神高手_F",
          time: '2023-6-1',
          content: "This is a test_message"
        }, {
          message_id: '06',
          sender: "原神高手_G",
          time: '2023-6-1',
          content: "This is a test_message"
        }, {
          message_id: '07',
          sender: "原神高手_H",
          time: '2023-6-1',
          content: "This is a test_message"
        }, {
          message_id: '08',
          sender: "原神高手_I",
          time: '2023-6-1',
          content: "This is a test_message"
        }, {
          message_id: '09',
          sender: "原神高手_J",
          time: '2023-6-1',
          content: "This is a test_message"
        },
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.outer_box {
  justify-content: center;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  left: 185px;
  top: 20vh;
  width: 80%;
  height: 80vh;
}

.left_profile {
  height: 90px;
  width: 90px;
  border-radius: 50%;
}

.theme_font {
  color: white;
  font-size: normal;
  font-family: 'Microsoft YaHei', sans-serif;
  ;
}

.rectangle_container {
  border-radius: 30px;
  height: 40px;
  display: flex;
  background-color: #7eec52;
  justify-content: center;
  align-items: center;
}

.box_message_list {
  border-bottom: 2px solid grey;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  background-color: #F0FFF0;
  margin-top: 6px;
  border-radius: 10px;
  padding-right: 50px;
}
</style>