class Subreddit < ApplicationRecord
  before_create :increment_counter
  after_destroy :decrement_counter

  belongs_to :user
  has_many :posts
  validates :name, presence: true, uniqueness: true

  private
  def increment_counter
    last_subreddit = Subreddit.last
    self.count = (last_subreddit.count + 1) if last_subreddit
  end

  private
  def decrement_counter
    last_subreddit = Subreddit.last
    if last_subreddit and last_subreddit.count > 1
      last_subreddit.count -= 1 if last_subreddit
      last_subreddit.save
    end
  end
end
