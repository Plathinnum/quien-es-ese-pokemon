<template>
    <div class="container text-center">
        <h1>Generador de Pokémon al azar</h1>
        <div>
            <label for="generation">Generación</label>
            <select v-model="chosenGeneration" id="generation">
                <option v-for="gen in generationOptions" :key="gen.value" :value="gen.value">
                    {{ gen.label }}
                </option>
            </select>

            <label for="egg">Grupo huevo</label>
            <select v-model="chosenEggGroup" id="egg">
                <option v-for="group in eggGroups" :key="group.value" :value="group.value">
                    {{ group.label }}
                </option>
            </select>

            <label for="shape">Forma corporal</label>
            <select v-model="chosenShape" id="shape">
                <option v-for="shape in pokemonShapes" :key="shape.value" :value="shape.value">
                    {{ shape.label }}
                </option>
            </select>

            <label for="quantity">Cantidad</label>
            <select v-model="chosenQuantity" id="quantity">
                <option v-for="qty in Array.from({ length: 6 }, (_, i) => i + 1)" :key="qty" :value="qty">{{ qty }}
                </option>
            </select>

            <button class="btn btn-primary mt-3" @click="triggerGeneratePokemon">Generar</button>
        </div>

        <div class="row justify-content-center mt-4" v-if="generatedPokemons.length">
            <div v-for="pokemon in generatedPokemons" :key="pokemon.name" :class="getCol(generatedPokemons.length)">
                <div class="card mb-3">
                    <img :src="pokemon.imageUrl" :alt="pokemon.name" class="card-img-top" />
                    <div class="card-body">
                        <p><strong>{{ pokemon.name }}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { generationOptions, eggGroups, pokemonShapes } from '@/utils/utils';

export default {
    data() {
        return {
            chosenGeneration: "everygen",
            chosenQuantity: 1,
            chosenEggGroup: "any",
            chosenShape: "any",
        };
    },
    computed: {
        ...mapState(['generatedPokemons']),
        eggGroups() {
            return eggGroups;
        },
        pokemonShapes() {
            return pokemonShapes;
        },
        generationOptions() {
            return generationOptions;
        },
    },
    methods: {
        ...mapActions(['generatePokemon']),
        triggerGeneratePokemon() {
            if (this.chosenGeneration) {
                this.generatePokemon({
                    chosenGeneration: this.chosenGeneration,
                    chosenQuantity: parseInt(this.chosenQuantity, 10),
                    chosenEggGroup: this.chosenEggGroup,
                    chosenShape: this.chosenShape,
                });
            } else {
                alert("Por favor, selecciona una generación.");
            }
        },
        getCol(count) {
            switch (count) {
                case 1:
                    return 'col-md-4'; // Toma el ancho completo
                case 2:
                case 3:
                    return 'col-md-4'; // 3 columnas en la misma fila
                case 4:
                case 6:
                    return 'col-md-6 col-lg-4'; // 2 columnas en cada fila
                case 5:
                    return 'col-md-4'; // 3 en la primera fila, 2 en la segunda
                default:
                    return 'col-md-3';
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
}

.card {
    text-align: center;
}

.card-img-top {
    max-height: 200px;
    object-fit: contain;
}
</style>
