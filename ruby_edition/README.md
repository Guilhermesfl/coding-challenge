# Absence Manager API using sinatra

### Installation and usage

1. Install Ruby

  - https://www.ruby-lang.org/en/documentation/installation/

2. Install Bundler

  - `gem install bundler`

3. Install the project dependencies

  - `bundle install`

4. Running the project

  - `bundle exec ruby server.rb` - will run by default on **http://localhost:3333**

After these steps, accessing the server and requesting the routes described in the end of this file will return the data.

### Running Specs

The project tests were developed using [RSpec](https://rspec.info/) and [RackTest](https://github.com/rack-test/rack-test) which are a test framework and a testing API, respectively. To run the tests, just type:

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

  - Example: **http://localhost:3333/absences**