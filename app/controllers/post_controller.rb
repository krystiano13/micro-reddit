class PostController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :show ]
  before_action :redirect_if_no_follow, only: [ :new ]

  def index
    page = 0
    search = nil

    if params[:page]
      page = params[:page]
    end

    subreddits_followed_by_user = SubredditFollower.where(user_id: current_user.id).select(:subreddit_id)
    subreddits_created_by_user = Subreddit.where(user_id: current_user.id).select(:id)
    @posts = Post.where(subreddit_id: subreddits_followed_by_user)
                 .or(Post.where(subreddit_id: subreddits_created_by_user))
                 .joins(:subreddit)
                 .joins("INNER JOIN users ON subreddits.user_id = users.id")
                 .select("posts.*, users.name AS username")
                 .order(created_at: :desc)
                 .limit(10)
                 .offset(page * 10)

    render inertia: "Home", layout: "application", props: {
      posts: @posts
    }
  end

  def show
    @post = Post.joins(:user).select("posts.*, users.name AS username").find(params[:id])

    if @post.present?
      return render inertia: "Post/Show", layout: "application", props: {
        post: @post
      }
    end

    render file: "#{Rails.root}/public/404.html", layout: false, status: :not_found
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
    @post = Post.find(params[:id])

    if @post.present?
      return render inertia: "Post/Edit", layout: "application", props: {
        post: @post
      }
    end

    render file: "#{Rails.root}/public/404.html", layout: false, status: :not_found
  end

  def update
    @post = Post.find(params[:id])

    if @post.present?
      if @post.update(post_params)
        return redirect_to subreddit_url(id: @post.subreddit_id), inertia: {
          notice: "Post successfully updated"
        }
      else
        return redirect_to edit_post_path(id: @post.id), inertia: {
          errors: @post.errors.full_messages
        }
      end
    end

    redirect_to subreddit_url(id: @post.subreddit_id), inertia: {
      notice: "Post successfully updated"
    }
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
