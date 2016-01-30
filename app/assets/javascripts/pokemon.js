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

  $('#pokedex').modal('show');
  $('.progress').removeClass('hide');

  $.when(
    $.ajax("/api/pokemon/" + that.id),
    $.ajax('/api/sprite/' + (parseInt(that.id)+1))
  ).then(function(pokemon_info_data, pokemon_image_data) {
    console.log(pokemon_info_data[0], pokemon_image_data);
    that.info = pokemon_info_data[0];
    that.img = 'http://pokeapi.co'+ pokemon_image_data[0].image;
    pokemon_info_to_html(that);
    $('.progress').addClass('hide');
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
    PokemonApp.currentPokemon = new PokemonApp.Pokemon(pokemonUri);
    PokemonApp.currentPokemon.render();
});

$(document).ready(ready);
$(document).on('page:load', ready);

$(document).ready(function(){
  $('#pokedex').on('hidden.bs.modal', function (e) {
    $("#js-pokemon-image").attr('src', '').addClass('hide').removeClass('flash');
    $('.progress').addClass('hide');
    $("dl").addClass('hide').removeClass('bounceIn');
    $("#js-pokemon-name, #js-pokemon-number").text('');
    $("#js-pokemon-name").parent().removeClass('shake');
    $("#show-evolutions").attr("data-resource-uri",'').addClass('hide');
  });
});

function pokemon_info_to_html(pokemon){
  $("#js-pokemon-name").text(pokemon.info.name).parent().addClass('shake animated');
  $("#js-pokemon-number").text("#"+pokemon.info.pkdx_id);
  $("#js-pokemon-height").text(pokemon.info.height);
  $("#js-pokemon-weight").text(pokemon.info.weight);
  $("#js-pokemon-hp").text(pokemon.info.name);
  $("#js-pokemon-attack").text(pokemon.info.attack);
  $("#js-pokemon-defense").text(pokemon.info.defense);
  $("#js-pokemon-sp-atk").text(pokemon.info.sp_atk);
  $("#js-pokemon-sp-def").text(pokemon.info.sp_def);
  $("#js-pokemon-speed").text(pokemon.info.speed);
  $("#js-pokemon-types").html('<dt>Type</dt>');
  $("#js-pokemon-image").attr('src', pokemon.img).removeClass('hide').addClass('animated flash');
  $("dl").removeClass('hide').addClass('animated bounceIn');
  pokemon.info.types.forEach(function(type, index){
    $("#js-pokemon-types").append("<dd>"+type.name+"</dd>");
  });
  handleEvolutions(pokemon.info.evolutions);
}

function handleEvolutions(evolutions){
  if(evolutions.length){
    $("#show-evolutions").attr("data-resource-uri", evolutions[0].resource_uri).removeClass('hide');
  }
}
