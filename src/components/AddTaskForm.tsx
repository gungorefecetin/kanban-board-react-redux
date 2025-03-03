import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, addLabel, Task } from '../store/kanbanSlice';
import { RootState } from '../store/store';

const FormContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
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

const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  
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
  
  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
`;

const LabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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

const AddTaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => state.kanban.labels);
  const [newLabel, setNewLabel] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    dueDate: '',
    labels: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    dispatch(addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: 'todo',
      priority: formData.priority,
      dueDate: formData.dueDate,
      labels: formData.labels,
    }));

    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      labels: [],
    });
  };

  const toggleLabel = (label: string) => {
    setFormData(prev => ({
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
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Task title"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Priority</Label>
            <Select
              value={formData.priority}
              onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
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
              value={formData.dueDate}
              onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Task description"
          />
        </FormGroup>

        <FormGroup>
          <Label>Labels</Label>
          <LabelContainer>
            {labels.map(label => (
              <LabelChip
                key={label}
                selected={formData.labels.includes(label)}
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

        <Button type="submit" disabled={!formData.title.trim()}>
          Add Task
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AddTaskForm; 