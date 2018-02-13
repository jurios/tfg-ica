class CreateSegments < ActiveRecord::Migration[5.0]
  def change
    create_table :segments do |t|

      t.string :segment_id, default: nil

      t.float :max_lumens, default: nil
      t.float :min_lumens, default: nil

      t.belongs_to :segment_type, index: true

      t.timestamps
    end
  end
end
