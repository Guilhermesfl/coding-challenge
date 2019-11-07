# Absence Manager API using sinatra

### Installation and usage

1. Install Ruby

  - https://www.ruby-lang.org/en/documentation/installation/

2. Install Bundler

  - `gem install bundler`

3. Install the project dependencies

  - `bundle install`

4. Running the project

  - `bundle exec ruby server.rb`

### Running Specs

  - `bundle exec rspec` or `bundle exec guard`

### Lint

The project lint uses the configuration provided by [RuboCop](https://rubocop.readthedocs.io/en/stable/) gem. To run the linter, just type:

  - `rubocop`

### Routes

The following routes were developed in the project:

  - `GET /` - downloads an ical file containing the crew absences
  - `GET /absences` - returns a json list of the crew absences
  - `GET /absences?userId=<userId>` - returns a json list of the member with userId absences
  - `GET /absences?startDate=<startDate>&endDate=<endDate>` - returns a json list of the crew absences filtered by userId
  - `GET /absences/vacations` - returns a json list of the crew absences due to vacation
  - `GET /absences/sickess` - returns a json list of the crew absences due to sickness

It is also possible to filter by date range and user id simultaneously by passing all the params to the query.