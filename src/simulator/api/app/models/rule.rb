class Rule < ApplicationRecord
  belongs_to :segment, optional: true
  belongs_to :device, optional: true

  validates :intensity, numericality: true, allow_nil: true
  validate :intensity_value_validation
  validate :intensity_sign_validation

  def intensity_value_validation
    if self.intensity_value != nil
      if self.intensity_value != "absolute" && self.intensity_value != "percentual"
        self.errors.add_to_base("intensity_value must be [absolute|percentual|nil]")
      end
    end
  end

  def intensity_sign_validation
    if self.intensity_sign != nil
      if self.intensity_sign != "+" && self.intensity_sign != "-"
        self.errors.add_to_base("intensity_sign must be [+|-|nil]")
      end
    end
  end
end
