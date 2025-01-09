class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  validates :name, presence: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oauth2]

  def self.from_omniauth(auth)
    Rails.logger.debug "from_auth"
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|

      Rails.logger.debug "Creating user with email: #{auth.info.email}, name: #{auth.info.name}"

      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.name = auth.info.name
      user.avatar_url = auth.info.image
      Rails.logger.debug "from_auth2"

      unless user.save
        Rails.logger.error "User could not be saved: #{user.errors.full_messages.join(', ')}"
      end
      #user.skip_confirmation!
    end
  end
end
