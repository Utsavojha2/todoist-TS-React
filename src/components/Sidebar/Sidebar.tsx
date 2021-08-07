import { useState, useEffect } from 'react';
import * as Styled from './styles';
import { ReactComponent as Calendar } from './icons/calendar.svg';
import { ReactComponent as Disc } from './icons/disc.svg';
import { ReactComponent as Inbox } from './icons/inbox.svg';
import { ReactComponent as Dropdown } from './icons/chevron-down.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CloseIcon } from './icons/x-circle.svg';
import { ReactComponent as TomIcon } from './icons/aperture.svg';
import { db } from '../../firebase';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { resetProjectItem } from '../../features/tasks/taskSlice';
import Item from '../Item/Item';

export type ProjectListProperties = {
    projectTitle : string;
    id: string;
    colorIndex?: number;
}

type SidebarProps = {
    setCurrentContent: (value: string) => void;
    projectList: Array<ProjectListProperties>;
    setProjectList: (list: Array<ProjectListProperties>) => void;
    unsavedList: Array<ProjectListProperties>;
    setUnsavedList: (list: Array<ProjectListProperties>) =>  void;
    addUnsavedList: (listItem: ProjectListProperties) => void;
}

const Sidebar: React.FC<SidebarProps> = ( { 
    setCurrentContent,
    projectList,
    setProjectList,
    unsavedList,
    setUnsavedList,
    addUnsavedList
}): JSX.Element => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector(state => state.user);
    const [projectTitle, setProjectTitle] = useState<string>('');
    const [hiddenInput, setHiddenInput] = useState<boolean>(true);
    const [hiddenProjects, setHiddenProjects] = useState<boolean>(false);
    const [editID, setEditID] = useState<string>('');

    useEffect(() => {
        if(projectList.length < 1){
            setHiddenInput(true);
        }
    }, [projectList])

    useEffect(() => {
        db.collection('users').doc(currentUser?.id).collection('projects').onSnapshot(snap => {
            setProjectList(snap.docs.map((doc) => {
                return {
                    id: doc.id,
                    projectTitle: doc.data().projectTitle,
                    colorIndex: doc.data().colorIndex,
                }
            }))
        })
    }, [currentUser?.id, setProjectList])

    const handleInput = (e: React.MouseEvent): void => {
        const { attr } = (e.target as HTMLButtonElement).dataset;
        if(attr?.includes('btn')){
            setHiddenInput(true);
        }
    }

    const onCurrentTimeframe = (e: React.MouseEvent): void => {
        const timeframe = (e.target as HTMLLIElement);
        if(!timeframe.innerText){
            const val = timeframe.nextSibling!;
            if(!val){
                const spanValue = timeframe.parentElement?.nextSibling?.textContent!;
                setCurrentContent(spanValue);
                return;
            }
            setCurrentContent(val.textContent!);
            return;
        }
        setCurrentContent(timeframe.innerText);
        dispatch(resetProjectItem());
    }

    const addProjectItem = () => {
        const trimmedInput = projectTitle.trim();
        if(!trimmedInput){
            return;
        }
        const colorIndex = Math.floor(Math.random() * 5);

        if(currentUser){ 
            db.collection('users').doc(currentUser?.id).collection('projects').add({
                projectTitle, colorIndex
            });
        } else {
            const listItem: ProjectListProperties = {
                projectTitle, 
                colorIndex, 
                id: Math.random().toString()
            }
            addUnsavedList(listItem)
        }

        setHiddenProjects((val: boolean): boolean => {
            if(!val){
                return val;
            }
            return false;
        })
        setProjectTitle('');
    }

    const onItemEdit = (id: string, title: string): void => {
        setEditID(id);
        setProjectTitle(title);
        setHiddenInput(false);
    }

    const onEditedItemSubmit = () => {
      if(!projectTitle) return;
      if(!currentUser){
        const editedList = unsavedList.map((item : ProjectListProperties) => {
            if(item.id === editID){
                return {
                    ...item,
                    projectTitle
                }
            }
            return item;
        })
        setUnsavedList(editedList);
      }
      if(currentUser){ 
        db
        .collection('users')
        .doc(currentUser?.id)
        .collection('projects')
        .doc(editID)
        .update({
            projectTitle
        })
      }
      setProjectTitle('');
      setEditID('');
      setHiddenInput(true);
    }

    return (
        <Styled.SideContainer>
            <Styled.SideHeader onClick={onCurrentTimeframe}>
                <li>
                    <Calendar />
                    <span>Inbox</span>
                </li>
                <li>
                    <Disc />
                    <span>Today</span>
                </li>
                <li>
                    <TomIcon />
                    <span>Tomorrow</span>
                </li>
                <li>
                    <Inbox />
                   <span>Next 7 Days</span>
                </li>
            </Styled.SideHeader>
            <Styled.SideBody isHidden={hiddenProjects}>
                <div onClick={() => setHiddenProjects(!hiddenProjects)}>
                    <Dropdown />
                    <p>PROJECTS</p>
                </div>
                {!hiddenProjects ? (
                <Styled.FetchList>
                    {currentUser ? 
                      projectList.map((item) => { 
                        return (
                            <Item 
                              key={item.id} 
                              {...item} 
                              onItemEdit={onItemEdit}
                              projectList={projectList}
                            />
                      )}) : 
                      unsavedList.map((item) => { 
                        return (
                        <Item
                         key={item.id} 
                         {...item} 
                         onItemEdit={onItemEdit}
                         setUnsavedList={setUnsavedList} 
                         unsavedList={unsavedList} 
                        />
                      )})
                    }
                </Styled.FetchList>
                 ) : null}
                {hiddenInput ? (
                    <Styled.AddSection onClick={() => setHiddenInput(false)}>
                        <PlusIcon />
                        <p>Add Project</p>
                    </Styled.AddSection>
                ) : (
                    <Styled.InputSection>
                        <input 
                         value={projectTitle} 
                         onChange={(e) => setProjectTitle(e.target.value)}
                         type="text" 
                         placeholder="Add your project"
                        />
                        <div onClick={handleInput}>
                            {!editID ? (
                              <button 
                                onClick={addProjectItem}
                                data-attr="btn add-btn"
                                >
                                    Add Project
                               </button>
                            ) : (
                                <button onClick={onEditedItemSubmit}>Edit Project</button>
                            )}
                            <button type="button" data-attr="btn cancel-btn">Cancel</button>
                            <CloseIcon onClick={() => setHiddenInput(true)} />
                        </div>
                    </Styled.InputSection>
                )}
            </Styled.SideBody>
        </Styled.SideContainer>
    )
}

export default Sidebar;
