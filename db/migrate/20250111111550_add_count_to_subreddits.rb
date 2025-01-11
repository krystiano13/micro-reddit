class AddCountToSubreddits < ActiveRecord::Migration[8.0]
  def change
    add_column :subreddits, :count, :integer, default: 1
  end
end
