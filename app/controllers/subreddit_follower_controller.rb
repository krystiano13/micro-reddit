class SubredditFollowerController < ApplicationController
  before_action :authenticate_user!
  def create
    subreddit = Subreddit.find(params[:subreddit_id])

    if subreddit.present?
      if current_user.id != subreddit.user_id
        subreddit_follower = SubredditFollower.create(
          subreddit_id: params[:subreddit_id],
          user_id: current_user.id
        )
        subreddit_follower.save
      end
    end

    redirect_back(fallback_location: root_path)
  end

  def destroy
    subreddit_follower = SubredditFollower.find_by(id: params[:id])

    if subreddit_follower.present?
      subreddit_follower.destroy
    end

    redirect_back(fallback_location: root_path)
  end
end
