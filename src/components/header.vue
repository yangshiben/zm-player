<template>
<div id="headtool">
    <div class="top-tab">
      <span style="padding-top: 3px" @click="showMenu"><img src="../assets/icons/menu.png" class="top-icon"></span>
      <div class="tab-block">
          <a>我的</a>
          <a>音乐馆</a>
          <a>排行榜</a>
      </div>
      <span style="padding-top: 3px"><img src="../assets/icons/add.png" class="top-icon"></span>
    </div>
    <div class="search-wrap">
        <div class="search-box"><img src="../assets/icons/search.png"> 搜索</div>
    </div>
    <Menu @closemenu="closeMenu" :menushow="displayMenu"></Menu>
</div>
</template>
<script>
import Menu from '@/components/menu'
export default {
  props:{

  },
  data() {
      return {
          displayMenu: false
      }
  },
  components:{
      Menu
  },
  methods: {
      showMenu() {
          this.displayMenu = true;
      },
      closeMenu() {
          this.displayMenu = false;
      }
  }
}
</script>

<style scoped>
.top-tab{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 6px 0;
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
.search-wrap{
    padding: 0 2% 8px; 
    background-color: rgba(0, 0, 0, .3);
    position: relative;
    text-align: center;
}
.search-box{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .3);
    height: 28px;
    line-height: 28px;
    color: rgb(228, 230, 236);
    text-align: center;
    border-radius: 4px;
}
.search-box img{
    width: 22px;
}
</style>

