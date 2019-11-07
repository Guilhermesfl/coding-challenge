# frozen_string_literal: true

require_relative '../server'
require 'rack/test'

RSpec.describe 'The Absence Manager' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it 'should get all absences records with employees names' do
    get '/absences'
    expect(last_response).to be_ok
  end

  it 'should get absences from a valid user id' do
    get '/absences?userId=2664'
    expect(last_response).to be_ok
  end

  it 'should not get absences from a valid user id that has no absence' do
    get '/absences?userId=2290'
    expect(last_response).to be_ok
  end

  it 'should not get absences from a invalid user id' do
    get '/absences?userId=-1'
    expect(last_response).to be_ok
  end

  it 'should get absences from a given date range' do
    get '/absences?startDate=2017-01-01&endDate=2017-02-01'
    expect(last_response).to be_ok
  end

  it 'should not get absences from a invalid date range' do
    get '/absences?startDate=2017-01-01&endDate=2016-08-01'
    expect(last_response).to be_ok
  end

  it 'should get absences from a given date range and valid user id' do
    get '/absences?startDate=2017-01-01&endDate=2017-02-01&userId=2664'
    expect(last_response).to be_ok
  end

  it 'should get absences due to sickness' do
    get '/absences/sickness'
    expect(last_response).to be_ok
  end

  it 'should get absences due to vacation' do
    get '/absences/vacations'
    expect(last_response).to be_ok
  end

  it 'should download the absences in .ics format' do
    get '/'
    expect(last_response).to be_ok
  end


end
