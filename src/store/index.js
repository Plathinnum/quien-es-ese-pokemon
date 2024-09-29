import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        pokemons: [],  // Estado para almacenar los Pokémon obtenidos
        randomPokemon: null, // Estado para almacenar un Pokémon al azar
        quantityRandomPokemon: 3,
        randomPokemons: [],
    },
    mutations: {
        setPokemons(state, pokemons) {
            state.pokemons = pokemons;
        },
        setRandomPokemon(state, pokemon) {
            state.randomPokemon = pokemon;
        }
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
        async fetchRandomPokemon({ commit }) {
            try {
                const id = Math.floor(Math.random() * 1024) + 1;
                // const id = 1000;
                const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const pokemon = {
                    name: data.name,
                    imageUrl: data.sprites.other['home'].front_default
                };
                console.log("Pokémon random", pokemon);
                commit('setRandomPokemon', pokemon);
            } catch (error) {
                console.error(error);
            }
        },
        // async fetchRandomPokemonByQuantity({ commit }) {
        //     try {
        //         const p = {}
        //     }
        // },
    },
    getters: {
        pokemons: state => state.pokemons,
        randomPokemon: state => state.randomPokemon
    }
});

export default store;
