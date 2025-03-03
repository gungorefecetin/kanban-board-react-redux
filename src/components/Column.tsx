import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { Task as TaskType } from '../store/kanbanSlice';

const ColumnContainer = styled.div`
  background: #f4f5f7;
  border-radius: 8px;
  width: 300px;
  padding: 8px;
  margin: 8px;
  display: flex;
  flex-direction: column;
  min-height: 500px;
`;

const ColumnTitle = styled.h2`
  padding: 8px;
  margin: 0;
  font-size: 18px;
  color: #172b4d;
`;

const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${props => props.isDraggingOver ? '#E3E7F1' : '#f4f5f7'};
  transition: background-color 0.2s ease;
  border-radius: 4px;
`;

interface ColumnProps {
  title: string;
  tasks: TaskType[];
  id: string;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, id }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} index={index} {...task} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

export default Column; 