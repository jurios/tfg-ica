require 'test_helper'

class SegmentTypesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @segment_type = segment_types(:one)
  end

  test "should get index" do
    get segment_types_url, as: :json
    assert_response :success
  end

  test "should create segment_type" do
    assert_difference('SegmentType.count') do
      post segment_types_url, params: { segment_type: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show segment_type" do
    get segment_type_url(@segment_type), as: :json
    assert_response :success
  end

  test "should update segment_type" do
    patch segment_type_url(@segment_type), params: { segment_type: {  } }, as: :json
    assert_response 200
  end

  test "should destroy segment_type" do
    assert_difference('SegmentType.count', -1) do
      delete segment_type_url(@segment_type), as: :json
    end

    assert_response 204
  end
end
