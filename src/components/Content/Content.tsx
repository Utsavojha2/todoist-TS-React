/* eslint-disable */
import { useEffect, useState } from 'react';
import * as Styled from './styles';
import { ReactComponent as List } from './list.svg';
import { ReactComponent as Calendar } from './calendar.svg';
import type { ProjectListProperties } from '../Sidebar/Sidebar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { db } from '../../firebase';
import { selectProjectItem } from '../../features/tasks/taskSlice';
import TaskItem from '../TaskItem/TaskItem';

export type ContentProps = {
    darkMode: boolean;
    projectList: Array<ProjectListProperties>;
    unsavedList: Array<ProjectListProperties>;
    currentContent: string;
}

interface ProjectTaskProperties {
    id: string;
    taskDescription: string;
    completed: boolean;
    date: string;
}

const Content: React.FC<ContentProps> = ({ 
    darkMode,
    projectList,
    unsavedList,
    currentContent,
}): JSX.Element => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector(state => state.user);
    const { currentProjectItem } = useAppSelector(state => state.task);

    const [projectTasks, setProjectTasks] = useState<Array<ProjectTaskProperties>>([]);
    const [unsavedProjectTasks, setUnsavedProjectTasks] = useState<Array<ProjectTaskProperties>>([]);

    const [taskMessage, setTaskMessage] = useState('');
    const [hiddenInputTask, setHiddenInputTask] = useState(true);
    const [onCalendarHidden, setOnCalendarHidden] = useState(true);
    const [projectListHidden, setProjectListHidden] = useState(true);
    const [inputError, setInputError] = useState(false);
    const [taskValues, setTaskValues] = useState({
        date: '',
        project: {
            id: '', 
            projectTitle: ''
        }
    })
    const { date, project : { id }} = taskValues;
    const projectNotExisting = projectList.find(el => el.id === id);
    const unsavedListNotExisting = unsavedList.find(el => el.id === id);
    console.log(projectTasks);
    console.log(currentProjectItem);

    useEffect(() => {
        db
        .collection('users')
        .doc(currentUser?.id)
        .collection('projects')
        .doc(currentProjectItem?.id)
        .collection('taskList')
        .onSnapshot(snap => {
            const tasksArray = snap.docs.map(doc => {
              return { 
                id: doc.id,
                taskDescription: doc.data().taskDescription,
                completed: doc.data().completed,
                date: doc.data().date
              }
            })
            setProjectTasks(tasksArray);
            // setProjectTasks(tasksArray.filter(task => !task.completed));
        })
    }, [currentProjectItem?.id])
    
    useEffect(() => {
        if(currentUser && projectList.length < 1){
            dispatchSetTaskValues('', '');
            return;
        }

        if(unsavedList.length < 1){
            dispatchSetTaskValues('', '');
            return;
        }

        if(currentUser && (projectList.length === 1 || projectNotExisting)){
            dispatchSetTaskValues(projectList[0]?.id, projectList[0]?.projectTitle);
            return;
        }
        if(unsavedList.length === 1 || unsavedListNotExisting){ 
            dispatchSetTaskValues(unsavedList[0]?.id, unsavedList[0]?.projectTitle)
        }
    }, [projectList, unsavedList])

    useEffect(() => {
        if(currentUser && projectList.length < 1){
            dispatch(selectProjectItem(null))
            return;
        }
        if(unsavedList.length < 1){
            dispatch(selectProjectItem(null))
        }
    }, [])


    useEffect(() => {
        dispatch(selectProjectItem(null));
    }, [currentUser])

    const dispatchSetTaskValues = (id: string, title: string) => {
        setTaskValues((val) => {
            return {
                ...taskValues,
                project : {
                    id ,
                    projectTitle: title
                }
            }
        })
    }

    const onCalendarClick = () => {
        setProjectListHidden(true);
        setOnCalendarHidden(false);
    }

    const onListsClick = () => {
        setOnCalendarHidden(true);
        setProjectListHidden(false);
    }

    const onContentClick = (e: React.MouseEvent): void => {
        const { attr } = (e.target as HTMLDivElement)!.dataset;
        const { attr: parentAttr } = (e.target as HTMLDivElement)!.parentElement!.dataset;
        const onContainerClick = !attr || !parentAttr;

        if(onContainerClick && !onCalendarHidden){
            setOnCalendarHidden(true);
        }

        if(onContainerClick && !projectListHidden){
            setProjectListHidden(true);
        }
    }

    const onDateSelect = (e: React.MouseEvent): void => {
        const { datcal } = (e.target as HTMLElement).dataset;
        if(!datcal) return;
        const val = (e.target as HTMLLIElement)!.innerText;
        setTaskValues((values) => {
            return {
                ...taskValues,
                date: val
            }
        });
    };

    const onProjectSelect = (item: {id: string, projectTitle: string;}) => {
        setTaskValues((values) => {
            return {
                ...taskValues,
                project: {
                    id: item.id, 
                    projectTitle: item.projectTitle,
                }
            }
        })
    }

    const addToProjectTask = () => {
        const trimmedMessage = taskMessage.trim();
        if(!trimmedMessage){
            setInputError(true);
            setTimeout(() => setInputError(false), 2000);
            return;
        }

        if(currentUser){
            db
            .collection('users')
            .doc(currentUser?.id)
            .collection('projects')
            .doc(id || currentProjectItem?.id)
            .collection('taskList')
            .add({
                taskDescription : taskMessage,
                completed: false,
                date: date || 'Today'
            })
            setInputError(false);
            setTaskMessage('');
            dispatchSetTaskValues('', '');
            return;
        }
        // do sth II
        // setInputError(false);
    }

    const updateTaskItem = () => {

    }

    return (
        <Styled.Container darkMode={darkMode} onClick={onContentClick}>
             <Styled.ContainerBody>
                <Styled.ContainerHead>{(currentProjectItem?.projectTitle) || currentContent}</Styled.ContainerHead>
                <Styled.ContainerSection>
                    {projectTasks.map((el) => (
                        <TaskItem key={el.id} {...el}  darkMode={darkMode} />
                    ))}
                </Styled.ContainerSection>
                <Styled.AddSection 
                 color="secondary" 
                 onClick={() => setHiddenInputTask(!hiddenInputTask)} 
                 center={projectTasks.length < 1}
                >
                    {hiddenInputTask ? '+ Add Task' : 'Remove'}
                </Styled.AddSection>
                {hiddenInputTask ? null : (
                <Styled.InputTaskSection error={inputError}>
                    <input 
                      type="text" 
                      placeholder={inputError ? 'Don\'t leave this empty' : 'Enter your task'} 
                      value={taskMessage}
                      onChange={e => setTaskMessage(e.target.value)}
                    />
                    <div>
                        <div>
                            <Styled.AddSection 
                             onClick={addToProjectTask} 
                             color="primary"
                            > 
                             Add Task
                            </Styled.AddSection>
                            <p onClick={() => setHiddenInputTask(true)}>Cancel</p>
                        </div>
                        <Styled.ContentIcons>
                            <div>
                                <Calendar onClick={onCalendarClick} />
                                <List onClick={onListsClick} />
                            </div>
                        </Styled.ContentIcons>
                    </div>
                    {onCalendarHidden ? null : (
                        <Styled.CalendarOptions>
                            <Styled.CalendarOptionsList data-attr="list calendar" onClick={onDateSelect}>
                                <li data-datcal="date today">
                                  Today
                                </li>
                                <li data-datcal="date tom">
                                  Tomorrow
                                </li>
                                <li data-datcal="date next-week">
                                  Next Week
                                </li>
                            </Styled.CalendarOptionsList>
                        </Styled.CalendarOptions>
                        )}
                        {projectListHidden ? null : 
                         (projectList.length > 1 || unsavedList.length > 1) ? (
                            <Styled.CalendarOptions>
                             <Styled.CalendarOptionsList data-attr="list calendar">
                                {currentUser ? 
                                    projectList.map((el) => {
                                        return (
                                        <li key={el.id} onClick={() => onProjectSelect(el)}>
                                            {el.projectTitle}
                                        </li>
                                    )
                                }) :
                                    unsavedList.map((el) => {
                                        return (
                                          <li key={el.id} onClick={() => onProjectSelect(el)}>
                                            {el.projectTitle}
                                          </li>
                                        )
                                    })
                                }
                              </Styled.CalendarOptionsList>
                            </Styled.CalendarOptions>
                        ) : null}
                </Styled.InputTaskSection>
                )}
             </Styled.ContainerBody>
            </Styled.Container>
    )
}

export default Content;
