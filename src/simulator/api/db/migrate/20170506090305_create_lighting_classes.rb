class CreateLightingClasses < ActiveRecord::Migration[5.0]
  def change
    create_table :lighting_classes do |t|

      t.string :name, default: nil

      t.float :lm, default: 0

      t.timestamps
    end
  end
end
