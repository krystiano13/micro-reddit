class SubredditController < ApplicationController
  def index
    search = params[:search]
    page = 0

    subreddits = []

    if params[:page]
      page = params[:page]
    end

    if search
      subreddits = Subreddit.where("name like ?", "%#{search}%").limit(10).offset(page * 10)
    end

    render inertia: "Subreddit/Index", layout: "application", props: {
      subreddits:,
      search:
    }
  end

  def show
    id = params[:id]
    subreddit = nil

    if id
      subreddit = Subreddit.find(id)
    end

    if id and subreddit
      render inertia: "Subreddit/Show", layout: "application"
    else
      render file: "#{Rails.root}/public/404.html", layout: false, status: :not_found
    end
  end

  def create ;end

  def new
    render inertia: "Subreddit/New", layout: "application"
  end

  def update ;end;
  def edit; end
  def destroy ;end

  private
  def subreddit_params
    params.require(:subreddit).permit(:name, :user_id)
  end
end
