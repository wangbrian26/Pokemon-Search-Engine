var url = "https://pokeapi.co/api/v2/pokemon";
var pokeInfo = document.querySelector("#pokeInfo");
var submitButton = document.querySelector("#submit");

function getPokemon() {
  var pokemonName = document.querySelector("#pokemonName");
  pokemonName = pokemonName.value;
  var pokemonNameSearch = pokemonName;
  pokemonNameSearch = pokemonNameSearch.toLowerCase();
  pokemonNameSearch = pokemonNameSearch.replace(".", "");
  pokemonNameSearch = pokemonNameSearch.replace(" ", "-");
  console.log(pokemonNameSearch);
  fetch(url + "/" + pokemonNameSearch)
    .then(function (response) {
      if (response.status !== 200) {
        pokeInfo.textContent = "Please enter a valid Pokemon name.";
      }
      return response.json();
    })
    .then(function (data) {
      pokeInfo.textContent = "";
      console.log(data);
      var chosenPokeName = document.createElement("h3");
      chosenPokeName.textContent = pokemonName.toUpperCase();
      pokeInfo.appendChild(chosenPokeName);
      var height = document.createElement("p");
      height.textContent = "Height: " + data.height / 10 + " m";
      pokeInfo.appendChild(height);
      var weight = document.createElement("p");
      weight.textContent = "Weight: " + data.weight / 10 + " kg";
      pokeInfo.appendChild(weight);
      var idNum = document.createElement("p");
      idNum.textContent = "Pokemon ID: " + data.id;
      pokeInfo.appendChild(idNum);
      for (var i = 0; i < data.types.length; i++) {
        var type = document.createElement("p");
        type.textContent = "Type: " + data.types[i].type.name;
        pokeInfo.appendChild(type);
      }
      for (var i = 0; i < data.abilities.length; i++) {
        var abilities = document.createElement("p");
        abilities.textContent =
          "This pokemon has the ability: " + data.abilities[i].ability.name;
        pokeInfo.appendChild(abilities);
      }
      var pokeImage = document.createElement("img");
      pokeImage.setAttribute("src", data.sprite.front_default);
      pokeInfo.appendChild(pokeImage);
    });
}

submitButton.addEventListener("click", getPokemon);
