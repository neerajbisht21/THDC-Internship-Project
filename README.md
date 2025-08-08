🚀 **Complaint Management System**
===============================

**Tagline:** Empowering Employee Engagement through Efficient Complaint Management

**Description**
---------------

The Complaint Management System is a web application designed to streamline the process of complaint registration, tracking, and management for employees within an organization. This React-based frontend application is built using the MERN (MongoDB, Express, React, Node.js) stack and leverages Chakra UI for a responsive and user-friendly interface.

The system allows employees to register complaints, view all complaints (open, closed, and in progress), and access their own complaint history. Administrators can manage complaints, view employee complaint history, and manage employee access. The application features a robust authentication system, ensuring secure access to sensitive information.

**Features**
------------

1. 📝 **Complaint Registration**: Employees can register complaints, providing detailed information about the issue.
2. 📊 **Complaint Tracking**: Employees can view all complaints, including open, closed, and in progress, to track the status of their complaints.
3. 🔒 **Authentication**: A robust authentication system ensures secure access to sensitive information.
4. 📈 **Role-Based Access Control**: Administrators can manage employee access, assigning specific roles to ensure data security.
5. 📝 **Complaint History**: Employees can access their own complaint history, tracking the progress of their complaints.
6. 📊 **Complaint Statistics**: Administrators can view statistics on complaint registration, resolution rates, and employee engagement.
7. 📞 **Notification System**: Employees receive notifications when their complaints are updated or resolved.
8. 🔍 **Search Functionality**: Employees can search for specific complaints using keywords, dates, or status.
9. 📁 **Complaint Attachment**: Employees can attach files to their complaints, providing additional context.
10. 📊 **Reporting**: Administrators can generate reports on complaint statistics, providing insights for data-driven decision-making.

**Tech Stack**
--------------

| **Component** | **Tech Stack** |
| --- | --- |
| Frontend | React, Chakra UI, React Router |
| Backend | Node.js, Express, MongoDB |
| Database | MongoDB |
| Authentication | Passport.js, JWT |
| Testing | Jest, Enzyme |

**Project Structure**
-------------------

The project is structured as follows:

* `app.js`: The main application file, bootstrapping React and rendering the app.
* `components`: Directory containing reusable React components.
* `containers`: Directory containing React container components.
* `utils`: Directory containing utility functions.
* `models`: Directory containing MongoDB models.
* `controllers`: Directory containing business logic controllers.
* `routes`: Directory containing Express.js routes.
* `middleware`: Directory containing middleware functions.

**How to Run**
--------------

### Setup

1. Clone the repository: `git clone https://github.com/your-username/complaint-management-system.git`
2. Install dependencies: `npm install` or `yarn install`
3. Create a `.env` file and add your MongoDB URI, Node.js environment variables, and other configuration settings.
4. Start the application: `npm start` or `yarn start`

### Environment

* MongoDB: `mongodb://localhost:27017/thdc-complaint-management-system`
* Node.js: `node`
* React: `react`

### Build

* Run `npm build` or `yarn build` to build the application

### Deploy

* Run `npm deploy` or `yarn deploy` to deploy the application to a production environment

**Testing Instructions**
-----------------------

* Run `npm test` or `yarn test` to execute Jest tests
* Use `jest-dom` to test React components
* Use `enzyme` to test React components

## 📸 Screenshots

### Dashboard View
![Dashboard](assets/Screenshot%202025-05-29%20142146.png)

### Complaint Form
![Complaint Form](assets/Screenshot%202025-05-29%20140443.png)

### Complaint List
![Complaint List](assets/Screenshot%202025-05-29%20140632.png)

### Admin Panel
![Admin Panel](assets/Screenshot%202025-05-29%20143351.png)

### Complaint Details
![Complaint Details](assets/Screenshot%202025-05-29%20143830.png)

### Stats View
![Stats View](assets/Screenshot%202025-05-29%20141503.png)


--------------


**Author**
--------

Neeraj Singh Bisht
