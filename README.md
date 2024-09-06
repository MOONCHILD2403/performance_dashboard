# API Routes Documentation
This document outlines the available routes in the Express application. Each route corresponds to a specific module within the application.

## Base Route

- **Base URL**: `/api/v1`

## Routes

### Student Routes

- **`POST /student/register`**
  - Description: Registers a new student user.

- **`POST /student/login`**
  - Description: Authenticates a student user and generates an access token.


### Admin Routes

- **`POST /admin/register`**
  - Description: Registers a new admin user.

- **`POST /admin/login`**
  - Description: Authenticates an admin user and generates an access token.

- **`POST /admin/subject`**
  - Description: Adds a new subject to the database.


### Student Performance Routes

- **`GET /performance/average`**
  - Description: Returns the average score of the student across all subjects.

- **`GET /performance/:subject_id`**
  - Description: Returns the student's performance for a specific subject over time.

- **`POST /performance/:subject_id`**
  - Description: Adds a new entry for the student's marks in an exam for a specific subject.


### Student Trend Analysis Routes

- **`GET /student/trend`**
  - Description: Returns the performance trend of the student across all subjects.

- **`GET /student/trend/:subject_id`**
  - Description: Returns the performance trend of the student for a specific subject.


# Environment Variables Setup

To run this application, you need to create a `.env` file in the root directory of your project. This file will store sensitive environment variables, such as your MongoDB connection string and JWT secret.

## Step-by-Step Instructions

1. **Create a `.env` File**
   - In the root directory of your project, create a new file named `.env`.

2. **Add Environment Variables**
   - Open the `.env` file in your text editor and add the following lines:

   ```plaintext
   CONN_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret


## Usage

To use these routes, ensure your server is running and make requests to the specified endpoints. You can use tools like Postman or cURL for testing.


## Notes

- Ensure that you have the necessary permissions and authentication in place where applicable.
- Replace placeholders with actual descriptions once the individual route files are provided.
