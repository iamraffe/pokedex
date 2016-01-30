PokemonApp.PokemonEvolutions = function (id, info) {
  this.id = id;
  this.info = info;
};

PokemonApp.PokemonEvolutions.prototype.render = function () {
  console.log("Rendering evolutions for: #" + this.id);

  // You will need some AJAX calls!
};


var evolve = $(document).on("click", "#show-evolutions", function (event) {
  console.log("enter evolutions");
    var $button = $(event.currentTarget);
    // var pokemonUri = $button.data("resource-uri");
    var evolution = new PokemonApp.PokemonEvolutions(PokemonApp.currentPokemon.id, PokemonApp.currentPokemon.info);
    evolution.render();
});

$(document).ready(evolve);
$(document).on('page:load', evolve);
