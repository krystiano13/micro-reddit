class SubredditController < ApplicationController
  def index
    search = params[:search]
    subreddits = []

    if search
      subreddits = Subreddit.where("name like ?", "%#{search}%").limit(10)
    end

    render inertia: "Subreddit/Index", layout: "application", props: {
      subreddits:,
      search:
    }
  end

  def show ;end
  def create ;end
  def new ;end
  def update ;end;
  def edit; end
  def destroy ;end
end
