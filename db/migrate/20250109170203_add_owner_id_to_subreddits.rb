class AddOwnerIdToSubreddits < ActiveRecord::Migration[8.0]
  def change
    add_belongs_to :subreddits, :user, null: false
  end
end
