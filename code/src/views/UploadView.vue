<template>
  <NavNoleft />
  <!--上传页面的主要功能框-->
  <div id="main">
    <div style="display: flex; margin-left: 1%; margin-top: 2%;">
      <div class="name" style="width: 15%; margin-left: 10px; margin-top: 2%;">
        <p class="Chinese_font">歌曲信息</p>
      </div>
      <div style="width: 70%; margin-left: 2%; margin-top: 2%;">
        <el-form v-model="input_data" :rules="rules" ref="a_input_data">
          <el-form-item prop="input_song_name">
            <!--歌曲名输入栏-->
            <el-input id="i_song" type="text" v-model="input_data.input_song_name" placeholder="请输入歌曲名" />
          </el-form-item>
          <el-form-item prop="input_singer_name">
            <!--歌手名输入栏-->
            <el-input id="i_singer" type="text" v-model="input_data.input_singer_name" placeholder="请输入歌手名（非必需）" />
          </el-form-item>
          <el-form-item prop="selectedTags">
            <!--标签选择-->
            <el-select id="i_tag" v-model="selectedTag" placeholder="请选择标签"  style="width: 100%;" filterable clearable="" @change="selectTag" value-key="id">
              <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item prop="input_lyrics">
            <!--歌词输入栏-->
            <el-input id="i_lyrics" type="textarea" :rows="3" v-model="input_data.input_lyrics" placeholder="请输入歌词（自行分行）"
              resize="none" style=" width: 300px; height: 70px;" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--上传歌曲封面-->
    <div style="display: flex; margin-left: 1%; margin-top: 2%;">
      <input v-show="false" ref="img" type="file" @change="upImg" accept="image/png, image/jpeg" /><!--支持png和jpg-->
      <el-button @click="uploadImgFile"
        style="background-color: #7eec52; color:white ; font-size: large;">上传封面（非必需）</el-button>
      <div id="preview" style="margin-left: 1%;"></div>
    </div>
    <!--上传歌曲按钮-->
    <div style="display: flex; margin-left: 1%; margin-top: 2%;">
      <input v-show="false" ref="audio" type="file" @change="upAudio" accept="audio/*" />
      <el-button @click="uploadAudioFile"
        style="background-color: #7eec52; color:white ; font-size: large;">上传歌曲文件</el-button>
      <span v-if="selectedAudio" style="margin-left:1% ;">{{ selectedAudio.name }}</span>
    </div>
    <!--上传歌曲确认按钮-->
    <div style="display: flex; margin-left: 1%; margin-top: 2%; justify-content: center;">
      <el-button @click="get_input_data"
        style="background-color: #7eec52; color:white ; font-size: larger;">上传歌曲</el-button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import NavNoleft from '@/components/NavNoLeft.vue'

const tagList = [
  { id: 1, name: '流行' },
  { id: 2, name: '摇滚' },
  { id: 3, name: '民谣' },
  { id: 4, name: '电子' },
  { id: 5, name: '舞曲' },
  { id: 6, name: '说唱' },
  { id: 7, name: '爵士' },
  { id: 8, name: '乡村' },
  { id: 9, name: '古典' },
  { id: 10, name: '轻音乐' },
  { id: 11, name: '原声' },
  { id: 12, name: '影视原声' },
];
export default {
  name: 'UploadView',
  components: {
    NavNoleft
  },
  data() {
    return {
      selectedAudio: null,
      selectedImage: null,
      selectedTag: "",
    }
  },
  methods: {
    selectTag(value) {
      this.selectTag = value;
    },
    uploadImgFile() {
      this.$refs.img.dispatchEvent(new MouseEvent('click'))
    },
    uploadAudioFile() {
      this.$refs.audio.dispatchEvent(new MouseEvent('click'))
    },
    upAudio(event) {
      let file = event.target.files[0];
      console.log('选中的音频文件:', file);
      this.selectedAudio = file;
    },
    upImg(event) {
      let file = event.target.files[0];
      console.log('选中的图片文件:', file);
      this.selectedImage = file;
      console.log(this.selectedImage);
      const reader = new FileReader();
      reader.onload = () => {
        let img = document.createElement('img');
        img.onload = () => {
          const maxWidth = 150;
          const maxHeight = 150;
          if (img.width > maxWidth || img.height > maxHeight) {
            const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            img.width *= scale;
            img.height *= scale;
          }
          document.getElementById('preview').innerHTML = '';
          document.getElementById('preview').appendChild(img);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    },
    get_input_data() {
      let song = document.getElementById('i_song').value;
      let singer = document.getElementById('i_singer').value;
      let lyrics = document.getElementById('i_lyrics').value;
      let tag = this.selectTag;
      console.log(tag)
      console.log(song);
      console.log(singer);
      console.log(lyrics);
      return {
        song,
        singer,
        tag,
        lyrics
      }
    }
  },
}
</script>

<script setup>
const input_data = reactive({
  input_song_name: '',
  input_singer_name: '',
  max_tag_count: 3,
  input_lyrics: ''
});
</script>

<style scoped>
.Chinese_font {
  color: white;
  font-size: large;
  font-family: 'Microsoft YaHei', sans-serif;
  ;
}

.name {
  margin-top: 20px;
  border-radius: 30px;
  height: 35px;
  background-color: #7eec52;
  display: flex;
  justify-content: center;
  align-items: center;
}

#main {
  width: 40%;
  border: 2px solid #7eec52;
  position: absolute;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 30px
}
</style>