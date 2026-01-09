# Work Track – Employee Task Management System 🚀

Work Track is a **React-based Employee Task Management System** where an **Admin** can create and assign tasks, and **Employees** can accept tasks and mark them as **Completed** or **Failed**.  
The application uses **React Context API** for state management and **LocalStorage** for data persistence.

---

## 🔥 Features

### 👨‍💼 Admin
- Create and assign tasks to employees
- View all employees and their task statistics
- Track task status:
  - New
  - Active
  - Completed
  - Failed

### 👨‍💻 Employee
- View assigned tasks
- Accept tasks
- Mark tasks as **Completed** or **Failed**
- Task status updates instantly

### ⚙️ Core Functionality
- React Context API for global state
- Persistent data using browser LocalStorage
- Automatic task count updates
- Clean UI with Tailwind CSS
- No backend required

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **State Management:** Context API
- **Styling:** Tailwind CSS
- **Persistence:** LocalStorage
- **Build Tool:** Vite / CRA (depending on setup)

---

## 📂 Project Structure

src/
│── Components/
│ ├── AcceptTask.jsx
│ ├── AllTasks.jsx
│ ├── CreateTask.jsx
│
│── Contexts/
│ └── AuthProvider.jsx
│
│── Utils/
│ └── LocalStorage.js
│
│── App.jsx
│── main.jsx

## 🔁 Task Lifecycle

- Each task can have **only one status at a time**
- Task counts update automatically for each employee

---

## 💾 LocalStorage Usage

- Employee and admin data are stored in LocalStorage
- Data persists even after page refresh
- Initial default data is created **only once**

---