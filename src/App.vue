<template>
  <div>
    <NavbarComponent />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,

  },
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 20px;
}

img {
  max-width: 100%;
  height: auto;
}

h1,
h2 {
  margin: 10px 0;
}
</style>
