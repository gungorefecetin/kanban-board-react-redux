import React, { useCallback } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult, resetServerContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateTaskStatus } from '../store/kanbanSlice';
import Column from './Column';
import AddTaskForm from './AddTaskForm';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const BoardTitle = styled.h1`
  color: #172b4d;
  margin-bottom: 20px;
`;

const ColumnsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
`;

const COLUMN_IDS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done'
} as const;

const COLUMNS = [
  {
    id: COLUMN_IDS.TODO,
    title: 'To Do',
  },
  {
    id: COLUMN_IDS.IN_PROGRESS,
    title: 'In Progress',
  },
  {
    id: COLUMN_IDS.DONE,
    title: 'Done',
  },
] as const;

// Reset server context for SSR
resetServerContext();

const Board: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.kanban.tasks);
  const dispatch = useDispatch();

  const getColumnTasks = useCallback((columnId: string) => {
    return tasks.filter(task => task.status === columnId);
  }, [tasks]);

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped in its original position
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    // Find the task that was dragged
    const task = tasks.find(t => t.id === draggableId);
    if (!task) return;

    // Update the task's status based on the destination column
    const newStatus = destination.droppableId as 'todo' | 'inProgress' | 'done';
    
    dispatch(updateTaskStatus({
      taskId: draggableId,
      status: newStatus
    }));
  }, [dispatch, tasks]);

  const onDragStart = useCallback(() => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <BoardContainer>
        <BoardTitle>Kanban Board</BoardTitle>
        <AddTaskForm />
        <ColumnsContainer>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={getColumnTasks(column.id)}
            />
          ))}
        </ColumnsContainer>
      </BoardContainer>
    </DragDropContext>
  );
};

export default Board; 