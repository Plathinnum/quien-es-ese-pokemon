import { createStore } from 'vuex';
import axios from 'axios';
import { generationRanges, generateUniqueId, isShiny, getPokemonGenus } from '@/utils/utils';

const store = createStore({
    state: {
        pokemons: [],  // Estado para almacenar los Pokémon obtenidos
        randomPokemon: null, // Estado para almacenar un Pokémon al azar
        randomPokemonCategory: '',
        usedIds: [],
        generatedPokemons: [],
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
        generatePokemon(state, generatedPokemons) {
            state.generatedPokemons = generatedPokemons;
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
            const id = generateUniqueId(state.usedIds, 1, 1024); // Genera un ID único
            commit('addUsedIds', id); // Guarda la ID generada

            try {
                // Solicita datos del Pokémon
                const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const shinyStatus = isShiny(); // Determina si el Pokémon es shiny
                const imageUrl = shinyStatus
                    ? data.sprites.other['home'].front_shiny
                    : data.sprites.other['home'].front_default;

                const pokemon = {
                    name: data.name,
                    imageUrl,
                    isShiny: shinyStatus,
                };
                console.log("Pokémon random", pokemon);
                commit('setRandomPokemon', pokemon);

                // Solicita datos de la especie
                const { data: speciesData } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const genera = getPokemonGenus(speciesData.genera); // Obtiene la categoría
                console.log("Categoría", genera);
                commit('setRandomPokemonCategory', genera);

            } catch (error) {
                console.error("Error al obtener el Pokémon:", error);
            }
        },
        resetGame({ commit }) {
            commit('resetGameState'); // Reinicia el estado en las mutaciones
        },
        async generatePokemon({ commit }, { chosenGeneration, chosenQuantity, chosenEggGroup, chosenShape }) {
            if (!generationRanges[chosenGeneration]) {
                console.error(`Generación ${chosenGeneration} no encontrada en generationRanges.`);
                return;
            }

            const [min, max] = generationRanges[chosenGeneration];
            const tempUsedIds = new Set();
            const generatedPokemons = [];

            try {
                // Obtener datos de especies en el rango
                const speciesPromises = Array.from({ length: max - min + 1 }, (_, i) => {
                    const id = min + i;
                    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                });

                // Resolución de todas las promesas
                const speciesResponses = await Promise.all(speciesPromises);

                // Filtrar especies según el grupo huevo (si aplica)
                const filteredSpecies = speciesResponses.filter(({ data }) => {
                    if (chosenShape !== 'any') { // Filtrar por forma
                        if (!data.shape || data.shape.name !== chosenShape) return false;
                    }
                    // Mantener los otros filtros como el de grupo huevo
                    if (chosenEggGroup !== 'any') {
                        const eggGroups = data.egg_groups.map(group => group.name);
                        if (!eggGroups.includes(chosenEggGroup)) return false;
                    }

                    return true; // Incluir si pasa todos los filtros
                });


                // Generar los Pokémon a partir de las especies filtradas
                while (generatedPokemons.length < chosenQuantity && filteredSpecies.length > 0) {
                    // Seleccionar un ID aleatorio de las especies filtradas
                    const randomIndex = Math.floor(Math.random() * filteredSpecies.length);
                    const speciesData = filteredSpecies.splice(randomIndex, 1)[0].data;

                    // Verificar ID único
                    const id = speciesData.id;
                    if (tempUsedIds.has(id)) continue;

                    // Obtener datos específicos de `pokemon/{id}`
                    const { data: pokemonData } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                    const shinyStatus = isShiny();
                    const imageUrl = shinyStatus
                        ? pokemonData.sprites.other['home'].front_shiny
                        : pokemonData.sprites.other['home'].front_default;

                    // Crear el objeto del Pokémon
                    const pokemon = {
                        name: pokemonData.name,
                        imageUrl,
                        isShiny: shinyStatus,
                        eggGroups: speciesData.egg_groups.map(group => group.name),
                    };

                    tempUsedIds.add(id);
                    generatedPokemons.push(pokemon);
                    console.log("Hola");
                }
            } catch (error) {
                console.error("Error al generar Pokémon:", error);
            }
            commit('generatePokemon', generatedPokemons);
        }
    },
    getters: {
        pokemons: state => state.pokemons,
        randomPokemon: state => state.randomPokemon,
        usedIds: state => state.usedIds,
        generatedPokemons: state => state.generatedPokemons,
    }
});

export default store;
