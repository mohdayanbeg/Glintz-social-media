# My Social Media App 📱  ||  [Live](https://glintz.onrender.com/)

Welcome to a full-stack social media platform built from scratch, inspired by popular platforms like Instagram and Twitter. This project is a comprehensive portfolio piece for any MERN stack developer, showcasing real-time features and a modern, responsive design.

## ✨ Key Features

* **Bitz:** 🎬 Upload and view short-form video content.
* **Real-Time Chat:** 💬 Live messaging with **Socket.IO** for instant communication.
* **Dailiez:** 👻 Share ephemeral content that disappears in 24 hours.
* **Live Notifications:** 🔔 Get instant alerts for likes, comments, and new followers.
* **User Engagement:** 👍 Users can like, comment on, and share posts.
* **Follow/Unfollow:** 🤝 Build a network by following other users.
* **Secure Authentication:** 🔒 User sessions are managed with **JWT**.
* **Responsive UI:** 📱 A clean and modern interface built with **Tailwind CSS**.
* **File Uploads:** ☁️ All images and videos are securely uploaded to **Cloudinary**.
* **Password Reset with OTP:** 🔑 Securely reset passwords using a one-time passcode sent via email.

---

## 🚀 Technologies

This project is built using the **MERN** stack, with key libraries to enable its advanced features.

* **Frontend**: `ReactJS` & `Redux Toolkit`
* **Backend**: `Node.js` & `Express`
* **Database**: `MongoDB`
* **Real-time**: `Socket.IO`
* **File Storage**: `Cloudinary`
* **Styling**: `Tailwind CSS`
* **Email Service**: `Nodemailer` for OTP functionality

---

## ⚙️ Getting Started

### Prerequisites

* `npm` or `yarn`
* `Node.js` (version 14+)
* `MongoDB` (Atlas or local instance)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repository.git](https://github.com/your-username/your-repository.git)
    cd your-repository
    ```

2.  **Install backend dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Configuration

Create a `.env` file in your **backend** folder and add the following variables, which reflect the names you're using in your project:

```env
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
EMAIL=your_email_address@example.com
EMAIL_PASS=your_email_password
JWT_SECRET_KEY=a_very_strong_secret_key
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

### Running the App

1.  **Start the backend server:**
    ```bash
    cd server
    npm start
    ```

2.  **Start the frontend server:**
    ```bash
    cd client
    npm start
    ```
