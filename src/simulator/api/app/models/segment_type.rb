class SegmentType < ApplicationRecord
  has_many :child_types, class_name: "SegmentType", foreign_key: "parent_id"
  belongs_to :parent_type, class_name: "SegmentType", optional: true
  has_many :segments

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
