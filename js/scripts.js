let pokemonList = [
  {
    name: "Bulbasaur",
    height: 7,
    types: ["grass", "poison"]
  },
  {
    name: "Charmander",
    height: 6,
    types: ["fire"]
  },
  {
    name: "Squirtle",
    height: 5,
    types: ["water"]
  }
];

const heightThreshold = 6; // Set the height threshold for special Pokémon

for (let i = 0; i < pokemonList.length; i++) {
  let pokemon = pokemonList[i];
  let pokemonInfo = pokemon.name + " (height: " + pokemon.height + ")";
if (pokemon.height > heightThreshold) {
    pokemonInfo += " - Wow, that's big!";
  }
  document.write(pokemonInfo + "<br>");
}

