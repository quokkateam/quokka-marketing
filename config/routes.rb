Rails.application.routes.draw do
  root 'home#index'

  post '/inquire' => 'inquiries#create'

end