import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, Task, addLabel } from '../store/kanbanSlice';
import { RootState } from '../store/store';

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #172b4d;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #0052cc;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #0052cc;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background: #0052cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background: #0047b3;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const LabelChip = styled.div<{ selected: boolean }>`
  padding: 4px 8px;
  border-radius: 16px;
  background-color: ${props => props.selected ? '#0052cc' : '#f4f5f7'};
  color: ${props => props.selected ? 'white' : '#172b4d'};
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: ${props => props.selected ? '#0047b3' : '#e6e8ec'};
  }
`;

const NewLabelInput = styled.input`
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-size: 12px;
  width: 100px;
  
  &:focus {
    outline: none;
    border-color: #0052cc;
  }
`;

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => state.kanban.labels);
  const [newLabel, setNewLabel] = useState('');
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate || '',
    labels: task.labels,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTask({
      taskId: task.id,
      updates: taskData,
    }));
    onClose();
  };

  const toggleLabel = (label: string) => {
    setTaskData(prev => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter(l => l !== label)
        : [...prev.labels, label],
    }));
  };

  const handleAddNewLabel = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newLabel.trim()) {
      dispatch(addLabel(newLabel.trim()));
      toggleLabel(newLabel.trim());
      setNewLabel('');
    }
  };

  return (
    <Modal onClick={() => onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={taskData.title}
              onChange={e => setTaskData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="text"
              value={taskData.description}
              onChange={e => setTaskData(prev => ({ ...prev, description: e.target.value }))}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Priority</Label>
            <Select
              value={taskData.priority}
              onChange={e => setTaskData(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Due Date</Label>
            <Input
              type="date"
              value={taskData.dueDate}
              onChange={e => setTaskData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Labels</Label>
            <LabelContainer>
              {labels.map(label => (
                <LabelChip
                  key={label}
                  selected={taskData.labels.includes(label)}
                  onClick={() => toggleLabel(label)}
                >
                  {label}
                </LabelChip>
              ))}
              <NewLabelInput
                type="text"
                placeholder="New label..."
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                onKeyPress={handleAddNewLabel}
              />
            </LabelContainer>
          </FormGroup>
          
          <Button type="submit">Save Changes</Button>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default TaskDetails; 