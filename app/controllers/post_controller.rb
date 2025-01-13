class PostController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :show ]
  before_action :redirect_if_no_follow, only: [ :new ]

  def index

  end

  def show

  end

  def new
    render inertia: "Post/New", layout: "application", props: {
      subreddit_id: params[:subreddit_id]
    }
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id

    if @post.save
      redirect_to subreddit_url(id: @post.subreddit_id), inertia: {
        notice: "Post successfully created"
      }
    else
      redirect_to new_subreddit_url(id: @post.subreddit_id), inertia: {
        errors: @post.errors.full_messages
      }
    end
  end

  def edit

  end

  def update

  end

  def destroy

  end

  private
  def post_params
    params.require(:post).permit(:title, :body, :subreddit_id)
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
