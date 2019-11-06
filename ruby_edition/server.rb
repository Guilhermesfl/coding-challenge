require 'sinatra'
require 'sinatra/namespace'
require_relative './cm_challenge/api'
require_relative './cm_challenge/absences'

namespace '' do
  before do
    content_type 'application/json'
  end

  # Endpoints
  get '/' do
    absences = CmChallenge::Api.absences
    absences.to_json
  end

  get '/absences' do
    absences = CmChallenge::Api.absences
    members = CmChallenge::Api.members
    CmChallenge::Absences.merge_absences_and_members(absences, members).to_json
  end
end