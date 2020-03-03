class TrainerSerializer
  def initialize(trainer_obj)
    @trainer = trainer_obj
  end

  def to_serialized_json
    @trainer.to_json(
      :except => [:updated_at, :created_at],
      :include => { :pokemons => { :only => [:species, :nickname, :id] } }
    )
  end
end
