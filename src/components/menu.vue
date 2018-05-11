<template>
<div>
      <div 
      :class="['menu-mask', menushow ? 'mask-fade' : '']"
      :style="maskStyle"
      @click="menuClose">
      </div>
       <div :class="['menu-ban', menushow ? 'menu-out' : '']"
       :style="touchStyle"
       @touchstart="touchStart"
       @touchmove.prevent="touchMove"
       @touchend="touchEnd">
              <ul class="menu-ul">
              <li>个性装扮<span class="theme-name">蔚蓝主题</span></li>
              <li>消息中心<i class="bdage">5</i></li>
              <li>免流量服务</li>
              <li>定时关闭
                  <span @click="tickSwitch">
                     <span v-show="!isTick" class="toggle-x"><i class="t-dot"></i></span>
                     <span v-show="isTick" class="toggle-o"><i class="t-dot"></i></span>
                  </span>
              </li>
              <li>仅Wi-Fi联网 
                   <span @click="connectWifi">
                     <span v-show="!isWifi" class="toggle-x"><i class="t-dot"></i></span>
                     <span v-show="isWifi" class="toggle-o"><i class="t-dot"></i></span>
                  </span>
              </li>
              <li>导入外部歌单</li>
              <li>清理空间</li>
              <li>帮助与反馈</li>
              <li>关于ZMplayer</li>
          </ul>
          <div class="bottom-btns">
              <div class="bot-btn">
                  <img src="../assets/icons/setting.png">设置
              </div>
               <div class="bot-btn">
                  <img src="../assets/icons/quit.png">退出登录
              </div>
          </div>
        </div>
</div>
</template>
<script>
export default {
    name: 'menu',
    props: {
        menushow: false,
    },
    data() {
        return {
            isWifi: true,
            timeOut: false,
            isTick: false,
            onlyWifi: false,
            touchStyle: {},
            maskStyle: {},
            touchXStart: 0,
            touchXEnd: 0,
            touchTime: 0,
            touchTimer: null,
            menuTarget: null,
            menuMask: null,
        }
    },
    watch: {
        menushow(newValue, oldValue) {
            if (newValue) {
                if (this.menuTarget) this.menuTarget.style.transform = 'translateX(0)';
                if (this.menuMask) this.menuMask.style.opacity = 1;
            }
        }
    },
   methods: {
       menuClose() {
           this.$emit('closemenu');
           this.menuTarget.style.transform = 'translateX(-100%)';
           this.menuMask.style.opacity = '';
       },
       tickSwitch() {
           this.isTick = !this.isTick;
       },
       connectWifi() {
           this.isWifi = !this.isWifi;
       },
       touchStart(event) {
           this.touchTimerStart();
           this.menuTarget = document.querySelector('.menu-ban');
           this.menuMask = document.querySelector('.menu-mask');
           this.touchXStart = event.targetTouches[0].clientX;
           this.touchStyle = {
               transition: 'transform 0s linear'
           }
           this.maskStyle = {
               transition: 'opacity 0s linear'
           }
       },
       touchMove(event) {
           const clientX = event.targetTouches[0].clientX;
           const translateX = parseInt(clientX - this.touchXStart); 
           if (translateX < 0) {
               this.menuTarget.style.transform = 'translateX(' + translateX + 'px)';
           }
           const opacityValue = 1 - Math.abs(translateX / (this.menuTarget.offsetWidth));
        //    this.maskStyle = {
        //        opacity: opacityValue
        //    }
           this.menuMask.style.opacity = opacityValue;
       },
       touchEnd(event) {
           this.touchStyle = {
               transition: 'transform 0.22s linear'
           };
           this.maskStyle = {
               transition: 'opacity 0.22s linear'
           };
           clearInterval(this.touchTimer);
           this.touchXEnd = event.changedTouches[0].clientX;
           const changeX = this.touchXStart - this.touchXEnd; 
           if ( changeX > 30 && (this.touchTime) > 0 && (this.touchTime) < 5)
           {
               this.menuClose();
           } else {
               this.menuTarget.style.transform = 'translateX(0)';
               this.menuMask.style.opacity = 1;
           }
           this.touchTime = 0;
       },
       touchTimerStart() {
           this.touchTimer = setInterval(() => {
               this.touchTime++;
           }, 30);
       }
   }

}
</script>
<style scoped>
.menu-wrap{
    position: relative;
}
.menu-ban{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 20%;
    padding: 15px;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../assets/app-bg.jpg');
    transform: translateX(-100%);
    transition: transform .22s linear;
    z-index: 5;
}
.bdage{
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background-color: #ce1c1c;
    color: white;
    font-size: 10px;
    font-style: normal;
}
.theme-name{
    font-size: 13px;
    color: rgb(128, 163, 185);
    display: inline-block;
}
.menu-out{
    transform: translateX(0);
}
.menu-mask{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, .6);
    opacity: 0;
    transition: opacity .22s linear;
    z-index: -1;
}
.mask-fade{
    z-index: 3;
    opacity: 1;
}
.menu-ul{
    -webkit-padding-start: 0;
}
.menu-ul li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    color: #cfddec;
    font-size: 15px;
}
.toggle-x{
    display: inline-block;
    position: relative;
    height: 12px;
    width: 32px;
    border-radius: 8px;
    background-color: #173452;
}
.toggle-x .t-dot{
    display: inline-block;
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #ebebeb;
    box-shadow: 1px 0 1px rgba(0, 0, 0, .3);
    top: -2px;
}
.toggle-o{
    display: inline-block;
    position: relative;
    height: 12px;
    width: 32px;
    border-radius: 8px;
    background-color: #75adb4;
    text-align: right
}
.toggle-o .t-dot{
    position: absolute;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #1fdcf5;
    box-shadow: -1px 0 1px rgba(0, 0, 0, .3);
    top: -2px;
    right: 0;
}
.bottom-btns{
    position: absolute;
    bottom: 0;
    width: 270px;
    border-top: 1px solid #6294c7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
}
.bot-btn{
    font-size: 15px;
    color: #cfddec;
    display: inline-flex;
    align-items: center;
}
.bot-btn img{
    height: 20px;
    margin-right: 3px;
}
</style>


