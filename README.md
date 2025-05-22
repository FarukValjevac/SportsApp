# Sports Booking App

Prep App 😉

This is a web application that allows users to search for and book slots for various sports activities.

## Features

- **Search for Sports:** Users can search for available sports using a search bar. The application displays a list of upcoming events for the searched sport within the next week.
- **View Event Details:** Each search result shows the sport, date, and time of the event.
- **Book a Slot:** Users can book an available time slot for a selected sport event by clicking a "Book" button.
- **Booking Confirmation:** Upon successful booking, a confirmation message is displayed to the user. The application prevents booking the same slot multiple times.
- **View All Booked Slots:** Users can view a list of all currently booked slots.
- **Remove Booked Slots:** Users have the option to remove their booked slots from the list.

## Tech Stack

- **Frontend:** React
- **Backend:** NestJS (Node.js framework)
- **Database:** MySQL

## Setup (for developers)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/FarukValjevac/SportsApp
    cd sports
    ```

2.  **Navigate to the backend and install dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Set up the MySQL database:**

    - Ensure you have MySQL installed and running.
    - Create a database named `sportsapp`.
    - Update the database connection details in `backend/src/app.module.ts` with your MySQL username and password.

4.  **Build the backend:**

    ```bash
    npm run build
    ```

5.  **Start the backend development server:**

    ```bash
    npm run start:dev
    ```

6.  **Navigate to the frontend and install dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

7.  **Start the frontend development server:**
    ```bash
    npm start
    ```

The frontend will run on `http://localhost:3001`, and the backend on `http://localhost:3000`.

## Next Steps

Future development could include user authentication, availability management, email confirmations, more advanced UI/UX improvements.
