# Web FrontEnd for Absence Manager

The goal when developing this part of the project was to provide a better way to visualize the data return from the API developed in the js_edition or ruby_edition project. The FrontEnd was developed using ReactJS.

### Installation and usage

1. Install yarn (npm will break the lint)

  - https://yarnpkg.com/en/docs/install#mac-stable

2. Install the project dependencies

  - `yarn`

3. **Run server developed in the js_edition or ruby_edition** (Otherwise the FrontEnd will not be able to retrieve data)

  - `See README from one of the projects for instructions on how to run`

4. Run the FrontEnd to consume the server API

  - `yarn start` - will run by default on **http://localhost:3000**

### Lint

The project lint uses the configuration provided by [eslint-config-crewmeister](https://www.npmjs.com/package/eslint-config-crewmeister) package. To run the linter, just type:

  - `yarn lint`

### Design Prototype

The `FrontEnd Design` was prototyped using `Figma` and can be found in the following link:

  - https://www.figma.com/file/77hM4MAQAFptGWlVztKf5l/Crewmeister-Coding-Challenge?node-id=1%3A3

Here is the design:

![Design of Absence Manager](design.png)

Buttons:

  - `Export Calendar` - downloads all absences in .ics file format.
  - `Sickness` - Filters absences by sickness type.
  - `Vacations` - Filters absences by sickness type.
  - `Search` - Filter absences using userId, startDate and endDate input.