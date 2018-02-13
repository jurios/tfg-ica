class CreateDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :devices do |t|

      t.string :serial_id, default: nil

      t.float :max_lumens, default: nil
      t.float :min_lumens, default: nil
      t.float :lumens, default: nil
      t.boolean :inherit_lumens, default: true

      t.float :longitude, default: nil
      t.float :latitude, default: nil
      t.string :address, default: nil

      t.float :intensity, default: 0

      t.belongs_to :segment, index: true

      t.timestamps
    end
  end
end
