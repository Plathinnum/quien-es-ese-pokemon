<template>
    <div class="d-flex flex-column align-items-center card-container">
        <!-- Bindings de ubicación de la imagen, del nombre del pokémon en alt y del estilo blur -->
        <img :src="pokemon.imageUrl" :alt="pokemon.name" :style="imageStyle" class="pokemon-image" />
        <!-- Si es falso el isValid, muestra el input y el botón -->
        <div class="input-button-container">
            <div v-if="!isValid">
                <!-- Se le agrega el evento keydown.enter al input para poder presionar enter -->
                <input v-model="userInput" placeholder="Nombre del pokémon" class="mb-2 form-control"
                    @keydown.enter="validateName" />
                <!-- Evento click para el botón -->
                <button @click="validateName" class="btn btn-success">
                    Descubrir
                </button>
            </div>
            <!-- Si es true isValid, quita lo demás y muestra solo un h3 con el nombre ingresado -->
            <div v-else>
                <h3 class="pokemon-label">{{ userInput }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PokemonCardComponent',
    // Utiliza el prop del objeto pokemon completo
    props: {
        pokemon: Object
    },
    data() {
        return {
            // Variable inicializada vacía, es el input que pone el usuario
            userInput: '',
            // Variable inicializada en falso, para vecificar si está correcto el nombre
            isValid: false
        };
    },
    watch: {
        // Cada vez que el Pokémon cambie, reinicia los valores
        pokemon() {
            this.userInput = '';  // Reinicia el input
            this.isValid = false; // Reinicia la validación
        }
    },
    computed: {
        // Función que procesa la variable de estado isValid
        imageStyle() {
            return {
                // Si la variable isValid es true, pone filter en none; si es false, le agrega un blur
                filter: this.isValid ? 'none' : 'blur(5px) grayscale(100%)'
            };
        }
    },
    methods: {
        // Función validadora
        validateName() {
            // Verifica si el nombre obtenido por la api y el ingresado por el usuario son exactamente iguales, estos son homologados a minúsculas. Guarda true en la variable
            this.isValid = this.userInput.trim().toLowerCase() === this.pokemon.name.toLowerCase();
            // Emite el valor booleano
            this.$emit('nameChecked', this.isValid);
            if (this.isValid) {
                // Espera 2 segundos y luego llama a fetchNewPokemon
                setTimeout(() => {
                    this.$emit('requestNewPokemon');
                }, 2000);
            }
        }
    }
};
</script>

<style scoped>
.card-container {
    max-width: 100%;
    text-align: center;
}

.pokemon-image {
    max-width: 100%;
    height: auto;
}

.pokemon-label {
    font-weight: bold;
    text-transform: capitalize;
}

.input-button-container {
    min-height: 85px;
    /* Ajusta según el tamaño que desees */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>