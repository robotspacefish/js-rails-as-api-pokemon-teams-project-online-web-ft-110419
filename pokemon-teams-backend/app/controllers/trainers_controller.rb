class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    trainers ? render_data(trainers) : render_error_msg
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    trainer ? render_data(trainer) : render_error_msg
  end

  private
  def render_data(data)
    render json: TrainerSerializer.new(data).to_serialized_json
  end
end
