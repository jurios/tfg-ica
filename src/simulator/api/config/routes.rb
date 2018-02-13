Rails.application.routes.draw do
  resources :rules
  resources :lighting_classes
  get '/segment_types/parent', to: 'segment_types#parent'
  get '/segment_types/:id/children', to: 'segment_types#children'
  resources :segment_types

  resources :segments
  get '/segments/:id/rules', to: 'segments#rules'
  resources :devices
  get '/devices/:id/rules', to: 'devices#rules'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
