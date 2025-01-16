class AddEditedFieldToTheComment < ActiveRecord::Migration[8.0]
  def change
    add_column :comments, :edited, :boolean, default: false
  end
end
