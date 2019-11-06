require 'sinatra'
require 'sinatra/namespace'
require_relative './cm_challenge/api'
require_relative './cm_challenge/absences'

absences = CmChallenge::Api.absences
members = CmChallenge::Api.members
CmChallenge::Absences.merge_absences_and_members(absences, members)

namespace '' do
  before do
    content_type 'application/json'
  end

  # Endpoints
  get '/' do
    {:absences => absences, :total => absences.length}.to_json
  end

  get '/absences' do
    {:absences => absences, :total => absences.length}.to_json
  end

  get '/absences/vacations' do
    filter = absences.select { |absence| absence[:type] == 'vacation'}
    filter.each { |absence| absence[:message] = absence[:userName] + ' is on vacation'}
    {:absences => filter, :total => filter.length}.to_json
  end

  get '/absences/sickness' do
    filter = absences.select { |absence| absence[:type] == 'sickness'}
    filter.each { |absence| absence[:message] = absence[:userName] + ' is sick'}
    {:absences => filter, :total => filter.length}.to_json
  end

end