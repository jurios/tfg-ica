class SegmentTypesController < ApplicationController
  before_action :set_segment_type, only: [:show, :update, :destroy]

  # GET /segment_types
  def index
    @segment_types = SegmentType.all

    render json: @segment_types
  end

  #GET /segment_types/parent
  def parent
    @segment_types = SegmentType.where(parent_type_id: nil)

    render json: @segment_types
  end

  #GET /segment_types/1/children
  def children
    @segment_types = SegmentType.where(parent_type_id: params[:id])

    render json: @segment_types
  end

  # GET /segment_types/1
  def show
    render json: @segment_type
  end

  # POST /segment_types
  def create
    @segment_type = SegmentType.new(segment_type_params)

    if @segment_type.save
      render json: @segment_type, status: :created, location: @segment_type
    else
      render json: @segment_type.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /segment_types/1
  def update
    if @segment_type.update(segment_type_params)
      render json: @segment_type
    else
      render json: @segment_type.errors, status: :unprocessable_entity
    end
  end

  # DELETE /segment_types/1
  def destroy
    @segment_type.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_segment_type
      @segment_type = SegmentType.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def segment_type_params
      params.fetch(:segment_type, {})
    end
end
