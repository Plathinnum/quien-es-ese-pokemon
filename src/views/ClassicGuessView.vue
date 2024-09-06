<template>
    <div class="container">
        <h2>Pokémon descubiertos:
            <span class="text-warning fw-bold">{{ foundNumber }}</span>
        </h2>
        <div class="row justify-content-center">
            <!-- Iteración de los pokémon del array en data() con el nombre como llave -->
            <div v-for="pokemon in pokemons" :key="pokemon.name" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <!-- Instancia de una card de pokémon, se hace binding del objeto pokemon que se pasa como prop-->
                <PokemonCardComponent :pokemon="{
                    // Clave y nomber obtenido de la api
                    name: pokemon.name,
                    // Ubicación de las imágenes de los ponkémon, se interpola con la id de cada pokémon
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                    // Se escucha el evento chequeador, ejecutará la función que emite si es válido
                }" @nameChecked="handleNameChecked" />
            </div>
        </div>
    </div>
</template>
<script>
import PokemonCardComponent from '../components/PokemonCardComponent.vue';

export default {
    name: 'ClassicGuessView',
    components: {
        PokemonCardComponent
    },
    data() {
        return {
            // Variable inicializadora del contador
            foundNumber: 0,
        };
    },
    computed: {
        pokemons() {
            return this.$store.getters.pokemons;
        }
    },
    // Función asíncrona que se ejecuta al estar cargado el archivo
    async mounted() {
        if (!this.pokemons.length) {
            await this.$store.dispatch('fetchPokemons');
        }
    },
    methods: {
        handleNameChecked(isCorrect) {
            this.$emit('nameChecked', isCorrect);
        },
        // Función contadora que verifica si es válido, suma uno a la variable contadora
        updateCounter(isValid) {
            if (isValid) {
                this.foundNumber += 1;
            }
        }
    },
};
// Función que emite el valor isCorrect, junto con el nombre del evento

</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>