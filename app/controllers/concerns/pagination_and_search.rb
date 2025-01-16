# frozen_string_literal: true

module PaginationAndSearch
  private
  def pagination_and_search
    @search = ""
    @page = 0

    if params[:search]
      @search = params[:search]
    end

    if params[:page]
      @page = params[:page]
    end
  end
end
