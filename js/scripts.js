  const pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon) {
      let pokemonListContainer = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemon-button");
      listItem.appendChild(button);
      pokemonListContainer.appendChild(listItem);
      // Call the separate function to add the event listener
      button.addEventListener("click", function(event) {
      showDetails(pokemon);
      });
    }

    /*function addClickListener(button, pokemon) {
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    }*/

    function loadList() {
    showLoadingMessage(); // Display loading message
      return fetch(apiUrl)
        .then(function (response) {
       hideLoadingMessage(); // Hide loading message when response is received
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
         hideLoadingMessage(); // Hide loading message if there's an error
          console.error(e);
        });
    }

   function loadDetails(item) {
  showLoadingMessage(); // Display loading message
  let url=item.detailsUrl;
  return fetch(url).then(function(response) {
  hideLoadingMessage(); // Hide loading message when response is received
  return response.json();
   }).then(function (details) {
  item.imageUrl = details.sprites.front_defualt;
  item.height = details.height;
  item.types = details.types;
     }).catch(function (e) {
  hideLoadingMessage(); // Hide loading message if there's an error
  console.error(e);
  });
    }

    function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function(){
      console.log(item);
    });
  }

 function showLoadingMessage() {
    let loadingMessage = document.createElement("p");
    loadingMessage.innerText = "Loading...";
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector("p");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();

  // Create the container element
  let pokemonListContainer = document.createElement("div");
  pokemonListContainer.classList.add("pokemon-list");
  document.body.appendChild(pokemonListContainer);

  // Example usage of add() function
  pokemonRepository.add({
    name: "Squirtle",
    height: 1.5,
    types: ["water"],
  });

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });






