<template>
<div id="music_hall" :style="hallStyle">
    <div class="slider">
        <div class="slider-group" 
        :style="{width: bannerList.length * clientWidth + 'px'}">
        <div class="slider-item" 
        v-for="item in bannerList"
        :key="item.id"
        :style="item.style"
        >
            <a href="">
                <img :src="item.url" :style="{width: clientWidth + 'px'}"/>
            </a>
        </div>
        </div>
    </div>
    <div class="pop-row">
        <div class="radio-station">
            <img src="../assets/dev/timg-3.jpeg" class="radio-bg">
            <div class="radio-mask">
                <div class="radio-name">个性电台</div>
                <em class="play-rad">
                    <img src="../assets/icons/play-8.png" alt="">
                </em>
            </div>
        </div>
        <div class="recod-block">
            <div class="recod-item">
                <div class="recod-title">
                    <div>新歌推荐</div>
                    <div class="sub-title">Maroom新歌燃爆初夏</div>
                </div>
                <img src="../assets/dev/singer1.jpg" class="recod-img">
            </div>
            <div class="recod-item" style="margin-top: 3.5%">
                <div class="recod-title">
                    <div>数字专辑</div>
                    <div class="sub-title">林宥嘉新歌阅读爱情给你温馨的感动</div>
                </div>
                <img src="../assets/dev/timg-4.jpeg" class="recod-img">
            </div>
        </div>
    </div>
    <div class="album-row">
        <div class="new-album-title">最新专辑
            <a class="more-icon"><img src="../assets/icons/more.png"></a>
        </div>
        <div class="album-region">
            <ul class="album-ls">
                <li class="alb-item">
                    <a>
                        <div class="alb_cover">
                            <img src="../assets/dev/covers/buan.jpg">
                            <i class="alb_play"><img src="../assets/icons/play-9.png"></i>
                        </div>
                        <div class="alb-info">
                            <p>不安</p>
                            <div>庄心妍</div>
                        </div>
                    </a>
                </li>
                <li class="alb-item">
                    <a>
                        <div class="alb_cover">
                            <img src="../assets/dev/covers/hldwm.jpg">
                            <i class="alb_play"><img src="../assets/icons/play-9.png"></i>
                        </div>
                        <div class="alb-info">
                            <p>后来的我们</p>
                            <div>Sunny</div>
                        </div>
                    </a>
                </li>
                <li class="alb-item">
                    <a>
                        <div class="alb_cover">
                            <img src="../assets/dev/covers/manh.jpg">
                            <i class="alb_play"><img src="../assets/icons/play-9.png"></i>
                        </div>
                        <div class="alb-info">
                            <p>蛮荒</p>
                            <div>金志文</div>
                        </div>
                    </a>
                </li>
                <li class="alb-item">
                    <a>
                        <div class="alb_cover">
                            <img src="../assets/dev/covers/pygx.jpg">
                            <i class="alb_play"><img src="../assets/icons/play-9.png"></i>
                        </div>
                        <div class="alb-info">
                            <p>朋友关系</p>
                            <div>欹小瑶</div>
                        </div>
                    </a>
                </li>
                <li class="alb-item">
                    <a>
                        <div class="alb_cover">
                            <img src="../assets/dev/covers/wxfb.jpg">
                            <i class="alb_play"><img src="../assets/icons/play-9.png"></i>
                        </div>
                        <div class="alb-info">
                            <p>无需防备</p>
                            <div>李鑫玲</div>
                        </div>
                    </a>
                </li>
                <li class="alb-item">
                    <a>
                        <div class="alb_cover">
                            <img src="../assets/dev/covers/shenye.jpg">
                            <i class="alb_play"><img src="../assets/icons/play-9.png"></i>
                        </div>
                        <div class="alb-info">
                            <p>深夜</p>
                            <div>小小浩</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import labourtest from '../assets/dev/labourtest.jpg';
import maobuyi from '../assets/dev/maobuyi.jpg';
import mayday from '../assets/dev/mayday.jpg';
import sunnan from '../assets/dev/sunnan.jpg';
import zhangjie from '../assets/dev/zhangjie.jpg';
export default {
  name: 'Home',
  components: {
  },
  data() {
      return {
          displayMenu: false,
          firstLoop: true,
          clientWidth: 0,
          clientHeight: 0,
          bannerIndex: 0,
          hallStyle: {},
          bannerList: [
              {id: 1, url: labourtest, style: {}},
              {id: 2, url: maobuyi, style: {}},
              {id: 3, url: mayday, style: {}},
              {id: 4, url: sunnan, style: {}},
              {id: 5, url: zhangjie, style: {}}
          ]
      }
  },
   methods: {
       bannerLoop() {
           setInterval(() => {
               var index = this.bannerIndex;
               var preIndex = 0;
               var nextIndex = 0;
               preIndex = this.bannerIndex === 0 ? this.bannerList.length - 1 : this.bannerIndex - 1;
               if (this.bannerIndex === this.bannerList.length - 1) {
                   this.bannerIndex = nextIndex = 0;
               } else {
                   nextIndex = ++this.bannerIndex;
               }
               if (!this.firstLoop) {
                    this.bannerList[preIndex].style['transition-duration'] = '0s';
                    this.bannerList[preIndex].style.transform = 'translateX(' + this.clientWidth + 'px) translateZ(0px)';
               }
               this.bannerList[index].style['transition-duration'] = '400ms';
               this.bannerList[index].style.transform = 'translateX(' + (-this.clientWidth) + 'px) translateZ(0px)';

               this.bannerList[nextIndex].style['transition-duration'] = '400ms';
               this.bannerList[nextIndex].style.transform = 'translateX(0) translateZ(0px)';
               this.firstLoop = false;
           }, 3000)
       },
       setHallHeight() {
           setTimeout(() => {
               const header = document.querySelector('#headtool');
               const footer = document.querySelector('.footer');
               console.log(document.body.clientHeight);
               this.hallStyle = {
                     position: 'absolute',
                     width: '100%',
                     top: header.offsetHeight + 'px',
                     bottom: footer.offsetHeight + 'px',
                     overflow: 'auto'
                     }
           }, 200)
       }
  },
   created() {
      this.clientWidth = document.body.clientWidth;
      this.clientHeight = document.body.clientHeight;
      this.bannerList.forEach((item, index) => {
          if (index === 0) {
              item.style = {
                  width: this.clientWidth + 'px',
                  left: -this.clientWidth * index + 'px',
                  'transition-duration': '400ms',
                  transform: 'translateX(0) translateZ(0px)',
              }
          } else {
              item.style = {
                  width: this.clientWidth + 'px',
                  left: -this.clientWidth * index + 'px',
                  'transition-duration': '400ms',
                  transform: 'translateX(' + (this.clientWidth) + 'px) translateZ(0px)',
              } 
          }
      })
  },
  mounted() {
      this.setHallHeight();
      this.bannerLoop();
  }
}
</script>
<style scoped>
.tst-block{
    position: relative;
    height: 50px;
    width: 50px;
    background-color: rgb(252, 208, 113);
    float: left;
    text-align: center;
}
.slider{
    width: 100%;
    overflow: hidden;
    position: relative;
}
.slider-group{
    position: relative;
    overflow: hidden;
    white-space: nowrap;
}
.slider-item{
    position: relative;
    transition-duration: 400ms;
    float: left;
    text-align: center;
    overflow: hidden;
    background-color: #e8e8e8;
}
.slider-item a{
    width: 100%;
    display: block;
    text-decoration: none;
    overflow: hidden;
}
.slider-item img{
    vertical-align: middle;
    background-color: #fefefe;
}
.pop-row{
    padding: 0 2%;
    margin-top: 2%;
    position: relative;
}
.radio-station{
     box-sizing: content-box;
    width: 33%;
    float: left;
    position: relative;
}
.radio-bg{
    display: block;
    width: 100%;
}
.radio-mask{
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    text-align: center;
    background-color: rgba(0,0,0,.45);
    z-index: 3;
}
.radio-name{
    width: 100%;
    color: #fff;
    position: absolute;
    text-align: center;
    bottom: 5%;
}
.play-rad{
    height: 30px;
    position: absolute;
    top: 50%;
    margin-top: -15px;
    left: 50%;
    margin-left: -15px;
}
.play-rad img{
    display: block;
    height: 30px;
}
.recod-block{
    width: 64%;
    float: right;
    position: relative;
}
.recod-item{
    width: 100%;
    background-color: rgba(255,255,255,.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.recod-img{
    width: 24%;
}
.recod-title{
    position: relative;
    width: 70%;
    margin-left: 3%;
    color: #c8d2dc;
}
.sub-title{
    font-size: 12px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.album-row{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.new-album-title{
    box-sizing: border-box;
    width: 100%;
    line-height: 30px;
    text-align: center;
    color: #ececec;
    padding: 10px 3%;
    position: relative;
}
.more-icon{
    position: absolute;
    right: 3%;
    height: 30px;
}
.more-icon img{
    width: 30px;
    text-decoration: none;
}
.album-region{
    padding: 0 8px;
    position: relative;
}
.album-ls{
    width: 100%;
    position: relative;
    list-style-type: none;
    overflow: hidden;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0;
}
.alb-item{
    float: left;
    width: 32.3%;
    margin: 0 0.5%;
    margin-bottom: 8px;
    position: relative;
    overflow: hidden;
}
.alb-item a{
    display: block;
    text-decoration: none;
}
.alb_cover {
    position: relative;
}
.alb_cover img{
    width: 100%;
}
.alb-info {
    padding: 0 5px;
}
.alb-info p{
    font-size: 13px;
    color: #dfe1e2;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 0 1px;
}
.alb-info div{
    font-size: 12px;
    color: #c8d2dc;
    overflow: hidden;
    text-overflow: ellipsis;
}
.alb_play{
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-block;
    bottom: 5%;
    right: 2%;
    z-index: 3;
    background-color: rgba(0,0,0,0);
}
.alb_play img{
    width: 32px;
}
</style>


