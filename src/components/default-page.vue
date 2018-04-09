<template lang="pug">
  .default
    a( href="mailto:hello@1k-pictures.com")
      img( src="../assets/compiled/logo.svg")
</template>

<script>

</script>

<script lang="coffee">
export default {
  name: 'DefaultPage',

  beforeCreate: () ->
    document.body.className = 'home';

  beforeDestroy: ()->
    document.body.className = '';
}
</script>

<style lang="scss">
  body.home{ background: url("../assets/background-temp.jpg") no-repeat center center fixed; background-size: cover;
    img{width:135px; position: absolute; margin: auto auto; left:0; right:0; top:0; bottom:0; } ;
  }
</style>
