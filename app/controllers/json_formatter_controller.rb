class JsonFormatterController < ApplicationController
  def index
  end

  def format
    @json = params[:json]
    begin
      @format_json = JSON.pretty_generate(JSON.parse(params[:json]))
    rescue 
      flash[:error] = "invalid json"
    end
    render :index
  end
end
