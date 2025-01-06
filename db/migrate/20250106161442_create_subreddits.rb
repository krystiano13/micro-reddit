class CreateSubreddits < ActiveRecord::Migration[8.0]
  def change
    create_table :subreddits do |t|
      t.string :name
      t.timestamps
    end
    add_index :subreddits, :name, unique: true
  end
end
