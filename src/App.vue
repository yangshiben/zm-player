<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>

<style>
body{
  background-image: url("./assets/app-bg.jpg");
  background-size: cover;
  margin: 0;
}
#app{

}
</style>
