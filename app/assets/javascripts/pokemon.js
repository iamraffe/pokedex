// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// var ready = $(document).on('click', '.js-show-pokemon', function(e) {
//   $('#pokedex').modal('show');
// });

// $('#pokedex').on('show.bs.modal', function (e) {
//   var POKEMON_API_URL = "http://pokeapi.co/api/v1";
//   $.ajax({

//   });
// })

// $(document).ready(ready);
// $(document).on('page:load', ready);

PokemonApp.Pokemon = function (pokemonUri) {
  this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
};

PokemonApp.Pokemon.prototype.render = function () {
  console.log("Rendering pokemon: #" + this.id);
  var that = this;
  $.ajax({
      url: "/api/pokemon/" + that.id,
      success: function (response) {
        that.info = response;

      $("#js-pokemon-name").text(that.info.name);
      $("#js-pokemon-number").text("#"+that.info.pkdx_id);
      $("#js-pokemon-height").text(that.info.height);
      $("#js-pokemon-weight").text(that.info.weight);
      $("#js-pokemon-hp").text(that.info.name);
      $("#js-pokemon-attack").text(that.info.attack);
      $("#js-pokemon-defense").text(that.info.defense);
      $("#js-pokemon-sp-atk").text(that.info.sp_atk);
      $("#js-pokemon-sp-def").text(that.info.sp_def);
      $("#js-pokemon-speed").text(that.info.speed);

      that.info.types.forEach(function(type, index){
        console.log(type);
        $("#js-pokemon-types").append("<dd>"+type.name+"</dd>");
      });


      $('#pokedex').modal('show');
      }
    });

};

PokemonApp.Pokemon.idFromUri = function (pokemonUri) {
  var uriSegments = pokemonUri.split("/");
  var secondLast = uriSegments.length - 2;
  return uriSegments[secondLast];
};

var ready = $(document).on("click", ".js-show-pokemon", function (event) {
  console.log("enter");
    var $button = $(event.currentTarget);
    var pokemonUri = $button.data("pokemon-uri");

    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
});

$(document).ready(ready);
$(document).on('page:load', ready);
