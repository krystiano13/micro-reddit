class HomeController < ApplicationController
  def index
    redirect_to post_index_path
  end
end
