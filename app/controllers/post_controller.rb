class PostController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]

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
end
