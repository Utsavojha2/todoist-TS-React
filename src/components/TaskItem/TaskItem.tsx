import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';
import { db } from '../../firebase';
import { useAppSelector } from '../../app/hooks';

interface TaskProps {
    taskDescription: string;
    completed: boolean;
    date: string;
    darkMode: boolean;
    id: string;
}

const TaskItem: React.FC<TaskProps> = ({ 
    id,
    taskDescription, 
    completed, 
    date, 
    darkMode,
}): JSX.Element => {
    const { currentUser } = useAppSelector(state => state.user);
    const { currentProjectItem } = useAppSelector(state => state.task);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(checked){
            db
            .collection('users')
            .doc(currentUser?.id)
            .collection('projects')
            .doc(currentProjectItem?.id)
            .collection('taskList')
            .doc(id).delete();
        }
    }, [checked])

    return (
        <ContainerDiv>
            <Checkbox
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
                color={!darkMode ? "secondary" : "primary"}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <p>{taskDescription}</p>
        </ContainerDiv>
    )
}

export const ContainerDiv = styled.div`
  display: flex;
  padding: 8px 5px;
  margin: 0px;
  margin-top: -10px;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

export default TaskItem
