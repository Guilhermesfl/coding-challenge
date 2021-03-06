# Absence Manager API using express

### Installation and usage

1. Install node (LTS version will work)

  - https://nodejs.org/en/download/

2. Install yarn (npm will break the lint)

  - https://yarnpkg.com/en/docs/install#mac-stable

3. Install the project dependencies

  - `yarn`

4. Run server

  - `yarn dev` - will run by default on **http://localhost:3333**

After these steps, accessing the server and requesting the routes described in the end of this file will return the data.

### Running Specs

The project tests were developed using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) which are a test framework and a assertion library, respectively. Running the tests also provide a coverage report via [nyc](https://github.com/istanbuljs/nyc) library. To run the tests, just type:

   - `yarn test`

### Lint

The project lint uses the configuration provided by [eslint-config-crewmeister](https://www.npmjs.com/package/eslint-config-crewmeister) package. To run the linter, just type:

  - `yarn lint`

### Husky

  - This project uses `husky` library, which is a a git hook that ensures that the linter and the tests are working as expected. If there are errors in one of these two operations, the commit will fail.

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
