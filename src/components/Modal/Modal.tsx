import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import * as Styled from './styles';
import { ReactComponent as CloseIcon } from './x-circle.svg';
import { auth, provider } from '../../firebase';
import { userAuthFailure, userAuthRequest } from '../../features/user/userSlice';

type ModalProps = {
    setModalOpen: (value: boolean) => void;
}

const DATA_STRING = 'CLOSE__MODAL';

const Modal: React.FC<ModalProps> = ({ setModalOpen }): JSX.Element => {
    const dispatch = useAppDispatch();
    
    const onHandleModal = (e: React.MouseEvent): void => {
        const onModalClose = (e.target as HTMLDivElement).getAttribute('data-type') === DATA_STRING;
        if(onModalClose){
            setModalOpen(false);
        }
    }

    const userSignIn = () => {
        setModalOpen(false);
        dispatch(userAuthRequest());
        auth.signInWithPopup(provider)
        .catch(error => {
            dispatch(userAuthFailure({
                message: error.message,
            }))
        })
    }


    return (
        <Styled.ModalContainer onClick={onHandleModal} data-type={DATA_STRING}>
            <Styled.ModalContent>
                <CloseIcon onClick={() => setModalOpen(false)} />
                <section>
                    <h2>Sign in to save your work.</h2>
                    <div>
                        <button onClick={userSignIn}>Sign In</button>
                        <button onClick={() => setModalOpen(false)}>Cancel</button>
                    </div>
                </section>
            </Styled.ModalContent>
        </Styled.ModalContainer>
    )
}

export default Modal
