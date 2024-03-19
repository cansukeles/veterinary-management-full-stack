# Veterinary Management System

Welcome to the README for the Veterinary Management System application. The Veterinary Management System is a comprehensive solution for veterinary clinics to efficiently manage their business operations.

This single-page app (SPA) is developed using React and React Router, with Material UI for the design components. The app provides functionalities for managing appointments, reports, vaccines, doctors, customers, and animals. The backend is developed using Java & Spring Boot.

## Features

- **Customer Registration**: Users can register new customers.
- **Animal Registration**: Register animals for customers.
- **Veterinarian Doctor Registration**: Record information about veterinarian doctors.
- **Available Days Recording**: Record available days for veterinarian doctors.
- **Appointment Creation**: Users can create appointments for animals and doctors.
- **Report Creation**: Create reports for appointments.
- **Vaccination Recording**: Record vaccinations for animals.
- **CRUD Operations**: Perform CRUD operations for all entities (customers, animals, doctors, etc.).
- **Filtering Operations**: Filter data as needed.

## Technology Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: Library for routing in React applications.
- **Material UI**: React UI framework for styling and design components.
- **Render**: Platform for hosting and deploying web applications.
- **Netlify**: Platform for hosting and deploying web applications.

## Usage

1. **Accessing the Application**:

   - The application is deployed on [Netlify](https://cans-vet-app.netlify.app/).
   - Users can access the application through the provided link.

2. **Backend**:

   - The backend for this application is hosted on Render using Docker.

3. **Database**:

   - The database for this application is hosted on Render using PostgreSQL.

4. **Navigation**:

   - The app is a single-page application with navigation handled by React Router.
   - Users can navigate between different sections (appointments, reports, vaccines, doctors, customers, animals) using the navigation links.

5. **Functionality**:
   - Users can perform CRUD operations within the relevant sections of the application.
   - Notifications are provided to the user if CRUD operations fail, displayed through a snackbar.
