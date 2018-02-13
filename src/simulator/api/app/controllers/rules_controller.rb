class RulesController < ApplicationController
  before_action :set_rule, only: [:show, :update, :destroy]

  # GET /rules
  def index
    @rules = Rule.all

    render json: @rules
  end

  # GET /rules/1
  def show
    render json: @rule
  end

  # POST /rules
  def create
    @rule = Rule.new(rule_params)

    if @rule.save
      render json: @rule, status: :created, location: @rule
    else
      render json: @rule.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rules/1
  def update
    if @rule.update(rule_params)
      render json: @rule
    else
      render json: @rule.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rules/1
  def destroy
    @rule.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rule
      @rule = Rule.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def rule_params
      params.require(:rule).permit(
        :preference,
        :priority,
        :inherit_hibernate,
        :allow_hibernate,
        :total_hibernate,
        :delay_hibernate,
        :inherit_intensity,
        :intensity,
        :intensity_value,
        :intensity_sign,
        :inherit_schedule,
        :start_rule_hours,
        :start_rule_minutes,
        :end_rule_hours,
        :end_rule_minutes,
        :inherit_weather,
        :raining,
        :fog,
        :enabled,
        :segment_id,
        :device_id
      )
    end
end
