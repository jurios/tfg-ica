class CreateSegmentTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :segment_types do |t|

      t.string :name, default: nil
      t.integer :velocity_min, default: 0
      t.integer :velocity_max, default: 0

      t.float :max_lumens, default: nil
      t.float :min_lumens, default: nil

      t.belongs_to :lighting_class, index: true
      t.references :parent_type, index: true

      t.timestamps
    end
  end
end
