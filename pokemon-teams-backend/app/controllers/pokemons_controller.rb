class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render_data(pokemons)
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    render_data(pokemon)
  end

  def create
    trainer = Trainer.find_by(id: params[:pokemon][:trainer_id])
    pokemon = nil
    if trainer
      pokemon = Pokemon.create(
        nickname: Pokemon.generate_nickname,
        species: Pokemon.generate_species
      )

      pokemon.trainer = trainer
      pokemon.save
      render_data(pokemon)
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy if pokemon
  end

  private
  def render_data(data)
    render json: PokemonSerializer.new(data).to_serialized_json
  end
end
