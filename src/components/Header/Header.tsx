import { useEffect, useState } from 'react';
import * as Styled from './styles';
import { Avatar } from '@material-ui/core';
import { auth, provider } from '../../firebase';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Modal from '../Modal/Modal';
import { userAuthRequest, userAuthSuccess, userAuthSignOut, userAuthFailure } from '../../features/user/userSlice';
import { ReactComponent as LogOut } from './log-out.svg';

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }): JSX.Element => {
    const dispatch = useAppDispatch();
    const { currentUser, loading } = useAppSelector(state => state.user);
    const onPopupMessage = !currentUser && !loading;
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
      setTimeout(() => {
        setModalOpen(true)
      }, 1500)
    }, [])

    useEffect(() => {
        if(darkMode){
          document.documentElement.className = 'dark__mode'
          return;
        }
        document.documentElement.className = 'normal__mode';
    }, [darkMode])

    useEffect(() => {
      dispatch(userAuthRequest())
      auth.onAuthStateChanged((user) => {
        if(user){
          dispatch(userAuthSuccess(user))
        } else {
          dispatch(userAuthFailure({ message: '404 Error'}))
        }
      })
    }, [dispatch])

    const onUserSignOut = () => {
       dispatch(userAuthRequest());
       auth.signOut()
       .then(() => dispatch(userAuthSignOut()));
    }

    return (
        <Styled.HeadContainer>
          {(onPopupMessage && modalOpen) ? <Modal setModalOpen={setModalOpen} /> : null}
          <Styled.Navigation darkMode={darkMode}>
                <h2>Todoist</h2>
                <div>
                   <p>+</p>
                   <h3 onClick={() => setDarkMode(!darkMode)}>Dark Mode</h3>
                   <Avatar 
                    onClick={() => auth.signInWithPopup(provider)} 
                    src={currentUser?.photoURL || ''} 
                    alt={currentUser?.displayName || ''} 
                  />
                   {currentUser && <LogOut onClick={onUserSignOut} />}
                   {loading && <span>Loading...</span>}
                </div>
          </Styled.Navigation>
        </Styled.HeadContainer>
    )
}

export default Header
