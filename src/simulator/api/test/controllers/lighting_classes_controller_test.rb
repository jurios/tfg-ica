require 'test_helper'

class LightingClassesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lighting_class = lighting_classes(:one)
  end

  test "should get index" do
    get lighting_classes_url, as: :json
    assert_response :success
  end

  test "should create lighting_class" do
    assert_difference('LightingClass.count') do
      post lighting_classes_url, params: { lighting_class: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show lighting_class" do
    get lighting_class_url(@lighting_class), as: :json
    assert_response :success
  end

  test "should update lighting_class" do
    patch lighting_class_url(@lighting_class), params: { lighting_class: {  } }, as: :json
    assert_response 200
  end

  test "should destroy lighting_class" do
    assert_difference('LightingClass.count', -1) do
      delete lighting_class_url(@lighting_class), as: :json
    end

    assert_response 204
  end
end
