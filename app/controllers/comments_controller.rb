class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
    @comment.user_id = current_user.id
    @comment.save

    redirect_back(fallback_location: root_path)
  end

  def update

  end

  def destroy

  end

  private
  def comment_params
    params.require(:comment).permit(:body, :post_id, :user_id)
  end
end
