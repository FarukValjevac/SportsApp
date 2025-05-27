# Aim

This project, while not aiming for state-of-the-art complexity, serves as a practical demonstration of what I consider to be software development best practices. It emphasizes well-documented code for clarity and maintainability, unit tests for both the backend and frontend to ensure reliability both locally and via CICD, and a streamlined development workflow through GitHub CICD pipelines, automatically triggered on each push to individual development branches as well as desployment to AWS when pushed to prod.

# Sports Booking App "Features"

Prep App for 28.5.2025. Will be removed after the whole process is over.

This is a web application enabling users to search for sports, view event details, book available slots, and manage their bookings by removing them. The application ensures a smooth user experience with features like duplicate booking prevention and clear feedback on booking status.

## Features

- **Searching for sports**
- **Viewing event details**
- **Booking a slot**
- **Preventing duplicate bookings**
- **Viewing all booked slots in a sidebar**
- **Removing booked slots**
- **Providing clear user feedback (success/error messages)**
- **Unit tests for both backend and frontend**
- **Automated CI/CD workflow with GitHub Actions, including database migrations**

## Tech Stack

- **Frontend:** React
- **Backend:** NestJS (Node.js framework)
- **Database:** MySQL
- **Cloud:** AWS

## Setup (for developers)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/FarukValjevac/SportsApp
    cd SportsApp
    ```

2.  **Navigate to the backend and install dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Set up the MySQL database:**

    - Ensure you have MySQL installed and running.
    - The database will be created automatically after running the backend if it doesn't already exist.
    - Update the database connection details in `backend/src/app.module.ts` with your MySQL credentials.

    **Before starting ensure to create your own .env file in the frontend directory**

    ```bash
    # Obviously this data should not be shared, but because this is a demo I will provide what I have used. Feel free to use any values that suits you.

    PORT=3000

    DB_PORT=3306
    DB_USER=root
    DB_NAME=sportsapp
    DB_PASSWORD=
    ```

4.  **Build the backend:**

    ```bash
    npm run build
    ```

5.  **Start the backend development server:**

    ```bash
    npm run start:dev
    ```

6.  **Run tests:**

    ```bash
    $ npm run test
    ```

7.  **Navigate to the frontend and install dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

    **Before starting ensure to create your own .env file in the frontend directory**

    ```bash
    PORT = 3001
    ```

8.  **Start the frontend development server:**
    ```bash
    npm start
    ```
9.  **Run test:**
    ```bash
    npm test
    ```

The frontend will run on `http://localhost:3001`, and the backend on `http://localhost:3000`.

## Next Steps

Future development could include user authentication, availability management, email confirmations.
