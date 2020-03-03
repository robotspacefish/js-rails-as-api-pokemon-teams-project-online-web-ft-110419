class PokemonSerializer
  def initialize(pokemon_obj)
    @pokemon = pokemon_obj
  end

  def to_serialized_json
    @pokemon.to_json(
      :except => [:updated_at, :created_at],
      :include => { :trainer => { :only => [:name] } }
    )
  end
end
