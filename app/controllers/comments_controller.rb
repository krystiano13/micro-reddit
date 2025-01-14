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

    unless @comment.present?
      return render file: "#{Rails.root}/public/404.html", layout: false, status: :not_found
    end

    if @comment.update(comment_params)
      redirect_to post_path(id: params[:post_id]), inertia: {
        notice: 'Comment was successfully updated.'
      }
    else
      redirect_to post_path(id: params[:post_id]), inertia: {
        errors: @comment.errors.full_messages
      }
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment.present?
      @comment.destroy
    end

    redirect_back(fallback_location: root_path)
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :post_id, :user_id)
  end
end
