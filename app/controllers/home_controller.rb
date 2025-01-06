class HomeController < ApplicationController
  def index
    render inertia: "Home", layout: "application"
  end
end
