<template>
  <div id="app">
    <!-- <a href="mailto:hello@1k-pictures.com">
      <img src="./assets/compiled/logo.svg">
    </a> -->
    <router-view/>
  </div>
</template>

<script>

</script>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{margin: 0; padding:0;
     -webkit-font-smoothing: antialiased;
	   -moz-osx-font-smoothing: grayscale;
  }
  /* body{background: url("./assets/background-temp.jpg") no-repeat center center fixed; background-size: cover; } */
  /* img{display: none; width:135px; position: absolute; margin: auto auto; left:0; right:0; top:0; bottom:0; } */
  * {font-family: "proxima-nova";}
</style>
