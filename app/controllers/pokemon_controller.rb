class PokemonController < ApplicationController
  def index
    response = PokemonApi.request("pokedex/1")
    @pokemon = response["pokemon"]
    # byebug
    render(:index)
  end
end
