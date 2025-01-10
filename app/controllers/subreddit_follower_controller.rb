class SubredditFollowerController < ApplicationController
  def create
    subreddit_follower = SubredditFollower.create(
      subreddit_id: params[:subreddit_id],
      user_id: current_user.id
    )
    subreddit_follower.save
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
