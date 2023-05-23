let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    types: ["grass", "poison"]
  },
  {
    name: "Charizard",
    height: 1.7,
    types: ["fire"]
  },
  {
    name: "Squirtle",
    height: 1,
    types: ["water"]
  }
];

const heightThreshold = 1.0; // Set the height threshold for special Pokémon

for (let i = 0; i < pokemonList.length; i++) {
  let pokemon = pokemonList[i];
  let pokemonInfo = pokemon.name + " (height: " + pokemon.height + ")";
if (pokemon.height > heightThreshold) {
    pokemonInfo += " - Wow, that's big!";
  }
  document.write(pokemonInfo + "<br>");
}

