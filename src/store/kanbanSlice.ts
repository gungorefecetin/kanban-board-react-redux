import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueDate?: string;
  labels: string[];
}

interface KanbanState {
  tasks: Task[];
  labels: string[];
}

// Load state from localStorage
const loadState = (): KanbanState => {
  try {
    const serializedState = localStorage.getItem('kanbanState');
    if (serializedState === null) {
      return {
        tasks: [],
        labels: ['Bug', 'Feature', 'Enhancement', 'Documentation']
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      tasks: [],
      labels: ['Bug', 'Feature', 'Enhancement', 'Documentation']
    };
  }
};

const initialState: KanbanState = loadState();

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        labels: action.payload.labels || [],
      };
      state.tasks.push(newTask);
      saveState(state);
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; status: Task['status'] }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.status;
        saveState(state);
      }
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; updates: Partial<Omit<Task, 'id'>> }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        Object.assign(task, action.payload.updates);
        saveState(state);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveState(state);
    },
    addLabel: (state, action: PayloadAction<string>) => {
      if (!state.labels.includes(action.payload)) {
        state.labels.push(action.payload);
        saveState(state);
      }
    },
    deleteLabel: (state, action: PayloadAction<string>) => {
      state.labels = state.labels.filter(label => label !== action.payload);
      state.tasks = state.tasks.map(task => ({
        ...task,
        labels: task.labels.filter(label => label !== action.payload)
      }));
      saveState(state);
    },
  },
});

// Save state to localStorage
const saveState = (state: KanbanState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('kanbanState', serializedState);
  } catch (err) {
    // Handle errors here
  }
};

export const { 
  addTask, 
  updateTaskStatus, 
  updateTask, 
  deleteTask,
  addLabel,
  deleteLabel 
} = kanbanSlice.actions;
export default kanbanSlice.reducer; 