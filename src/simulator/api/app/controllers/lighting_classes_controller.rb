class LightingClassesController < ApplicationController
  before_action :set_lighting_class, only: [:show, :update, :destroy]

  # GET /lighting_classes
  def index
    @lighting_classes = LightingClass.all

    render json: @lighting_classes
  end

  # GET /lighting_classes/1
  def show
    render json: @lighting_class
  end

  # POST /lighting_classes
  def create
    @lighting_class = LightingClass.new(lighting_class_params)

    if @lighting_class.save
      render json: @lighting_class, status: :created, location: @lighting_class
    else
      render json: @lighting_class.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /lighting_classes/1
  def update
    if @lighting_class.update(lighting_class_params)
      render json: @lighting_class
    else
      render json: @lighting_class.errors, status: :unprocessable_entity
    end
  end

  # DELETE /lighting_classes/1
  def destroy
    @lighting_class.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lighting_class
      @lighting_class = LightingClass.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def lighting_class_params
      params.fetch(:lighting_class, {})
    end
end
