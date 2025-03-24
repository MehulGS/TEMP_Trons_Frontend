# Appointment Booking System

## Overview
This is an Appointment Booking System where users can book and edit appointments. The state management is handled using Redux. The frontend setup ensures that the application runs smoothly with minimal configuration.

## Features
- Book an appointment
- Edit an existing appointment
- State management using Redux
- Responsive UI

## Installation

### Prerequisites
Make sure you have the following installed on your system:
- Node.js (Latest LTS version recommended)
- npm or yarn

### Steps to Install and Run

1. Clone the repository:
   ```sh
   git clone https://github.com/MehulGS/TEMP_Trons_Frontend.git
   cd client
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

The application will be running at `http://localhost:5173/` by default.

## Folder Structure
```
appointment-booking/
│── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   │   ├── store.js
│   │   ├── appointmentSlice.js
│   ├── App.js
│   ├── main.jsx
│── package.json
│── README.md
```

## Redux Setup
The Redux store is configured in `src/redux/store.js` and the `appointmentSlice.js` manages the state for appointments.

## Contributing
Feel free to fork the repo and create pull requests for improvements.

## License
This project is open-source and available under the MIT License.

