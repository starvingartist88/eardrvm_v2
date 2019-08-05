// import { Project } from 'src/app/projects/models/project.model';

export interface AdminState {
    usersList: any[];
    usersListLoading: boolean;
    userProjects: any;
    userProjectsLoading: boolean;
    userTracks: any;
    userTracksLoading: boolean;
    error: any;
}

export const adminInitialState: AdminState = {
    usersList: [],
    usersListLoading: false,
    userProjects: {},
    userProjectsLoading: false,
    userTracks: {},
    userTracksLoading: false,
    error: null
};
