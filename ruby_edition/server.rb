# frozen_string_literal: true

require 'sinatra'
require 'sinatra/namespace'
require 'sinatra/cors'
require 'date'
require_relative './cm_challenge/api'
require_relative './cm_challenge/absences'

set :allow_origin, 'http://localhost:3000'
set :port, 3333

absences = CmChallenge::Api.absences
members = CmChallenge::Api.members
CmChallenge::Absences.merge_absences_and_members(absences, members)

namespace '' do
  get '/' do
    CmChallenge::Absences.to_ical(absences)
    send_file './tmp/absences.ics', filename: 'absences.ics'
  end
end

namespace '/absences' do
  before do
    content_type 'application/json'
  end

  get '' do
    response = absences
    if params[:userId]
      response = response.select { |abs| abs[:user_id] == params[:userId].to_i }
    end
    if params[:startDate] && params[:endDate]
      date = params[:startDate].split('-')
      filter_start = Date.new(date[0].to_i, date[1].to_i, date[2].to_i)
      date = params[:endDate].split('-')
      filter_end = Date.new(date[0].to_i, date[1].to_i, date[2].to_i)
      response = response.select do |absence|
        date = absence[:start_date].split('-')
        start_date = Date.new(date[0].to_i, date[1].to_i, date[2].to_i)
        date = absence[:end_date].split('-')
        end_date = Date.new(date[0].to_i, date[1].to_i, date[2].to_i)
        ((start_date >= filter_start && start_date <= filter_end) ||
        (end_date >= filter_start && end_date <= filter_end))
      end
    end
    { absences: CmChallenge::Absences.transform_response(response),
      total: response.length }.to_json
  end

  get '/vacations' do
    response = absences
    response = absences.select { |abs| abs[:type] == 'vacation' }
    { absences: CmChallenge::Absences.transform_response(response),
      total: response.length }.to_json
  end

  get '/sickness' do
    response = absences
    response = absences.select { |abs| abs[:type] == 'sickness' }
    { absences: CmChallenge::Absences.transform_response(response),
      total: response.length }.to_json
  end
end
