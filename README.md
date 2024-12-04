# Cardflight

This program parses a transaction string and displays the result to the screen.

## Installation

Download and install [Node.js](https://nodejs.org/en/) to run the program.

## Technical Plan

### Objective

Develop a Next.js application that enables users to input a transaction number, submit it to the server, retrieve the corresponding data on the server-side, and then render the results in a client-side component.

### Architecture Overview

#### Frontend (Client-Side):

- A React-based form component that allows users to input a transaction number.
- A submit button that triggers an HTTP request to the backend.
- A loading state to indicate that the data is being fetched.
- Display the result in a client-side component once the transaction data is successfully fetched from the server.

#### Backend (Server-Side):

- The API will process the transaction number, fetch data from an external or internal data source, and return the result in JSON format.

### State Management:

- The frontend will use React hooks and, and rendering results.
- A server-side component in Next.js will handle data fetching and rendering before sending the response to the client.

## Implementation Steps

### Frontend Form Component:

- Create a React component that contains an textbox for the transaction number.
- Implement form validation to ensure the input meets the required format and is not empty.
- On form submission, trigger an asynchronous fetch request to the backend with the transaction number as a parameter.

### Client-Side Data Rendering:

- Upon successful data fetch, render the results in a React component (e.g. ProcessedTransaction).
- Manage loading and error states for a seamless user experience.

## Unit Testing Strategy

### Testing Framework

- Use Jest for unit testing to ensure the correctness and reliability of the application.

### Frontend Testing:

- Form Component Tests:
  - Verify textbox validation (e.g. ensuring required fields are not empty).
  - Test form submission behavior
- State Management Tests:
  - Mock the fetch request and test the state transitions (loading, success, error).
  - Ensure that the data is correctly displayed once fetched.
- Backend Testing:
  - Test edge cases (e.g., invalid transaction number, missing data).
- Test Coverage:
  - Include integration tests to ensure smooth interaction between the frontend and backend.

## Getting Started

1. Extract the zip archive into a new folder on your local machine.
2. Install the application dependencies.

```bash
npm install
```

3. Create a production-ready version of your application

```bash
npm run build
```

4. Start the application after it has been built

```bash
npm run start
```

5. Open a browser and go to `http://localhost:3000/`

## Usage

- Input a transaction string into the text field and click the `Submit` button.
- The program will parse the transaction string into a transaction object and display it under the `Processed Transaction` section.
- A notification is displayed to the user indicating success or failure after the transaction number is submitted.

## Input Format

The input string is structured as follows:

- The first character is a tag. It indicates the type of value that follows.
- The second and third characters represent a length, which tells you the length (in characters) of the following value.
- The next several characters, up to the specified length, form the value.
- This pattern repeats until the end of the string.

### Example Strings

- 104VISA20522.00310BURGERBARN
