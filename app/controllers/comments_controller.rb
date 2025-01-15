class CommentsController < ApplicationController
  def create
    @comment = Comment.create(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
      render json: {
        comment: @comment
      }, status: :ok
    else
      render json: {
        errors: @comment.errors.full_messages
      }, status: :unprocessable_content
    end
  end

  def update
    @comment = Comment.find(params[:id])

    unless @comment.present?
      return render json: {
        errors: ["Comment not found"]
      }, status: :not_found
    end

    if @comment.update(comment_params)
      render json: {
        comment: @comment
      }, status: :ok
    else
      render json: {
        errors: @comment.errors.full_messages
      }
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment.present?
      @comment.destroy
    end

    render json: {
      message: "Destroyed"
    }, status: :ok
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :post_id, :user_id)
  end
end
