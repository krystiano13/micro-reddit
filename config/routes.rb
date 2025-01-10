Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  get "up" => "rails/health#show", as: :rails_health_check
  root "home#index"

  get "/subreddits", to: "subreddit#index", as: :subreddits
  get "/subreddits/new", to: "subreddit#new", as: :subreddit_new
  get "/subreddits/:id", to: "subreddit#show"
  get "/subreddits/:id/edit", to: "subreddit#edit", as: :subreddit_edit

  post "/subreddits", to: "subreddit#create"
  patch "/subreddits/:id", to: "subreddit#update"
  delete "/subreddits/:id", to: "subreddit#destroy"

  post "/subreddit_followers", to: "subreddit_followers#create", as: :subreddit_followers_create
  delete "/subreddit_followers/:id", to: "subreddit_followers#destroy", as: :subreddit_follower_destroy
end
