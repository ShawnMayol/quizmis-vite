# Quizmis

## Project Overview

Quizmis is a web application designed to enhance learning through interactive quizzes. Built with a focus on scalability, responsiveness, and ease of use, this platform aims to provide a seamless experience for learners and educators alike. It includes features such as user authentication, quiz creation, dynamic dashboards, and a robust backend for managing quiz data and user activities.

## Tech Stack

### Frontend:
- **React**: A powerful library for building interactive user interfaces.
- **Vite**: A fast development build tool optimized for modern JavaScript frameworks.
- **Tailwind CSS**: A utility-first CSS framework for building responsive and visually appealing UIs.

### Backend:
- **Firebase**:
  - **Authentication**: For secure user login and registration.
  - **Firestore**: A real-time database for storing quiz data, user profiles, and activity logs.
  - **Hosting**: For deploying and hosting the Quizmis application.

### Other Tools:
- **React Router**: For managing dynamic routing across pages.
- **EmailJS**: For enabling email functionality, such as contact form submissions.
- **HeroIcons**: Clean and modern icons for enhancing the UI.
- **PostCSS & Autoprefixer**: For CSS processing and ensuring cross-browser compatibility.

## Features

- **User Authentication**:
  - Email/password login and Google sign-in.
  - Secure password reset functionality.

- **Quiz Management**:
  - Create, update, and delete quizzes.
  - Dynamic question creation with customizable options.

- **Dashboard**:
  - Activity logs and admin announcements.
  - User-specific quiz tracking and analytics.

- **Responsive Design**:
  - Optimized for all screen sizes using Tailwind CSS.

- **Contact Us Form**:
  - Email inquiries sent via EmailJS.
  - Submissions stored in Firestore for reference.

- **About Us & Privacy Policy Pages**:
  - Provide information about the platform and its terms.

- **Footer with Social Links**:
  - Includes links to Terms & Conditions, Privacy Policy, and team socials.

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (with npm)
- A Firebase project set up with Firestore and Authentication.

### Installation Steps

1. **Fork the repository**:
   - Fork the repository to your GitHub account.

2. **Clone the repository**:
   - Clone the forked repository to your local machine:
     ```bash
     git clone https://github.com/yourusername/quizmis.git
     ```
     Replace `yourusername` with your GitHub username.

3. **Navigate to the project directory**:
   ```bash
   cd quizmis
4. Install dependencies: Run the following command to install all required packages:
npm install
5. Set up Firebase:
   Create a Firebase project in the Firebase Console.
    Enable Firebase Authentication and Firestore.
    Create a .env file in the root directory and add your Firebase configuration:
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
6. Run the application: Start the development server:
7. View the application: Open your browser and navigate to: http://localhost:5173

#**FILE STRUCTURE:
quizmis/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   ├── App.jsx             # Main application file
│   ├── Firebase.js         # Firebase configuration and initialization
│   ├── main.jsx            # Entry point for the React app
│   ├── index.css           # Global styles
├── .env                    # Environment variables
├── .firebaserc             # Firebase project configuration
├── firebase.json           # Firebase hosting and Firestore rules
├── firestore.rules         # Firestore security rules
├── firestore.indexes.json  # Firestore index definitions
├── package.json            # Node.js dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
├── README.md               # Project documentation


Contributors
Jurgen (Lead Programmer):

Responsible for the dashboard, authentication, and quiz management.
Key contributor to Firestore integration and backend logic.
Elgen (Homepage and Related Components):

Built the homepage, footer, and top navigation bar.
Developed the "Contact Us", "About Us", and "Privacy Policy" pages.
Ensured responsiveness and reusable components.
Clifford (UI Specialist):

Focused on styling, animations, and hover effects.
Contributed to ensuring a cohesive and user-friendly interface.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Thanks to the University of San Carlos for inspiring this project.
Shoutout to the Quizmis team for their hard work and dedication.
Contact
For any inquiries or feedback, feel free to reach out:

Email: 23103623@usc.edu.ph
GitHub: Elgen69
Copyright Notice
© 2024 Quizmis Team. All Rights Reserved.

