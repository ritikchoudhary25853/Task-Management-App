# WorkTrack

WorkTrack is a React and Vite task-management demo for admins and employees. Admins can manage people, assign tasks, review deadlines, and track outcomes. Employees can accept work, update progress, and close tasks with completion notes.

## Features

- Role-based admin and employee routes
- Dashboard metrics, charts, deadline watch, and activity history
- People management with add, edit, delete, search, filters, and pagination
- Task management with priorities, statuses, attachments, progress, and history
- Calendar, profile, settings, notifications, dark mode, and local persistence

## Tech Stack

- React
- React Router
- React Context
- Tailwind CSS
- Lucide React icons
- Recharts
- Vite

## Project Structure

```text
src/
  components/
    Layout/AppLayout.jsx
    ui/Controls.jsx
  context/WorkTrackContext.jsx
  data/seedData.js
  pages/
    AuthPages.jsx
    DashboardPages.jsx
    EmployeesPage.jsx
    TasksPage.jsx
    UtilityPages.jsx
  utils/
    formatters.js
    storage.js
  App.jsx
  main.jsx
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
