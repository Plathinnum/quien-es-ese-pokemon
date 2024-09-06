<template>
    <div class="container text-center">
        <h1>Pokémon al azar</h1>
        <h2>Pokémon descubiertos:
            <span class="text-warning fw-bold">{{ foundNumber }}</span>
        </h2>
        <PokemonCardComponent :pokemon="randomPokemon" @nameChecked="handleNameChecked"
            @requestNewPokemon="fetchNewPokemon" />
    </div>
</template>

<script>
import PokemonCardComponent from '../components/PokemonCardComponent.vue';

export default {
    name: 'RandomGuessView',
    components: {
        PokemonCardComponent,
    },
    data() {
        return {
            foundNumber: 0,
        }
    },
    computed: {
        randomPokemon() {
            return this.$store.getters.randomPokemon;
        }
    },
    async created() {
        await this.$store.dispatch('fetchRandomPokemon');
    },
    methods: {
        async fetchNewPokemon() {
            await this.$store.dispatch('fetchRandomPokemon');
        },
        handleNameChecked(isCorrect) {
            console.log('Correcto:', isCorrect);
            if (isCorrect) {
                this.updateCounter(true);
            }
        },
        updateCounter(isValid) {
            if (isValid) {
                this.foundNumber += 1;
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}
</style>
