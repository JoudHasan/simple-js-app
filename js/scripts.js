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

ffunction addListItem(pokemon) {
    let pokemonListContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let  button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonListContainer.appendChild(listItem);
    // Call the separate function to add the event listener
    addClickListener(button, pokemon);
  }

  function addClickListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }


 return {
    getAll: getAll,
    add: add
  };
})();

// Create the container element
let pokemonListContainer = document.createElement('div');
pokemonListContainer.classList.add('pokemon-list');
document.body.appendChild(pokemonListContainer);
  
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height >= 1.6) {
    document.write(pokemon.name + " (height: " + pokemon.height + ") - that's big!");
  } else if (pokemon.height < 1.6 && pokemon.height >= 1.0) {
    document.write(pokemon.name + " (height: " + pokemon.height + ") - This is an average size.");
  } else {
    document.write(pokemon.name + " (height: " + pokemon.height + ") - This is very small!");
  }
  document.write("<br>");
});

// usage of add() function
pokemonRepository.add({
  name: "Squirtle",
  height: 1.5,
  types: ["water"]
});
