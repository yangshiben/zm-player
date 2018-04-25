<template>
<div>
    <div class="top-tab">
      <span><img src="../assets/icons/menu.png" class="top-icon"></span>
      <div class="tab-block">
          <a>我的</a>
          <a>音乐馆</a>
          <a>发现</a>
      </div>
      <span><img src="../assets/icons/add.png" class="top-icon"></span>
  </div>
  <div class="footer">
      <div class="song-info">
          <span class="round-cover"></span>
          <div class="name-block">
              <div class="song-name">修炼爱情</div>
              <div class="singer">林俊杰</div>
          </div>
      </div>
      <div class="toolblock">
          <img src="../assets/icons/play-5.png">
          <img src="../assets/icons/music.png" style="margin-left: 10px">
      </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style scoped>
.top-tab{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 6px;
    color: white;
    background-color: rgba(0, 0, 0, .3);
}
.top-icon{
    width: 32px;
}
.tab-block{
    display: inline-block;
    font-size: 18px;
    width: 70%;
    text-align: center;
}
.tab-block a{
    color: white;
    text-decoration: none;
    margin: 0 1%;
    opacity: .8;
}
.footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 1.2% 1.5%;
    align-items: center;
    background-color: rgba(0, 0, 0, .3);
    z-index: 3;
}
.song-info{
    display: inline-block;
    width: 70%;
    position: relative;
}
.round-cover{
    display: inline-block;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-image: url('../assets/dev/jj-cover.jpeg');
}
.name-block{
    display: inline-block;
    position: relative;
    margin-left: 1%;
    vertical-align: top;
}
.song-name{
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: white;
    margin-bottom: 3px;
}
.singer{
    color: #aa4fe1;
    font-size: 13px;
}
.toolblock{
    display: inline-block;
}
.toolblock img{
    width: 32px;
}
</style>


