<template>
    <div v-if="pokemon" class="d-flex flex-column align-items-center card-container">
        <!-- Bindings de ubicación de la imagen, del nombre del pokémon en alt y del estilo blur -->
        <img :src="pokemon.imageUrl" :alt="pokemon.name" :style="imageStyle" class="pokemon-image" />
        <!-- Si es falso el isValid, muestra el input y el botón -->
        <div class="input-button-container">
            <div v-if="!isValid">
                <!-- Se le agrega el evento keydown.enter al input para poder presionar enter -->
                <input v-model="userInput" placeholder="Nombre del pokémon" class="mb-2 form-control"
                    @keydown.enter="validateName" ref="nameInput" />
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
    <div v-else class="text-center">
        <p>Cargando Pokémon...</p>
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
            this.focusInput(); // Enfoca el input cuando el Pokémon cambia
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.focusInput(); // Enfoca el input al montar el componente
        })
    },
    computed: {
        // Función que procesa la variable de estado isValid
        imageStyle() {
            return {
                // Si la variable isValid es true, pone filter en none; si es false, le agrega un blur
                filter: this.isValid ? 'none' : 'grayscale(100%) brightness(0%) contrast(100%)'
            };
        }
    },
    methods: {
        // Función validadora
        validateName() {
            // Correciones
            const corrections = {
                'nidoranf': "nidoran",
                'nidoranm': "nidoran",
                'farfetchd': "farfetch'd",
                'type-null': ["type: null", "código cero", "codigo cero"],
                'sirfetchd': "sirfetch'd",
                'great-tusk': ["great tusk", "colmilargo"],
                'scream-tail': ["scream tail", "colagrito"],
                'brute-bonnet': ["brute bonnet", "furioseta"],
                'flutter-mane': ["flutter mane", "melenaleteo"],
                'slither-wing': ["slither wing", "reptalada"],
                'sandy-shocks': ["sandy shocks", "pelarena"],
                'roaring-moon': ["roaring moon", "bramaluna"],
                'koraidon': ["koraidon", "winged king", "reyalado"],
                'walking-wake': ["walking wake", "ondulagua"],
                'gouging-fire': ["gouging fire", "flamariete"],
                'raging-bolt': ["raging bolt", "electrofuria"],
                'iron-treads': ["iron treads", "ferrodada"],
                'iron-bundle': ["iron bundle", "ferrosaco"],
                'iron-hands': ["iron hands", "ferropalmas"],
                'iron-jugulis': ["iron jugulis", "ferrocuello"],
                'iron-moth': ["iron moth", "ferropolilla"],
                'iron-thorns': ["iron thorns", "ferropúas", "ferropuas"],
                'iron-valiant': ["iron valiant", "ferropaladín", "ferropaladin"],
                'miraidon': ["miraidon", "iron serpent", "ferromandra"],
                'iron-leaves': ["iron leaves", "ferroverdor"],
                'iron-boulder': ["iron boulder", "ferromole"],
                'iron-crown': ["iron crown", "ferrotesta"],
            }
            // Obtiene el pokémon en minúsculas
            let pokemonName = this.pokemon.name.toLowerCase();
            let formattedPokemonName;
            // Verifica si el nombre del Pokémon está en el mapeo de correcciones
            if (corrections[pokemonName]) {
                if (Array.isArray(corrections[pokemonName])) {
                    this.isValid = corrections[pokemonName].some(
                        (validName) => this.userInput.trim().toLowerCase() === validName.toLowerCase()
                    );
                } else {
                    this.isValid = this.userInput.trim().toLowerCase() === corrections[pokemonName].toLowerCase();
                }
            } else {
                // Excepciones
                const exceptions = ['ho-oh', 'porygon-z', 'wo-chien', 'chien-pao', 'ting-lu', 'chi-yu'];
                // Verifica si el Pokémon está en la lista de excepciones
                if (exceptions.includes(pokemonName)) {
                    // Si está en la lista de excepciones, usa el nombre completo sin cambios
                    formattedPokemonName = pokemonName;
                } else {
                    // Si no está en la lista de excepciones, usa solo la parte antes del guion
                    formattedPokemonName = pokemonName.split('-')[0];
                }
                // Verifica si el nombre obtenido por la api y el ingresado por el usuario son exactamente iguales, estos son homologados a minúsculas. Guarda true en la variable
                this.isValid = this.userInput.trim().toLowerCase() === formattedPokemonName;
            }

            // Emite el valor booleano
            this.$emit('nameChecked', this.isValid);
            if (this.isValid) {
                // Espera 2 segundos y luego llama a fetchNewPokemon
                setTimeout(() => {
                    this.$emit('requestNewPokemon');
                }, 2000);
            }
        },
        focusInput() {
            this.$nextTick(() => {
                if (this.$refs.nameInput) {
                    this.$refs.nameInput.focus(); // Hace foco en el input
                }
            });
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