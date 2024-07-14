# Your Todo App

This is Full stack Todo list application built with React, JavaScript, Node, Express, MariaDB, and SQL.

  

# Usage

1. User opens this app and inputs the tasks one by one.

2. Database stores the tasks so that the user can close out of the app but still access the same tasks on reload.

3. As user completes a task, they can click the Done button to mark them as complete for organization.

4. If a user wishes to edit a task, they can press the Edit button to start editing.

5. If a user wishes to delete a task, they can press the delete button.

  

# Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)

- [MariaDB](https://mariadb.org/download/)

  

# Create a database

Create a database named `your_todo_app`.

You can use the sql to execute:

```sql
CREATE  DATABASE `your_todo_app`;
```

or do it manually by a database client like [phpMyAdmin](https://www.phpmyadmin.net/downloads/)

  

# Installation

  

1. Ensure your `MariaDB` server is running.

2. The query in the `create_tasks_table.js` file is set up to create all the necessary tables and populate the needed data to allow the application to run correctly. This will be done automatically when starting the server.

3. Open the project in your editor of choice.

4. Project Setup:

- Install backend dependencies:

```bash
cd backend
npm install
```

- Install frontend dependencies:

```bash
cd frontend
npm install
```
5. Running the Application:

- Start the backend server:

```bash
cd backend
npm run dev
```

- In a separate terminal, start the frontend application:

```bash
cd frontend
npm run dev
```
6. Open your browser and go to `http://localhost:5173`,

  

## Built With

  

This app is built with:

- [React](https://reactjs.org/)

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

- [Node.js](https://nodejs.org/)

- [Express](https://expressjs.com/)

- [MariaDB](https://mariadb.org/)

- [SQL](https://www.sql.org/)