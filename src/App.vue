<template>
  <div class="container">
    <header class="text-center my-4">
      <img src="/pokemon-logo.png" alt="Logo Pokémon" class="img-fluid col-5" />
      <h1>¿Quién es ese Pokémon?</h1>
      <!-- Se aplica el contador en un span de un h2 -->
      <h2>Pokémon descubiertos:
        <span class="text-warning fw-bold">{{ foundNumber }}</span>
      </h2>
    </header>
    <!-- Se escucha el evento chequeador y se ejecuta la función de contador -->
    <PokemonComponent @nameChecked="updateCounter" />
  </div>
</template>

<script>
import PokemonComponent from './components/PokemonComponent.vue';

export default {
  name: 'App',
  components: {
    PokemonComponent,
  },
  data() {
    return {
      // Variable inicializadora del contador
      foundNumber: 0,
    };
  },
  // Función contadora que verifica si es válido, suma uno a la variable contadora
  methods: {
    updateCounter(isValid) {
      if (isValid) {
        this.foundNumber += 1;
      }
    }
  }
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
