<template>
  <nav>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin: 0;
  padding: 0;
}

nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-size: 20px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup>
</script>
