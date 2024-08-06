<template>
    <div class="container">
        <div class="row justify-content-center">
            <!-- Iteración de los pokémon del array en data() con el nombre como llave -->
            <div v-for="pokemon in pokemons" :key="pokemon.name" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <!-- Instancia de una card de pokémon, se hace binding del objeto pokemon que se pasa como prop-->
                <PokemonCardComponent :pokemon="{
                    // Clave y nomber obtenido de la api
                    name: pokemon.name,
                    // Ubicación de las imágenes de los ponkémo, se interpola con la id de cada pokémon
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                    // Se escucha el evento chequeador, ejecutará la función que emite si es válido
                }" @nameChecked="handleNameChecked" />
            </div>
        </div>
    </div>
</template>
<script>
import PokemonCardComponent from './PokemonCardComponent.vue';

export default {
    name: 'PokemonComponent',
    components: {
        PokemonCardComponent
    },
    data() {
        return {
            // Variable en donde se guardarán los pokémon de la api
            pokemons: []
        };
    },
    // Función asíncrona que se ejecuta al estar cargado el archivo
    async mounted() {
        try {
            // Se obtienen los datos de la API a través de axios
            const url = "https://pokeapi.co/api/v2/pokemon";
            const { data } = await this.$axios.get(url);
            // Se guardan los datos en la viariable de estado que es un array, se itera con map, se guardan las propiedades y se id (a esta se le agrega +1 para que cada pokémon tenga una id desde el 1 y no desde el 0)
            this.pokemons = data.results.map((pokemon, index) => ({ ...pokemon, id: index + 1 }));
        } catch (error) {
            console.error('Problemas al obtener los datos:', error);
        }
    },
    // Función que emite el valor isCorrect, junto con el nombre del evento
    methods: {
        handleNameChecked(isCorrect) {
            this.$emit('nameChecked', isCorrect);
        }
    }
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>