<template>
  <div id="play_page" @touchmove.prevent>
      <div class="top-wrap" v-if="songInfo">
          <div class="title-row">
              <i class="down-icon"
              @click="closeComp"><img src="../assets/icons/down.png"></i>
              {{songInfo.title}}
               <i class="down-icon"><img src="../assets/icons/more-2.png"></i>
          </div>
          <div class="singer-row">
              <em class="line-wrap">-</em>
              {{songInfo.singer}}
              <em class="line-wrap">-</em>
          </div>
          <div class="effect-row">
              <label class="efc-label">流畅v</label>
              <label class="efc-label">音效on</label>
          </div>
      </div>
      <div class="cd-wrap" v-if="songInfo">
          <div class="turntable" :style="turnStyle" 
          v-if="songInfo.cover" :key="songInfo.id"></div>
      </div>
      <div class="bottom-tool">
          <div class="lyric">用音乐写一封信 ——《飞云之下》 林俊杰</div>
          <div class="progress-row">
              <span class="pro-time">{{currentPlayTime}}</span>
              <div class="pro-bar">
                  <div class="progress-light" @click="progressClick">
                      <div class="progress-fill" 
                      :style="{width: progressValue * 100 + '%'}">
                      </div>
                  </div>
                  <i class="pro-dot" :style="{left: proDotLeft + 'px'}"
                  @touchstart="dotDragStart"
                  @touchmove="dotDragMove"
                  @touchend="dotDragEnd"></i>
              </div>
              <span class="pro-time">{{durationTime}}</span>
          </div>
          <div class="control-row">
              <i class="ls-icon"><img src="../assets/icons/loop.png"></i>
              <div class="ctrl-group">
                  <i class="pn-icon" @click="playPrevious()">
                      <img src="../assets/icons/previous-2.png"></i>
                  <i class="main-icon"  v-show="!isPlaying" @click="playMusic()">
                      <img src="../assets/icons/play-11.png">
                  </i>
                  <i class="main-icon" v-show="isPlaying" @click="playMusic()">
                      <img src="../assets/icons/pause-4.png">
                  </i>
                  <i class="pn-icon" @click="playNext()">
                      <img src="../assets/icons/next-2.png"></i>
              </div>
              <i class="ls-icon"><img src="../assets/icons/play_list_icon.png"></i>
          </div>
          <div class="action-row">
              <i class="action-icon"><img src="../assets/icons/Collection.png"></i>
              <i class="action-icon"><img src="../assets/icons/download.png"></i>
              <i class="action-icon"><img src="../assets/icons/share.png"></i>
              <i class="action-icon"><img src="../assets/icons/comment.png"></i>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    props: {
        duration: 0,
        isPlaying: false,
        playStop: false,
        proBarWidth: 0,
        proDotWidth: 0,
        playList: {
            type: Array
        }
    },
    data() {
        return {
            playIndex: 0,
            songInfo: null,
            turnInterval: null,
            playInterval: null,
            currentTime: 0,
            currentTimeFormat: '00:00',
            degree: 0,
            progressValue: 0,
            oriValue: 0,
            cdStyle: {},
            turnStyle: {},
            isDrag: false,
            mouseX: 0,
            dragX: 0
        }
    },
    mounted() {
        if (this.playList.length > 0) {
            this.songInfo = this.playList[this.playIndex];
        }
        const clientWidth = document.body.clientWidth;
        const borderWdth = clientWidth * 0.7;
        this.turnStyle = {
            'background-image': 'url(' + this.songInfo.cover + ')',
            width: borderWdth + 'px',
            height: borderWdth + 'px',
            'margin-top': '20%'
        }
        const wrap = document.querySelector('.cd-wrap');
        if (wrap) {
            this.cdStyle = {
                bottom: wrap.offsetHeight + 'px'
            }
        }
    },
    computed: {
        durationTime() {
            const minutes = parseInt(this.duration / 60);
            const seconds = Math.round(this.duration % 60);
            function addZero(num) {
                return num > 9 ? num : '0' + num;
            }
            return addZero(minutes) + ':' + addZero(seconds);
        },
        currentPlayTime() {
             const minutes = parseInt(this.currentTime / 60);
             const seconds = Math.round(this.currentTime % 60);
             function addZero(num) {
                return num > 9 ? num : '0' + num;
             }
             return addZero(minutes) + ':' + addZero(seconds);
        },
        proDotLeft() {
            return (this.proBarWidth - this.proDotWidth) * this.progressValue; 
        }
    },
    watch: {
        isPlaying(newValue, oldValue) {
            if (newValue) {
                this.cdTurning();
                this.playTimer();
            } else {
                this.cdPause();
            }
        },
        playStop(newValue, oldValue) {
            if (newValue === true) {
                this.currentTime = 0;
                this.progressValue = 0;
                const turntable = document.querySelector('.turntable');
                turntable.style.transform = 'rotate(0)';
            }
        },
        isDrag(newValue, oldValue) {
            if (newValue) {
                this.cdPause();
               // this.$emit('playmusic');
            }
        }
    },
    methods: {
        closeComp() {
            this.$emit('closedetail');
        },
        playMusic() {
            this.$emit('playmusic');
        },
        playNext() {
          if (this.playIndex < this.playList.length - 1) {
              this.playIndex++;
          } else {
              this.playIndex = 0;
          }
          this.updateSong();
          
      },
       playPrevious() {
          if (this.playIndex > 0) {
              this.playIndex--;
          } else {
              this.playIndex = this.playList.length - 1;
          }
          this.updateSong();
      },
      updateSong() {
          const newSong = this.playList[this.playIndex];
          this.songInfo = newSong;
          this.turnStyle['background-image'] = 'url(' + this.songInfo.cover + ')'
          this.$emit('playnew', newSong);
          this.playReset();
      },
        cdTurning() {
            const turntable = document.querySelector('.turntable');
            this.turnInterval = setInterval(() => {
                this.degree++;
                turntable.style.transform = 'rotate(' + this.degree + 'deg)'
            }, 33)
        },
        playReset() {
            this.currentTime = 0;
            this.progressValue = 0;
            this.degree = 0;
            this.cdPause();
        },
        cdPause() {
            if(this.turnInterval) {
                clearInterval(this.turnInterval);
            }
            if (this.playInterval) {
                clearInterval(this.playInterval);
            }
        },
        playTimer() {
            this.playInterval = setInterval(() => {
                if (this.currentTime < this.duration) {
                    this.currentTime++;
                    this.progressValue = this.currentTime / this.duration;
                }
            }, 1000)
        },
        dotDragStart(e) {
            this.isDrag = true;
            this.$emit('playmusic', -1);
            this.mouseX = e.touches[0].clientX;
            this.oriValue = this.progressValue;
        },
        dotDragMove(e) {
            if (this.isDrag) {
                const moveX = e.changedTouches[0].clientX;
                if (Math.abs(moveX) < 1) return;
                let dragDist = moveX - this.mouseX;
                if (dragDist > this.proBarWidth) {
                    this.dragDist = this.proBarWidth;
                }
                if (this.oriValue + dragDist / this.proBarWidth < 0) {
                    this.progressValue = 0;
                } else if(this.oriValue + dragDist / this.proBarWidth > 1) {
                    this.progressValue = 1;
                } else {
                    this.progressValue = this.oriValue + dragDist / this.proBarWidth;
                }
                this.currentTime = this.duration * this.progressValue;
                console.log(this.progressValue, this.currentTime);
            }
        },
        dotDragEnd(e) {
            this.isDrag = false;
           // this.currentTime = this.duration * this.progressValue;
           if (Math.abs(this.progressValue - this.oriValue) > 0.01) 
            this.$emit('playmusic', this.currentTime);
        },
        progressClick(e) {
            if (!this.isDrag) {
                const probar = document.querySelector('.pro-bar');
                let xo = e.clientX - probar.offsetLeft;
                if (xo < 0) {
                    xo = 0;
                } else if (xo > probar.offsetWidth) {
                    xo = probar.offsetWidth;
                }          
                this.progressValue = xo / this.proBarWidth;
                this.currentTime = this.duration * this.progressValue;
                if (this.isPlaying)
                this.$emit('playmusic', this.currentTime);
            }
        }
    }
  
}
</script>
<style scoped>
#play_page{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(../assets/cd_bg.jpg);
    z-index: 99;
}
.title-row{
    display: flex;
    left: 0;
    right: 0;
    padding: 8px 3%;
    justify-content: space-between;
    align-items: center;
    color: rgb(232, 233, 236);
    font-size: 18px;
}
.down-icon{
    display: inline-block;
    position: relative;
    width: 25px;
    height: 25px;
}
.down-icon img{
    width: 100%;
}
.singer-row{
    color:  rgb(232, 233, 236);
    text-align: center;
    font-size: 14px;
    margin: 3px 0 10px;
}
.line-wrap{
    margin: 0 5px;
}
.effect-row{
    text-align: center;
}
.efc-label{
    display: inline-block;
    padding: 1px 2px;
    margin: 0 5px;
    border: 1px solid rgb(232, 233, 236);
    border-radius: 2px; 
    color: rgb(232, 233, 236);
    font-size: 12px;
    font-style: normal;
}
.turntable{
    display: inline-block;
    max-width: 80%;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    box-shadow: 0 0 8px 2px rgba(0,0,0,.6);
}
.cd-wrap{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    top: 0;
    bottom: 0;
}
.bottom-tool{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2% 3% 3.5%;
}
.progress-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.pro-time{
    display: inline-block;
    width: 32px;
    font-size: 12px;
    color: rgb(181, 192, 196);
}
.pro-bar{
    display: flex;
    width: 70%;
    position: relative;
    align-items: center;
    height: 16px;
}
.pro-dot{
    display: inline-block;
    position: absolute;
    width: 14px;
    height: 14px;
    left: 0;
    border-radius: 50%;
    background-color: #1fdcf5; 
}
.progress-light{
    position: relative;
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background-color: rgb(181, 192, 196);
}
.progress-fill{
    position: relative;
    width: 0;
    height: 2px;
    border-radius: 1px;
    background-color: #1fdcf5;
}
.control-row{
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}
.ls-icon{
    display: inline-block;
    width: 30px;
    height: 30px;
    position: relative;
}
.ls-icon img{
    width: 100%;
}
.ctrl-group{
    display: inline-flex;
    align-items: center;
}
.ctrl-group img{
    width: 100%;
}
.pn-icon{
    display: inline-block;
    width: 36px;
    height: 36px;
    position: relative;
}
.main-icon{
    display: inline-block;
    width: 48px;
    height: 48px;
    margin: 0 16px;
    position: relative;
}
.action-row{
    position: relative;
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0 0;
}
.action-icon{
    display: inline-block;
    width: 30px;
    height: 30px;
    position: relative;
}
.action-icon img{
    width: 100%;
}
.lyric{
    text-align: center;
    margin: 15px 0 25px;
    width: 100%;
    color: #1fdcf5;
    font-size: 15px;
}

</style>
<style>

</style>



