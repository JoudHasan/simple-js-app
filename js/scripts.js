let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.6,
    types: ["grass", "poison"]
  },
  {
    name: "Charizard",
    height: 1.9,
    types: ["fire"]
  },
  {
    name: "Squirtle",
    height: 1.5,
    types: ["water"]
  }
];

const heightThreshold = 1.6; // Set the height threshold for special Pokémon

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 1.6) {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big!");
  } else if (pokemonList[i].height < 1.6 && pokemonList[i].height >= 1.0) {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - This is an average size.");
  } else {
    document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - This is very small!");
  }
  document.write("<br>");
}
}
