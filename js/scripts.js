const pokemonRepository = (function() {
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

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  return {
    getAll: getAll,
    add: add
  };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height >= 1.6) {
    document.write(pokemon.name + " (height: " + pokemon.height + ") - Wow, that's big!");
  } else if (pokemon.height < 1.6 && pokemon.height >= 1.0) {
    document.write(pokemon.name + " (height: " + pokemon.height + ") - This is an average size.");
  } else {
    document.write(pokemon.name + " (height: " + pokemon.height + ") - This is very small!");
  }
  document.write("<br>");
});

// Example usage of add() function
pokemonRepository.add({
  name: "Squirtle",
  height: 1.5,
  types: ["water"]
});
