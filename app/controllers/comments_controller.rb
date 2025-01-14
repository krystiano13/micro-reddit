class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      redirect_to post_path(id: params[:post_id]), inertia: {
        notice: 'Comment was successfully created.'
      }
    else
      redirect_to post_path(id: params[:post_id]), inertia: {
        errors: @comment.errors.full_messages
      }
    end
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update(comment_params)
    redirect_back(fallback_location: root_path)
  end

  def destroy

  end

  private
  def comment_params
    params.require(:comment).permit(:body, :post_id, :user_id)
  end
end
