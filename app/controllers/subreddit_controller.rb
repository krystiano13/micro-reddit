class SubredditController < ApplicationController
  before_action :authenticate_user!, only: [ :new, :create, :edit, :update, :destroy ]
  def index
    search = ""
    page = 0

    subreddits = []

    if params[:search]
      search = params[:search]
    end

    if params[:page]
      page = params[:page]
    end

    unless params[:your] or params[:follow]
      if search
        subreddits = Subreddit.where("name like ?", "%#{search}%").limit(10).offset(page * 10)
      else
        subreddits = Subreddit.order(created_at: :desc).limit(10).offset(page * 10)
      end
    end

    if params[:your]
      if search
        subreddits = Subreddit.where("name like ?", "%#{search}%").where(user_id: current_user.id).limit(10).offset(page * 10)
      else
        subreddits = Subreddit.order(created_at: :desc).where(user_id: current_user.id).limit(10).offset(page * 10)
      end
    end

    if params[:follow]
      if search
        subreddits = Subreddit.where("name like ?", "%#{search}%").limit(10).offset(page * 10)
      else
        subreddits = Subreddit.order(created_at: :desc).limit(10).offset(page * 10)
      end
    end

    render inertia: "Subreddit/Index", layout: "application", props: {
      subreddits:,
      search:,
      follow: params[:follow],
      your: params[:your],
    }
  end

  def show
    id = params[:id]
    @subreddit = nil
    subreddit_follower = nil

    if id
      @subreddit = Subreddit.find(id)
    end

    if current_user and @subreddit.present?
      subreddit_follower = SubredditFollower.find_by(subreddit_id: id, user_id: current_user.id)
    end

    if id and @subreddit
      render inertia: "Subreddit/Show", layout: "application", props: {
        id: params[:id],
        subreddit: @subreddit,
        subreddit_follower:
      }
    else
      render file: "#{Rails.root}/public/404.html", layout: false, status: :not_found
    end
  end

  def create
    @new_subreddt = Subreddit.create(subreddit_params)

    if @new_subreddt.save
      return redirect_to subreddit_index_path, inertia: {
        notice: 'Subreddit created!'
      }
    end

    return redirect_to new_subreddit_path, inertia: {
      errors: @new_subreddt.errors.full_messages
    }
  end

  def new
    render inertia: "Subreddit/New", layout: "application"
  end

  def update
    @subreddit = Subreddit.find(params[:id])

    unless @subreddit.present?
      return redirect_to edit_subreddit_path, inertia: {
        errors: [ "Subreddit not found" ]
      }
    end

    if current_user.id != @subreddit.user_id
      return redirect_to edit_subreddit_path, inertia: {
        errors: ["Access Denied"]
      }
    end

    if @subreddit.update(params.require(:subreddit).permit(:name))
      return redirect_to subreddit_index_path, inertia: {
        notice: 'Subreddit updated!'
      }
    end

    redirect_to edit_subreddit_path, inertia: {
      errors: @subreddit.errors.full_messages
    }
  end

  def edit
    @subreddit = Subreddit.find(params[:id])

    unless @subreddit.present?
      return render file: "#{Rails.root}/public/404.html", layout: false, status: :not_found
    end

    if current_user.id != @subreddit.user_id
      return redirect_to subreddit_index_path
    end

    render inertia: "Subreddit/Edit", layout: "application", props: {
      id: params[:id],
      subreddit: @subreddit
    }
  end

  def destroy
    @subreddit = Subreddit.find(params[:id])

    if @subreddit.present?
      if current_user.id == @subreddit.user_id
        Post.where(subreddit_id: @subreddit.id).destroy_all
        @subreddit.destroy
      end
    end

    redirect_to subreddit_index_path
  end

  private
  def subreddit_params
    params.require(:subreddit).permit(:name, :user_id)
  end
end
