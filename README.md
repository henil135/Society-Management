# Society-Management-System

A full stack project on Society Management System.

## Live url

**Frontend Url**

- https://society-management-git-main-henil135s-projects.vercel.app/

**Backend Url**

- https://society-management-b6tj.onrender.com

# Society Management System

This project is designed to manage a society's operations, offering different panels for **Admin**, **Resident**, and **Security**. The system provides functionality for managing residents, security, maintenance, expenses, and announcements, among other things.

## Admin Panel Features

The **Admin** is the primary user who can perform several management tasks. Below are the features available to the admin:

### 1. **User Management**

- **Sign Up**: Only the admin can create a new account.
- **Login**: Admin can log in to the system.
- **Logout**: Admin can log out of the system.
- **Forgot Password**: Admin can reset the password if forgotten.
- **Reset Password**: Admin can change their password at any time.

### 2. **Resident Management**

- **Add Resident**: Admin can add new residents (owners and tenants).
- **Update Resident**: Admin can update existing resident details.
- **Delete Resident**: Admin can delete resident records.
- **View Resident Data**: Admin can view the resident information at any time.

### 3. **Financial Management**

- **Maintenance Management**: Admin can create, update, delete, and view maintenance records.
- **Income Management**: Admin can manage and track other sources of income.
- **Expense Management**: Admin can manage and track expenses.
- **View Total Balance**: Admin can view the total balance, income, and expenses.

### 4. **Operations & Facility Management**

- **Facility Management**: Admin can manage the available facilities in the society.
- **Complaint Tracking**: Admin can track and manage complaints submitted by residents.
- **Request Tracking**: Admin can manage and track requests made by residents.
- **Security Management**:
  - **Visitor Log**: Admin can view the logs of visitors.
  - **Security Protocol**: Admin can set and manage security protocols.
  - **Security Guard Functionality**: Admin can manage security guard schedules and tasks.

### 5. **Announcement Management**

- **Create Announcements**: Admin can create two types of announcements:
  - **Event Announcement**: Inform residents about upcoming events.
  - **Activity Announcement**: Share information on activities happening in the society.
- **Important Number Management**: Admin can add, update, and manage important contact numbers.
- **View Pending Maintenance**: Admin can view any pending maintenance work.

### 6. **Notifications**

Admin will receive notifications for the following activities:

- Maintenance updates
- Other income and expense updates
- Announcements
- Resident cash approval requests (with the option to accept or reject)

---

## Resident Panel Features

### 1. **Account Management**

- **Forgot Password**: Residents can reset their password if they forget it.
- **Reset Password**: Residents can change their password anytime by resetting it.
- **View Personal Details**: Residents can view their personal information, such as name, address, and contact details.

### 2. **Event & Activity Management**

- **View Event & Activity Announcements**: Residents can see announcements related to events and activities.
- **Participate in Events & Activities**: Residents can participate for events and activities.
- **View Event & Activity Participant List**: Residents can see who else is participating in the events and activities.

### 3. **Complaint & Request Management**

- **Create Complaints**: Residents can submit complaints about issues in the society.
- **Create Requests**: Residents can submit requests for services or other needs.

### 4. **Security**

- **Security Alerts**: Residents receive notifications about security alerts.
- **View Security Protocols**: Residents can view and follow security protocols set by the society.


## Security Panel Features

## Security Features

The **Security Panel** offers the following features:

### 1. **Visitor Management**

- **Add Visitor Details**: Security can add details of visitors entering the society.
- **View Visitor Records**: Security can view the list of all visitors and their details for tracking purposes.

### 2. **Login to the Security Panel**

- First, security need to log in to the system using their credentials.

- **Receive and Follow Security Protocols**

- Security can view and follow the security protocols set by the admin to ensure a safe environment within the society.

---

## Getting Started

## Git Clone URL

To get started, clone the repository to your local machine using the following command:

- https://github.com/henil135/Society-Management.git

--

## Install Commands

cd Frontend

- npm install

cd Backend

- npm install

--

## Folder structure

Client side - ./Frontend

Server side - ./Backend

--

## Project run commands

Frontend - npm run dev

Backend - npm run dev

--

## Live url

**Frontend Url**

- https://society-management-2.onrender.com

**Backend Url**

- https://society-management-b6tj.onrender.com

# Society Management System - Technologies Used

This project utilizes a set of modern technologies for both the frontend and backend to ensure a seamless and efficient experience for users. Below is a list of the key technologies used in the development of this system.

---

## Frontend Technologies

The **frontend** of the Society Management System is designed to provide an interactive and responsive user interface. The following technologies are used:

### 1. **React**

- React is used to build the user interface of the application. It helps in creating a dynamic, fast, and responsive web application.

### 2. **Vite**

- Vite is a modern build tool that provides faster development and build processes. It helps in faster loading times for the application.

### 3. **Bootstrap**

- Tailwind CSS is used for styling the application. It allows us to build custom, responsive designs quickly by using utility classes.

### 4. **React Router DOM**

- React Router DOM is used for navigation between different pages and components in the application. It helps in creating a single-page application (SPA) with smooth transitions between views.

### 5. **Axios**

- Axios is a promise-based HTTP client used to make requests to the backend. It allows the frontend to communicate with the backend for fetching data and submitting forms.

### 6. **Socket.io-Client**

- Socket.IO Client is used to establish a real-time, bi-directional communication between the client (frontend) and server (backend). It enables live notifications, messaging, and event updates.

---

## Backend Technologies

The **backend** of the Society Management System is responsible for handling business logic, user authentication, data management, and communication with the database. Below are the technologies used:

### 1. **Node.js**

- Node.js is used as the runtime environment for running JavaScript code on the server. It allows us to handle backend operations and create APIs efficiently.

### 2. **Express**

- Express is a web application framework for Node.js. It simplifies the creation of routes, middleware, and API endpoints for the application.

### 3. **JWT (JSON Web Token)**

- JWT is used for secure authentication and authorization. It allows users to log in and access protected resources in the application.

### 4. **Bcrypt**

- Bcrypt is used for hashing passwords. It helps in securely storing user passwords in the database by encrypting them.

### 5. **Cloudinary**

- Cloudinary is used for managing and uploading images and other media files. It helps store images like profile pictures and document uploads in the cloud.

### 6. **Nodemailer**

- Nodemailer is used for sending emails. It is useful for sending password reset emails, notifications, and other messages to users.

---

## Database

The **database** stores all the data for the Society Management System. The following database technology is used:

### 1. **MongoDB**

- MongoDB is a NoSQL database used to store data in a flexible, scalable format. It is ideal for handling large amounts of data and provides fast data access with its document-based structure.

---

## Other Tools and Libraries

In addition to the core technologies, several other tools and libraries are used to enhance the functionality of the application:

- **CORS**: Used for handling cross-origin requests.
- **dotenv**: Used to manage environment variables in a secure way.
- **Mongoose**: A library used to interact with MongoDB in an easier and more structured way.
- **Moment.js**: Used for handling and formatting dates and times.

# Sample Data for Society Management System

This document provides the sample login data for different roles in the **Society Management System**. You can use these credentials to test the functionalities of the system.

## Sample User Data

### Admin User

- **Email**: `henilp1508@gmail.com`
- **Password**: `123456`

### Resident User

- **Email**: `user123@gmail.com`
- **Password**: `123456`

### Security User

- **Email**: `security72@gmail.com`
- **Password**: `123456`

---

### Frontend env credentials

URL_FROM_BACKEND="https://society-management-b6tj.onrender.com"


### Backend env credentials

MONGO_URL =mongodb+srv://henilp1508:dLw8t5sOCKf3wH4A@cluster0.45coh.mongodb.net/Society-Management

PORT = 5000

JWT_SECRET = Henil1508

JWT_SECRET_OWNER = Henil1508

NODE_ENV = development

cloud_name = dy2mniw9k

api_key = 641219958732194

api_secret = u1X3wDFdhJsmqm8Tz2rZ5dkESZc

KEY_ID=rzp_test_ynJXAtmPcLhxIW

KEY_SECRET=gynCPDfMIqLgWEfOqS7luekP
### THANK YOU !
