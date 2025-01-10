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
  get "/subreddits/:id/edit", to: "subreddit#edit"

  post "/subreddits", to: "subreddit#create"
end
