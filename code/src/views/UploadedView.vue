<template>
  <NavigationBar />
  <div class="outer_box">
    <!--头像,名字-->
    <div style="display: flex; align-items: center; width: 100%; height: 20%;">
      <img :src= "this.photo_url" class="left_profile" style="margin-left: 60px;" />
      <div class="rectangle_container" style="width: 16%; margin-left: 30px;">
        <p class="theme_font">{{ username }}</p>
      </div>
    </div>
    <div style="display: flex; width: 100%; height: 80%;">
      <div style="display: flex; width: 65%; margin-left: 50px;">
        <div style="display: flex; align-items: center; height: 100%; width: 100%;">
          <el-scrollbar style="display: flex; width: 100%" max-height="100%">
            <div v-for="(song, index) in song_list?.slice(0, max_num)" :key="index" class="box_song_list">
              <div style="width: 80%; margin-left: 50px;">
                <p class="theme_font" style="color: black;" @click="to_song(song.song_id)">{{ song.title }}</p>
              </div>
              <div style="margin-left: 400px;">
                <p class="theme_font" style="color: black;">{{ song.artist }}</p>
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
import { ElMessageBox } from "element-plus";
export default {
  name: 'RecordView',
  components: {
    NavigationBar
  },
  data() {
    return {
      username: this.$cur_user.username,
			photo_url: this.$cur_user.photo_url,
			user_id: this.$cur_user.user_id,
      song_list: []
    }
  },
  created() {
    const here = this
    this.$axios.get('https://mock.apifox.cn/m1/2749792-0-default/api/music/get_uploaded_list').then((response) => {
      if (response.status == 200) {
        const re_data = response.data
						const song_list = re_data.song_list
						song_list.forEach(function(element){
							var song_id = element.song_id
							var title = element.song_title
							var artist = element.song_artist
							here.$data.song_list.push({
								song_id: song_id,
								title: title,
								artist: artist
							})
						})
      }
      else {
        ElMessageBox.alert("获取失败了，尝试联系管理员吧", '提示', {
          confirmButtonText: '确认',
          confirmButtonClass: 'btnFalses'
        })
      }
    })
  },
  methods: {
    to_song(song_id) {
      console.log(song_id)
      //this.$router.push('./song')
    }
  },
}
</script>

<style>
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

.box_song_list {
  border-bottom: 2px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F0FFF0;
  margin-top: 6px;
  border-radius: 20px;
  padding-right: 50px;
}

.btnFalses {
  background: #7eec52 !important;
  border-color: #7eec52 !important;
}
</style>