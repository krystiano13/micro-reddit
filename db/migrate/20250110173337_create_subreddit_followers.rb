class CreateSubredditFollowers < ActiveRecord::Migration[8.0]
  def change
    create_table :subreddit_followers do |t|
      t.belongs_to :subreddit
      t.belongs_to :user
      t.timestamps
    end
  end
end
