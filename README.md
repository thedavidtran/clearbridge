# Take Home Assignment Company Directory

## Front End

The front end project is under the '/client' subdirectory.

Install dependencies from '/client'
```bash
npm install
```

### Environment Configuration
```dotenv
REACT_APP_API_URL=<URL to where backend api is hosted>
```
e.g.
```dotenv
REACT_APP_API_URL="https://clearbridge-backend.onrender.com"
```

### Automated Tests
UI tests can be found in  `/client/src/test`, only a brief set has been provided.
### Run test
```shell
npm test
```

### Starting the front end server
```shell
npm start
```

### Technologies
- Framework: react
- CSS Framework: tailwindcss

## Back End

### Architecture

Routes on fastify can be configured with a validation schema on what is expected as part of the request body payload. We can also configure what fields can be returned so we can also ensure we did not mean to leak additional data if a schema is specified for a specific response.

Once the calls pass the route validation, routes will invoke the related service, (e.g. Company route takes API calls then makes appropriate Service call once request payload validation passes). Service layer encapsulates the implementation details of working with the database and it's data format, does the sanitization of the user input and transforms the result to what is expected for the API response.

### Design Decisions
- Assume that founders cannot have the same name, ideally we would support this, but this is a simplified assumption. This allows us to just add a unique index on the name field of the Founder collection.
- String lenths
#### REST API
/companies
- [GET] - Retrieves list of companies, returns an array of company objects
- [POST] - Adds a company

/companies/<companyId>
- [GET] - Retrieves the details of a single company if companyId matches the identifier
- [PUT] - Updates the details of the company that matches the companyId identifier
- [DELETE] - Removes the company from the directory that matches the companyId identifier

```text
/founders?companyId=<companyId>
```
- [GET] - Retrieves list of founders for the specified company.

```text
/founders
```
- [PUT] - adds a founder

#### Database
##### Company Collection
###### fields
- name:string - name of the company.
- location:object - location information.
  - city:string - city name.
  - state:string - stores the state abbreviation.
- description:string - description of the company.
- founded:date - founded date.
- createdAt:date - date the record was created.
- updatedAt:date - date the record was last modified.

###### indexes
- Added an index on "name" to display companies in sorted alphabetical order. This index is case sensitive.

##### Founders Collection
###### fields
- name:string - Full name of the founder.
- title:string - Title of the founder.
- company - Identifier of the company the founder is part of.

###### indexes
- uniqueness constraint on name to prevent duplicates, assumption is done on the implementation of not having a full founder management system. Assuming no founders have the same full name.
- compound index on company and founder name, as the queries in this system is only displaying the founders on the detail page of a specific company. This index will partition the founders of the same company together sorted in ascending order by name.


The backend end project is under the '/server' subdirectory.

Install dependencies from '/server'
```bash
npm install
```

#### Environment Variables Configuration

```dotenv
MONGODB_CONNECTION=<URL to database>
DB_NAME=<Database name>
```
e.g. .env
```dotenv
MONGODB_CONNECTION="mongodb+srv://<username>:<password>@cluster0.mim9ktk.mongodb.net/"
DB_NAME="clearbridge-dev"
```

environment file for tests have variable names prefixed with VITE_
e.g. .env.test
```dotenv
NODE_ENV="testing"
VITE_MONGODB_CONNECTION="mongodb+srv://<username>:<password>@cluster0.mim9ktk.mongodb.net/"
VITE_DB_NAME="clearbridge-test"
```

### Automated Tests
Backend tests are dependent on a real database instance, it will clear each collection on each test. Ideally the tests would be mocked to increase the speed of the test execution.

Tests can be found under the `/server/test` directory. Tests for the routes and services have been provided.

### Run Test
```shell
npm test
```

### Test Coverage
```shell
npm run coverage
```

### Starting the back end server
```shell
npm start
```

## Technologies
- nodejs
- fastify
- Database: MongoDB
- vitest: Test Runner