<template>
  <NavigationBar />
  <div class="outer_box">
    <table>
      <tr >
        <td><el-input id="i_song" type="number" placeholder="请输入歌曲id" v-model="this.$data.song_id"
            style="margin-left: 20px" /></td>
        <td><el-button @click="DeleteSong"
            style="background-color: #7eec52; color:white ; font-size: large; margin-left:30px">删除歌曲</el-button></td>
      </tr>
      <tr>
        <td><el-input id="i_songlist" type="number" placeholder="请输入歌单id" v-model="this.$data.songlist_id"
            style="margin-left: 20px" /></td>
        <td><el-button @click="UnshareSongList"
            style="background-color: #7eec52; color:white ; font-size: large; margin-left:30px">取消分享歌单</el-button></td>
      </tr>
    </table>
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
      song_id: '',
      songlist_id: ''
    }
  },
  methods: {
    DeleteSong() {
      if (typeof this.$data.song_id == "undefined" || this.$data.song_id == null || this.$data.song_id == "") {
        return;
      }
      let form_data = new FormData()
      form_data.append('song_id', this.$data.song_id)
      this.$axios.delete('https://mock.apifox.cn/m2/2749792-0-default/83971989', form_data, {
        headers: {
          'Content-type': "multipart/form-data"
        }
      }).then(function (response) {
        if (response.status == 200) {
          ElMessageBox.alert("删除成功", '提示', {
            confirmButtonText: '确认',
            confirmButtonClass: 'btnFalses'
          })
        }
        else{
          ElMessageBox.alert("删除失败了", '提示', {
          confirmButtonText: '确认',
          confirmButtonClass: 'btnFalses'
        })
        }
      })
    },
    UnshareSongList() {
      if (typeof this.$data.songlist_id == "undefined" || this.$data.songlist_id == null || this.$data.songlist_id == "") {
        return;
      }
      let form_data = new FormData()
      form_data.append('songlist_id', this.$data.songlist_id)
      this.$axios.post('https://mock.apifox.cn/m2/2749792-0-default/84700887', form_data, {
        headers: {
          'Content-type': "multipart/form-data"
        }
      }).then(function (response) {
        if (response.status == 200) {
          ElMessageBox.alert("取消分享成功", '提示', {
            confirmButtonText: '确认',
            confirmButtonClass: 'btnFalses'
          })
        }
        else{
          ElMessageBox.alert("取消失败了", '提示', {
          confirmButtonText: '确认',
          confirmButtonClass: 'btnFalses'
        })
        }
      })
    }
  }
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
</style>