class PostController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :show ]
  before_action :redirect_if_no_follow, only: [ :new ]

  def index

  end

  def show

  end

  def new
    render inertia: "Post/New", layout: "application"
  end

  def create

  end

  def edit

  end

  def update

  end

  def destroy

  end

  private
  def redirect_if_no_follow
    @subreddit = Subreddit.find(params[:subreddit_id])

    unless @subreddit.present?
      redirect_back(fallback_location: root_path)
    end

    @subreddit_follower = SubredditFollower.find_by(subreddit_id: @subreddit.id, user_id: current_user.id)

    unless @subreddit_follower.present? or @subreddit.user_id == current_user.id
      redirect_back(fallback_location: root_path)
    end
  end
end
