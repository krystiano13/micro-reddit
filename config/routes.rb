Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  get "up" => "rails/health#show", as: :rails_health_check
  root "home#index"

  resources :post
  resources :subreddit

  post "/subreddit_followers/:subreddit_id", to: "subreddit_follower#create", as: :subreddit_followers_create
  delete "/subreddit_followers/:id", to: "subreddit_follower#destroy", as: :subreddit_follower_destroy
end
