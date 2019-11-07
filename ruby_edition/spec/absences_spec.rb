# frozen_string_literal: true

require_relative '../server'
require 'rack/test'
require 'date'

RSpec.describe 'The Absence Manager' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it 'should get all absences records with employees names' do
    get '/absences'
    expect(last_response).to be_ok
    response = JSON.parse(last_response.body)
    response['absences'] = response['absences'].select {|abs| abs.key?('userName')}
    expect(response['absences'].length).to eq(response['total'])
  end

  it 'should get absences from a valid user id' do
    get '/absences?userId=2664'
    response = JSON.parse(last_response.body)
    response['absences'] = response['absences'].select {|abs| abs['userId'] == 2664}
    expect(response['absences'].length).to eq(response['total'])
  end

  it 'should not get absences from a valid user id that has no absence' do
    get '/absences?userId=2290'
    expect(last_response).to be_ok
    response = JSON.parse(last_response.body)
    expect(response["absences"].length).to eq(0)
  end

  it 'should not get absences from a invalid user id' do
    get '/absences?userId=-1'
    expect(last_response).to be_ok
    response = JSON.parse(last_response.body)
    expect(response["absences"].length).to eq(0)
  end

  it 'should get absences from a given date range' do
    get '/absences?startDate=2017-01-01&endDate=2017-02-01'
    expect(last_response).to be_ok
    response = JSON.parse(last_response.body)
    filter_start = Date.new(2017, 01, 01)
    filter_start = Date.new(2017, 02, 01)
    response['absences'] = response['absences'] do select { |abs|
      date = abs['startDate'].split('-')
      start_date = Date.new(date[0].to_i, date[1].to_i, date[2].to_i)
      date = abs['endDate'].split('-')
      end_date = Date.new(date[0].to_i, date[1].to_i, date[2].to_i)
      ((start_date >= filter_start && start_date <= filter_end) ||
        (end_date >= filter_start && end_date <= filter_end))
    }
    end
    expect(response['absences'].length).to eq(response['total'])
  end

  it 'should not get absences from a invalid date range' do
    get '/absences?startDate=2017-01-01&endDate=2016-08-01'
    expect(last_response).to be_ok
    response = JSON.parse(last_response.body)
    expect(response["absences"]).to eq([])
  end

  it 'should get absences from a given date range and valid user id' do
    get '/absences?startDate=2017-01-01&endDate=2017-02-01&userId=2664'
    expect(last_response).to be_ok
    response = JSON.parse(last_response.body)
    filter_start = Date.new(2017, 01, 01)
    filter_end = Date.new(2017, 02, 01)
    response['absences'] = response['absences'].select { |abs|
      date = abs['startDate'].split('-')
      start_date = Date.new(date[0].to_i, date[1].to_i, date[2].to_i)
      date = abs['endDate'].split('-')
      end_date = Date.new(date[0].to_i, date[1].to_i, date[2].to_i)
      ((start_date >= filter_start && start_date <= filter_end) ||
        (end_date >= filter_start && end_date <= filter_end))
    }.select {|abs| abs['userId'] == 2664}
    expect(response['absences'].length).to eq(response['total'])
  end

  it 'should get absences due to sickness' do
    get '/absences/sickness'
    expect(last_response).to be_ok
    response = JSON.parse(last_response.body)
    response['absences'].select {|abs| abs['message'].include?('sick')}
    response['absences'].select {|abs| abs['type'] == 'sick'}
    expect(response['absences'].length).to eq(response['total'])
  end

  it 'should get absences due to vacation' do
    get '/absences/vacations'
    expect(last_response).to be_ok
    response = JSON.parse(last_response.body)
    response['absences'].select {|abs| abs['message'].include?('vacation')}
    response['absences'].select {|abs| abs['type'] == 'vacation'}
    expect(response['absences'].length).to eq(response['total'])
  end

  it 'should download the absences in .ics format' do
    get '/'
    expect(last_response).to be_ok
  end


end
