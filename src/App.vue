<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view/>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    this.$router.push('musichall');
    this.fullScreen();
  },
  methods: {
    fullScreen() {
      var el = document.documentElement;
      var rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;    
      console.log(rfs)  
      if(rfs) {
        rfs.call(el);
      };
    }
  }
}
</script>
<style>
body{
  background-image: url("./assets/app-bg.jpg");
  background-size: cover;
  margin: 0;
}
</style>
