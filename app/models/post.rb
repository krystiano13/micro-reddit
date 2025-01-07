class Post < ApplicationRecord
  belongs_to :user
  belongs_to :subreddit

  validates :user_id, presence: true
  validates :subreddit_id, presence: true
  validates :title, presence: true
  validates :body, presence: true

  has_many :comment
end
