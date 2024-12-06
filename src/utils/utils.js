// Rangos de las generaciones
export const generationRanges = {
    'everygen': [1, 1025],
    'generation-i': [1, 151],
    'generation-ii': [152, 251],
    'generation-iii': [252, 386],
    'generation-iv': [387, 493],
    'generation-v': [494, 649],
    'generation-vi': [650, 721],
    'generation-vii': [722, 809],
    'generation-viii': [810, 898],
    'generation-ix': [899, 1025]
};

export const generationOptions = [
    { value: 'everygen', label: 'Todas' },
    { value: 'generation-i', label: 'Generación I' },
    { value: 'generation-ii', label: 'Generación II' },
    { value: 'generation-iii', label: 'Generación III' },
    { value: 'generation-iv', label: 'Generación IV' },
    { value: 'generation-v', label: 'Generación V' },
    { value: 'generation-vi', label: 'Generación VI' },
    { value: 'generation-vii', label: 'Generación VII' },
    { value: 'generation-viii', label: 'Generación VIII' },
    { value: 'generation-ix', label: 'Generación IX' }
];

export const eggGroups = [
    { value: 'any', label: 'Cualquiera' },
    { value: 'no-eggs', label: 'Desconocido' },
    { value: 'ditto', label: 'Ditto' },
    { value: 'plant', label: 'Planta' },
    { value: 'bug', label: 'Bicho' },
    { value: 'flying', label: 'Volador' },
    { value: 'humanshape', label: 'Humanoide' },
    { value: 'mineral', label: 'Mineral' },
    { value: 'indeterminate', label: 'Amorfo' },
    { value: 'field', label: 'Campo' },
    { value: 'water1', label: 'Agua 1' },
    { value: 'water2', label: 'Agua 2' },
    { value: 'water3', label: 'Agua 3' },
    { value: 'monster', label: 'Monstruo' },
    { value: 'fairy', label: 'Hada' },
    { value: 'dragon', label: 'Dragón' },
];

export const pokemonShapes = [
    { value: "any", label: "Cualquiera" },
    { value: "ball", label: "Esférica" },
    { value: "squiggle", label: "Serpenteante" },
    { value: "fish", label: "Pez" },
    { value: "arms", label: "Brazos" },
    { value: "blob", label: "Amorfa" },
    { value: "upright", label: "Erguido" },
    { value: "legs", label: "Piernas" },
    { value: "quadruped", label: "Cuadrúpedo" },
    { value: "wings", label: "Alas" },
    { value: "tentacles", label: "Tentáculos" },
    { value: "heads", label: "Múltiples cabezas" },
    { value: "humanoid", label: "Humanoide" },
    { value: "bug_wings", label: "Alas de insecto" },
    { value: "armor", label: "Armadura" },
];



// Función para generar un ID único
export function generateUniqueId(usedIds, min, max) {
    let id;
    do {
        id = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (usedIds.includes(id)); // Verifica que el ID no se haya generado antes
    return id;
}

// Probabilidad de shiny
export function isShiny(odds = 0.5) {
    return Math.random() < odds;
}

// Obtiene la categoría del Pokémon en español o inglés
export function getPokemonGenus(generaList) {
    const generaEntry = generaList.find(genus => genus.language.name === "es") || generaList.find(genus => genus.language.name === "en");
    return generaEntry ? generaEntry.genus : 'Categoría no disponible';
}