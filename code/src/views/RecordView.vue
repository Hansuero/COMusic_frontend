<!--实际上歌曲和最大数量均需要从数据库中读取-->
<template>
  <NavigationBar />
  <div class="outer_box">
    <!--头像,名字,最近歌曲最多数量-->
    <div style="display: flex; align-items: center; width: 100%; height: 20%;">
      <img src="../assets/profile.png" class="left_profile" style="margin-left: 60px;" />
      <div class="rectangle_container" style="width: 16%; margin-left: 30px;">
        <p class="theme_font">{{ username }}</p>
      </div>
      <div class="rectangle_container" style="width: 18%; margin-left: 20%;">
        <p class="theme_font">最近播放最大数量</p>
      </div>
      <el-input id="i_num" type="number" v-model="max_num" aria-placeholder="{{ max_num }}"
        style="width:auto;margin-left:10px" @change="changeMax" />
    </div>
    <div style="display: flex; width: 100%; height: 80%;">
      <div style="display: flex; width: 65%; margin-left: 50px;">
        <div style="display: flex; align-items: center; height: 100%; width: 100%;">
          <el-scrollbar style="display: flex; width: 100%" max-height="100%">
            <div v-for="(song, index) in song_list.slice(0,max_num)" :key="index" class="box_song_list">
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
export default {
  name: 'RecordView',
  components: {
    NavigationBar
  },
  data() {
    return {
      username: 'Tadaoni',
      max_num: 10,
      song_list: [
        {
          song_id: '00',
          title: 'Song A',
          artist: 'AAA'
        }, {
          song_id: '01',
          title: 'Song B',
          artist: 'BBB'
        }, {
          song_id: '02',
          title: 'Song C',
          artist: 'CCC'
        }, {
          song_id: '03',
          title: 'Song D',
          artist: 'DDD'
        }, {
          song_id: '04',
          title: 'Song E',
          artist: 'EEE'
        }, {
          song_id: '05',
          title: 'Song F',
          artist: 'FFF'
        }, {
          song_id: '06',
          title: 'Song G',
          artist: 'GGG'
        }, {
          song_id: '07',
          title: 'Song H',
          artist: 'HHH'
        }, {
          song_id: '08',
          title: 'Song I',
          artist: 'III'
        }, {
          song_id: '09',
          title: 'Song J',
          artist: 'JJJ'
        },
      ]
    }
  },
  methods: {
    to_song(song_id) {
      console.log(song_id)
      //this.$router.push('./song')
    },
    changeMax() {
      console.log(this.max_num)
    }
  },
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
</style>