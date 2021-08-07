import * as Styled from './styles';
import React, { useState } from 'react';
import type { ProjectListProperties } from '../Sidebar/Sidebar';
import { colors } from '../../helpers';
import { ReactComponent as TrashIcon } from './trash.svg';
import { ReactComponent as EditIcon } from './edit.svg';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectToBeDeletedItem, selectProjectItem } from '../../features/tasks/taskSlice';
import { db } from '../../firebase';

interface ItemProps extends ProjectListProperties{
    unsavedList?: Array<ProjectListProperties>;
    projectList?: Array<ProjectListProperties>;
    setUnsavedList?: (list: Array<ProjectListProperties>) => void;
    onItemEdit: (id: string, item: string) => void;
}
const Item: React.FC<ItemProps> = ({ 
    id, 
    colorIndex, 
    projectTitle,
    setUnsavedList,
    unsavedList,
    onItemEdit,
    projectList
}): JSX.Element => {
    const dispatch = useAppDispatch();
    const { tobeDeletedItem } = useAppSelector(state => state.task);
    const [displayDeleteMessage, setDisplayDeleteMessage] = useState<boolean>(false);

    const onItemDelete = () => {
        setDisplayDeleteMessage(true);
        dispatch(selectToBeDeletedItem({ id, projectTitle }));
    }

    const onUnsavedListDeletion = (uid: string) : void => {
        if(uid && setUnsavedList && unsavedList){
            const newList = unsavedList.filter((el: ProjectListProperties) => el.id !== uid);
            onSelectProjectItem(unsavedList, uid);
            setUnsavedList(newList);
          
        }
    }
    
    const onSelectProjectItem = (listArray: Array<ProjectListProperties>, uid: string) => {
        const prevSelectedItem = listArray.find((item) => item.id === uid);
        const prevSelectedIndex = listArray.findIndex(el => el.id === prevSelectedItem?.id);

        if(listArray.length < 1 && prevSelectedIndex === 0) {
            dispatch(selectProjectItem(null));
            return;
        }

        if(prevSelectedIndex === 0 && listArray.length > 1){
            dispatch(selectProjectItem({id : listArray[prevSelectedIndex + 1].id, projectTitle: listArray[prevSelectedIndex + 1].projectTitle }))
            return;
        }

        if(listArray.length === 1){
            dispatch(selectProjectItem({id : listArray[0].id, projectTitle: listArray[0].projectTitle }))
            return;
        } 

        dispatch(selectProjectItem({ id : listArray[prevSelectedIndex - 1].id, projectTitle: listArray[prevSelectedIndex - 1].projectTitle}))
        
    }

    return (
        <Styled.Item key={id} color={colors[colorIndex || 0]?.color}>
            <div onClick={() => dispatch(selectProjectItem({ id, projectTitle}))}>
                <p></p>
                <h3>{projectTitle}</h3>
            </div>
            <TrashIcon onClick={onItemDelete} />
            <EditIcon onClick={() => onItemEdit(id, projectTitle)} />
            {displayDeleteMessage && (
                <DeleteModal 
                 setDisplayDeleteMessage={setDisplayDeleteMessage} 
                 onUnsavedListDeletion={onUnsavedListDeletion}
                 onSelectProjectItem={onSelectProjectItem}
                 projectList={projectList!}
                />
            )}
        </Styled.Item>
    )
}

interface DeleteModalProps {
    setDisplayDeleteMessage: (value: boolean) => void;
    onUnsavedListDeletion: (id: string) => void;
    onSelectProjectItem: (list: Array<ProjectListProperties>, id: string) => void;
    projectList: Array<ProjectListProperties>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ 
    setDisplayDeleteMessage, 
    onUnsavedListDeletion,
    onSelectProjectItem,
    projectList
}): JSX.Element=> {
    const { currentUser } = useAppSelector(state => state.user);
    const { tobeDeletedItem } = useAppSelector(state => state.task);

    const onDeleteModalHandler = (e: React.MouseEvent): void => {
        const { attr } = (e.target as HTMLButtonElement).dataset;
        if(attr?.includes('cancel')){
            setDisplayDeleteMessage(false);
            return;
        }
        if(attr?.includes('delete') && currentUser){
            db.collection('users')
            .doc(currentUser?.id)
            .collection('projects')
            .doc(tobeDeletedItem?.id)
            .delete();
            onSelectProjectItem(projectList, tobeDeletedItem?.id!)
            return;
        }
        if(attr?.includes('delete') && !currentUser){
            onUnsavedListDeletion(tobeDeletedItem?.id!);
        }
    }

    return (
        <Styled.DeleteContainer onClick={onDeleteModalHandler}>
            <span>Are you sure you want to delete this project ?</span>
            <div>
                <button data-attr="btn delete">Delete</button>
                <button data-attr="btn cancel">Cancel</button>
            </div>
        </Styled.DeleteContainer>
    )
}


export default Item
