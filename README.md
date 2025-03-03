# React Kanban Board

A modern, feature-rich Kanban board built with React, TypeScript, Redux, and React Beautiful DND.

## Features

- 📋 Drag and drop tasks between columns
- 💾 Persistent storage using localStorage
- 🏷️ Label system with customizable tags
- 🎯 Task priority levels (Low, Medium, High)
- 📅 Due dates with overdue highlighting
- 🎨 Modern and responsive UI
- ✏️ Edit tasks in a modal
- 🗑️ Delete tasks and labels

## Tech Stack

- React.js
- TypeScript
- Redux (Redux Toolkit)
- Styled Components
- React Beautiful DND
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:
```bash
cd kanban-board
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Adding Tasks
1. Fill in the task title (required)
2. Select priority level
3. Set due date (optional)
4. Add description
5. Select or create labels
6. Click "Add Task"

### Managing Tasks
- Drag and drop tasks between columns
- Click on a task to edit its details
- Use the × button to delete tasks
- Add/remove labels from tasks
- Track task status with visual indicators

### Labels
- Use predefined labels
- Create custom labels
- Apply multiple labels to tasks
- Remove labels from the system

## Project Structure

```
src/
├── components/         # React components
│   ├── AddTaskForm.tsx
│   ├── Board.tsx
│   ├── Column.tsx
│   ├── Task.tsx
│   └── TaskDetails.tsx
├── store/             # Redux store and slices
│   ├── kanbanSlice.ts
│   └── store.ts
└── App.tsx            # Root component
```

## Future Enhancements

- User authentication and authorization
- Task comments and discussions
- File attachments
- Task dependencies
- Time tracking
- Multiple board support
- Team collaboration features
- Data analytics and reporting
- Dark mode
- Mobile app version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd) for the drag and drop functionality
- [Styled Components](https://styled-components.com/) for the styling solution
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
