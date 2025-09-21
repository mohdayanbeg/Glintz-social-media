**My Social Media App** | Live:https://glintz.onrender.com/

Welcome to a social media platform built from scratch, inspired by popular platforms like Instagram and Twitter. This project is a full-stack MERN application with a focus on real-time features and modern design. It's a great example of a portfolio-worthy project for any developer looking to showcase their skills.

**✨ Features**
This app includes a wide range of functionalities to create a complete social media experience:

Bitz: Upload and view short-form video content, similar to Instagram Reels.

Real-Time Chat: A live messaging system using Socket.IO for instant communication between users.

Dailiez: Share photos and videos that automatically disappear after 24 hours.

Engagement System: Users can like, comment on, and create their own posts.

Live Notifications: Receive instant notifications for likes, comments, and new followers.

Follow/Unfollow: Build a network by following other users.

Secure Authentication: User authentication is handled with JWT (JSON Web Tokens).

Cloudinary Integration: Images and videos are uploaded securely to Cloudinary.

Responsive UI: A clean and modern user interface built with Tailwind CSS that works on all devices.

🚀 Technologies
This project is built with the MERN stack and a few key libraries to enable its real-time and rich features.

Frontend: ReactJS and Redux Toolkit for state management.

Backend: Node.js with Express for building robust APIs.

Database: MongoDB as the NoSQL database.

Real-time Features: Socket.IO for live chat and notifications.

File Storage: Cloudinary for handling image and video uploads.

Styling: Tailwind CSS for a stunning and customizable UI.

Authentication: JWT for secure user sessions.

📦 Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js (version 14 or higher)

npm (comes with Node.js)

MongoDB Atlas account for your database, or a local MongoDB instance.

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
Install dependencies for the backend:

Bash

cd server # or your backend folder name
npm install
Install dependencies for the frontend:

Bash

cd ../client # or your frontend folder name
npm install
Configuration
Create a .env file in the backend directory.

Add the following environment variables, replacing the placeholder values with your own:

Code snippet

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_strong_random_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Running the Application
Start the backend server:

Bash

cd server
npm start
Start the frontend development server:

Bash

cd client
npm start
