## FitGlitch

FitGlitch is a full-stack fitness tracking web application designed to help users log daily meals, workouts, and weigh-ins while monitoring caloric progress toward weight goals. Originally developed as an Android app, it was enhanced and migrated to a web-based platform for the SNHU CS-499 Capstone project.

## Live Deployment

Frontend: [FitGlitch](https://fit-glitch.vercel.app) (Hosted on Vercel)

Backend: [Hosted on Render](https://fitglitch.onrender.com/)

Database: MongoDB Atlas

All components are hosted for free on the above platforms enabling the FitGlitch Web Application to be accessible in any browser.

## Project Purpose

The goal of FitGlitch is to create a secure, scalable fitness tracker with persistent user data, JWT-based authentication, and a modular codebase that’s easy to extend. It supports viewing progress, daily stats, and editing entries for meals, workouts, and weights.

## Tech Stack

### Frontend

- Angular 16

- TypeScript

- Bootstrap 5

### Backend

- Node.js / Express

- MongoDB + Mongoose

- JWT (jsonwebtoken + express-jwt)

- Passport.js

- bcrypt

- CORS

## Features

- Authentication

- Register and login with JWT

- Session persistence across reloads

- Weight Tracking

- Add, edit, delete, and view weights

- View most recent weight

- Meal Logging

- Add, view, edit, and delete meals

- Calories auto-summed per day

- Workout Logging

- Add, view, edit, and delete workouts

- Tracks calories burned

- Net Calories & Dashboard

- Calculate net daily calories (consumed - burned)

Daily dashboard with calorie goal progress
