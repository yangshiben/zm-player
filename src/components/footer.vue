<template>
  <div class="footer" v-if="currPlaying">
      <div class="song-info">
          <span :class="['round-cover', isPlaying ? 'rotate' : '']"
          :style="coverStyle"
          @click="showCD = !showCD"></span>
          <div class="name-block">
              <div class="song-name">{{currPlaying.title}}</div>
              <div class="singer">{{currPlaying.snger}}</div>
          </div>
      </div>
      <div class="toolblock">
          <audio id="song" @canplay="setDuration" :key="currPlaying.id">
              <source :src="currPlaying.url">
          </audio>
         <img v-show="!isPlaying" 
          @click="playSong"
         src="../assets/icons/play-6.png">
         <img v-show="isPlaying" 
          @click="playSong"
         src="../assets/icons/pause.png">
          <img src="../assets/icons/queue_music.png" style="margin-left: 10px">
      </div>
      <transition name="show"
      v-on:after-enter="afterAnimEnter">
          <play-detail 
          v-show="showCD"
          :is-playing="isPlaying"
          :play-stop="playStop"
          :duration="duration"
          :play-list="playList"
          :proBarWidth="proBarWidth"
          :proDotWidth="proDotWidth"
          @playmusic="playSong"
          @closedetail="showCD=!showCD"
          @playnew="newPlay"/>
      </transition>
   </div>
</template>
<script>
import PlayDetail from './PlayDetail.vue'
import song1 from '../assets/dev/music/周深-花开.mp3';
import song2 from '../assets/dev/music/田馥甄-最暖的忧伤.mp3';
import song3 from '../assets/dev/music/韩红-飞云之下.mp3';
import song4 from '../assets/dev/music/胡夏-阅读爱情.mp3';
import song5 from '../assets/dev/music/张敬轩-天才儿童1985.mp3';
import cover1 from '../assets/dev/music/huakai.jpg';
import cover2 from '../assets/dev/music/zuinuan.jpg'
import cover3 from '../assets/dev/music/feiyun.jpg'
import cover4 from '../assets/dev/music/yuduaq.jpg'
import cover5 from '../assets/dev/music/tc1985.jpg'
export default {
  name: 'footer',
  components: {
      PlayDetail
  },
  data() {
      return {
            isPlaying: false,
            playStop: false,
            duration: 0,
            song: null,
            timer: null,
            showCD: false,
            playList: [],
            currPlaying: null,
            proBarWidth: 0,
            proDotWidth: 0,
            coverStyle: {},
            playIndex: 0
      }
  },
  methods: {
      playSong(currentTime) {
          const audio = document.querySelector('#song');
          if (currentTime && currentTime >= 0) {
              audio.currentTime = currentTime;
              this.musicPlay(audio)
              return;
           } else if(currentTime && currentTime < 0) {
              this.musicPause()
              return; 
          }
          this.isPlaying = !this.isPlaying;
          if (this.isPlaying) {
             this.musicPlay(audio)
          } else {
             this.musicPause(audio)
          }
      },
      musicPlay(audio){
          this.isPlaying = true;
          audio.play();
          this.songTimer(audio);
      },
      musicPause(audio) {
          this.isPlaying = false;
           audio.pause();
           if (this.timer) {
              clearInterval(this.timer);
           }
      },
      songTimer(audio) {
          const duration = audio.duration;
          if (this.timer) {
              clearInterval(this.timer);
          }
          this.timer = setInterval(() => {
              if (audio.currentTime >= duration) {
                  this.isPlaying = false;
                  this.playStop = true;
                  clearInterval(this.timer);
              }
          }, 1000);
      },
      afterAnimEnter() {
          this.proBarWidth = document.querySelector('.progress-light').offsetWidth;
          this.proDotWidth = document.querySelector('.pro-dot').offsetWidth;
      },
      setDuration(e) {
         // const audio = document.querySelector('#song');
          this.duration = e.target.duration;
      },
      newPlay(song) {
          if (song) {
              this.isPlaying = false;
              this.currPlaying = song;
              setTimeout(() => {
                  const audio = document.querySelector('#song');  
                  audio.currentTime = 0;
                  this.isPlaying = true;
                  this.musicPlay(audio);
              }, 100)
          }
      },
     
  },
  created() {
      this.playList = [{id: 1, url: song1, title: '花开', singer: '周深', cover: cover1},
      {id: 2, url: song2, title: '最暖的忧伤', singer: '田馥甄', cover: cover2}, 
      {id: 3, url: song3, title: '飞云之下', singer: '韩红/林俊杰', cover: cover3},
      {id: 4, url: song4, title: '阅读爱情', singer: '胡夏', cover: cover4},
      {id: 5, url: song5, title: '天才儿童1985', singer: '张敬轩', cover: cover5}
      ];
      this.currPlaying = this.playList[this.playIndex];
      this.coverStyle = {
          'background-image': 'url(' + this.currPlaying.cover + ')'
      }
  },
  mounted() {
          
  }
}
</script>
<style scoped>
.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 6px 1.5%;
    align-items: center;
    background-color: #2465a9;
    z-index: 3;
}
.song-info{
    display: inline-flex;
    width: 70%;
    position: relative;
    align-items: center;
}
.round-cover{
    display: inline-block;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
}
.name-block{
    display: inline-block;
    position: relative;
    margin-left: 10px;
}
.song-name{
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    font-size: 13px;
    margin-bottom: 3px;
}
.singer{
    color: #1fdcf5;
    font-size: 12px;
}
.toolblock{
    display: inline-flex;
    align-content: center;
}
.toolblock img{
    width: 32px;
    height: 32px;
}
#song{
    display: none;
}
.rotate{
    animation: cd-rotate 10s linear infinite;
}
@keyframes cd-rotate {
    from {
        transform: rotate(0)
    }
    to {
        transform: rotate(360deg)
    }
}
.show-enter-active,.show-leave-active{
    transition: all 0.2s ease;
}
.show-enter, .show-leave-to{
    transform: translate(0, 100%);
    opacity: .8;
}
.show-enter-to{
    transform: translate(0, 0);
    opacity: 1;
}
</style>


