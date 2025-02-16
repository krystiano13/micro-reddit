Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  get "up" => "rails/health#show", as: :rails_health_check
  root "home#index"

  resources :post
  get "/post/new/:subreddit_id" => "post#new", as: :post_new
  post "/post/new/:subreddit_id" => "post#create"

  resources :subreddit

  post "/subreddit_followers/:subreddit_id", to: "subreddit_follower#create", as: :subreddit_followers_create
  delete "/subreddit_followers/:id", to: "subreddit_follower#destroy", as: :subreddit_follower_destroy

  get "/comments/:post_id", to: "comments#index", as: :comment
  post "/comments/:post_id", to: "comments#create", as: :comments_create
  patch "/comments/:id", to: "comments#update", as: :comments_update
  delete "/comments/:id", to: "comments#destroy", as: :comments_destroy
end

