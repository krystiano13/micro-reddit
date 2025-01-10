class SubredditFollower < ApplicationRecord
  validates :subreddit_id, presence: true
  validates :user_id, presence: true, uniqueness: { scope: :subreddit_id }

  belongs_to :user
  belongs_to :subreddit
end
