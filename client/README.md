# React User Profile App
This is a React application that allows users to sign up, log in, view their profile, and update their profile information, including their profile photo.

## Features

- User registration with first name, last name, email, password, and profile photo.
- User authentication with email and password.
- View user profile, including first name, last name, email, and profile photo.
- Update user profile information, including first name, last name, email, and profile photo.

# Technologies Used

- React.js
- React Router
- Redux (for state management)
- Material-UI (for UI components)
- Axios (for HTTP requests)


## Project Structure

```
src/
├── components/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Update.jsx
├── redux/
│   ├── actions/
│   │   └── profileActions.js
│   ├── reducers/
│   │   └── profileReducer.js
│   └── store.js
├── assets/
│   └── BASE_URL.js
├── App.jsx
└── index.js
```

- `components/`: Contains the React components for different pages and modals.
- `redux/`: Contains the Redux setup, including actions, reducers, and the store.
- `assets/`: Contains any static assets or configuration files.
- `App.jsx`: The main entry point of the React application, which sets up the routing.
- `index.js`: The entry file that renders the React application.

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/your-repo/react-user-profile-app.git
```

2. Navigate to the project directory:

```bash
cd react-user-profile-app
```
3. Install dependencies:

```bash 
npm install
```
4. Set up the BASE_URL in src/assets/BASE_URL.js to point to your backend API.
5. Start the development server:

```bash 
npm start
```
The application should now be running on http://localhost:3000.

## Redux State Management
- This application uses Redux for state management. The main state slice is profile, which contains the user's profile data and the loading state.

- The profileActions file contains the actions for fetching and updating the user profile. The profileReducer file handles the state updates based on the dispatched actions.