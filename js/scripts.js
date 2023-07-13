const pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAllApiUrl() {
    //used to return all items given in apiUrl
    return apiUrl;
  }

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
    let listItem = document.createElement("div");
    listItem.classList.add("col-md-4", "mb-4"); // Add the grid column classes
    let card = document.createElement("div");
    card.classList.add("card");
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = pokemon.name;
    let button = document.createElement("button");
    button.classList.add("btn", "btn-info");
    button.innerText = "Details";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(button);
    card.appendChild(cardBody);
    listItem.appendChild(card);
    pokemonListContainer.appendChild(listItem);
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

  function showModal(title, height, imageUrl) {
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = title;

    let modalBody = document.querySelector("#exampleModal .modal-body");
    modalBody.innerHTML = "";

    let heightElement = document.createElement("p");
    heightElement.innerText = "" + height;

    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-image");
    imageElement.src = imageUrl;
    imageElement.alt = "Pokemon Image";

    modalBody.appendChild(heightElement);
    modalBody.appendChild(imageElement);

    let modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
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

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
