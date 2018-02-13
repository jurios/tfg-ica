class Segment < ApplicationRecord
  has_many :devices, dependent: :nullify
  has_many :rules, dependent: :destroy
  
  validates :segment_id, presence: true, uniqueness: true
  validates :min_lumens, numericality: true, allow_nil: true
  validates :max_lumens, numericality: true, allow_nil: true
  validate :lumens

  def lumens
    if self.max_lumens != nil && self.min_lumens != nil
      if self.max_lumens < self.min_lumens
        self.errors.add_to_base("min_lumens must be lower or equivalent than max_lumens")
      end
    end
  end
end
