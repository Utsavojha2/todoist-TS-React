import { createSlice } from '@reduxjs/toolkit'
import type { ProjectListProperties } from '../../components/Sidebar/Sidebar';

type TaskProperties = {
    projectTasks : Array<string | boolean>;
    loading: boolean;
    currentProjectItem: ProjectListProperties | null;
    tobeDeletedItem: ProjectListProperties | null;
}

const initialState: TaskProperties = {
    projectTasks : [],
    loading : false,
    currentProjectItem: null,
    tobeDeletedItem : null,
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      fetchProjectRequest: (state) => {
          state.loading = true;
      },
      fetchProjectSuccess: (state, { payload }) => {
        state.loading = false;
        state.projectTasks = [...state.projectTasks, payload]
      },
      selectProjectItem: (state, { payload }) => {
        state.currentProjectItem = payload;
      }, 
      resetProjectItem: (state) => {
        state.currentProjectItem = null;
      },
      selectToBeDeletedItem: (state, { payload }) => {
        state.tobeDeletedItem = payload;
      }
    }
});

export const {
  fetchProjectRequest,
  fetchProjectSuccess,
  selectProjectItem,
  resetProjectItem,
  selectToBeDeletedItem,
} = taskSlice.actions;

export default taskSlice.reducer