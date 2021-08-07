import { createSlice } from '@reduxjs/toolkit'

interface UserState{
    currentUser: {
        displayName: string;
        email: string;
        photoURL: string;
        id: string;
    } | null;
    loading: boolean;
    errorMessage: string | null;
}

const initialState: UserState = {
    currentUser: null,
    loading: false,
    errorMessage: null
}

const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        userAuthRequest: (state) => {
            return {
                ...state,
                loading: true
            }
        },
        userAuthSuccess: (state, { payload }) => {
            const { displayName, email, photoURL, uid } = payload;
            return {
                loading: false,
                currentUser: {
                    displayName, email, photoURL, id: uid
                },
                errorMessage: null
            }
        },
        userAuthFailure: (state, { payload }) => {
            return {
                loading: false,
                currentUser: null,
                errorMessage: payload.message
            }
        },
        userAuthSignOut: (state) => {
            return {
                ...state,
                currentUser: null,
                loading: false
            }
        }
    }
});

export const {
   userAuthRequest,
   userAuthSuccess,
   userAuthFailure,
   userAuthSignOut
} = userSlice.actions

export default userSlice.reducer