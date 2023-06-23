const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Pokemon is not correct");
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
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
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

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
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
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item.name, "Height: " + item.height, item.imageUrl);
    });
  }

  function showModal(title, text, imageUrl) {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h2");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-image");
    imageElement.src = imageUrl;
    imageElement.alt = "Pokemon Image";

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", function (e) {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  let modalContainer = document.querySelector("#modal-container");
  modalContainer.addEventListener("click", function (e) {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector("#show-modal").addEventListener("click", function () {
    showModal(
      "Squirtle",
      "Height: 1.5",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    );
  });

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

let pokemonListContainer = document.createElement("div");
pokemonListContainer.classList.add("pokemon-list");
document.body.appendChild(pokemonListContainer);

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
