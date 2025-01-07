class AddFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :full_name, :string, null: true
    add_column :users, :uid, :string, null: true
    add_column :users, :avatar_url, :string, null: true
  end
end
