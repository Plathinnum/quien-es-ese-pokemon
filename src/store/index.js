import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        pokemons: [],  // Estado para almacenar los Pokémon obtenidos
        randomPokemon: null, // Estado para almacenar un Pokémon al azar
        randomPokemonCategory: '',
        // quantityRandomPokemon: 3,
        usedIds: [],
    },
    mutations: {
        setPokemons(state, pokemons) {
            state.pokemons = pokemons;
        },
        setRandomPokemon(state, pokemon) {
            state.randomPokemon = pokemon;
        },
        setRandomPokemonCategory(state, category) {
            state.randomPokemonCategory = category;
        },
        addUsedIds(state, id) {
            state.usedIds.push(id);
            console.log("Ids usadas", state.usedIds)
        },
        resetGameState(state) {
            state.randomPokemon = null;
            state.randomPokemonCategory = '';
            state.usedIds = [];
        },
    },
    actions: {
        async fetchPokemons({ commit }) {
            try {
                const url = "https://pokeapi.co/api/v2/pokemon";
                const { data } = await axios.get(url);
                const pokemons = data.results.map((pokemon, index) => ({
                    ...pokemon,
                    id: index + 1
                }));
                console.log("Lista Pokémon", pokemons)
                commit('setPokemons', pokemons);
            } catch (error) {
                console.error(error);
            }
        },
        async fetchRandomPokemon({ commit, state }) {
            // Función que calcuala si es shiny o no
            function shiny(odds) {
                const randomValue = Math.random();
                return randomValue < odds; // Si randomValue es menor, será shiny
            }

            let id;
            do {
                id = Math.floor(Math.random() * 1024) + 1;
                // id = 311;
            } while (state.usedIds.includes(id)); // Verifica en el state
            // Se guarda la id generada en el array
            commit('addUsedIds', id);
            try {
                const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const isShiny = shiny(0.024);
                // La imagen se escoge según la probabilidad y si esta fue true para un shiny
                const imageUrl = isShiny ? data.sprites.other['home'].front_shiny : data.sprites.other['home'].front_default
                // Crea el objeto del pokémon
                const pokemon = {
                    name: data.name,
                    imageUrl,
                    isShiny,
                };
                console.log("Pokémon random", pokemon);
                commit('setRandomPokemon', pokemon);

                const { data: speciesData } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                //Se crea una variable con la categoría en español
                let generaEntry = speciesData.genera.find(genus => genus.language.name === "es");
                //Si no pudo encontrarla en español, toma la inglesa
                if (!generaEntry) {
                    generaEntry = speciesData.genera.find(genus => genus.language.name === "en");
                }
                // Obtiene el genus (categoría)
                const genera = generaEntry ? generaEntry.genus : 'Categoría no disponible';
                console.log("Categoría", genera);
                commit('setRandomPokemonCategory', genera); // Actualiza la categoría
            } catch (error) {
                console.error(error);
            }
        },
        resetGame({ commit }) {
            commit('resetGameState'); // Asegúrate de tener una mutación que reinicie el estado
        }
        // async fetchRandomPokemonByQuantity({ commit }) {
        //     try {
        //         const p = {}
        //     }
        // },
    },
    getters: {
        pokemons: state => state.pokemons,
        randomPokemon: state => state.randomPokemon,
        usedIds: state => state.usedIds,
    }
});

export default store;
