import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Task as TaskType } from '../store/kanbanSlice';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/kanbanSlice';
import TaskDetails from './TaskDetails';

const TaskCard = styled.div<{ isDragging: boolean; priority: TaskType['priority'] }>`
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 8px;
  box-shadow: ${props => props.isDragging ? '0 5px 10px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.12)'};
  user-select: none;
  border-left: 3px solid ${props => {
    switch (props.priority) {
      case 'high':
        return '#ff5630';
      case 'medium':
        return '#ffab00';
      default:
        return '#36b37e';
    }
  }};
  
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const TaskTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
`;

const TaskDescription = styled.p`
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  float: right;
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 4px;
  z-index: 1;
  
  &:hover {
    color: #ff0000;
  }
`;

const MetaData = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const DueDate = styled.span<{ isOverdue: boolean }>`
  font-size: 12px;
  color: ${props => props.isOverdue ? '#ff4444' : '#666'};
  background: ${props => props.isOverdue ? '#ffe9e9' : '#f4f5f7'};
  padding: 2px 6px;
  border-radius: 4px;
`;

const LabelChip = styled.span`
  font-size: 12px;
  background: #e6e8ec;
  color: #172b4d;
  padding: 2px 6px;
  border-radius: 4px;
`;

interface TaskProps extends TaskType {
  index: number;
}

const Task: React.FC<TaskProps> = ({ id, title, description, index, priority, dueDate, labels, status, ...rest }) => {
  const dispatch = useDispatch();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(id));
  };

  const isOverdue = dueDate ? new Date(dueDate) < new Date() : false;

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <TaskCard
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            priority={priority}
            onClick={() => setIsDetailsOpen(true)}
          >
            <DeleteButton onClick={handleDelete}>×</DeleteButton>
            <TaskTitle>{title}</TaskTitle>
            <TaskDescription>{description}</TaskDescription>
            <MetaData>
              {dueDate && (
                <DueDate isOverdue={isOverdue}>
                  {new Date(dueDate).toLocaleDateString()}
                </DueDate>
              )}
              {labels.map(label => (
                <LabelChip key={label}>{label}</LabelChip>
              ))}
            </MetaData>
          </TaskCard>
        )}
      </Draggable>
      {isDetailsOpen && (
        <TaskDetails
          task={{ id, title, description, priority, dueDate, labels, status, ...rest }}
          onClose={() => setIsDetailsOpen(false)}
        />
      )}
    </>
  );
};

export default Task; 