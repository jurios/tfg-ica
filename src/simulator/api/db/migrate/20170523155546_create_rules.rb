class CreateRules < ActiveRecord::Migration[5.0]
  def change
    create_table :rules do |t|

      t.boolean :preference, default: false
      t.integer :priority, default: 100

      t.boolean :inherit_hibernate, default: true
      t.boolean :allow_hibernate, default: false
      t.boolean :total_hibernate, default: false
      t.integer :delay_hibernate, default: 0

      t.boolean :inherit_intensity, default: true
      t.float :intensity, default: nil
      t.string :intensity_value, default: "absolute"
      t.string :intensity_sign, default: "+"

      t.boolean :inherit_schedule, default: true
      t.integer :start_rule_hours, default: nil
      t.integer :start_rule_minutes, default: nil
      t.integer :end_rule_hours, default: nil
      t.integer :end_rule_minutes, default: nil

      t.boolean :inherit_weather, default: true
      t.boolean :raining, default: nil
      t.boolean :fog, default: nil

      t.boolean :enabled, default: true

      t.belongs_to :segment, index: true
      t.belongs_to :device, index: true

      t.timestamps
    end
  end
end
