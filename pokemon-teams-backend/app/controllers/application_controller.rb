class ApplicationController < ActionController::API
  private
  def render_error_msg
    render json: { message: "Not found" }
  end
end
