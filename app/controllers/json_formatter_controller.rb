class JsonFormatterController < ApplicationController
  def index
  end

  def format
    @json = params[:json]
    begin
      @format_json = JSON.pretty_generate(JSON.parse(params[:json]))
    rescue JSON::ParserError => e
      flash[:error] = "invalid json #{e.to_s}"
    end 
    render :index
  end
end
